import exp from "constants";
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

export async function updateUser(payload: any) {
  const data = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      fullName: payload.fullName,
      gender: payload.gender,
      dateOfBirth: payload.dateOfBirth,
      createdAt: payload.createdAt,
      updatedAt: new Date(),
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      gender : true,
      dateOfBirth: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return data;
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
}