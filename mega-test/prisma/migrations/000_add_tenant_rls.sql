-- Multi-tenancy RLS Policies for mega-tech-platform
-- Apply after running prisma migrate dev


-- RLS for user
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_tenant_isolation" ON "user"
  USING ("tenantId" = current_setting('app.current_tenant', true));

CREATE POLICY "user_tenant_insert" ON "user"
  WITH CHECK ("tenantId" = current_setting('app.current_tenant', true));


-- RLS for organization
ALTER TABLE "organization" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "organization_tenant_isolation" ON "organization"
  USING ("tenantId" = current_setting('app.current_tenant', true));

CREATE POLICY "organization_tenant_insert" ON "organization"
  WITH CHECK ("tenantId" = current_setting('app.current_tenant', true));

