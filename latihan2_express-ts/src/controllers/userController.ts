import { Request, Response, NextFunction } from "express";
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email, name dan password wajib diisi",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
      });
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
  } catch (error: any) {
    error.message = "Failed to create user";
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Berhasil mengambil semua data user beserta produknya",
      data: users,
    });
  } catch (error: any) {
    error.message = "Failed to retrieve users";
    next(error);
  }
};

export const transferPoint = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { senderId, receiverId, amount } = req.body;

  // Konversi amount menjadi number untuk keperluan validasi
  const transferAmount = Number(amount);

  if (!senderId || !receiverId) {
    return res.status(400).json({
      message: "Sender ID dan receiver ID wajib diisi",
    });
  }

  // Sender tidak boleh transfer ke dirinya sendiri
  if (senderId === receiverId) {
    return res.status(400).json({
      message: "Sender tidak boleh transfer ke dirinya sendiri",
    });
  }

  // Amount wajib lebih dari 0
  if (transferAmount <= 0) {
    return res.status(400).json({
      message: "Amount transfer wajib lebih dari 0",
    });
  }

  try {
    // Sender harus memiliki poin yang cukup
    const sender = await prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      return res.status(404).json({
        message: "Sender tidak ditemukan",
      });
    }

    // Cek apakah poin cukup
    if (sender.point < transferAmount) {
      return res.status(400).json({
        message: "Poin tidak cukup untuk melakukan transfer",
      });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: senderId },
        data: { point: { decrement: transferAmount } },
      }),
      prisma.user.update({
        where: { id: receiverId },
        data: { point: { increment: transferAmount } },
      }),
    ]);

    return res.status(200).json({
      message: "Transfer point berhasil",
    });
  } catch (error: any) {
    error.message = "Failed to transfer point";
    next(error);
  }
};
