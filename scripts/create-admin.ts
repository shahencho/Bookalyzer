import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function parseArgs(argv: string[]) {
  const args: Record<string, string> = {};
  for (const raw of argv) {
    const match = raw.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { email, name, password } = args;

  if (!email || !name || !password) {
    console.error(
      'Usage: tsx scripts/create-admin.ts --email=you@example.com --name="Your Name" --password="a-strong-password"'
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.upsert({
    where: { email },
    create: { name, email, passwordHash },
    update: { name, passwordHash },
  });

  console.log(`Admin account ready: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
