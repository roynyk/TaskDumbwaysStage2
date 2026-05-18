import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something Went Wrong";

    res.status(statusCode).json({
        status: "Error",
        message: message
    });
}