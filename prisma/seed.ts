import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const main = async () => {
  // Удаление всех книг перед удалением пользователей
  await prisma.book.deleteMany();
  
  // Удаление всех пользователей
  await prisma.user.deleteMany();

  const hashedAdminPassword = await bcrypt.hash('adminpassword', 10);
  const hashedUserPassword = await bcrypt.hash('userpassword', 10);

  // Создание администратора
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      role: 0,
    },
  });

  // Создание обычного пользователя
  const user = await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@example.com',
      password: hashedUserPassword,
      role: 1,
    },
  });

  // Создание книг
  await prisma.book.createMany({
    data: [
      {
        title: 'Book 1',
        author: 'Author 1',
        publicationDate: new Date('2023-01-01'),
        genres: ['Genre1'],
        createdById: admin.id,
      },
      {
        title: 'Book 2',
        author: 'Author 2',
        publicationDate: new Date('2023-01-02'),
        genres: ['Genre2'],
        createdById: admin.id,
      },
      {
        title: 'Book 3',
        author: 'Author 3',
        publicationDate: new Date('2023-01-03'),
        genres: ['Genre3'],
        createdById: admin.id,
      },
      {
        title: 'Book 4',
        author: 'Author 4',
        publicationDate: new Date('2023-01-04'),
        genres: ['Genre4'],
        createdById: admin.id,
      },
      {
        title: 'Book 5',
        author: 'Author 5',
        publicationDate: new Date('2023-01-05'),
        genres: ['Genre5'],
        createdById: admin.id,
      },
    ],
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
