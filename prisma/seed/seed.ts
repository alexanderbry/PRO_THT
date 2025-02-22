import { prisma } from "../../src/helpers/prisma";
import data from "../../src/data/UserData.json";
import { hashPassword } from "../../src/helpers/bcrypt";

async function main() {
    for (const user of data) {
        const hashedPassword = await hashPassword(user.password);

        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });
    }
    console.log("Seeding completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
