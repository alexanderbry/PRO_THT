import { prisma } from "../helpers/prisma";

export async function findByEmail(email: string) {
    const data = prisma.user.findUnique({
      where: {
        email,
      },
    });

    return data
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
      createdAt: true,
      updatedAt: true,
    }
  });

  return data;
}