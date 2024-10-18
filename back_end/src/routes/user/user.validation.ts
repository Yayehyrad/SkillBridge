// shared/schema.ts
import { z } from 'zod';

export const userSchema = z.object({
  userName: z.string().min(3, "User name must be at least 3 characters long"),
  userEmail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "admin"]),
});