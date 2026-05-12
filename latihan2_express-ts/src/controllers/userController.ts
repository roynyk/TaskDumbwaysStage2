import { Request, Response } from "express";

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
