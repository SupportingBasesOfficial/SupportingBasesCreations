import { ServiceType } from "./enums.js";
import type {
  Named,
  Validatable,
  Configurable,
  ValidationResult,
} from "@sbc/shared";

export interface ServiceOptions {
  description?: string;
  endpoints?: string[];
  events?: string[];
  providers?: string[];
  async?: boolean;
  requiresAuth?: boolean;
  rateLimited?: boolean;
}

export class Service implements Named, Validatable<Service>, Configurable {
  readonly name: string;
  readonly type: ServiceType;
  readonly options: Required<Omit<ServiceOptions, "description">> &
    Pick<ServiceOptions, "description">;

  constructor(name: string, type: ServiceType, options: ServiceOptions = {}) {
    this.name = name;
    this.type = type;
    this.options = {
      description: options.description,
      endpoints: options.endpoints ?? [],
      events: options.events ?? [],
      providers: options.providers ?? [],
      async: options.async ?? false,
      requiresAuth: options.requiresAuth ?? true,
      rateLimited: options.rateLimited ?? false,
    };
  }

  addEndpoint(path: string): Service {
    return new Service(this.name, this.type, {
      ...this.options,
      endpoints: [...this.options.endpoints, path],
    });
  }

  addEvent(event: string): Service {
    return new Service(this.name, this.type, {
      ...this.options,
      events: [...this.options.events, event],
    });
  }

  addProvider(provider: string): Service {
    return new Service(this.name, this.type, {
      ...this.options,
      providers: [...this.options.providers, provider],
    });
  }

  requiresAuthentication(): boolean {
    return this.options.requiresAuth;
  }

  isAsync(): boolean {
    return (
      this.options.async ||
      [ServiceType.ASYNC, ServiceType.EVENT_DRIVEN, ServiceType.BATCH].includes(
        this.type,
      )
    );
  }

  validate(): ValidationResult<Service> {
    const errors: Array<{ path: string; message: string; code: string }> = [];

    if (!this.name || this.name.trim().length === 0) {
      errors.push({
        path: "name",
        message: "Nome do serviço é obrigatório",
        code: "SERVICE_NAME_REQUIRED",
      });
    }

    if (!/^[a-z][a-zA-Z0-9]*$/.test(this.name)) {
      errors.push({
        path: "name",
        message: "O nome do serviço deve estar em camelCase",
        code: "SERVICE_NAME_INVALID",
      });
    }

    if (
      this.type === ServiceType.EVENT_DRIVEN &&
      this.options.events.length === 0
    ) {
      errors.push({
        path: "events",
        message:
          "Serviço orientado a eventos deve definir pelo menos um evento",
        code: "SERVICE_EVENTS_REQUIRED",
      });
    }

    if (this.type === ServiceType.SYNC && this.options.async) {
      errors.push({
        path: "type",
        message: "Serviço síncrono não pode ser marcado como assíncrono",
        code: "SERVICE_TYPE_CONFLICT",
      });
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
}
