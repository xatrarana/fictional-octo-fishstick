import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const roles = ['admin', 'user'];

  const upsertedRoles = await Promise.all(
    roles.map(role =>
      prisma.role.upsert({
        where: { name: role },
        update: {},
        create: { name: role },
      })
    )
  );

  const adminRole = upsertedRoles.find(role => role.name === 'admin');
  if (adminRole) {
    const adminUser = await prisma.user.upsert({
      where: { email: 'dev.chhatrarana@gmail.com' },
      update: {},
      create: {
        name:"Chhatra Rana",
        username:"chhatrarana20",
        createdAt:new Date().toISOString(),
        email: 'dev.chhatrarana@gmail.com',
        passwordHash: bcrypt.hashSync('Dev#pass123', 10),
        roleId: adminRole.id,
      },
    });

    console.log({ adminUser });
  } else {
    console.error('Admin role not found');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
