import { z } from 'zod';
export const saveGuestbookEntrySchema = z.object({
  userid: z.string().min(1).max(50),
  email: z.string().email(),
  fullname: z.string().min(1).max(50),
  avatar: z.string().url(),
  message: z.string().min(1).max(500),
});

export const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
});

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
  fullname: z.string().min(1).max(50),
});
