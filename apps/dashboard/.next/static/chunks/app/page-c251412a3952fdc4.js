(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [931],
  {
    5808: function (e) {
      function t(e) {
        return Promise.resolve().then(function () {
          var t = Error("Cannot find module '" + e + "'");
          throw ((t.code = "MODULE_NOT_FOUND"), t);
        });
      }
      ((t.keys = function () {
        return [];
      }),
        (t.resolve = t),
        (t.id = 5808),
        (e.exports = t));
    },
    9827: function () {},
    2085: function () {},
    2642: function () {},
    559: function () {},
    8161: function (e, t, s) {
      Promise.resolve().then(s.bind(s, 2096));
    },
    2096: function (e, t, s) {
      "use strict";
      (s.r(t),
        s.d(t, {
          default: function () {
            return ti;
          },
        }));
      var r,
        a,
        i,
        n,
        o,
        l,
        d,
        c,
        u,
        h,
        p,
        m,
        g,
        f,
        E,
        N,
        v,
        y,
        x,
        b,
        A,
        T,
        S,
        O,
        I,
        C,
        w,
        R,
        j,
        D,
        _,
        M,
        L,
        P,
        U,
        k,
        F,
        B,
        G,
        H,
        V = s(1514),
        Z = s(7993),
        Y = s(3972),
        K = s(9877);
      s(247);
      var z = s(5252);
      (((r = A || (A = {})).MONOLITH = "MONOLITH"),
        (r.MICROSERVICES = "MICROSERVICES"),
        (r.SERVERLESS = "SERVERLESS"),
        (r.MODULAR_MONOLITH = "MODULAR_MONOLITH"),
        ((a = T || (T = {})).NEXTJS = "NEXTJS"),
        (a.REACT = "REACT"),
        (a.VUE = "VUE"),
        (a.NUXT = "NUXT"),
        (a.ASTRO = "ASTRO"),
        (a.SVELTE = "SVELTE"),
        (a.SVELTEKIT = "SVELTEKIT"),
        ((i = S || (S = {})).NESTJS = "NESTJS"),
        (i.EXPRESS = "EXPRESS"),
        (i.FASTIFY = "FASTIFY"),
        (i.TRPC = "TRPC"),
        (i.GRAPHQL = "GRAPHQL"),
        (i.GRPC = "GRPC"),
        ((n = O || (O = {})).POSTGRESQL = "POSTGRESQL"),
        (n.MYSQL = "MYSQL"),
        (n.MONGODB = "MONGODB"),
        (n.DYNAMODB = "DYNAMODB"),
        (n.COCKROACHDB = "COCKROACHDB"),
        (n.SQLITE = "SQLITE"),
        ((o = I || (I = {})).REDIS = "REDIS"),
        (o.MEMCACHED = "MEMCACHED"),
        (o.NONE = "NONE"),
        ((l = C || (C = {})).RABBITMQ = "RABBITMQ"),
        (l.KAFKA = "KAFKA"),
        (l.SQS = "SQS"),
        (l.NONE = "NONE"),
        ((d = w || (w = {})).AWS = "AWS"),
        (d.GCP = "GCP"),
        (d.AZURE = "AZURE"),
        (d.DIGITAL_OCEAN = "DIGITAL_OCEAN"),
        (d.VERCEL = "VERCEL"),
        ((c = R || (R = {})).DOCKER = "DOCKER"),
        (c.PODMAN = "PODMAN"),
        (c.NONE = "NONE"),
        ((u = j || (j = {})).KUBERNETES = "KUBERNETES"),
        (u.DOCKER_SWARM = "DOCKER_SWARM"),
        (u.ECS = "ECS"),
        (u.FARGATE = "FARGATE"),
        (u.NONE = "NONE"),
        ((h = D || (D = {})).TAILWIND = "TAILWIND"),
        (h.CSS_MODULES = "CSS_MODULES"),
        (h.STYLED_COMPONENTS = "STYLED_COMPONENTS"),
        (h.SCSS = "SCSS"),
        (h.VANILLA_EXTRACT = "VANILLA_EXTRACT"),
        ((p = _ || (_ = {})).SHADCN = "SHADCN"),
        (p.MUI = "MUI"),
        (p.CHAKRA = "CHAKRA"),
        (p.ANTD = "ANTD"),
        (p.HEADLESS = "HEADLESS"),
        ((m = M || (M = {})).UNIT = "UNIT"),
        (m.INTEGRATION = "INTEGRATION"),
        (m.E2E = "E2E"),
        (m.CONTRACT = "CONTRACT"),
        (m.PERFORMANCE = "PERFORMANCE"),
        (m.SECURITY = "SECURITY"),
        ((g = L || (L = {})).ESLINT = "ESLINT"),
        (g.PRETTIER = "PRETTIER"),
        (g.COMMITLINT = "COMMITLINT"),
        (g.STYLELINT = "STYLELINT"),
        ((f = P || (P = {})).DEPENDABOT = "DEPENDABOT"),
        (f.SNYK = "SNYK"),
        (f.SEMGREP = "SEMGREP"),
        (f.SONARQUBE = "SONARQUBE"),
        ((E = U || (U = {})).API = "API"),
        (E.ARCHITECTURE = "ARCHITECTURE"),
        (E.RUNBOOK = "RUNBOOK"),
        (E.ADR = "ADR"),
        (E.README = "README"),
        ((N = k || (k = {})).AUTH = "AUTH"),
        (N.AUTH_SSO = "AUTH_SSO"),
        (N.AUTH_MFA = "AUTH_MFA"),
        (N.BILLING = "BILLING"),
        (N.BILLING_USAGE_BASED = "BILLING_USAGE_BASED"),
        (N.MULTI_TENANT = "MULTI_TENANT"),
        (N.AUDIT_LOG = "AUDIT_LOG"),
        (N.SOFT_DELETE = "SOFT_DELETE"),
        (N.ANALYTICS = "ANALYTICS"),
        (N.NOTIFICATIONS = "NOTIFICATIONS"),
        (N.SEARCH = "SEARCH"),
        (N.CDN = "CDN"),
        (N.RATE_LIMITING = "RATE_LIMITING"),
        (N.WEBHOOKS = "WEBHOOKS"),
        (N.WEBSOCKETS = "WEBSOCKETS"),
        (N.I18N = "I18N"),
        (N.ACCESSIBILITY = "ACCESSIBILITY"),
        ((v = F || (F = {})).UUID = "UUID"),
        (v.STRING = "STRING"),
        (v.TEXT = "TEXT"),
        (v.INTEGER = "INTEGER"),
        (v.BIGINT = "BIGINT"),
        (v.DECIMAL = "DECIMAL"),
        (v.FLOAT = "FLOAT"),
        (v.BOOLEAN = "BOOLEAN"),
        (v.DATE = "DATE"),
        (v.DATETIME = "DATETIME"),
        (v.TIMESTAMP = "TIMESTAMP"),
        (v.JSON = "JSON"),
        (v.JSONB = "JSONB"),
        (v.ENUM = "ENUM"),
        (v.ARRAY = "ARRAY"),
        (v.BLOB = "BLOB"),
        (v.RELATION = "RELATION"),
        ((y = B || (B = {})).ONE_TO_ONE = "ONE_TO_ONE"),
        (y.ONE_TO_MANY = "ONE_TO_MANY"),
        (y.MANY_TO_ONE = "MANY_TO_ONE"),
        (y.MANY_TO_MANY = "MANY_TO_MANY"),
        ((x = G || (G = {})).SYNC = "SYNC"),
        (x.ASYNC = "ASYNC"),
        (x.EVENT_DRIVEN = "EVENT_DRIVEN"),
        (x.BATCH = "BATCH"),
        (x.STREAMING = "STREAMING"));
      class J {
        static uuid(e) {
          return new J(e, F.UUID, { nullable: !1 });
        }
        static string(e) {
          return new J(e, F.STRING);
        }
        static text(e) {
          return new J(e, F.TEXT);
        }
        static integer(e) {
          return new J(e, F.INTEGER);
        }
        static bigint(e) {
          return new J(e, F.BIGINT);
        }
        static decimal(e) {
          return new J(e, F.DECIMAL);
        }
        static boolean(e) {
          return new J(e, F.BOOLEAN);
        }
        static date(e) {
          return new J(e, F.DATE);
        }
        static datetime(e) {
          return new J(e, F.DATETIME);
        }
        static json(e) {
          return new J(e, F.JSON);
        }
        static enum(e, t) {
          let s = new J(e, F.ENUM);
          return ((s.options.enumValues = t), s);
        }
        static relation(e, t, s) {
          return new J(e, F.RELATION, { targetEntity: t, relationType: s });
        }
        required() {
          return new J(this.name, this.type, { ...this.options, nullable: !1 });
        }
        nullable() {
          return new J(this.name, this.type, { ...this.options, nullable: !0 });
        }
        unique() {
          return new J(this.name, this.type, { ...this.options, unique: !0 });
        }
        primary() {
          return new J(this.name, this.type, {
            ...this.options,
            unique: !0,
            nullable: !1,
          });
        }
        indexed() {
          return new J(this.name, this.type, { ...this.options, indexed: !0 });
        }
        default(e) {
          return new J(this.name, this.type, { ...this.options, default: e });
        }
        validate() {
          var e;
          let t = [];
          if (
            ((this.name && 0 !== this.name.trim().length) ||
              t.push({
                path: "name",
                message: "Field name is required",
                code: "FIELD_NAME_REQUIRED",
              }),
            /^[a-zA-Z][a-zA-Z0-9_]*$/.test(this.name) ||
              t.push({
                path: "name",
                message: "Field name must be a valid identifier",
                code: "FIELD_NAME_INVALID",
              }),
            this.type === F.ENUM)
          ) {
            let e = this.options.enumValues;
            (e && 0 !== e.length) ||
              t.push({
                path: "options.enumValues",
                message: "Enum field must have values",
                code: "ENUM_VALUES_REQUIRED",
              });
          }
          for (let s of (this.type !== F.RELATION ||
            (this.options.targetEntity ||
              t.push({
                path: "options.targetEntity",
                message: "Relation field must specify target entity",
                code: "TARGET_ENTITY_REQUIRED",
              }),
            this.options.relationType ||
              t.push({
                path: "options.relationType",
                message: "Relation field must specify relation type",
                code: "RELATION_TYPE_REQUIRED",
              })),
          null !== (e = this.options.validators) && void 0 !== e ? e : []))
            s.safeParse(void 0).success ||
              t.push({
                path: "validators",
                message: "Custom validator failed",
                code: "VALIDATOR_FAILED",
              });
          return {
            valid: 0 === t.length,
            errors: t,
            data: 0 === t.length ? this : void 0,
          };
        }
        toConfig() {
          return { name: this.name, type: this.type, options: this.options };
        }
        isRelation() {
          return this.type === F.RELATION;
        }
        isRequired() {
          return !this.options.nullable;
        }
        constructor(e, t, s = {}) {
          ((this.name = e),
            (this.type = t),
            (this.options = {
              nullable: !1,
              unique: !1,
              indexed: !1,
              default: void 0,
              validators: [],
              relationType: void 0,
              targetEntity: void 0,
              ...s,
            }));
        }
      }
      class W {
        addField(e) {
          return new W(this.name, [...this.fields, e], this.options);
        }
        removeField(e) {
          return new W(
            this.name,
            this.fields.filter((t) => t.name !== e),
            this.options,
          );
        }
        getField(e) {
          return this.fields.find((t) => t.name === e);
        }
        hasField(e) {
          return this.fields.some((t) => t.name === e);
        }
        getPrimaryField() {
          return this.fields.find((e) => "UUID" === e.type && "id" === e.name);
        }
        getRelationFields() {
          return this.fields.filter((e) => e.isRelation());
        }
        getRequiredFields() {
          return this.fields.filter((e) => e.isRequired());
        }
        enableFeature(e) {
          return this.options.features.includes(e)
            ? this
            : new W(this.name, this.fields, {
                ...this.options,
                features: [...this.options.features, e],
              });
        }
        disableFeature(e) {
          return new W(this.name, this.fields, {
            ...this.options,
            features: this.options.features.filter((t) => t !== e),
          });
        }
        hasFeature(e) {
          return this.options.features.includes(e);
        }
        validate() {
          let e = [];
          ((this.name && 0 !== this.name.trim().length) ||
            e.push({
              path: "name",
              message: "Entity name is required",
              code: "ENTITY_NAME_REQUIRED",
            }),
            /^[A-Z][a-zA-Z0-9]*$/.test(this.name) ||
              e.push({
                path: "name",
                message: "Entity name must be PascalCase",
                code: "ENTITY_NAME_INVALID",
              }),
            0 === this.fields.length &&
              e.push({
                path: "fields",
                message: "Entity must have at least one field",
                code: "ENTITY_NO_FIELDS",
              }));
          let t = new Set();
          for (let s of this.fields) {
            (t.has(s.name) &&
              e.push({
                path: "fields.".concat(s.name),
                message: "Duplicate field name: ".concat(s.name),
                code: "ENTITY_DUPLICATE_FIELD",
              }),
              t.add(s.name));
            let r = s.validate();
            r.valid ||
              e.push(
                ...r.errors.map((e) => ({
                  path: "fields.".concat(s.name, ".").concat(e.path),
                  message: e.message,
                  code: e.code,
                })),
              );
          }
          return (
            this.hasFeature(k.AUDIT_LOG) &&
              this.hasFeature(k.SOFT_DELETE) &&
              !this.fields.some((e) => "deletedAt" === e.name) &&
              e.push({
                path: "features",
                message: "Soft delete requires a deletedAt field",
                code: "ENTITY_SOFT_DELETE_MISSING_FIELD",
              }),
            {
              valid: 0 === e.length,
              errors: e,
              data: 0 === e.length ? this : void 0,
            }
          );
        }
        toConfig() {
          return {
            name: this.name,
            fields: this.fields.map((e) => e.toConfig()),
            options: this.options,
          };
        }
        constructor(e, t = [], s = {}) {
          var r, a, i, n;
          ((this.name = e),
            (this.fields = t),
            (this.options = {
              description: s.description,
              tableName:
                null !== (r = s.tableName) && void 0 !== r
                  ? r
                  : e.toLowerCase(),
              features: null !== (a = s.features) && void 0 !== a ? a : [],
              audited: null !== (i = s.audited) && void 0 !== i && i,
              softDelete: null !== (n = s.softDelete) && void 0 !== n && n,
            }));
        }
      }
      class X {
        addEntity(e) {
          return new X(this.name, {
            ...this.options,
            entities: [...this.options.entities, e],
          });
        }
        removeEntity(e) {
          return new X(this.name, {
            ...this.options,
            entities: this.options.entities.filter((t) => t.name !== e),
          });
        }
        getEntity(e) {
          return this.options.entities.find((t) => t.name === e);
        }
        addService(e) {
          return new X(this.name, {
            ...this.options,
            services: [...this.options.services, e],
          });
        }
        removeService(e) {
          return new X(this.name, {
            ...this.options,
            services: this.options.services.filter((t) => t.name !== e),
          });
        }
        getService(e) {
          return this.options.services.find((t) => t.name === e);
        }
        enableFeature(e) {
          let t = this.options.entities.map((t) =>
            t.hasFeature(e) ? t : t.enableFeature(e),
          );
          return new X(this.name, { ...this.options, entities: t });
        }
        hasFeature(e) {
          return this.options.entities.some((t) => t.hasFeature(e));
        }
        dependencies() {
          let e = [];
          for (let t of (this.options.infrastructure.database ===
            O.POSTGRESQL && e.push("postgresql"),
          this.options.infrastructure.cache === I.REDIS && e.push("redis"),
          this.options.infrastructure.queue === C.RABBITMQ &&
            e.push("rabbitmq"),
          this.options.entities))
            (t.hasFeature(k.AUTH) && e.push("auth-provider"),
              t.hasFeature(k.BILLING) && e.push("payment-provider"),
              t.hasFeature(k.ANALYTICS) && e.push("analytics-provider"));
          return [...new Set(e)];
        }
        validate() {
          var e, t;
          let s = [];
          for (let e of ((this.name && 0 !== this.name.trim().length) ||
            s.push({
              path: "name",
              message: "Project name is required",
              code: "PROJECT_NAME_REQUIRED",
            }),
          /^[a-z][a-zA-Z0-9_-]*$/.test(this.name) ||
            s.push({
              path: "name",
              message: "Project name must be kebab-case or camelCase",
              code: "PROJECT_NAME_INVALID",
            }),
          0 === this.options.entities.length &&
            s.push({
              path: "entities",
              message: "Project must have at least one entity",
              code: "PROJECT_NO_ENTITIES",
            }),
          this.options.entities)) {
            let t = e.validate();
            t.valid ||
              s.push(
                ...t.errors.map((t) => ({
                  path: "entities.".concat(e.name, ".").concat(t.path),
                  message: t.message,
                  code: t.code,
                })),
              );
          }
          for (let e of this.options.services) {
            let t = e.validate();
            t.valid ||
              s.push(
                ...t.errors.map((t) => ({
                  path: "services.".concat(e.name, ".").concat(t.path),
                  message: t.message,
                  code: t.code,
                })),
              );
          }
          return (
            this.options.architecture === A.MICROSERVICES &&
              0 === this.options.services.length &&
              s.push({
                path: "services",
                message:
                  "Microservices architecture requires at least one service",
                code: "PROJECT_MICROSERVICES_NO_SERVICES",
              }),
            (null === (t = this.options.infrastructure) || void 0 === t
              ? void 0
              : null === (e = t.regions) || void 0 === e
                ? void 0
                : e.length) ||
              s.push({
                path: "infrastructure.regions",
                message: "At least one region must be specified",
                code: "PROJECT_NO_REGIONS",
              }),
            {
              valid: 0 === s.length,
              errors: s,
              data: 0 === s.length ? this : void 0,
            }
          );
        }
        toConfig() {
          return {
            name: this.name,
            version: this.options.version,
            description: this.options.description,
            architecture: this.options.architecture,
            regions: this.options.regions,
            entities: this.options.entities.map((e) => e.toConfig()),
            services: this.options.services.map((e) => e.toConfig()),
            frontend: this.options.frontend,
            infrastructure: this.options.infrastructure,
            quality: this.options.quality,
            dependencies: this.dependencies(),
          };
        }
        constructor(e, t = {}) {
          var s, r, a, i, n, o, l, d, c, u, h, p;
          ((this.name = e),
            (this.options = {
              description:
                null !== (s = t.description) && void 0 !== s ? s : "",
              architecture:
                null !== (r = t.architecture) && void 0 !== r
                  ? r
                  : A.MODULAR_MONOLITH,
              regions:
                null !== (a = t.regions) && void 0 !== a ? a : ["us-east-1"],
              entities: null !== (i = t.entities) && void 0 !== i ? i : [],
              services: null !== (n = t.services) && void 0 !== n ? n : [],
              providers: null !== (o = t.providers) && void 0 !== o ? o : [],
              frontend:
                null !== (l = t.frontend) && void 0 !== l
                  ? l
                  : {
                      framework: T.NEXTJS,
                      styling: D.TAILWIND,
                      components: _.SHADCN,
                      features: [],
                      pages: [],
                    },
              infrastructure:
                null !== (d = t.infrastructure) && void 0 !== d
                  ? d
                  : {
                      cloud: w.VERCEL,
                      containerization: R.NONE,
                      orchestration: j.NONE,
                      database: O.POSTGRESQL,
                      cache: I.REDIS,
                      queue: C.NONE,
                      cdn: !0,
                      regions: ["us-east-1"],
                    },
              quality:
                null !== (c = t.quality) && void 0 !== c
                  ? c
                  : {
                      testing: [M.UNIT, M.INTEGRATION],
                      linting: [L.ESLINT, L.PRETTIER],
                      security: [P.DEPENDABOT],
                      documentation: [U.README, U.API],
                    },
              version: null !== (u = t.version) && void 0 !== u ? u : "1.0.0",
              author: null !== (h = t.author) && void 0 !== h ? h : "",
              license: null !== (p = t.license) && void 0 !== p ? p : "MIT",
            }));
        }
      }
      class Q {
        register(e) {
          this.generators.set(e.name, e);
        }
        unregister(e) {
          this.generators.delete(e);
        }
        get(e) {
          return this.generators.get(e);
        }
        list() {
          return Array.from(this.generators.values());
        }
        resolveGenerators(e) {
          let t = [],
            s = new Set();
          for (let t of e.options.entities)
            for (let e of t.options.features) s.add(e);
          for (let r of this.generators.values()) {
            let a =
                0 === r.supportedArchitectures.length ||
                r.supportedArchitectures.includes(e.options.architecture),
              i =
                0 === r.supportedFeatures.length ||
                r.supportedFeatures.some((e) => s.has(e));
            a && i && t.push(r);
          }
          return t.sort((e, t) => e.name.localeCompare(t.name));
        }
        resolveByFeature(e) {
          return Array.from(this.generators.values()).filter((t) =>
            t.supportedFeatures.includes(e),
          );
        }
        clear() {
          this.generators.clear();
        }
        constructor() {
          this.generators = new Map();
        }
      }
      let q = {
        timeoutMs: 3e4,
        maxRetries: 2,
        retryDelayMs: 500,
        circuitBreakerThreshold: 5,
        circuitBreakerResetMs: 6e4,
        failFast: !1,
      };
      class $ {
        async generate(e) {
          let t;
          if (this.isCircuitOpen())
            throw Error(
              'Circuit breaker OPEN for generator "'.concat(
                this.name,
                '". Too many failures.',
              ),
            );
          for (let s = 0; s <= this.config.maxRetries; s++)
            try {
              let t = await this.withTimeout(
                this.generator.generate(e),
                this.config.timeoutMs,
              );
              return (this.onSuccess(), t);
            } catch (e) {
              ((t = e instanceof Error ? e : Error(String(e))),
                this.onFailure(),
                s < this.config.maxRetries &&
                  (await this.delay(
                    this.config.retryDelayMs * Math.pow(2, s),
                  )));
            }
          if (this.config.failFast) throw t;
          return [];
        }
        isCircuitOpen() {
          return (
            !!this.circuit.open &&
            (!(
              Date.now() - this.circuit.lastFailure >
              this.config.circuitBreakerResetMs
            ) ||
              ((this.circuit = { failures: 0, lastFailure: 0, open: !1 }), !1))
          );
        }
        onSuccess() {
          this.circuit = { failures: 0, lastFailure: 0, open: !1 };
        }
        onFailure() {
          (this.circuit.failures++,
            (this.circuit.lastFailure = Date.now()),
            this.circuit.failures >= this.config.circuitBreakerThreshold &&
              (this.circuit.open = !0));
        }
        withTimeout(e, t) {
          return new Promise((s, r) => {
            let a = setTimeout(() => {
              r(
                Error(
                  'Generator "'
                    .concat(this.name, '" timed out after ')
                    .concat(t, "ms"),
                ),
              );
            }, t);
            e.then((e) => {
              (clearTimeout(a), s(e));
            }).catch((e) => {
              (clearTimeout(a), r(e));
            });
          });
        }
        delay(e) {
          return new Promise((t) => setTimeout(t, e));
        }
        constructor(e, t = {}) {
          ((this.circuit = { failures: 0, lastFailure: 0, open: !1 }),
            (this.generator = e),
            (this.name = e.name),
            (this.version = e.version),
            (this.supportedFeatures = e.supportedFeatures),
            (this.supportedArchitectures = e.supportedArchitectures),
            (this.config = { ...q, ...t }));
        }
      }
      class ee {
        recordStart(e) {
          this.generators.get(e) ||
            this.generators.set(e, {
              name: e,
              calls: 0,
              successes: 0,
              failures: 0,
              timeouts: 0,
              totalDurationMs: 0,
              avgDurationMs: 0,
              artifactsGenerated: 0,
            });
        }
        recordSuccess(e, t, s) {
          let r = this.generators.get(e);
          (r.calls++,
            r.successes++,
            (r.totalDurationMs += t),
            (r.artifactsGenerated += s),
            (r.avgDurationMs = Math.round(r.totalDurationMs / r.calls)),
            (r.lastRunAt = Date.now()),
            this.overall.totalRuns++,
            (this.overall.totalArtifacts += s),
            (this.overall.totalDurationMs += t));
        }
        recordFailure(e, t, s) {
          let r = this.generators.get(e);
          (r.calls++,
            "timeout" === s ? r.timeouts++ : r.failures++,
            (r.totalDurationMs += t),
            (r.avgDurationMs = Math.round(r.totalDurationMs / r.calls)),
            (r.lastRunAt = Date.now()),
            this.overall.totalRuns++,
            this.overall.totalFailures++,
            (this.overall.totalDurationMs += t));
        }
        getGeneratorMetrics(e) {
          return this.generators.get(e);
        }
        getAllMetrics() {
          return Array.from(this.generators.values());
        }
        getSummary() {
          return {
            ...this.overall,
            successRate: this.overall.totalRuns
              ? Math.round(
                  ((this.overall.totalRuns - this.overall.totalFailures) /
                    this.overall.totalRuns) *
                    100,
                )
              : 100,
            avgDurationMs: this.overall.totalRuns
              ? Math.round(
                  this.overall.totalDurationMs / this.overall.totalRuns,
                )
              : 0,
            generators: this.getAllMetrics(),
          };
        }
        reset() {
          (this.generators.clear(),
            (this.overall.totalRuns = 0),
            (this.overall.totalFailures = 0),
            (this.overall.totalArtifacts = 0),
            (this.overall.totalDurationMs = 0));
        }
        toJSON() {
          return JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              summary: this.getSummary(),
              generators: this.getAllMetrics(),
            },
            null,
            2,
          );
        }
        constructor() {
          ((this.generators = new Map()),
            (this.overall = {
              totalRuns: 0,
              totalFailures: 0,
              totalArtifacts: 0,
              totalDurationMs: 0,
            }));
        }
      }
      var et = s(3069);
      class es {
        async generate(e) {
          let t = Date.now(),
            s = [],
            r = [],
            a = [],
            i = [];
          try {
            var n, o;
            i.push("validation");
            let l = this.validateProject(e.project);
            if (!l.valid)
              return {
                success: !1,
                artifacts: [],
                errors: l.errors.map((e) => ({
                  phase: "validation",
                  path: e.path,
                  message: e.message,
                  code: e.code,
                })),
                warnings: [],
                metadata: {
                  duration: Date.now() - t,
                  artifactsGenerated: 0,
                  dependencies: [],
                  phases: i,
                },
              };
            i.push("dependency-resolution");
            let d = e.project.dependencies();
            i.push("generation");
            let c = this.registry.resolveGenerators(e.project),
              u = Number(
                null !== (n = et.env.SBC_GENERATOR_CONCURRENCY) && void 0 !== n
                  ? n
                  : 5,
              );
            for (let t = 0; t < c.length; t += u) {
              let i = c.slice(t, t + u);
              for (let t of await Promise.all(
                i.map(async (t) => {
                  let a = Date.now();
                  this.metrics.recordStart(t.name);
                  let i = this.resilienceConfig
                    ? new $(t, this.resilienceConfig)
                    : t;
                  try {
                    let s = await i.generate(e);
                    return (
                      this.metrics.recordSuccess(
                        t.name,
                        Date.now() - a,
                        s.length,
                      ),
                      { artifacts: s, error: void 0 }
                    );
                  } catch (l) {
                    var n;
                    let e = Date.now() - a,
                      i = l instanceof Error ? l : Error(String(l)),
                      o = i.message.includes("timed out");
                    if (
                      (this.metrics.recordFailure(
                        t.name,
                        e,
                        o ? "timeout" : "error",
                      ),
                      s.push({
                        phase: "generation",
                        path: t.name,
                        message: i.message,
                        code: o ? "GENERATOR_TIMEOUT" : "GENERATOR_FAILED",
                        stack: i.stack,
                      }),
                      null === (n = this.resilienceConfig) || void 0 === n
                        ? void 0
                        : n.failFast)
                    )
                      return { artifacts: [], error: i };
                    return (
                      r.push({
                        phase: "generation",
                        path: t.name,
                        message: 'Generator "'.concat(
                          t.name,
                          '" failed and was skipped (graceful degradation). Set failFast=true to abort.',
                        ),
                        code: "GENERATOR_DEGRADED",
                      }),
                      { artifacts: [], error: void 0 }
                    );
                  }
                }),
              )) {
                if (
                  t.error &&
                  (null === (o = this.resilienceConfig) || void 0 === o
                    ? void 0
                    : o.failFast)
                )
                  throw t.error;
                a.push(...t.artifacts);
              }
            }
            i.push("merge");
            let h = this.mergeArtifacts(a, r);
            i.push("post-process");
            let p = await this.postProcess(h, e);
            return {
              success: 0 === s.length,
              artifacts: p,
              errors: s,
              warnings: r,
              metadata: {
                duration: Date.now() - t,
                artifactsGenerated: p.length,
                dependencies: d,
                phases: i,
              },
            };
          } catch (n) {
            let e = n instanceof Error ? n : Error(String(n));
            return (
              s.push({
                phase: "engine",
                path: "GenerationEngine",
                message: e.message,
                code: "ENGINE_FATAL",
                stack: e.stack,
              }),
              {
                success: !1,
                artifacts: a,
                errors: s,
                warnings: r,
                metadata: {
                  duration: Date.now() - t,
                  artifactsGenerated: a.length,
                  dependencies: [],
                  phases: i,
                },
              }
            );
          }
        }
        validateProject(e) {
          return e.validate();
        }
        mergeArtifacts(e, t) {
          var s, r, a;
          let i = new Map();
          for (let t of e) {
            let e = null !== (s = i.get(t.path)) && void 0 !== s ? s : [];
            (e.push(t), i.set(t.path, e));
          }
          let n = [];
          for (let [e, s] of i) {
            if (1 === s.length) {
              n.push(s[0]);
              continue;
            }
            let i = s[0],
              o = i.content,
              l = s.map((e) => {
                var t, s;
                return null !==
                  (s =
                    null === (t = e.metadata) || void 0 === t
                      ? void 0
                      : t.generator) && void 0 !== s
                  ? s
                  : "unknown";
              });
            for (let i = 1; i < s.length; i++) {
              let n = s[i],
                l = this.detectMergeStrategy(o, n.content);
              if ("json" === l)
                try {
                  let e = JSON.parse(o),
                    t = JSON.parse(n.content);
                  o = JSON.stringify(this.deepMerge(e, t), null, 2);
                } catch (s) {
                  ((o = n.content),
                    t.push({
                      phase: "merge",
                      path: e,
                      message: "JSON merge failed for ".concat(
                        e,
                        ", used last content",
                      ),
                      code: "MERGE_JSON_FALLBACK",
                    }));
                }
              else
                "append" === l
                  ? (o = o + "\n" + n.content)
                  : ((o = n.content),
                    t.push({
                      phase: "merge",
                      path: e,
                      message: "Path collision: "
                        .concat(e, " overwritten by ")
                        .concat(
                          null !==
                            (a =
                              null === (r = n.metadata) || void 0 === r
                                ? void 0
                                : r.generator) && void 0 !== a
                            ? a
                            : "unknown",
                        ),
                      code: "ARTIFACT_OVERWRITTEN",
                    }));
            }
            n.push({
              path: e,
              content: o,
              language: i.language,
              metadata: { ...i.metadata, mergedFrom: s.length, mergedBy: l },
            });
          }
          return n;
        }
        detectMergeStrategy(e, t) {
          let s = e.trim(),
            r = t.trim();
          return ((s.startsWith("{") && s.endsWith("}")) ||
            (s.startsWith("[") && s.endsWith("]"))) &&
            ((r.startsWith("{") && r.endsWith("}")) ||
              (r.startsWith("[") && r.endsWith("]")))
            ? "json"
            : s.includes("\n") && r.includes("\n") && !s.startsWith("{")
              ? "append"
              : "overwrite";
        }
        deepMerge(e, t) {
          if (
            "object" != typeof e ||
            null === e ||
            "object" != typeof t ||
            null === t
          )
            return t;
          if (Array.isArray(e) && Array.isArray(t))
            return [...new Set([...e, ...t])];
          if (Array.isArray(e) || Array.isArray(t)) return t;
          let s = { ...e };
          for (let [e, r] of Object.entries(t))
            e in s ? (s[e] = this.deepMerge(s[e], r)) : (s[e] = r);
          return s;
        }
        async postProcess(e, t) {
          return e.map((e) => ({
            ...e,
            content: this.applyTemplateOverrides(
              e.content,
              t.templateOverrides,
            ),
          }));
        }
        applyTemplateOverrides(e, t) {
          if (!t) return e;
          let s = e;
          for (let [e, r] of Object.entries(t))
            s = s.replace(RegExp("{{".concat(e, "}}"), "g"), r);
          return s;
        }
        constructor(e, t) {
          ((this.metrics = new ee()),
            (this.registry = null != e ? e : new Q()),
            (this.resilienceConfig = t));
        }
      }
      (s(559), s(4075), s(9931));
      var er = s(4217);
      let ea = Object.values(A).filter((e) => "string" == typeof e),
        ei = Object.values(T).filter((e) => "string" == typeof e),
        en = Object.values(D).filter((e) => "string" == typeof e),
        eo = Object.values(_).filter((e) => "string" == typeof e),
        el = Object.values(w).filter((e) => "string" == typeof e),
        ed = Object.values(R).filter((e) => "string" == typeof e),
        ec = Object.values(j).filter((e) => "string" == typeof e),
        eu = Object.values(O).filter((e) => "string" == typeof e),
        eh = Object.values(I).filter((e) => "string" == typeof e),
        ep = Object.values(C).filter((e) => "string" == typeof e),
        em = Object.values(M).filter((e) => "string" == typeof e),
        eg = Object.values(L).filter((e) => "string" == typeof e),
        ef = Object.values(P).filter((e) => "string" == typeof e),
        eE = Object.values(U).filter((e) => "string" == typeof e),
        eN = er.Ry({
          name: er.Z_().min(1),
          displayName: er.Z_().min(1),
          category: er.Km([
            "auth",
            "payment",
            "email",
            "monitoring",
            "ai",
            "communication",
            "analytics",
            "storage",
          ]),
          envKeys: er.IX(er.Z_().min(1)),
          description: er.Z_(),
          setupGuide: er.Z_(),
        }),
        ev = er.Ry({
          name: er
            .Z_()
            .regex(
              /^[a-zA-Z][a-zA-Z0-9_]*$/,
              "Field name must be a valid identifier",
            ),
          type: er.Km([
            "UUID",
            "STRING",
            "TEXT",
            "INTEGER",
            "BIGINT",
            "DECIMAL",
            "BOOLEAN",
            "DATE",
            "DATETIME",
            "JSON",
            "ENUM",
            "RELATION",
          ]),
          options: er
            .Ry({
              nullable: er.O7().default(!1),
              unique: er.O7().default(!1),
              indexed: er.O7().default(!1),
              default: er._4().optional(),
              enumValues: er.IX(er.Z_()).optional(),
              relationType: er
                .Km([
                  "ONE_TO_ONE",
                  "ONE_TO_MANY",
                  "MANY_TO_ONE",
                  "MANY_TO_MANY",
                ])
                .optional(),
              targetEntity: er.Z_().optional(),
            })
            .passthrough()
            .default({}),
        }),
        ey = er.Ry({
          name: er
            .Z_()
            .regex(/^[A-Z][a-zA-Z0-9]*$/, "Entity name must be PascalCase"),
          fields: er.IX(ev).min(1, "Entity must have at least one field"),
          options: er
            .Ry({
              description: er.Z_().optional(),
              tableName: er.Z_().optional(),
              features: er.IX(er.Z_()).default([]),
              audited: er.O7().default(!1),
              softDelete: er.O7().default(!1),
            })
            .default({}),
        }),
        ex = er.Ry({
          name: er.Z_().min(1),
          path: er.Z_().min(1),
          template: er.Z_().optional(),
          dependencies: er.IX(er.Z_()).default([]),
        }),
        eb = er.Ry({
          framework: er.Km(ei).default("NEXTJS"),
          styling: er.Km(en).default("TAILWIND"),
          components: er.Km(eo).default("SHADCN"),
          features: er.IX(er.Z_()).default([]),
          pages: er.IX(er.Z_()).default([]),
        }),
        eA = er.Ry({
          cloud: er.Km(el).default("VERCEL"),
          containerization: er.Km(ed).default("NONE"),
          orchestration: er.Km(ec).default("NONE"),
          database: er.Km(eu).default("POSTGRESQL"),
          cache: er.Km(eh).default("REDIS"),
          queue: er.Km(ep).default("NONE"),
          cdn: er.O7().default(!0),
          regions: er.IX(er.Z_()).default(["us-east-1"]),
        }),
        eT = er.Ry({
          testing: er.IX(er.Km(em)).default(["UNIT", "INTEGRATION"]),
          linting: er.IX(er.Km(eg)).default(["ESLINT", "PRETTIER"]),
          security: er.IX(er.Km(ef)).default(["DEPENDABOT"]),
          documentation: er.IX(er.Km(eE)).default(["README", "API"]),
        });
      er.Ry({
        description: er.Z_().default(""),
        architecture: er.Km(ea).default("MODULAR_MONOLITH"),
        regions: er.IX(er.Z_()).default(["us-east-1"]),
        entities: er.IX(ey).default([]),
        services: er.IX(ex).default([]),
        providers: er.IX(eN).default([]),
        frontend: eb.default({}),
        infrastructure: eA.default({}),
        quality: eT.default({}),
        version: er.Z_().default("1.0.0"),
        author: er.Z_().default(""),
        license: er.Z_().default("MIT"),
      });
      let eS = er
        .Z_()
        .min(1, "Project name is required")
        .regex(
          /^[a-z][a-zA-Z0-9_-]*$/,
          "Project name must be kebab-case or camelCase",
        );
      (er.Ry({
        name: eS,
        output: er.Z_().min(1).default("./generated"),
        dryRun: er.O7().default(!1),
        config: er.Z_().optional(),
      }),
        er.Ry({
          name: er.Z_().min(1).max(64),
          version: er.Z_().regex(/^\d+\.\d+\.\d+$/),
          entry: er.Z_().min(1),
          hooks: er
            .IX(
              er.Km([
                "before:generate",
                "after:generate",
                "before:write",
                "after:write",
              ]),
            )
            .default([]),
          supportedFeatures: er.IX(er.Z_()).default([]),
          supportedArchitectures: er.IX(er.Z_()).default([]),
        }),
        s(2085),
        s(1836),
        s(4545),
        s(689).Buffer,
        s(9827),
        s(2642),
        s(3069),
        s(3069),
        ((b = H || (H = {})).FRONTEND_COMPONENT = "FrontendComponent"),
        (b.API_ROUTE = "ApiRoute"),
        (b.CLOUD_DATABASE = "CloudDatabase"),
        (b.AUTH_SERVICE = "AuthService"),
        (b.CACHE_LAYER = "CacheLayer"),
        (b.QUEUE_SERVICE = "QueueService"),
        (b.CDN_EDGE = "CdnEdge"),
        (b.WEBHOOK_HANDLER = "WebhookHandler"));
      let eO = {
          [H.FRONTEND_COMPONENT]: [
            H.API_ROUTE,
            H.AUTH_SERVICE,
            H.CDN_EDGE,
            H.FRONTEND_COMPONENT,
          ],
          [H.API_ROUTE]: [
            H.CLOUD_DATABASE,
            H.AUTH_SERVICE,
            H.CACHE_LAYER,
            H.QUEUE_SERVICE,
            H.WEBHOOK_HANDLER,
            H.API_ROUTE,
          ],
          [H.CLOUD_DATABASE]: [],
          [H.AUTH_SERVICE]: [H.CLOUD_DATABASE, H.CACHE_LAYER],
          [H.CACHE_LAYER]: [H.CLOUD_DATABASE],
          [H.QUEUE_SERVICE]: [H.WEBHOOK_HANDLER, H.API_ROUTE],
          [H.CDN_EDGE]: [H.FRONTEND_COMPONENT, H.API_ROUTE],
          [H.WEBHOOK_HANDLER]: [H.QUEUE_SERVICE, H.API_ROUTE],
        },
        eI = [
          {
            from: H.FRONTEND_COMPONENT,
            to: H.CLOUD_DATABASE,
            reason:
              "Security breach: Frontend cannot connect directly to Database without an API layer.",
          },
          {
            from: H.FRONTEND_COMPONENT,
            to: H.CACHE_LAYER,
            reason:
              "Security breach: Frontend cannot connect directly to Cache without an API layer.",
          },
          {
            from: H.FRONTEND_COMPONENT,
            to: H.QUEUE_SERVICE,
            reason:
              "Security breach: Frontend cannot connect directly to Queue without an API layer.",
          },
        ];
      class eC {
        validate() {
          let e = [];
          return (
            e.push(...this.detectCycles()),
            e.push(...this.validateConnectionRules()),
            e.push(...this.validateOrphanNodes()),
            e.push(...this.validateDuplicateIds()),
            { valid: 0 === e.length, errors: e }
          );
        }
        validateEdge(e, t) {
          var s;
          let r = eI.find((s) => s.from === e && s.to === t);
          return r
            ? { code: "BLOCKED_CONNECTION", message: r.reason }
            : (null !== (s = eO[e]) && void 0 !== s ? s : []).includes(t)
              ? null
              : {
                  code: "INVALID_CONNECTION",
                  message: "Invalid connection: "
                    .concat(e, " cannot connect to ")
                    .concat(t, "."),
                };
        }
        detectCycles() {
          let e = [],
            t = new Map();
          for (let e of this.graph.nodes) t.set(e.id, []);
          for (let e of this.graph.edges) {
            let s = t.get(e.source);
            s && s.push(e.target);
          }
          let s = new Map(),
            r = (a, i) => {
              var n, o;
              for (let l of (s.set(a, 1),
              null !== (n = t.get(a)) && void 0 !== n ? n : [])) {
                let t = null !== (o = s.get(l)) && void 0 !== o ? o : 0;
                if (1 === t)
                  return (
                    e.push({
                      code: "CYCLE_DETECTED",
                      message:
                        "Critical architecture failure: Infinite cycle detected from node "
                          .concat(a, " to ")
                          .concat(l, "."),
                      nodeId: l,
                    }),
                    !0
                  );
                if (0 === t && r(l, [...i, l])) return !0;
              }
              return (s.set(a, 2), !1);
            };
          for (let e of this.graph.nodes) {
            var a;
            (null !== (a = s.get(e.id)) && void 0 !== a ? a : 0) === 0 &&
              r(e.id, [e.id]);
          }
          return e;
        }
        validateConnectionRules() {
          let e = [],
            t = new Map();
          for (let e of this.graph.nodes) t.set(e.id, e);
          for (let s of this.graph.edges) {
            let r = t.get(s.source),
              a = t.get(s.target);
            if (!r) {
              e.push({
                code: "MISSING_SOURCE_NODE",
                message: "Edge "
                  .concat(s.id, " references non-existent source node ")
                  .concat(s.source, "."),
                edgeId: s.id,
              });
              continue;
            }
            if (!a) {
              e.push({
                code: "MISSING_TARGET_NODE",
                message: "Edge "
                  .concat(s.id, " references non-existent target node ")
                  .concat(s.target, "."),
                edgeId: s.id,
              });
              continue;
            }
            let i = this.validateEdge(r.type, a.type);
            i && e.push({ ...i, edgeId: s.id });
          }
          return e;
        }
        validateOrphanNodes() {
          let e = [],
            t = new Set();
          for (let e of this.graph.edges) (t.add(e.source), t.add(e.target));
          for (let s of this.graph.nodes)
            !t.has(s.id) &&
              this.graph.nodes.length > 1 &&
              e.push({
                code: "ORPHAN_NODE",
                message: 'Node "'
                  .concat(s.data.label, '" (')
                  .concat(s.id, ") is not connected to any other node."),
                nodeId: s.id,
              });
          return e;
        }
        validateDuplicateIds() {
          let e = [],
            t = new Set();
          for (let s of this.graph.nodes)
            (t.has(s.id) &&
              e.push({
                code: "DUPLICATE_NODE_ID",
                message: "Duplicate node ID: ".concat(s.id, "."),
                nodeId: s.id,
              }),
              t.add(s.id));
          return e;
        }
        constructor(e) {
          this.graph = e;
        }
      }
      class ew {
        map() {
          var e, t;
          let s = this.getNodesByType(H.CLOUD_DATABASE),
            r = this.getNodesByType(H.FRONTEND_COMPONENT),
            a = this.getNodesByType(H.API_ROUTE),
            i = this.getNodesByType(H.AUTH_SERVICE),
            n = this.getNodesByType(H.CACHE_LAYER),
            o = this.getNodesByType(H.QUEUE_SERVICE),
            l = this.getNodesByType(H.CDN_EDGE),
            d = s.map((e) => this.mapEntity(e)),
            c = a.map((e) => this.mapService(e, this.graph.edges)),
            u = this.extractProviders(i),
            h = this.extractAllFeatures(),
            p = this.extractRegions(),
            m = this.mapFrontend(r, h),
            g = this.mapInfrastructure(n, o, l, s, p);
          return {
            name: this.projectName,
            description:
              null !==
                (t =
                  null === (e = this.graph.nodes[0]) || void 0 === e
                    ? void 0
                    : e.data.description) && void 0 !== t
                ? t
                : "",
            architecture: this.determineArchitecture(a),
            regions: p.length > 0 ? p : ["us-east-1"],
            entities: d,
            services: c,
            providers: u,
            frontend: m,
            infrastructure: g,
          };
        }
        getNodesByType(e) {
          return this.graph.nodes.filter((t) => t.type === e);
        }
        mapEntity(e) {
          var t, s, r;
          return {
            name: e.data.label,
            fields: (null !== (t = e.data.fields) && void 0 !== t ? t : []).map(
              (e) => {
                var t, s, r;
                return {
                  name: e.name,
                  type: e.type,
                  required: null !== (t = e.required) && void 0 !== t && t,
                  unique: null !== (s = e.unique) && void 0 !== s && s,
                  nullable: null !== (r = e.nullable) && void 0 !== r && r,
                };
              },
            ),
            features: null !== (s = e.data.features) && void 0 !== s ? s : [],
            tableName:
              null !== (r = e.data.tableName) && void 0 !== r
                ? r
                : e.data.label.toLowerCase(),
          };
        }
        mapService(e, t) {
          var s;
          let r = t
            .filter((t) => t.source === e.id)
            .map((e) => this.graph.nodes.find((t) => t.id === e.target))
            .filter((e) => (null == e ? void 0 : e.type) === H.CLOUD_DATABASE)
            .map((e) => e.data.label);
          return {
            name: e.data.label,
            entities: r,
            type: null !== (s = e.data.method) && void 0 !== s ? s : "SYNC",
          };
        }
        extractProviders(e) {
          let t = [];
          for (let s of e) s.data.provider && t.push(s.data.provider);
          return [...new Set(t)];
        }
        extractAllFeatures() {
          let e = new Set();
          for (let t of this.graph.nodes)
            if (t.data.features) for (let s of t.data.features) e.add(s);
          return Array.from(e);
        }
        extractRegions() {
          let e = new Set();
          for (let t of this.graph.nodes) t.data.region && e.add(t.data.region);
          return Array.from(e);
        }
        mapFrontend(e, t) {
          var s, r;
          let a = e[0];
          return {
            framework:
              null !== (s = null == a ? void 0 : a.data.framework) &&
              void 0 !== s
                ? s
                : "NEXTJS",
            styling:
              null !== (r = null == a ? void 0 : a.data.styling) && void 0 !== r
                ? r
                : "TAILWIND",
            features: t,
            pages: e
              .map((e) => {
                var t;
                return null !== (t = e.data.route) && void 0 !== t
                  ? t
                  : e.data.label;
              })
              .filter(Boolean),
          };
        }
        mapInfrastructure(e, t, s, r, a) {
          var i, n, o, l;
          let d = e.length > 0,
            c = t.length > 0,
            u = s.length > 0;
          return {
            cloud: "VERCEL",
            database:
              null !==
                (o =
                  null === (i = r[0]) || void 0 === i
                    ? void 0
                    : i.data.provider) && void 0 !== o
                ? o
                : "POSTGRESQL",
            cache: d ? "REDIS" : "NONE",
            queue: c
              ? null !==
                  (l =
                    null === (n = t[0]) || void 0 === n
                      ? void 0
                      : n.data.provider) && void 0 !== l
                ? l
                : "RABBITMQ"
              : "NONE",
            cdn: u,
            regions: a.length > 0 ? a : ["us-east-1"],
          };
        }
        determineArchitecture(e) {
          return e.length > 3
            ? "MICROSERVICES"
            : (e.length, "MODULAR_MONOLITH");
        }
        constructor(e, t) {
          ((this.graph = e), (this.projectName = t));
        }
      }
      let eR = [
          "wss://signaling.yjs.dev",
          "wss://y-webrtc-signaling-eu.herokuapp.com",
          "wss://y-webrtc-signaling-us.herokuapp.com",
        ],
        ej = [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#06b6d4",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
        ];
      class eD {
        async connect() {
          let e = new (
            await Promise.all([s.e(970), s.e(244)]).then(s.bind(s, 5556))
          ).Doc();
          ((this.doc = e),
            (this.nodesMap = e.getMap("nodes")),
            (this.edgesArray = e.getArray("edges")));
          let t = () => {
            let e = this.getGraph();
            this.graphHandlers.forEach((t) => t(e));
          };
          (this.nodesMap.observe(t), this.edgesArray.observe(t));
          try {
            var r, a;
            let { WebrtcProvider: t } = await Promise.all([
              s.e(970),
              s.e(244),
              s.e(333),
            ]).then(s.bind(s, 8333));
            ((this.provider = new t(this.options.roomId, e, {
              signaling:
                null !== (r = this.options.signalingServers) && void 0 !== r
                  ? r
                  : eR,
              password: this.options.password,
              maxConns:
                null !== (a = this.options.maxConns) && void 0 !== a
                  ? a
                  : 20 + Math.floor(15 * Math.random()),
            })),
              (this.awareness = this.provider.awareness),
              this.setupAwareness());
          } catch (e) {}
          try {
            let { IndexeddbPersistence: t } = await Promise.all([
              s.e(970),
              s.e(244),
              s.e(770),
            ]).then(s.bind(s, 9770));
            this.persistence = new t(
              "sbc-graph-".concat(this.options.roomId),
              e,
            );
          } catch (e) {}
          this.connected = !0;
        }
        disconnect() {
          (this.provider &&
            "function" == typeof this.provider.destroy &&
            this.provider.destroy(),
            this.persistence &&
              "function" == typeof this.persistence.destroy &&
              this.persistence.destroy(),
            this.doc && this.doc.destroy(),
            (this.doc = null),
            (this.nodesMap = null),
            (this.edgesArray = null),
            (this.provider = null),
            (this.persistence = null),
            (this.awareness = null),
            (this.connected = !1),
            (this.peers = []));
        }
        onGraphUpdate(e) {
          this.graphHandlers.push(e);
        }
        onPresence(e) {
          this.presenceHandlers.push(e);
        }
        updateNode(e) {
          this.doc &&
            this.nodesMap &&
            this.doc.transact(() => {
              this.nodesMap.set(e.id, JSON.parse(JSON.stringify(e)));
            });
        }
        removeNode(e) {
          this.doc &&
            this.nodesMap &&
            this.doc.transact(() => {
              this.nodesMap.delete(e);
              let t = this.edgesArray.toArray(),
                s = t.filter((t) => t.source !== e && t.target !== e);
              (this.edgesArray.delete(0, t.length), this.edgesArray.push(s));
            });
        }
        updateEdge(e) {
          if (!this.doc || !this.edgesArray) return;
          let t = this.edgesArray.toArray().findIndex((t) => t.id === e.id);
          (t >= 0 && this.edgesArray.delete(t, 1),
            this.edgesArray.push([JSON.parse(JSON.stringify(e))]));
        }
        removeEdge(e) {
          if (!this.doc || !this.edgesArray) return;
          let t = this.edgesArray.toArray(),
            s = t.filter((t) => t.id !== e);
          this.doc.transact(() => {
            (this.edgesArray.delete(0, t.length), this.edgesArray.push(s));
          });
        }
        updateCursor(e) {
          this.awareness && this.awareness.setLocalStateField("cursor", e);
        }
        setSelectedNode(e) {
          this.awareness &&
            this.awareness.setLocalStateField("selectedNodeId", e);
        }
        getGraph() {
          if (!this.nodesMap || !this.edgesArray)
            return { nodes: [], edges: [] };
          let e = [];
          return (
            this.nodesMap.forEach((t) => {
              e.push(t);
            }),
            { nodes: e, edges: this.edgesArray.toArray() }
          );
        }
        getPeers() {
          return this.peers;
        }
        isConnected() {
          return this.connected;
        }
        setupAwareness() {
          if (!this.awareness) return;
          let e = this.awareness;
          (e.setLocalStateField("user", {
            name: "User-".concat(this.peerId.slice(-4)),
            color: ej[Math.floor(Math.random() * ej.length)],
          }),
            e.on("change", () => {
              let t = e.getStates(),
                s = [];
              (t.forEach((e, t) => {
                let r = e.user;
                r &&
                  s.push({
                    id: "client-".concat(t),
                    name: r.name,
                    color: r.color,
                    cursor: e.cursor,
                    selectedNodeId: e.selectedNodeId,
                  });
              }),
                (this.peers = s),
                this.presenceHandlers.forEach((e) => e(s)));
            }));
        }
        constructor(e) {
          ((this.doc = null),
            (this.nodesMap = null),
            (this.edgesArray = null),
            (this.provider = null),
            (this.persistence = null),
            (this.awareness = null),
            (this.connected = !1),
            (this.graphHandlers = []),
            (this.presenceHandlers = []),
            (this.peers = []),
            (this.options = e),
            (this.peerId = "peer-".concat(
              Math.random().toString(36).slice(2, 10),
            )));
        }
      }
      class e_ {
        async write(e) {
          var t, s, r, a;
          let i, n;
          let o = "https://api.github.com",
            l = {
              Authorization: "Bearer ".concat(this.options.token),
              Accept: "application/vnd.github+json",
              "X-GitHub-Api-Version": "2022-11-28",
              "Content-Type": "application/json",
            },
            d = this.options.owner,
            c = this.options.repoName,
            u = await fetch("".concat(o, "/user/repos"), {
              method: "POST",
              headers: l,
              body: JSON.stringify({
                name: c,
                description:
                  null !== (t = this.options.description) && void 0 !== t
                    ? t
                    : "",
                private:
                  null !== (s = this.options.private) && void 0 !== s && s,
                auto_init: !0,
              }),
            });
          if (!u.ok && 422 !== u.status) {
            let e = await u.json().catch(() => ({}));
            throw Error("Failed to create repo: ".concat(JSON.stringify(e)));
          }
          this.createdRepo = u.ok;
          let h = await u.json().catch(() => ({}));
          try {
            let e = await fetch(
              ""
                .concat(o, "/repos/")
                .concat(d, "/")
                .concat(c, "/git/refs/heads/main"),
              { headers: l },
            );
            e.ok && (i = (await e.json()).object.sha);
          } catch (e) {}
          if (i) {
            let e = await fetch(
              ""
                .concat(o, "/repos/")
                .concat(d, "/")
                .concat(c, "/git/commits/")
                .concat(i),
              { headers: l },
            );
            e.ok && (n = (await e.json()).tree.sha);
          }
          let p = e.map(async (e) => {
            let t = await fetch(
              "".concat(o, "/repos/").concat(d, "/").concat(c, "/git/blobs"),
              {
                method: "POST",
                headers: l,
                body: JSON.stringify({ content: e.content, encoding: "utf-8" }),
              },
            );
            if (!t.ok)
              throw Error(
                "Failed to create blob for "
                  .concat(e.path, ": ")
                  .concat(await t.text()),
              );
            let s = await t.json();
            return { path: e.path, sha: s.sha };
          });
          this.pushedBlobs = await Promise.all(p);
          let m = {
            tree: this.pushedBlobs.map((e) => ({
              path: e.path,
              mode: "100644",
              type: "blob",
              sha: e.sha,
            })),
          };
          n && (m.base_tree = n);
          let g = await fetch(
            "".concat(o, "/repos/").concat(d, "/").concat(c, "/git/trees"),
            { method: "POST", headers: l, body: JSON.stringify(m) },
          );
          if (!g.ok)
            throw Error("Failed to create tree: ".concat(await g.text()));
          let f = await g.json(),
            E = {
              message:
                null !== (r = this.options.commitMessage) && void 0 !== r
                  ? r
                  : "Initial commit from SBC ASP",
              tree: f.sha,
            };
          (i && (E.parents = [i]),
            this.options.authorName &&
              this.options.authorEmail &&
              (E.author = {
                name: this.options.authorName,
                email: this.options.authorEmail,
              }));
          let N = await fetch(
            "".concat(o, "/repos/").concat(d, "/").concat(c, "/git/commits"),
            { method: "POST", headers: l, body: JSON.stringify(E) },
          );
          if (!N.ok)
            throw Error("Failed to create commit: ".concat(await N.text()));
          let v = await N.json(),
            y = await fetch(
              ""
                .concat(o, "/repos/")
                .concat(d, "/")
                .concat(c, "/git/refs/heads/main"),
              {
                method: "PATCH",
                headers: l,
                body: JSON.stringify({ sha: v.sha }),
              },
            );
          if (!y.ok)
            throw Error("Failed to update ref: ".concat(await y.text()));
          return (
            (this.committed = !0),
            {
              repoUrl:
                null !== (a = h.html_url) && void 0 !== a
                  ? a
                  : "https://github.com/".concat(d, "/").concat(c),
              commitSha: v.sha,
              filesPushed: this.pushedBlobs.length,
            }
          );
        }
        async rollback() {
          if (!this.committed) {
            if (this.createdRepo && this.options.owner && this.options.repoName)
              try {
                await fetch(
                  "https://api.github.com/repos/"
                    .concat(this.options.owner, "/")
                    .concat(this.options.repoName),
                  {
                    method: "DELETE",
                    headers: {
                      Authorization: "Bearer ".concat(this.options.token),
                      Accept: "application/vnd.github+json",
                    },
                  },
                );
              } catch (e) {}
            this.pushedBlobs = [];
          }
        }
        constructor(e) {
          ((this.committed = !1),
            (this.createdRepo = !1),
            (this.pushedBlobs = []),
            (this.options = e));
        }
      }
      class eM {
        async execute() {
          let {
            config: e,
            projectName: t,
            artifacts: s,
            onProgress: r,
          } = this.options;
          try {
            (null == r ||
              r({
                step: "creating-repo",
                message: "Creating GitHub repository...",
                percentage: 10,
              }),
              (this.gitWriter = new e_({
                token: e.github.token,
                owner: e.github.owner,
                repoName: t,
                description: this.options.description,
                commitMessage: "Initial commit from SBC ASP",
                authorName: this.options.authorName,
                authorEmail: this.options.authorEmail,
              })),
              null == r ||
                r({
                  step: "pushing-files",
                  message: "Pushing ".concat(s.length, " files to GitHub..."),
                  percentage: 25,
                }));
            let a = await this.gitWriter.write(s);
            null == r ||
              r({
                step: "linking-vercel",
                message: "Linking repository to Vercel...",
                percentage: 40,
              });
            let i = await this.deployToVercel(e, t, a.repoUrl);
            null == r ||
              r({
                step: "provisioning-supabase",
                message: "Provisioning Supabase database...",
                percentage: 60,
              });
            let n = await this.provisionSupabase(e, t);
            return (
              null == r ||
                r({
                  step: "configuring-env",
                  message: "Configuring environment variables...",
                  percentage: 80,
                }),
              await this.configureEnvVars(e, t, i.projectId, n),
              null == r ||
                r({
                  step: "complete",
                  message: "Deployment complete!",
                  percentage: 100,
                }),
              {
                success: !0,
                githubUrl: a.repoUrl,
                vercelUrl: i.url,
                supabaseUrl: n.url,
                supabaseProjectRef: n.projectRef,
                supabaseAnonKey: n.anonKey,
              }
            );
          } catch (t) {
            let e = t instanceof Error ? t.message : String(t);
            return (
              null == r || r({ step: "failed", message: e, percentage: 0 }),
              this.gitWriter && (await this.gitWriter.rollback()),
              { success: !1, error: e }
            );
          }
        }
        async rollback() {
          this.gitWriter && (await this.gitWriter.rollback());
        }
        async deployToVercel(e, t, s) {
          var r;
          let a = {
              Authorization: "Bearer ".concat(e.vercel.token),
              "Content-Type": "application/json",
            },
            i = e.vercel.teamId ? "?teamId=".concat(e.vercel.teamId) : "",
            n = await fetch("https://api.vercel.com/v9/projects".concat(i), {
              method: "POST",
              headers: a,
              body: JSON.stringify({
                name: t,
                gitRepository: {
                  type: "github",
                  repo: "".concat(e.github.owner, "/").concat(t),
                },
                framework: "nextjs",
              }),
            });
          if (!n.ok && 409 !== n.status)
            throw Error(
              "Vercel project creation failed: ".concat(await n.text()),
            );
          let o =
              null !== (r = (await n.json().catch(() => ({ id: "" }))).id) &&
              void 0 !== r
                ? r
                : "",
            l = await fetch(
              "https://api.vercel.com/v13/deployments".concat(i),
              {
                method: "POST",
                headers: a,
                body: JSON.stringify({
                  name: t,
                  gitSource: {
                    type: "github",
                    ref: "main",
                    repo: "".concat(e.github.owner, "/").concat(t),
                  },
                  target: "production",
                }),
              },
            );
          if (!l.ok)
            throw Error(
              "Vercel deployment trigger failed: ".concat(await l.text()),
            );
          let d = await l.json();
          return { url: d.url ? "https://".concat(d.url) : s, projectId: o };
        }
        async provisionSupabase(e, t) {
          let s = {
              Authorization: "Bearer ".concat(e.supabase.token),
              "Content-Type": "application/json",
            },
            r = this.generatePassword(),
            a = await fetch("https://api.supabase.com/v1/projects", {
              method: "POST",
              headers: s,
              body: JSON.stringify({
                name: t,
                organization_id: e.supabase.organizationId,
                region: "us-east-1",
                password: r,
              }),
            });
          if (!a.ok)
            throw Error(
              "Supabase project creation failed: ".concat(await a.text()),
            );
          let i = (await a.json()).id;
          for (let e = 0; e < 60; e++) {
            await new Promise((e) => setTimeout(e, 5e3));
            let e = await fetch(
              "https://api.supabase.com/v1/projects/".concat(i, "/health"),
              { headers: s },
            );
            if (e.ok) {
              let t = await e.json().catch(() => ({}));
              if ("healthy" === t.status || !0 === t.database) break;
            }
          }
          let n = await fetch(
              "https://api.supabase.com/v1/projects/".concat(i, "/api-keys"),
              { headers: s },
            ),
            o = "";
          if (n.ok) {
            var l;
            let e = await n.json(),
              t = Array.isArray(e) ? e.find((e) => "anon" === e.name) : null;
            o =
              null !== (l = null == t ? void 0 : t.api_key) && void 0 !== l
                ? l
                : "";
          }
          return {
            url: "https://".concat(i, ".supabase.co"),
            projectRef: i,
            anonKey: o,
          };
        }
        async configureEnvVars(e, t, s, r) {
          let a = {
              Authorization: "Bearer ".concat(e.vercel.token),
              "Content-Type": "application/json",
            },
            i = e.vercel.teamId ? "?teamId=".concat(e.vercel.teamId) : "",
            n = [
              {
                key: "NEXT_PUBLIC_SUPABASE_URL",
                value: "https://".concat(r.projectRef, ".supabase.co"),
                target: ["production"],
              },
              {
                key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
                value: r.anonKey,
                target: ["production"],
              },
            ];
          if (s)
            try {
              (await fetch(
                "https://api.vercel.com/v9/projects/"
                  .concat(s, "/env")
                  .concat(i),
                { method: "POST", headers: a, body: JSON.stringify(n[0]) },
              ),
                await fetch(
                  "https://api.vercel.com/v9/projects/"
                    .concat(s, "/env")
                    .concat(i),
                  { method: "POST", headers: a, body: JSON.stringify(n[1]) },
                ));
            } catch (e) {}
        }
        generatePassword() {
          let e =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            t = "",
            s = new Uint8Array(24);
          crypto.getRandomValues(s);
          for (let r = 0; r < s.length; r++) t += e[s[r] % e.length];
          return t;
        }
        constructor(e) {
          ((this.gitWriter = null), (this.options = e));
        }
      }
      function eL(e) {
        return new eC(e).validate();
      }
      let eP = (0, z.Ue)((e, t) => ({
          nodes: [],
          edges: [],
          selectedNodeId: null,
          validationErrors: [],
          isValid: !0,
          addNode: (s) => {
            let r = [...t().nodes, s],
              a = eL({ nodes: r, edges: t().edges });
            e({ nodes: r, validationErrors: a.errors, isValid: a.valid });
          },
          removeNode: (s) => {
            let r = t().nodes.filter((e) => e.id !== s),
              a = t().edges.filter((e) => e.source !== s && e.target !== s),
              i = eL({ nodes: r, edges: a });
            e({
              nodes: r,
              edges: a,
              validationErrors: i.errors,
              isValid: i.valid,
              selectedNodeId:
                t().selectedNodeId === s ? null : t().selectedNodeId,
            });
          },
          updateNode: (s, r) => {
            let a = t().nodes.map((e) =>
                e.id === s ? { ...e, data: { ...e.data, ...r } } : e,
              ),
              i = eL({ nodes: a, edges: t().edges });
            e({ nodes: a, validationErrors: i.errors, isValid: i.valid });
          },
          updateNodePosition: (s, r) => {
            e({
              nodes: t().nodes.map((e) =>
                e.id === s ? { ...e, position: r } : e,
              ),
            });
          },
          addEdge: (s) => {
            let r = t().nodes.find((e) => e.id === s.source),
              a = t().nodes.find((e) => e.id === s.target);
            if (
              !r ||
              !a ||
              new eC({ nodes: t().nodes, edges: t().edges }).validateEdge(
                r.type,
                a.type,
              )
            )
              return !1;
            let i = [...t().edges, s],
              n = eL({ nodes: t().nodes, edges: i });
            return (
              e({ edges: i, validationErrors: n.errors, isValid: n.valid }),
              !0
            );
          },
          removeEdge: (s) => {
            let r = t().edges.filter((e) => e.id !== s),
              a = eL({ nodes: t().nodes, edges: r });
            e({ edges: r, validationErrors: a.errors, isValid: a.valid });
          },
          setSelectedNode: (t) => e({ selectedNodeId: t }),
          validate: () => {
            let s = eL(t().getGraph());
            e({ validationErrors: s.errors, isValid: s.valid });
          },
          getGraph: () => ({ nodes: t().nodes, edges: t().edges }),
          toProjectConfig: (e) => new ew(t().getGraph(), e).map(),
          loadGraph: (t) => {
            let s = eL(t);
            e({
              nodes: t.nodes,
              edges: t.edges,
              validationErrors: s.errors,
              isValid: s.valid,
            });
          },
        })),
        eU = (0, Z.memo)((e) => {
          let { data: t, selected: s } = e;
          return (0, V.jsxs)("div", {
            className:
              "relative rounded-lg border-2 px-4 py-3 min-w-[180px] shadow-md transition-all ".concat(
                t.hasError
                  ? "border-red-500 bg-red-50"
                  : s
                    ? "border-blue-500 bg-white shadow-lg ring-2 ring-blue-200"
                    : "border-gray-300 bg-white hover:shadow-lg",
              ),
            children: [
              (0, V.jsx)(Y.HH, {
                type: "target",
                position: K.Ly.Top,
                className: "!h-3 !w-3 !bg-gray-400 !border-2 !border-white",
              }),
              (0, V.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, V.jsx)("span", {
                    className: "text-lg",
                    style: { color: t.color },
                    children: t.icon,
                  }),
                  (0, V.jsxs)("div", {
                    className: "flex-1",
                    children: [
                      (0, V.jsx)("div", {
                        className: "text-sm font-semibold text-gray-800",
                        children: t.label,
                      }),
                      (0, V.jsx)("div", {
                        className: "text-xs text-gray-500",
                        children: t.nodeType,
                      }),
                    ],
                  }),
                ],
              }),
              t.description &&
                (0, V.jsx)("div", {
                  className: "mt-1 text-xs text-gray-400 truncate",
                  children: t.description,
                }),
              t.hasError &&
                t.errorMessage &&
                (0, V.jsx)("div", {
                  className:
                    "mt-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600",
                  children: t.errorMessage,
                }),
              (0, V.jsx)(Y.HH, {
                type: "source",
                position: K.Ly.Bottom,
                className: "!h-3 !w-3 !bg-gray-400 !border-2 !border-white",
              }),
            ],
          });
        }),
        ek = [
          {
            type: H.FRONTEND_COMPONENT,
            label: "Frontend",
            icon: "\uD83C\uDF10",
            color: "#3b82f6",
            description: "React/Next.js frontend component",
          },
          {
            type: H.API_ROUTE,
            label: "API Route",
            icon: "⚡",
            color: "#22c55e",
            description: "tRPC/REST API endpoint",
          },
          {
            type: H.CLOUD_DATABASE,
            label: "Database",
            icon: "\uD83D\uDDC4️",
            color: "#8b5cf6",
            description: "PostgreSQL/Supabase table",
          },
          {
            type: H.AUTH_SERVICE,
            label: "Auth Service",
            icon: "\uD83D\uDEE1️",
            color: "#f97316",
            description: "Authentication provider",
          },
          {
            type: H.CACHE_LAYER,
            label: "Cache",
            icon: "⚡",
            color: "#eab308",
            description: "Redis cache layer",
          },
          {
            type: H.QUEUE_SERVICE,
            label: "Queue",
            icon: "\uD83D\uDCEC",
            color: "#ec4899",
            description: "Message queue (RabbitMQ/Kafka)",
          },
          {
            type: H.CDN_EDGE,
            label: "CDN / Edge",
            icon: "\uD83C\uDF0D",
            color: "#06b6d4",
            description: "CDN edge network",
          },
          {
            type: H.WEBHOOK_HANDLER,
            label: "Webhook",
            icon: "\uD83D\uDD17",
            color: "#ef4444",
            description: "Webhook event handler",
          },
        ];
      function eF(e) {
        var t;
        return null !== (t = ek.find((t) => t.type === e)) && void 0 !== t
          ? t
          : ek[0];
      }
      var eB = s(7629);
      let eG = { custom: eU };
      function eH() {
        let e = eP((e) => e.nodes),
          t = eP((e) => e.edges),
          s = eP((e) => e.addNode),
          r = eP((e) => e.removeNode),
          a = eP((e) => e.updateNodePosition),
          i = eP((e) => e.addEdge),
          n = eP((e) => e.removeEdge),
          o = eP((e) => e.setSelectedNode),
          l = eP((e) => e.selectedNodeId),
          { getErrorForNode: d, getErrorForEdge: c } = (function () {
            let e = eP((e) => e.nodes),
              t = eP((e) => e.edges),
              s = eP((e) => e.validate),
              [r, a] = (0, Z.useState)([]),
              [i, n] = (0, Z.useState)(!0);
            ((0, Z.useEffect)(() => {
              s();
            }, [e, t, s]),
              (0, Z.useEffect)(() => {
                let e = eP.getState();
                (a(e.validationErrors), n(e.isValid));
              }, [e, t]));
            let o = (0, Z.useCallback)(
                (e) => r.find((t) => t.nodeId === e),
                [r],
              ),
              l = (0, Z.useCallback)((e) => r.find((t) => t.edgeId === e), [r]);
            return {
              errors: r,
              isValid: i,
              getErrorForNode: o,
              getErrorForEdge: l,
            };
          })(),
          u = e.map((e) => {
            let t = eF(e.type),
              s = d(e.id);
            return {
              id: e.id,
              type: "custom",
              position: e.position,
              data: {
                label: e.data.label,
                description: e.data.description,
                nodeType: t.label,
                color: t.color,
                icon: t.icon,
                hasError: !!s,
                errorMessage: null == s ? void 0 : s.message,
              },
              selected: e.id === l,
            };
          }),
          h = t.map((e) => {
            let t = c(e.id);
            return {
              id: e.id,
              source: e.source,
              target: e.target,
              animated: !t,
              style: t
                ? { stroke: "#ef4444", strokeWidth: 2 }
                : { stroke: "#94a3b8", strokeWidth: 2 },
            };
          }),
          p = (0, Z.useCallback)(
            (e) => {
              e.source &&
                e.target &&
                i({ id: (0, eB.x0)(), source: e.source, target: e.target });
            },
            [i],
          ),
          m = (0, Z.useCallback)(
            (e, t) => {
              a(t.id, t.position);
            },
            [a],
          ),
          g = (0, Z.useCallback)(
            (e, t) => {
              o(t.id);
            },
            [o],
          ),
          f = (0, Z.useCallback)(() => {
            o(null);
          }, [o]),
          E = (0, Z.useCallback)((e) => {
            (e.preventDefault(), (e.dataTransfer.dropEffect = "move"));
          }, []),
          N = (0, Z.useCallback)(
            (t) => {
              t.preventDefault();
              let r = t.dataTransfer.getData("application/nodeType");
              if (!r) return;
              let a = eF(r),
                i = { x: t.clientX - 250, y: t.clientY - 100 };
              s({
                id: (0, eB.x0)(),
                type: r,
                position: i,
                data: {
                  label: "".concat(a.label, " ").concat(e.length + 1),
                  description: a.description,
                },
              });
            },
            [s, e.length],
          );
        return (0, V.jsx)("div", {
          className: "h-full w-full",
          onDrop: N,
          onDragOver: E,
          children: (0, V.jsxs)(Y.x$, {
            nodes: u,
            edges: h,
            nodeTypes: eG,
            onConnect: p,
            onNodeDragStop: m,
            onNodeClick: g,
            onPaneClick: f,
            onNodesDelete: (e) => {
              for (let t of e) r(t.id);
            },
            onEdgesDelete: (e) => {
              for (let t of e) n(t.id);
            },
            connectionMode: K.jD.Loose,
            fitView: !0,
            className: "bg-gray-50",
            children: [
              (0, V.jsx)(Y.Aq, {
                variant: Y.T7.Dots,
                gap: 20,
                size: 1,
                color: "#e2e8f0",
              }),
              (0, V.jsx)(Y.ZX, {
                className:
                  "!bg-white !shadow-md !rounded-lg !border !border-gray-200",
              }),
              (0, V.jsx)(Y.a9, {
                className:
                  "!bg-white !shadow-md !rounded-lg !border !border-gray-200",
                nodeColor: (e) => {
                  var t;
                  let s = e.data;
                  return null !== (t = null == s ? void 0 : s.color) &&
                    void 0 !== t
                    ? t
                    : "#94a3b8";
                },
              }),
            ],
          }),
        });
      }
      function eV() {
        return (0, V.jsx)(Y.tV, { children: (0, V.jsx)(eH, {}) });
      }
      function eZ() {
        let e = (e, t) => {
          (e.dataTransfer.setData("application/nodeType", t),
            (e.dataTransfer.effectAllowed = "move"));
        };
        return (0, V.jsxs)("div", {
          className:
            "flex h-full w-56 flex-col border-r border-gray-200 bg-white",
          children: [
            (0, V.jsxs)("div", {
              className: "border-b border-gray-200 px-4 py-3",
              children: [
                (0, V.jsx)("h3", {
                  className: "text-sm font-semibold text-gray-700",
                  children: "Components",
                }),
                (0, V.jsx)("p", {
                  className: "mt-0.5 text-xs text-gray-400",
                  children: "Drag to canvas",
                }),
              ],
            }),
            (0, V.jsx)("div", {
              className: "flex-1 overflow-y-auto p-3",
              children: (0, V.jsx)("div", {
                className: "space-y-2",
                children: ek.map((t) =>
                  (0, V.jsxs)(
                    "div",
                    {
                      draggable: !0,
                      onDragStart: (s) => e(s, t.type),
                      className:
                        "flex cursor-grab items-center gap-3 rounded-lg border border-gray-200 px-3 py-2.5 transition-all hover:border-gray-300 hover:shadow-sm active:cursor-grabbing",
                      children: [
                        (0, V.jsx)("span", {
                          className: "text-xl",
                          children: t.icon,
                        }),
                        (0, V.jsxs)("div", {
                          className: "flex-1",
                          children: [
                            (0, V.jsx)("div", {
                              className: "text-sm font-medium text-gray-700",
                              children: t.label,
                            }),
                            (0, V.jsx)("div", {
                              className: "text-xs text-gray-400 truncate",
                              children: t.description,
                            }),
                          ],
                        }),
                        (0, V.jsx)("div", {
                          className: "h-2 w-2 rounded-full",
                          style: { backgroundColor: t.color },
                        }),
                      ],
                    },
                    t.type,
                  ),
                ),
              }),
            }),
          ],
        });
      }
      var eY = s(1206),
        eK = s(9612);
      function ez() {
        var e, t, s, r, a, i, n;
        let o = eP((e) => e.selectedNodeId),
          l = eP((e) => e.nodes),
          d = eP((e) => e.updateNode),
          c = eP((e) => e.removeNode),
          u = eP((e) => e.setSelectedNode),
          h = l.find((e) => e.id === o);
        if (!h)
          return (0, V.jsxs)("div", {
            className:
              "flex h-full w-72 flex-col border-l border-gray-200 bg-white",
            children: [
              (0, V.jsx)("div", {
                className: "border-b border-gray-200 px-4 py-3",
                children: (0, V.jsx)("h3", {
                  className: "text-sm font-semibold text-gray-700",
                  children: "Inspector",
                }),
              }),
              (0, V.jsx)("div", {
                className: "flex flex-1 items-center justify-center p-4",
                children: (0, V.jsx)("p", {
                  className: "text-center text-sm text-gray-400",
                  children: "Select a node to edit its properties",
                }),
              }),
            ],
          });
        let p = eF(h.type),
          m = h.type === H.CLOUD_DATABASE,
          g = h.type === H.API_ROUTE,
          f = h.type === H.FRONTEND_COMPONENT;
        return (0, V.jsxs)("div", {
          className:
            "flex h-full w-72 flex-col border-l border-gray-200 bg-white",
          children: [
            (0, V.jsxs)("div", {
              className:
                "flex items-center justify-between border-b border-gray-200 px-4 py-3",
              children: [
                (0, V.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    (0, V.jsx)("span", {
                      className: "text-lg",
                      children: p.icon,
                    }),
                    (0, V.jsx)("h3", {
                      className: "text-sm font-semibold text-gray-700",
                      children: p.label,
                    }),
                  ],
                }),
                (0, V.jsx)("button", {
                  onClick: () => u(null),
                  className:
                    "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600",
                  children: (0, V.jsx)(eY.Z, { size: 16 }),
                }),
              ],
            }),
            (0, V.jsx)("div", {
              className: "flex-1 overflow-y-auto p-4",
              children: (0, V.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, V.jsxs)("div", {
                    children: [
                      (0, V.jsx)("label", {
                        className:
                          "mb-1 block text-xs font-medium text-gray-500",
                        children: "Label",
                      }),
                      (0, V.jsx)("input", {
                        type: "text",
                        value: h.data.label,
                        onChange: (e) => d(h.id, { label: e.target.value }),
                        className:
                          "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      }),
                    ],
                  }),
                  (0, V.jsxs)("div", {
                    children: [
                      (0, V.jsx)("label", {
                        className:
                          "mb-1 block text-xs font-medium text-gray-500",
                        children: "Description",
                      }),
                      (0, V.jsx)("textarea", {
                        value:
                          null !== (e = h.data.description) && void 0 !== e
                            ? e
                            : "",
                        onChange: (e) =>
                          d(h.id, { description: e.target.value }),
                        rows: 2,
                        className:
                          "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      }),
                    ],
                  }),
                  m &&
                    (0, V.jsxs)("div", {
                      children: [
                        (0, V.jsx)("label", {
                          className:
                            "mb-1 block text-xs font-medium text-gray-500",
                          children: "Table Name",
                        }),
                        (0, V.jsx)("input", {
                          type: "text",
                          value:
                            null !== (t = h.data.tableName) && void 0 !== t
                              ? t
                              : "",
                          onChange: (e) =>
                            d(h.id, { tableName: e.target.value }),
                          className:
                            "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                        }),
                      ],
                    }),
                  g &&
                    (0, V.jsxs)(V.Fragment, {
                      children: [
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsx)("label", {
                              className:
                                "mb-1 block text-xs font-medium text-gray-500",
                              children: "Route Path",
                            }),
                            (0, V.jsx)("input", {
                              type: "text",
                              value:
                                null !== (s = h.data.route) && void 0 !== s
                                  ? s
                                  : "",
                              onChange: (e) =>
                                d(h.id, { route: e.target.value }),
                              placeholder: "/api/users",
                              className:
                                "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                            }),
                          ],
                        }),
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsx)("label", {
                              className:
                                "mb-1 block text-xs font-medium text-gray-500",
                              children: "Method",
                            }),
                            (0, V.jsxs)("select", {
                              value:
                                null !== (r = h.data.method) && void 0 !== r
                                  ? r
                                  : "GET",
                              onChange: (e) =>
                                d(h.id, { method: e.target.value }),
                              className:
                                "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              children: [
                                (0, V.jsx)("option", {
                                  value: "GET",
                                  children: "GET",
                                }),
                                (0, V.jsx)("option", {
                                  value: "POST",
                                  children: "POST",
                                }),
                                (0, V.jsx)("option", {
                                  value: "PUT",
                                  children: "PUT",
                                }),
                                (0, V.jsx)("option", {
                                  value: "PATCH",
                                  children: "PATCH",
                                }),
                                (0, V.jsx)("option", {
                                  value: "DELETE",
                                  children: "DELETE",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  f &&
                    (0, V.jsxs)(V.Fragment, {
                      children: [
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsx)("label", {
                              className:
                                "mb-1 block text-xs font-medium text-gray-500",
                              children: "Framework",
                            }),
                            (0, V.jsx)("input", {
                              type: "text",
                              value:
                                null !== (a = h.data.framework) && void 0 !== a
                                  ? a
                                  : "NEXTJS",
                              onChange: (e) =>
                                d(h.id, { framework: e.target.value }),
                              className:
                                "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                            }),
                          ],
                        }),
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsx)("label", {
                              className:
                                "mb-1 block text-xs font-medium text-gray-500",
                              children: "Styling",
                            }),
                            (0, V.jsx)("input", {
                              type: "text",
                              value:
                                null !== (i = h.data.styling) && void 0 !== i
                                  ? i
                                  : "TAILWIND",
                              onChange: (e) =>
                                d(h.id, { styling: e.target.value }),
                              className:
                                "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                            }),
                          ],
                        }),
                      ],
                    }),
                  (0, V.jsxs)("div", {
                    children: [
                      (0, V.jsx)("label", {
                        className:
                          "mb-1 block text-xs font-medium text-gray-500",
                        children: "Region",
                      }),
                      (0, V.jsx)("input", {
                        type: "text",
                        value:
                          null !== (n = h.data.region) && void 0 !== n
                            ? n
                            : "us-east-1",
                        onChange: (e) => d(h.id, { region: e.target.value }),
                        className:
                          "w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, V.jsx)("div", {
              className: "border-t border-gray-200 p-3",
              children: (0, V.jsxs)("button", {
                onClick: () => c(h.id),
                className:
                  "flex w-full items-center justify-center gap-2 rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50",
                children: [(0, V.jsx)(eK.Z, { size: 14 }), "Delete Node"],
              }),
            }),
          ],
        });
      }
      var eJ = s(258),
        eW = s(6446),
        eX = s(1370),
        eQ = s(9048);
      function eq() {
        let e = eP((e) => e.validationErrors),
          t = eP((e) => e.isValid),
          s = eP((e) => e.setSelectedNode),
          [r, a] = (0, Z.useState)(!1),
          i = e.length;
        return (0, V.jsxs)("div", {
          className:
            "absolute bottom-4 left-4 z-10 w-80 rounded-lg border border-gray-200 bg-white shadow-lg",
          children: [
            (0, V.jsxs)("button", {
              onClick: () => a(!r),
              className: "flex w-full items-center justify-between px-4 py-2.5",
              children: [
                (0, V.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    t
                      ? (0, V.jsx)(eJ.Z, {
                          size: 16,
                          className: "text-green-500",
                        })
                      : (0, V.jsx)(eW.Z, {
                          size: 16,
                          className: "text-red-500",
                        }),
                    (0, V.jsx)("span", {
                      className: "text-sm font-medium text-gray-700",
                      children: t
                        ? "Architecture Valid"
                        : "".concat(i, " Error").concat(i > 1 ? "s" : ""),
                    }),
                  ],
                }),
                i > 0 &&
                  (r
                    ? (0, V.jsx)(eX.Z, { size: 16, className: "text-gray-400" })
                    : (0, V.jsx)(eQ.Z, {
                        size: 16,
                        className: "text-gray-400",
                      })),
              ],
            }),
            r &&
              i > 0 &&
              (0, V.jsx)("div", {
                className:
                  "max-h-60 overflow-y-auto border-t border-gray-200 px-4 py-2",
                children: (0, V.jsx)("ul", {
                  className: "space-y-2",
                  children: e.map((e, t) =>
                    (0, V.jsxs)(
                      "li",
                      {
                        onClick: () => e.nodeId && s(e.nodeId),
                        className:
                          "cursor-pointer rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 hover:bg-red-100",
                        children: [
                          (0, V.jsx)("div", {
                            className: "font-medium",
                            children: e.code,
                          }),
                          (0, V.jsx)("div", {
                            className: "mt-0.5 text-red-500",
                            children: e.message,
                          }),
                        ],
                      },
                      "".concat(e.code, "-").concat(t),
                    ),
                  ),
                }),
              }),
          ],
        });
      }
      let e$ = (0, z.Ue)((e) => ({
        isDeploying: !1,
        progress: null,
        result: null,
        cloudConfig: null,
        setCloudConfig: (t) => e({ cloudConfig: t }),
        startDeploy: () => e({ isDeploying: !0, progress: null, result: null }),
        updateProgress: (t) => e({ progress: t }),
        setResult: (t) => e({ isDeploying: !1, result: t }),
        reset: () => e({ isDeploying: !1, progress: null, result: null }),
      }));
      var e0 = s(6990),
        e1 = s(1376),
        e2 = s(3721);
      let e5 = {
        idle: "Idle",
        generating: "Generating Artifacts",
        "creating-repo": "Creating GitHub Repository",
        "pushing-files": "Pushing Files to GitHub",
        "linking-vercel": "Linking to Vercel",
        "deploying-vercel": "Deploying to Vercel",
        "provisioning-supabase": "Provisioning Supabase Database",
        "configuring-env": "Configuring Environment Variables",
        complete: "Deployment Complete",
        failed: "Deployment Failed",
      };
      function e4() {
        var e, t;
        let [s, r] = (0, Z.useState)(!1),
          [a, i] = (0, Z.useState)("my-project"),
          n = eP((e) => e.isValid),
          o = eP((e) => e.nodes.length),
          l = e$((e) => e.cloudConfig),
          {
            deploy: d,
            isDeploying: c,
            progress: u,
            result: h,
          } = (function () {
            let e = e$((e) => e.isDeploying),
              t = e$((e) => e.progress),
              s = e$((e) => e.result),
              r = e$((e) => e.cloudConfig),
              a = e$((e) => e.startDeploy),
              i = e$((e) => e.updateProgress),
              n = e$((e) => e.setResult),
              o = e$((e) => e.reset),
              l = eP((e) => e.toProjectConfig);
            return {
              deploy: (0, Z.useCallback)(
                async (e) => {
                  if (!r)
                    return {
                      success: !1,
                      error:
                        "Cloud config not set. Configure GitHub, Vercel, and Supabase tokens first.",
                    };
                  a();
                  try {
                    i({
                      step: "generating",
                      message: "Generating project artifacts...",
                      percentage: 5,
                    });
                    let t = l(e),
                      s = new Q(),
                      a = new es(s),
                      o = ((e) => {
                        var t;
                        let s =
                          null === (t = e.entities) || void 0 === t
                            ? void 0
                            : t.map((e) => {
                                var t, s;
                                let r =
                                  null === (t = e.fields) || void 0 === t
                                    ? void 0
                                    : t.map((e) => new J(e.name, e.type, {}));
                                return new W(e.name, null != r ? r : [], {
                                  features:
                                    null !== (s = e.features) && void 0 !== s
                                      ? s
                                      : [],
                                });
                              });
                        return new X(e.name, {
                          entities: null != s ? s : [],
                          architecture: e.architecture,
                          frontend: e.frontend,
                          infrastructure: e.infrastructure,
                        });
                      })(t),
                      d = o.validate();
                    if (!d.valid)
                      throw Error(
                        "Project validation failed: ".concat(
                          d.errors.map((e) => e.message).join(", "),
                        ),
                      );
                    let c = await a.generate({
                      project: o,
                      outputDir: "./generated",
                    });
                    if (!c.success && c.errors.length > 0)
                      throw Error(
                        "Generation failed: ".concat(
                          c.errors.map((e) => e.message).join(", "),
                        ),
                      );
                    let u = c.artifacts,
                      h = new eM({
                        projectName: e,
                        config: r,
                        artifacts: u,
                        description: t.description,
                        onProgress: (e) => i(e),
                      }),
                      p = await h.execute();
                    return (n(p), p);
                  } catch (t) {
                    let e = {
                      success: !1,
                      error: t instanceof Error ? t.message : String(t),
                    };
                    return (n(e), e);
                  }
                },
                [r, a, i, n, l],
              ),
              isDeploying: e,
              progress: t,
              result: s,
              reset: o,
              cloudConfig: r,
            };
          })(),
          p = async () => {
            (r(!0), await d(a));
          },
          m =
            null !== (e = null == u ? void 0 : u.step) && void 0 !== e
              ? e
              : "idle",
          g =
            null !== (t = null == u ? void 0 : u.percentage) && void 0 !== t
              ? t
              : 0;
        return (0, V.jsxs)(V.Fragment, {
          children: [
            (0, V.jsxs)("button", {
              onClick: p,
              disabled: !n || 0 === o || c,
              className:
                "flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300",
              children: [
                c
                  ? (0, V.jsx)(e0.Z, { size: 16, className: "animate-spin" })
                  : (0, V.jsx)(e1.Z, { size: 16 }),
                "Deploy to Cloud",
              ],
            }),
            s &&
              (0, V.jsx)("div", {
                className:
                  "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                children: (0, V.jsxs)("div", {
                  className:
                    "w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl",
                  children: [
                    (0, V.jsxs)("div", {
                      className: "mb-4 flex items-center justify-between",
                      children: [
                        (0, V.jsx)("h2", {
                          className: "text-lg font-semibold text-gray-800",
                          children: "Cloud Deployment",
                        }),
                        (0, V.jsx)("button", {
                          onClick: () => !c && r(!1),
                          className:
                            "rounded p-1 text-gray-400 hover:bg-gray-100",
                          disabled: c,
                          children: (0, V.jsx)(eY.Z, { size: 20 }),
                        }),
                      ],
                    }),
                    !c &&
                      !h &&
                      (0, V.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, V.jsxs)("div", {
                            children: [
                              (0, V.jsx)("label", {
                                className:
                                  "mb-1 block text-sm font-medium text-gray-600",
                                children: "Project Name",
                              }),
                              (0, V.jsx)("input", {
                                type: "text",
                                value: a,
                                onChange: (e) => i(e.target.value),
                                className:
                                  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                              }),
                            ],
                          }),
                          !l &&
                            (0, V.jsxs)("div", {
                              className:
                                "flex items-center gap-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-600",
                              children: [
                                (0, V.jsx)(eW.Z, { size: 16 }),
                                "Cloud tokens not configured. Set GitHub, Vercel, and Supabase tokens first.",
                              ],
                            }),
                          (0, V.jsx)("button", {
                            onClick: p,
                            disabled: !l,
                            className:
                              "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300",
                            children: "Start Deployment",
                          }),
                        ],
                      }),
                    c &&
                      (0, V.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, V.jsx)("div", {
                            className: "space-y-2",
                            children: Object.keys(e5)
                              .filter((e) => "idle" !== e && "failed" !== e)
                              .map((e) => {
                                var t;
                                let s = m === e,
                                  r =
                                    u &&
                                    g >
                                      (null !==
                                        (t = {
                                          idle: 0,
                                          generating: 5,
                                          "creating-repo": 10,
                                          "pushing-files": 25,
                                          "linking-vercel": 40,
                                          "deploying-vercel": 55,
                                          "provisioning-supabase": 60,
                                          "configuring-env": 80,
                                          complete: 100,
                                          failed: 0,
                                        }[e]) && void 0 !== t
                                        ? t
                                        : 0);
                                return (0, V.jsxs)(
                                  "div",
                                  {
                                    className: "flex items-center gap-3",
                                    children: [
                                      (0, V.jsx)("div", {
                                        className:
                                          "flex h-6 w-6 items-center justify-center rounded-full text-xs ".concat(
                                            s
                                              ? "bg-blue-600 text-white"
                                              : r
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-200 text-gray-400",
                                          ),
                                        children: s
                                          ? (0, V.jsx)(e0.Z, {
                                              size: 12,
                                              className: "animate-spin",
                                            })
                                          : r
                                            ? (0, V.jsx)(eJ.Z, { size: 12 })
                                            : "",
                                      }),
                                      (0, V.jsx)("span", {
                                        className: "text-sm ".concat(
                                          s
                                            ? "font-medium text-gray-800"
                                            : r
                                              ? "text-gray-600"
                                              : "text-gray-400",
                                        ),
                                        children: e5[e],
                                      }),
                                    ],
                                  },
                                  e,
                                );
                              }),
                          }),
                          (0, V.jsx)("div", {
                            className:
                              "h-2 overflow-hidden rounded-full bg-gray-200",
                            children: (0, V.jsx)("div", {
                              className:
                                "h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500",
                              style: { width: "".concat(g, "%") },
                            }),
                          }),
                          (0, V.jsx)("p", {
                            className: "text-center text-sm text-gray-500",
                            children: null == u ? void 0 : u.message,
                          }),
                        ],
                      }),
                    !c &&
                      h &&
                      (0, V.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          h.success
                            ? (0, V.jsxs)(V.Fragment, {
                                children: [
                                  (0, V.jsxs)("div", {
                                    className:
                                      "flex items-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700",
                                    children: [
                                      (0, V.jsx)(eJ.Z, { size: 20 }),
                                      (0, V.jsx)("span", {
                                        className: "font-medium",
                                        children: "Deployment Successful!",
                                      }),
                                    ],
                                  }),
                                  (0, V.jsxs)("div", {
                                    className: "space-y-2",
                                    children: [
                                      h.githubUrl &&
                                        (0, V.jsx)(e3, {
                                          label: "GitHub",
                                          url: h.githubUrl,
                                        }),
                                      h.vercelUrl &&
                                        (0, V.jsx)(e3, {
                                          label: "Vercel",
                                          url: h.vercelUrl,
                                        }),
                                      h.supabaseUrl &&
                                        (0, V.jsx)(e3, {
                                          label: "Supabase",
                                          url: h.supabaseUrl,
                                        }),
                                    ],
                                  }),
                                ],
                              })
                            : (0, V.jsxs)("div", {
                                className:
                                  "flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600",
                                children: [
                                  (0, V.jsx)(eW.Z, { size: 20 }),
                                  (0, V.jsx)("span", { children: h.error }),
                                ],
                              }),
                          (0, V.jsx)("button", {
                            onClick: () => r(!1),
                            className:
                              "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
                            children: "Close",
                          }),
                        ],
                      }),
                  ],
                }),
              }),
          ],
        });
      }
      function e3(e) {
        let { label: t, url: s } = e;
        return (0, V.jsxs)("a", {
          href: s,
          target: "_blank",
          rel: "noopener noreferrer",
          className:
            "flex items-center justify-between rounded-md border border-gray-200 px-4 py-2.5 text-sm hover:bg-gray-50",
          children: [
            (0, V.jsx)("span", {
              className: "font-medium text-gray-700",
              children: t,
            }),
            (0, V.jsxs)("div", {
              className: "flex items-center gap-2 text-blue-600",
              children: [
                (0, V.jsx)("span", { className: "truncate", children: s }),
                (0, V.jsx)(e2.Z, { size: 14 }),
              ],
            }),
          ],
        });
      }
      var e6 = s(6719),
        e7 = s(6593),
        e8 = s(4384);
      function e9(e) {
        let { roomId: t } = e,
          { peers: s, isConnected: r } = (function (e, t) {
            let [s, r] = (0, Z.useState)(null),
              [a, i] = (0, Z.useState)([]),
              [n, o] = (0, Z.useState)(!1);
            (0, Z.useEffect)(() => {
              if (!e) return;
              let t = new eD({ roomId: e, password: void 0 });
              return (
                t.onPresence((e) => i(e)),
                t
                  .connect()
                  .then(() => o(!0))
                  .catch(() => o(!1)),
                r(t),
                () => {
                  (t.disconnect(), r(null), o(!1), i([]));
                }
              );
            }, [e, void 0]);
            let l = (0, Z.useCallback)(
                (e) => {
                  null == s || s.updateCursor(e);
                },
                [s],
              ),
              d = (0, Z.useCallback)(
                (e) => {
                  null == s || s.setSelectedNode(e);
                },
                [s],
              );
            return {
              provider: s,
              peers: a,
              isConnected: n,
              updateCursor: l,
              setSelectedNode: d,
            };
          })(t);
        return (0, V.jsxs)("div", {
          className: "flex items-center gap-2",
          children: [
            (0, V.jsxs)("div", {
              className: "flex items-center gap-1 text-xs ".concat(
                r ? "text-green-600" : "text-gray-400",
              ),
              children: [
                r
                  ? (0, V.jsx)(e6.Z, { size: 14 })
                  : (0, V.jsx)(e7.Z, { size: 14 }),
                (0, V.jsx)("span", { children: r ? "Connected" : "Offline" }),
              ],
            }),
            s.length > 0 &&
              (0, V.jsxs)("div", {
                className: "flex items-center gap-1",
                children: [
                  (0, V.jsx)(e8.Z, { size: 14, className: "text-gray-400" }),
                  (0, V.jsxs)("div", {
                    className: "flex -space-x-2",
                    children: [
                      s
                        .slice(0, 5)
                        .map((e) =>
                          (0, V.jsx)(
                            "div",
                            {
                              className:
                                "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-xs font-medium text-white shadow-sm",
                              style: { backgroundColor: e.color },
                              title: e.name,
                              children: e.name.slice(-2).toUpperCase(),
                            },
                            e.id,
                          ),
                        ),
                      s.length > 5 &&
                        (0, V.jsxs)("div", {
                          className:
                            "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-400 text-xs font-medium text-white",
                          children: ["+", s.length - 5],
                        }),
                    ],
                  }),
                ],
              }),
          ],
        });
      }
      var te = s(7549),
        tt = s(7643),
        ts = s(6688),
        tr = s(7474);
      function ta() {
        let [e, t] = (0, Z.useState)(!1),
          [s] = (0, Z.useState)(() => (0, eB.x0)(10)),
          [r, a] = (0, Z.useState)(""),
          [i, n] = (0, Z.useState)(!1),
          o = ""
            .concat(window.location.origin, "?room=")
            .concat(s)
            .concat(r ? "&pwd=".concat(r) : "");
        return (0, V.jsxs)(V.Fragment, {
          children: [
            (0, V.jsxs)("button", {
              onClick: () => t(!0),
              className:
                "flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
              children: [(0, V.jsx)(te.Z, { size: 16 }), "Share"],
            }),
            e &&
              (0, V.jsx)("div", {
                className:
                  "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
                children: (0, V.jsxs)("div", {
                  className:
                    "w-full max-w-md rounded-xl bg-white p-6 shadow-2xl",
                  children: [
                    (0, V.jsx)("h2", {
                      className: "mb-4 text-lg font-semibold text-gray-800",
                      children: "Share Architecture",
                    }),
                    (0, V.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsxs)("label", {
                              className:
                                "mb-1 block text-sm font-medium text-gray-600",
                              children: [
                                (0, V.jsx)(tt.Z, {
                                  size: 14,
                                  className: "mr-1 inline",
                                }),
                                "E2EE Password (optional)",
                              ],
                            }),
                            (0, V.jsx)("input", {
                              type: "password",
                              value: r,
                              onChange: (e) => a(e.target.value),
                              placeholder: "Shared secret for encryption",
                              className:
                                "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
                            }),
                          ],
                        }),
                        (0, V.jsxs)("div", {
                          children: [
                            (0, V.jsx)("label", {
                              className:
                                "mb-1 block text-sm font-medium text-gray-600",
                              children: "Share Link",
                            }),
                            (0, V.jsxs)("div", {
                              className: "flex gap-2",
                              children: [
                                (0, V.jsx)("input", {
                                  type: "text",
                                  readOnly: !0,
                                  value: o,
                                  className:
                                    "flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-600",
                                }),
                                (0, V.jsxs)("button", {
                                  onClick: () => {
                                    (navigator.clipboard.writeText(o),
                                      n(!0),
                                      setTimeout(() => n(!1), 2e3));
                                  },
                                  className:
                                    "flex items-center gap-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700",
                                  children: [
                                    i
                                      ? (0, V.jsx)(ts.Z, { size: 16 })
                                      : (0, V.jsx)(tr.Z, { size: 16 }),
                                    i ? "Copied" : "Copy",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, V.jsxs)("div", {
                          className:
                            "rounded-md bg-blue-50 px-4 py-3 text-xs text-blue-600",
                          children: [
                            "Collaborators with this link can edit the architecture in real-time.",
                            r && " All communication is end-to-end encrypted.",
                          ],
                        }),
                        (0, V.jsx)("button", {
                          onClick: () => t(!1),
                          className:
                            "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50",
                          children: "Close",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
          ],
        });
      }
      function ti() {
        let [e] = (0, Z.useState)(() =>
          "sbc-".concat(Math.random().toString(36).slice(2, 10)),
        );
        return (0, V.jsxs)("div", {
          className: "flex h-screen flex-col overflow-hidden bg-gray-50",
          children: [
            (0, V.jsxs)("header", {
              className:
                "flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm",
              children: [
                (0, V.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, V.jsxs)("h1", {
                      className: "text-lg font-bold text-gray-800",
                      children: [
                        "SBC ",
                        (0, V.jsx)("span", {
                          className: "text-blue-600",
                          children: "ASP",
                        }),
                      ],
                    }),
                    (0, V.jsx)("span", {
                      className:
                        "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500",
                      children: "Architecture Design Platform",
                    }),
                  ],
                }),
                (0, V.jsxs)("div", {
                  className: "flex items-center gap-3",
                  children: [
                    (0, V.jsx)(Z.Suspense, {
                      fallback: (0, V.jsx)("div", {
                        className: "text-xs text-gray-400",
                        children: "Loading...",
                      }),
                      children: (0, V.jsx)(e9, { roomId: e }),
                    }),
                    (0, V.jsx)("div", { className: "h-6 w-px bg-gray-200" }),
                    (0, V.jsx)(ta, {}),
                    (0, V.jsx)(e4, {}),
                  ],
                }),
              ],
            }),
            (0, V.jsxs)("div", {
              className: "flex flex-1 overflow-hidden",
              children: [
                (0, V.jsx)(eZ, {}),
                (0, V.jsxs)("div", {
                  className: "relative flex-1",
                  children: [(0, V.jsx)(eV, {}), (0, V.jsx)(eq, {})],
                }),
                (0, V.jsx)(ez, {}),
              ],
            }),
          ],
        });
      }
    },
  },
  function (e) {
    (e.O(0, [664, 672, 296, 395, 869, 753, 744], function () {
      return e((e.s = 8161));
    }),
      (_N_E = e.O()));
  },
]);
