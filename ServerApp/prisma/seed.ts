import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear previous data (optional)
  await prisma.tasks.deleteMany();
  await prisma.users.deleteMany();

  // Add dummy users
  const alice = await prisma.users.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'abcd'
    },
  });
  const bob = await prisma.users.create({
    data: {
      name: 'Bob', email: 'bob@example.com', password: 'abcd'
    },
  });
  //


  await prisma.tasks.createMany({
    data: [
        {title: "Do something", user_id: alice.id},
        {title: "Make cofee", user_id: bob.id},
        {title: "Nothing more...", user_id: alice.id},
    ]
  });

  console.log('✅ Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
