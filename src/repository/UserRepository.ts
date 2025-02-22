import { prisma } from "../helpers/prisma";

export async function findByEmail(email: string) {
  const data = prisma.user.findUnique({
    where: {
      email,
    },
  });

  return data;
}

export async function findById(id: number) {
  const data = prisma.user.findUnique({
    where: {
      id,
    },
  });

  return data;
}

export async function createUser(payload: any) {
  const data = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      email: true,
      fullName: true,
      gender: true,
      dateOfBirth: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return data
}

export async function findAllUsers(page: number, pageSize: number) {
  const data = prisma.user.findMany({
    where: {
      role: {
        not: 'admin',
      },
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      gender: true,
      dateOfBirth: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    skip: page,
    take: pageSize,
  });
  return data;
}
