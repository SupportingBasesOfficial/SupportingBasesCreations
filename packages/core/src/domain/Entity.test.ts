import { describe, it, expect } from 'vitest';
import { Entity } from './Entity.js';
import { Field } from './Field.js';
import { FeatureFlag, FieldType, RelationType } from './enums.js';

describe('Entity', () => {
  it('should create with defaults', () => {
    const entity = new Entity('User', [Field.uuid('id')]);
    expect(entity.name).toBe('User');
    expect(entity.options.tableName).toBe('user');
    expect(entity.options.features).toHaveLength(0);
  });

  it('should validate PascalCase name', () => {
    const entity = new Entity('user', [Field.uuid('id')]);
    const result = entity.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'ENTITY_NAME_INVALID')).toBe(true);
  });

  it('should require at least one field', () => {
    const entity = new Entity('User', []);
    const result = entity.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'ENTITY_NO_FIELDS')).toBe(true);
  });

  it('should detect duplicate fields', () => {
    const entity = new Entity('User', [
      Field.uuid('id'),
      Field.string('id'),
    ]);
    const result = entity.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'ENTITY_DUPLICATE_FIELD')).toBe(true);
  });

  it('should validate field errors propagate', () => {
    const entity = new Entity('User', [
      new Field('', FieldType.STRING),
    ]);
    const result = entity.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.path.startsWith('fields.'))).toBe(true);
  });

  it('should enforce soft delete field', () => {
    const entity = new Entity('User', [
      Field.uuid('id'),
    ], {
      features: [FeatureFlag.AUDIT_LOG, FeatureFlag.SOFT_DELETE],
    });
    const result = entity.validate();
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'ENTITY_SOFT_DELETE_MISSING_FIELD')).toBe(true);
  });

  it('should add and remove fields immutably', () => {
    const entity = new Entity('User', [Field.uuid('id')]);
    const updated = entity.addField(Field.string('email'));
    expect(updated.fields).toHaveLength(2);
    expect(entity.fields).toHaveLength(1);

    const removed = updated.removeField('email');
    expect(removed.fields).toHaveLength(1);
  });

  it('should get field by name', () => {
    const entity = new Entity('User', [Field.uuid('id')]);
    expect(entity.getField('id')).toBeDefined();
    expect(entity.getField('missing')).toBeUndefined();
  });

  it('should track features', () => {
    const entity = new Entity('User', [Field.uuid('id')]);
    expect(entity.hasFeature(FeatureFlag.AUTH)).toBe(false);

    const enabled = entity.enableFeature(FeatureFlag.AUTH);
    expect(enabled.hasFeature(FeatureFlag.AUTH)).toBe(true);

    const disabled = enabled.disableFeature(FeatureFlag.AUTH);
    expect(disabled.hasFeature(FeatureFlag.AUTH)).toBe(false);
  });

  it('should get primary field', () => {
    const entity = new Entity('User', [
      Field.uuid('id'),
      Field.string('email'),
    ]);
    expect(entity.getPrimaryField()?.name).toBe('id');
  });

  it('should get relation fields', () => {
    const entity = new Entity('User', [
      Field.uuid('id'),
      Field.relation('org', 'Organization', RelationType.MANY_TO_ONE),
    ]);
    expect(entity.getRelationFields()).toHaveLength(1);
  });

  it('should get required fields', () => {
    const entity = new Entity('User', [
      Field.uuid('id'),
      Field.string('email').nullable(),
    ]);
    expect(entity.getRequiredFields()).toHaveLength(1);
  });
});
