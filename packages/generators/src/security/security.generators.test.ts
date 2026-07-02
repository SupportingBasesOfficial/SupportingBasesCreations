import { describe, it, expect } from "vitest";
import { SecurityHardeningGenerator } from "../security/SecurityHardeningGenerator.js";
import { EncryptionGenerator } from "../security/EncryptionGenerator.js";
import { SecurityChaosGenerator } from "../security/SecurityChaosGenerator.js";
import { ThreatIntelligenceGenerator } from "../security/ThreatIntelligenceGenerator.js";
import { ConfidentialComputingGenerator } from "../security/ConfidentialComputingGenerator.js";
import { SIEMGenerator } from "../security/SIEMGenerator.js";
import { SecurityAuditGenerator } from "../security/SecurityAuditGenerator.js";
import type { GenerationContext } from "@sbc/core";
import { Project, ArchitectureType, CacheType, QueueType, CloudProvider, Containerization, Orchestration, DatabaseType } from "@sbc/core";

function makeContext(): GenerationContext {
  const project = new Project("test-app", {
    architecture: ArchitectureType.MODULAR_MONOLITH,
    entities: [],
    services: [],
    providers: [],
    infrastructure: {
      cloud: CloudProvider.VERCEL,
      containerization: Containerization.NONE,
      orchestration: Orchestration.NONE,
      database: DatabaseType.POSTGRESQL,
      cache: CacheType.REDIS,
      queue: QueueType.NONE,
    },
  });
  return { project, outputDir: "/tmp/test" };
}

describe("Security Generators Smoke Tests", () => {
  it("SecurityAuditGenerator produces artifacts", async () => {
    const gen = new SecurityAuditGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(0);
    expect(artifacts.some((a) => a.path.includes("security.yml"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("semgrep"))).toBe(true);
  });

  it("SecurityHardeningGenerator produces artifacts", async () => {
    const gen = new SecurityHardeningGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(5);
    expect(artifacts.some((a) => a.path.includes("InputValidator"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("ErrorSanitizer"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("ZeroTrust"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("SecurityHeaders"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("middleware.ts"))).toBe(true);
  });

  it("EncryptionGenerator produces artifacts", async () => {
    const gen = new EncryptionGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(2);
    expect(artifacts.some((a) => a.path.includes("Encryption.ts"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("KeyManager"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("PQC"))).toBe(true);
  });

  it("SecurityChaosGenerator produces artifacts", async () => {
    const gen = new SecurityChaosGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(2);
    expect(artifacts.some((a) => a.path.includes("chaos"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("attack-injection"))).toBe(true);
  });

  it("ThreatIntelligenceGenerator produces artifacts", async () => {
    const gen = new ThreatIntelligenceGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(3);
    expect(artifacts.some((a) => a.path.includes("ThreatDetector"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("AnomalyDetector"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("RedTeam"))).toBe(true);
  });

  it("ConfidentialComputingGenerator produces artifacts", async () => {
    const gen = new ConfidentialComputingGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(2);
    expect(artifacts.some((a) => a.path.includes("ConfidentialEnclave"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("AttestationVerifier"))).toBe(true);
  });

  it("SIEMGenerator produces artifacts", async () => {
    const gen = new SIEMGenerator();
    const artifacts = await gen.generate(makeContext());
    expect(artifacts.length).toBeGreaterThan(3);
    expect(artifacts.some((a) => a.path.includes("AuditLogger"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("SIEMConnector"))).toBe(true);
    expect(artifacts.some((a) => a.path.includes("SOAR"))).toBe(true);
  });

  it("no generator produces vercel.json", async () => {
    const gens = [
      new SecurityAuditGenerator(),
      new SecurityHardeningGenerator(),
      new EncryptionGenerator(),
      new SecurityChaosGenerator(),
      new ThreatIntelligenceGenerator(),
      new ConfidentialComputingGenerator(),
      new SIEMGenerator(),
    ];
    for (const gen of gens) {
      const artifacts = await gen.generate(makeContext());
      expect(artifacts.some((a) => a.path === "vercel.json")).toBe(false);
    }
  });
});
