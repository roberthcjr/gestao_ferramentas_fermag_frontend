import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(6, "O nome do usuário deve ter pelo menos 6 caracteres"),
  surname: z.string().optional(),
  username: z.string(),
  password: z.string(),
  job: z.string(),
  section: z.string(),
});
