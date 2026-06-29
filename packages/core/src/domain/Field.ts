import { z } from 'zod';
import { FieldType, RelationType } from './enums.js';
import type { Named, Validatable, Configurable, ValidationResult } from '@sbc/shared';

export interface FieldOptions {
  nullable?: boolean;
  unique?: boolean;
  indexed?: boolean;
  default?: unknown;
  validators?: z.ZodType<unknown>[];
  relationType?: RelationType;
  targetEntity?: string;
}

export class Field implements Named, Validatable<Field>, Configurable {
  readonly name: string;
  readonly type: FieldType;
  readonly options: FieldOptions & { enumValues?: string[] };

  constructor(name: string, type: FieldType, options: FieldOptions = {}) {
    this.name = name;
    this.type = type;
    this.options = {
      nullable: false,
      unique: false,
      indexed: false,
      default: undefined,
      validators: [],
      relationType: undefined,
      targetEntity: undefined,
      ...options,
    };
  }

  static uuid(name: string): Field {
    return new Field(name, FieldType.UUID, { nullable: false });
  }

  static string(name: string): Field {
    return new Field(name, FieldType.STRING);
  }

  static text(name: string): Field {
    return new Field(name, FieldType.TEXT);
  }

  static integer(name: string): Field {
    return new Field(name, FieldType.INTEGER);
  }

  static bigint(name: string): Field {
    return new Field(name, FieldType.BIGINT);
  }

  static decimal(name: string): Field {
    return new Field(name, FieldType.DECIMAL);
  }

  static boolean(name: string): Field {
    return new Field(name, FieldType.BOOLEAN);
  }

  static date(name: string): Field {
    return new Field(name, FieldType.DATE);
  }

  static datetime(name: string): Field {
    return new Field(name, FieldType.DATETIME);
  }

  static json(name: string): Field {
    return new Field(name, FieldType.JSON);
  }

  static enum(name: string, values: string[]): Field {
    const field = new Field(name, FieldType.ENUM);
    (field.options as Record<string, unknown>).enumValues = values;
    return field;
  }

  static relation(name: string, targetEntity: string, relationType: RelationType): Field {
    return new Field(name, FieldType.RELATION, {
      targetEntity,
      relationType,
    });
  }

  required(): Field {
    return new Field(this.name, this.type, { ...this.options, nullable: false });
  }

  nullable(): Field {
    return new Field(this.name, this.type, { ...this.options, nullable: true });
  }

  unique(): Field {
    return new Field(this.name, this.type, { ...this.options, unique: true });
  }

  primary(): Field {
    return new Field(this.name, this.type, { ...this.options, unique: true, nullable: false });
  }

  indexed(): Field {
    return new Field(this.name, this.type, { ...this.options, indexed: true });
  }

  default(value: unknown): Field {
    return new Field(this.name, this.type, { ...this.options, default: value });
  }

  validate(): ValidationResult<Field> {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push({ path: 'name', message: 'Field name is required', code: 'FIELD_NAME_REQUIRED' });
    }

    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(this.name)) {
      errors.push({ path: 'name', message: 'Field name must be a valid identifier', code: 'FIELD_NAME_INVALID' });
    }

    if (this.type === FieldType.ENUM) {
      const enumValues = (this.options as Record<string, unknown>).enumValues as string[] | undefined;
      if (!enumValues || enumValues.length === 0) {
        errors.push({ path: 'options.enumValues', message: 'Enum field must have values', code: 'ENUM_VALUES_REQUIRED' });
      }
    }

    if (this.type === FieldType.RELATION) {
      if (!this.options.targetEntity) {
        errors.push({ path: 'options.targetEntity', message: 'Relation field must specify target entity', code: 'TARGET_ENTITY_REQUIRED' });
      }
      if (!this.options.relationType) {
        errors.push({ path: 'options.relationType', message: 'Relation field must specify relation type', code: 'RELATION_TYPE_REQUIRED' });
      }
    }

    for (const validator of this.options.validators ?? []) {
      const result = validator.safeParse(undefined);
      if (!result.success) {
        errors.push({ path: 'validators', message: 'Custom validator failed', code: 'VALIDATOR_FAILED' });
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
      type: this.type,
      options: this.options,
    };
  }

  isRelation(): boolean {
    return this.type === FieldType.RELATION;
  }

  isRequired(): boolean {
    return !this.options.nullable;
  }
}
