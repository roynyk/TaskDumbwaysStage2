import { z } from "zod";

export const transferPointSchema = z.object({
    senderId: z.coerce.number().int("senderId harus berupa angka bulat"),
    receiverId: z.coerce.number().int("receiverId harus berupa angka bulat"),
    amount: z.coerce.number().positive("Point harus berupa angka positive"),
})