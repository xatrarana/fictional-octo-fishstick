import { db } from "@/lib/db";

export async function seedData() {
  await db.user.create({
    data: {
      email:"dev.chhatrarana@gmail.com",
      emailVerified: new Date().toISOString(),
      name:"chhatra rana",
      username:"chhatrarana",
      createdAt: new Date().toISOString(),
      passwordHash:"$2a$10$SObWgpu5PSeFqDStS11sOe89j8V4VAilSjmFZ996478WvGg5D4JJC",
    },
  });

}
