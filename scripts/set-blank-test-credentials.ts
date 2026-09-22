import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// One-off, explicitly requested exception to the "no blank prod passwords"
// rule in docs/deployment/DEPLOYMENT_CHECKLIST.md, for an early test round
// where the admin and one child account need password-less login on the
// live site. Deliberately kept separate from scripts/create-admin.ts so
// that script's length guardrail stays intact for real future admin setup.
async function main() {
  const blankHash = await bcrypt.hash("", 10);

  const admin = await prisma.adminUser.update({
    where: { email: "shahen.grigoryan@gmail.com" },
    data: { passwordHash: blankHash },
  });
  console.log(`Admin blanked: ${admin.email}`);

  const parent = await prisma.parent.upsert({
    where: { email: "parent@bookalyzer.test" },
    create: {
      name: "Test Parent",
      email: "parent@bookalyzer.test",
      passwordHash: await bcrypt.hash(
        Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        10
      ),
    },
    update: {},
  });

  const child = await prisma.child.upsert({
    where: { nickname: "ani_star" },
    create: {
      parentId: parent.id,
      name: "Ani",
      nickname: "ani_star",
      pinHash: blankHash,
      age: 8,
      preferredLanguage: "en",
    },
    update: { pinHash: blankHash },
  });
  console.log(`Child blanked: ${child.nickname}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
