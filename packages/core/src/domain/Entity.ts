import { Field } from './Field.js';
import { FeatureFlag } from './enums.js';
import type { Named, Validatable, Configurable, ValidationResult } from '@sbc/shared';

export interface EntityOptions {
  description?: string;
  tableName?: string;
  features?: FeatureFlag[];
  audited?: boolean;
  softDelete?: boolean;
}

export class Entity implements Named, Validatable<Entity>, Configurable {
  readonly name: string;
  readonly fields: Field[];
  readonly options: Required<Omit<EntityOptions, 'description'>> & Pick<EntityOptions, 'description'>;

  constructor(name: string, fields: Field[] = [], options: EntityOptions = {}) {
    this.name = name;
    this.fields = fields;
    this.options = {
      description: options.description,
      tableName: options.tableName ?? name.toLowerCase(),
      features: options.features ?? [],
      audited: options.audited ?? false,
      softDelete: options.softDelete ?? false,
    };
  }

  addField(field: Field): Entity {
    return new Entity(this.name, [...this.fields, field], this.options);
  }

  removeField(fieldName: string): Entity {
    return new Entity(
      this.name,
      this.fields.filter((f) => f.name !== fieldName),
      this.options
    );
  }

  getField(name: string): Field | undefined {
    return this.fields.find((f) => f.name === name);
  }

  hasField(name: string): boolean {
    return this.fields.some((f) => f.name === name);
  }

  getPrimaryField(): Field | undefined {
    return this.fields.find((f) => f.type === 'UUID' && f.name === 'id');
  }

  getRelationFields(): Field[] {
    return this.fields.filter((f) => f.isRelation());
  }

  getRequiredFields(): Field[] {
    return this.fields.filter((f) => f.isRequired());
  }

  enableFeature(feature: FeatureFlag): Entity {
    if (this.options.features.includes(feature)) return this;
    return new Entity(this.name, this.fields, {
      ...this.options,
      features: [...this.options.features, feature],
    });
  }

  disableFeature(feature: FeatureFlag): Entity {
    return new Entity(this.name, this.fields, {
      ...this.options,
      features: this.options.features.filter((f) => f !== feature),
    });
  }

  hasFeature(feature: FeatureFlag): boolean {
    return this.options.features.includes(feature);
  }

  validate(): ValidationResult<Entity> {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push({ path: 'name', message: 'Entity name is required', code: 'ENTITY_NAME_REQUIRED' });
    }

    if (!/^[A-Z][a-zA-Z0-9]*$/.test(this.name)) {
      errors.push({ path: 'name', message: 'Entity name must be PascalCase', code: 'ENTITY_NAME_INVALID' });
    }

    if (this.fields.length === 0) {
      errors.push({ path: 'fields', message: 'Entity must have at least one field', code: 'ENTITY_NO_FIELDS' });
    }

    const fieldNames = new Set<string>();
    for (const field of this.fields) {
      if (fieldNames.has(field.name)) {
        errors.push({ path: `fields.${field.name}`, message: `Duplicate field name: ${field.name}`, code: 'ENTITY_DUPLICATE_FIELD' });
      }
      fieldNames.add(field.name);

      const fieldValidation = field.validate();
      if (!fieldValidation.valid) {
        errors.push(...fieldValidation.errors.map((e: { path: string; message: string; code: string }) => ({
          path: `fields.${field.name}.${e.path}`,
          message: e.message,
          code: e.code,
        })));
      }
    }

    if (this.hasFeature(FeatureFlag.AUDIT_LOG) && this.hasFeature(FeatureFlag.SOFT_DELETE)) {
      const hasDeletedAt = this.fields.some((f) => f.name === 'deletedAt');
      if (!hasDeletedAt) {
        errors.push({
          path: 'features',
          message: 'Soft delete requires a deletedAt field',
          code: 'ENTITY_SOFT_DELETE_MISSING_FIELD',
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      data: errors.length === 0 ? this : undefined,
    };
  }

  toConfig(): Record<string, unknown> {
    return {
      name: this.name,
      fields: this.fields.map((f) => f.toConfig()),
      options: this.options,
    };
  }
}
