import { useState, useCallback } from 'react';

export interface ProjectConfig {
  name: string;
  description: string;
  architecture: string;
  features: string[];
  entities: EntityConfig[];
  providers: string[];
}

export interface EntityConfig {
  id: string;
  name: string;
  fields: FieldConfig[];
  features: string[];
}

export interface FieldConfig {
  id: string;
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  nullable: boolean;
}

const defaultConfig: ProjectConfig = {
  name: 'my-enterprise-app',
  description: '',
  architecture: 'modular-monolith',
  features: ['AUTH'],
  entities: [
    {
      id: '1',
      name: 'User',
      fields: [
        { id: '1', name: 'id', type: 'uuid', required: true, unique: true, nullable: false },
        { id: '2', name: 'email', type: 'string', required: true, unique: true, nullable: false },
        { id: '3', name: 'name', type: 'string', required: true, unique: false, nullable: false },
      ],
      features: ['AUTH', 'AUDIT_LOG'],
    },
  ],
  providers: ['oauth-google', 'stripe', 'sentry'],
};

export function useProjectStore() {
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);

  const setName = useCallback((name: string) => {
    setConfig((prev) => ({ ...prev, name }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setConfig((prev) => ({ ...prev, description }));
  }, []);

  const setArchitecture = useCallback((architecture: string) => {
    setConfig((prev) => ({ ...prev, architecture }));
  }, []);

  const toggleFeature = useCallback((feature: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  }, []);

  const addEntity = useCallback((entity: EntityConfig) => {
    setConfig((prev) => ({ ...prev, entities: [...prev.entities, entity] }));
  }, []);

  const removeEntity = useCallback((id: string) => {
    setConfig((prev) => ({ ...prev, entities: prev.entities.filter((e) => e.id !== id) }));
  }, []);

  const addField = useCallback((entityId: string, field: FieldConfig) => {
    setConfig((prev) => ({
      ...prev,
      entities: prev.entities.map((e) =>
        e.id === entityId ? { ...e, fields: [...e.fields, field] } : e
      ),
    }));
  }, []);

  const toggleProvider = useCallback((provider: string) => {
    setConfig((prev) => ({
      ...prev,
      providers: prev.providers.includes(provider)
        ? prev.providers.filter((p) => p !== provider)
        : [...prev.providers, provider],
    }));
  }, []);

  return {
    config,
    setName,
    setDescription,
    setArchitecture,
    toggleFeature,
    addEntity,
    removeEntity,
    addField,
    toggleProvider,
  };
}
