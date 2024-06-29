import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('adminpassword', 8);
  const userPassword = await bcrypt.hash('userpassword', 8);

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 1, // Администратор
    },
  });

  const user = await prisma.user.create({
    data: {
      username: 'user',
      email: 'user@example.com',
      password: userPassword,
      role: 0, // Обычный пользователь
    },
  });

  await prisma.book.createMany({
    data: [
      {
        title: 'Книга 1',
        author: 'Автор 1',
        publicationDate: new Date('2023-01-01'),
        genres: ['Фантастика', 'Приключения'],
        createdById: admin.id,
      },
      {
        title: 'Книга 2',
        author: 'Автор 2',
        publicationDate: new Date('2022-05-15'),
        genres: ['Детектив', 'Триллер'],
        createdById: admin.id,
      },
      {
        title: 'Книга 3',
        author: 'Автор 3',
        publicationDate: new Date('2021-09-10'),
        genres: ['Роман', 'Драма'],
        createdById: admin.id,
      },
      {
        title: 'Книга 4',
        author: 'Автор 4',
        publicationDate: new Date('2020-03-22'),
        genres: ['Научная фантастика'],
        createdById: admin.id,
      },
      {
        title: 'Книга 5',
        author: 'Автор 5',
        publicationDate: new Date('2019-11-30'),
        genres: ['Фэнтези'],
        createdById: admin.id,
      },
    ],
    skipDuplicates: true, // Пропускать дубликаты, если они уже существуют
  });

  console.log('Initial users and books created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
