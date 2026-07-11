import {
  Project,
  Entity,
  Field,
  FeatureFlag,
  ArchitectureType,
  FieldType,
  RelationType,
  DatabaseType,
} from "@sbc/core";
import type { Generator, GenerationContext } from "@sbc/core";
import type { GeneratedArtifact } from "@sbc/shared";

export class PrismaGenerator implements Generator {
  readonly name = "prisma";
  readonly version = "1.0.0";
  readonly supportedFeatures: readonly FeatureFlag[] = [];
  readonly supportedArchitectures: readonly ArchitectureType[] = [];

  async generate(context: GenerationContext): Promise<GeneratedArtifact[]> {
    const { project } = context;
    const artifacts: GeneratedArtifact[] = [];

    const schema = this.generatePrismaSchema(project);
    artifacts.push({
      path: "prisma/schema.prisma",
      content: schema,
      language: "prisma",
      metadata: {
        generator: this.name,
        entities: project.options.entities.length,
      },
    });

    const seed = this.generateSeedScript(project);
    artifacts.push({
      path: "prisma/seed.ts",
      content: seed,
      language: "typescript",
      metadata: { generator: this.name },
    });

    return artifacts;
  }

  private getPrismaProvider(db: DatabaseType): string {
    switch (db) {
      case DatabaseType.MYSQL:
        return "mysql";
      case DatabaseType.MONGODB:
        return "mongodb";
      case DatabaseType.SQLITE:
        return "sqlite";
      case DatabaseType.COCKROACHDB:
        return "cockroachdb";
      case DatabaseType.DYNAMODB:
        return "postgresql"; // Prisma doesn't support DynamoDB natively, fallback
      case DatabaseType.POSTGRESQL:
      default:
        return "postgresql";
    }
  }

  private generatePrismaSchema(project: Project): string {
    const dbType =
      project.options.infrastructure.database ?? DatabaseType.POSTGRESQL;
    const provider = this.getPrismaProvider(dbType);
    const lines: string[] = [
      "generator client {",
      '  provider = "prisma-client-js"',
      "}",
      "",
      "datasource db {",
      `  provider = "${provider}"`,
      '  url      = env("DATABASE_URL")',
      "}",
      "",
    ];

    for (const entity of project.options.entities) {
      lines.push(...this.generateModel(entity, project));
      lines.push("");
    }

    if (project.hasFeature(FeatureFlag.AUDIT_LOG)) {
      lines.push(...this.generateEventModel());
      lines.push("");
    }

    return lines.join("\n");
  }

  private generateModel(entity: Entity, project: Project): string[] {
    const lines: string[] = [`model ${entity.name} {`];

    const isAuthEntity =
      entity.hasFeature(FeatureFlag.AUTH) ||
      (entity.name === "User" && project.hasFeature(FeatureFlag.AUTH));

    const fieldNames = new Set(entity.fields.map((f) => f.name));

    for (const field of entity.fields) {
      let prismaField = this.mapFieldToPrisma(field);
      if (isAuthEntity && field.name === "email" && !field.options.unique) {
        prismaField = prismaField.replace(" @unique", "");
        prismaField += " @unique";
      }
      lines.push(`  ${prismaField}`);
    }

    if (isAuthEntity) {
      if (!fieldNames.has("password")) {
        lines.push("  password String?");
      }
      if (!fieldNames.has("role")) {
        lines.push('  role String @default("user")');
      }
    }

    if (entity.hasFeature(FeatureFlag.SOFT_DELETE)) {
      lines.push("  deletedAt DateTime?");
    }

    if (entity.hasFeature(FeatureFlag.AUDIT_LOG)) {
      lines.push("  createdAt DateTime @default(now())");
      lines.push("  updatedAt DateTime @updatedAt");
    }

    const relationFields = entity.getRelationFields();
    const indexFields: string[] = [];
    for (const field of relationFields) {
      if (field.options.targetEntity && field.options.relationType) {
        lines.push(...this.generateRelation(field));
        if (
          field.options.relationType === RelationType.MANY_TO_ONE ||
          field.options.relationType === RelationType.ONE_TO_ONE
        ) {
          indexFields.push(`${field.name}Id`);
        }
      }
    }

    if (indexFields.length > 0) {
      lines.push(`  @@index([${indexFields.join(", ")}])`);
    }

    lines.push(
      `  @@map("${entity.options.tableName ?? entity.name.toLowerCase()}")`,
    );

    lines.push("}");
    return lines;
  }

  private mapFieldToPrisma(field: Field): string {
    const parts: string[] = [field.name];

    switch (field.type) {
      case FieldType.UUID:
        parts.push("String @id @default(uuid())");
        break;
      case FieldType.STRING:
        parts.push("String");
        break;
      case FieldType.TEXT:
        parts.push("String");
        break;
      case FieldType.INTEGER:
        parts.push("Int");
        break;
      case FieldType.BIGINT:
        parts.push("BigInt");
        break;
      case FieldType.DECIMAL:
        parts.push("Decimal");
        break;
      case FieldType.FLOAT:
        parts.push("Float");
        break;
      case FieldType.BOOLEAN:
        parts.push("Boolean");
        break;
      case FieldType.DATE:
        parts.push("DateTime @db.Date");
        break;
      case FieldType.DATETIME:
        parts.push("DateTime");
        break;
      case FieldType.TIMESTAMP:
        parts.push("DateTime @db.Timestamp()");
        break;
      case FieldType.JSON:
        parts.push("Json");
        break;
      case FieldType.JSONB:
        parts.push("Json @db.JsonB");
        break;
      case FieldType.ENUM:
        const values = (field.options as Record<string, unknown>)
          .enumValues as string[];
        parts.push(values ? values.join(" | ") : "String");
        break;
      case FieldType.RELATION:
        parts.push("String");
        break;
      default:
        parts.push("String");
    }

    if (field.options.unique) parts.push("@unique");
    if (field.options.indexed) parts.push("@index");
    if (field.options.default !== undefined) {
      const def =
        typeof field.options.default === "string"
          ? `"${field.options.default}"`
          : String(field.options.default);
      parts.push(`@default(${def})`);
    }
    if (field.options.nullable) {
      parts[0] = parts[0].replace(/\s+$/, "") + "?";
    }

    return parts.join(" ");
  }

  private generateEventModel(): string[] {
    return [
      "model Event {",
      "  id           String   @id @default(uuid())",
      "  type         String",
      "  aggregateId  String",
      "  aggregateType String",
      "  payload      Json",
      "  timestamp    DateTime @default(now())",
      "  version      Int      @default(1)",
      "  @@index([aggregateId])",
      '  @@map("events")',
      "}",
    ];
  }

  private generateRelation(field: Field): string[] {
    const target = field.options.targetEntity!;
    const relationType = field.options.relationType!;
    const lines: string[] = [];

    switch (relationType) {
      case RelationType.MANY_TO_ONE:
        lines.push(
          `  ${field.name} ${target} @relation(fields: [${field.name}Id], references: [id])`,
        );
        lines.push(`  ${field.name}Id String`);
        break;
      case RelationType.ONE_TO_MANY:
        lines.push(`  ${field.name} ${target}[]`);
        break;
      case RelationType.ONE_TO_ONE:
        lines.push(
          `  ${field.name} ${target}? @relation(fields: [${field.name}Id], references: [id])`,
        );
        lines.push(`  ${field.name}Id String? @unique`);
        break;
      case RelationType.MANY_TO_MANY:
        lines.push(`  ${field.name} ${target}[]`);
        break;
    }

    return lines;
  }

  private generateSeedScript(project: Project): string {
    const lines: string[] = [
      "import { PrismaClient } from '@prisma/client';",
      "import bcrypt from 'bcryptjs';",
      "",
      "const prisma = new PrismaClient();",
      "",
      "async function main() {",
      `  console.log('Seeding ${project.name}...');`,
      "",
    ];

    for (const entity of project.options.entities) {
      const isUserEntity = entity.name.toLowerCase() === "user";
      const fields = entity.fields
        .map((f) => {
          if (isUserEntity && f.name === "password") {
            return `      ${f.name}: await bcrypt.hash('password123', 10)`;
          }
          switch (f.type) {
            case "UUID":
              return `      ${f.name}: crypto.randomUUID()`;
            case "STRING":
            case "TEXT":
              return `      ${f.name}: 'Sample ${f.name}'`;
            case "INTEGER":
            case "BIGINT":
              return `      ${f.name}: 1`;
            case "DECIMAL":
            case "FLOAT":
              return `      ${f.name}: 99.99`;
            case "BOOLEAN":
              return `      ${f.name}: true`;
            case "DATE":
            case "DATETIME":
            case "TIMESTAMP":
              return `      ${f.name}: new Date()`;
            case "JSON":
            case "JSONB":
              return `      ${f.name}: { key: 'value' }`;
            case "ENUM":
              return `      ${f.name}: 'OPTION_A'`;
            case "ARRAY":
              return `      ${f.name}: ['item1', 'item2']`;
            case "BLOB":
              return `      ${f.name}: Buffer.from('sample')`;
            case "RELATION":
              return null;
            default:
              return `      ${f.name}: null`;
          }
        })
        .filter(Boolean);

      lines.push(`  // Seed ${entity.name}`);
      lines.push(`  await prisma.${entity.name.toLowerCase()}.create({`);
      lines.push(`    data: {`);
      lines.push(fields.join(",\n"));
      lines.push(`    },`);
      lines.push(`  });`);
      lines.push("");
    }

    lines.push("");
    lines.push('  console.log("Seed completed.");');
    lines.push("}");
    lines.push("");
    lines.push("main()");
    lines.push("  .catch((e) => { console.error(e); process.exit(1); })");
    lines.push("  .finally(async () => await prisma.$disconnect());");

    return lines.join("\n");
  }
}
