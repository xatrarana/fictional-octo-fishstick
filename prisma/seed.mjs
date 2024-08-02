import {PrismaClient} from '@prisma/client';
import bcrypt from 'bcryptjs';

const client = new PrismaClient();

async function main() {
  const roles = ['admin', 'user'];

  const upsertedRoles = await Promise.all(
    roles.map(role =>
      client.role.upsert({
        where: { name: role },
        update: {},
        create: { name: role },
      })
    )
  );

  if(upsertedRoles){
    console.log({upsertedRoles});
  }
  else{
    console.error('Roles not found');
  }

  const adminRole = upsertedRoles.find(role => role.name === 'admin');
  if (adminRole) {
    const adminUser = await client.user.upsert({
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


  const smtp = await client.smtp.upsert({
    where: {username:'alert@sysastra.com'},
    update:{},
    create: {
      servername:'mail.sysastra.com',
      port:465,
      username:'alert@sysastra.com',
      password:'qqQhXDcN8xx6',
      fromEmail:'alert@sysastra.com',
      toEmail:'info@tri-jyoti.coop.np',
      displayname:'Trijyoti Credits & Cooperative Ltd.',
    }
  })

  if(smtp){
    console.log({smtp});
  }
  else{
    console.error('SMTP not found');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
