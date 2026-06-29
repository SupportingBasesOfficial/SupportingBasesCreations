import { describe, it, expect } from 'vitest';
import { Field } from './Field.js';
import { FieldType, RelationType } from './enums.js';

describe('Field', () => {
  it('should require name', () => {
    const field = new Field('', FieldType.STRING);
    const result = field.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'FIELD_NAME_REQUIRED')).toBe(true);
  });

  it('should validate name format', () => {
    const field = new Field('123bad', FieldType.STRING);
    const result = field.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'FIELD_NAME_INVALID')).toBe(true);
  });

  it('should require enum values', () => {
    const field = new Field('role', FieldType.ENUM);
    const result = field.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'ENUM_VALUES_REQUIRED')).toBe(true);
  });

  it('should require relation target', () => {
    const field = new Field('user', FieldType.RELATION);
    const result = field.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'TARGET_ENTITY_REQUIRED')).toBe(true);
    expect(result.errors.some((e) => e.code === 'RELATION_TYPE_REQUIRED')).toBe(true);
  });

  it('should pass for valid field', () => {
    const field = new Field('email', FieldType.STRING, { nullable: false, unique: true });
    const result = field.validate();
    expect(result.valid).toBe(true);
  });

  it('should build fluent API correctly', () => {
    const f1 = Field.string('name').required().unique();
    expect(f1.options.nullable).toBe(false);
    expect(f1.options.unique).toBe(true);

    const f2 = Field.string('bio').nullable();
    expect(f2.options.nullable).toBe(true);

    const f3 = Field.uuid('id').primary();
    expect(f3.options.unique).toBe(true);
    expect(f3.options.nullable).toBe(false);

    const f4 = Field.string('slug').indexed().default('draft');
    expect(f4.options.indexed).toBe(true);
    expect(f4.options.default).toBe('draft');
  });

  it('should detect relations', () => {
    const rel = Field.relation('org', 'Organization', RelationType.MANY_TO_ONE);
    expect(rel.isRelation()).toBe(true);
    expect(rel.isRequired()).toBe(true);
  });

  it('should store enum values', () => {
    const field = Field.enum('role', ['ADMIN', 'USER']);
    expect((field.options as any).enumValues).toEqual(['ADMIN', 'USER']);
  });
});
