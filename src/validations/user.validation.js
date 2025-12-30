import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  password: z.string().min(4, "Password must be at least 4 characters").optional(),
});
