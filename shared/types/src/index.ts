export type UUID = string;

export interface Identifiable {
  id: UUID;
}

export interface Named {
  name: string;
}

export interface Described {
  description?: string;
}

export interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

export interface Validatable<T> {
  validate(): ValidationResult<T>;
}

export interface ValidationResult<T> {
  valid: boolean;
  errors: ValidationError[];
  data?: T;
}

export interface ValidationError {
  path: string;
  message: string;
  code: string;
}

export interface Configurable {
  toConfig(): Record<string, unknown>;
}

export interface Generatable {
  generate(): Promise<GeneratedArtifact[]>;
}

export interface GeneratedArtifact {
  path: string;
  content: string;
  language: string;
  metadata?: Record<string, unknown>;
}

export interface DependencyAware {
  dependencies(): string[];
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
