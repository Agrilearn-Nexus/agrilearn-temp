import "dotenv/config";
import { prisma } from "@/lib/prisma";

const adminEmail = process.env.ALLOWED_EMAIL;

if (!adminEmail) {
  throw new Error(`Admin Email is required for this action`);
}

async function main() {
  await prisma?.user.upsert({
    create: {
      name: `Super Admin`,
      email: adminEmail,
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
