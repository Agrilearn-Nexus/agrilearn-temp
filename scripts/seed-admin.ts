import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { Password } from "@/utils/password-generator";

const adminEmail = process.env.ALLOWED_EMAIL;

if (!adminEmail) {
  throw new Error(`Admin Email is required for this action`);
}

async function main() {
  const password = Password.generatePassword({
    length: 12,
    excludeAmbiguous: true,
  });
  await prisma?.user.upsert({
    create: {
      name: `Super Admin`,
      email: adminEmail,
      role: "ADMIN",
      password,
    },
    update: {
      role: "ADMIN",
    },
    where: {
      email: adminEmail,
    },
  });
}

main()
  .catch((e) => console.log(e))
  .then(() => console.log(`An Admin with ${adminEmail} created`));
