import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const helloUser = (req: Request, res: Response) => {
  return res.json({
    message: "Hello World!",
  });
};

export const getUserById = (req: Request, res: Response) => {
  const { name } = req.params;
  return res.json({
    message: `Menampilkan data user dengan name ${name}`,
  });
};

export const loginUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  return res.status(201).json({
    message: "User logged in successfully",
    data: {
      name,
      email,
    },
  });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email, name dan password wajib diisi",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar"
      })
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create user",
      error: error,
    });
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    const users = await prisma.user.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          }
        },
      },
    });
    return res.status(200).json({
      message: "Berhasil mengambil semua data user beserta produknya",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data user",
      error: error,
    });
  }
};
