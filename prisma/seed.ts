import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Dev-only convenience: blank passwords/PINs so the login forms can be
  // submitted with a single click (prefilled identifier, empty secret).
  const adminPasswordHash = await bcrypt.hash("", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@bookalyzer.test" },
    create: { name: "Admin", email: "admin@bookalyzer.test", passwordHash: adminPasswordHash },
    update: { passwordHash: adminPasswordHash },
  });

  const parentPasswordHash = await bcrypt.hash("", 10);
  const parent = await prisma.parent.upsert({
    where: { email: "parent@bookalyzer.test" },
    create: { name: "Test Parent", email: "parent@bookalyzer.test", passwordHash: parentPasswordHash },
    update: { passwordHash: parentPasswordHash },
  });

  const aniPinHash = await bcrypt.hash("", 10);
  await prisma.child.upsert({
    where: { nickname: "ani_star" },
    create: {
      parentId: parent.id,
      name: "Ani",
      nickname: "ani_star",
      pinHash: aniPinHash,
      age: 8,
      preferredLanguage: "en",
    },
    update: { pinHash: aniPinHash },
  });

  const levonPinHash = await bcrypt.hash("", 10);
  await prisma.child.upsert({
    where: { nickname: "levon_reads" },
    create: {
      parentId: parent.id,
      name: "Levon",
      nickname: "levon_reads",
      pinHash: levonPinHash,
      age: 10,
      preferredLanguage: "en",
    },
    update: { pinHash: levonPinHash },
  });

  console.log("Seed complete.");
  console.log("Admin login: admin@bookalyzer.test / (blank password)");
  console.log("Parent login: parent@bookalyzer.test / (blank password)");
  console.log("Child logins: ani_star / (blank PIN), levon_reads / (blank PIN)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
