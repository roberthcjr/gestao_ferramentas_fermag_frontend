import { z } from "zod";
import { UserSchema } from "../schemas/user-input-schema";

export type UserType = z.infer<typeof UserSchema>;

export type ExtendedUserType = UserType & {
  id: string;
};
