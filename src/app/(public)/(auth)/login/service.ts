import ApiClient from "@/api/ApiClient";
import { LoginType } from "./model";
import { LoginResponseType } from "@/app/(public)/(auth)/types/auth.type";

export default class AuthenticationService extends ApiClient {
  endpoint: string = "auth";

  async login({ username, password }: LoginType): Promise<LoginResponseType> {
    const res = await super.post(
      `${this.endpoint}/login`,
      JSON.stringify({ username, password }),
      { "Content-Type": "application/json" },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Erro ao fazer login");
    }

    return res.json();
  }
}
