import { prisma } from "../dist";
async function main() {
  console.log("Seeding...");
  // Create your prisma here for populating your database
  console.log("Seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
