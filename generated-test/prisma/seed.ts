import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding enterprise-saas...');

  // TODO: Seed User
  // TODO: Seed Organization

  console.log("Seed completed.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());