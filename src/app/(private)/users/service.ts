import ApiClient from "@/api/ApiClient";
import { UserType } from "./types/user-type";

export default class UsersService extends ApiClient {
  endpoint: string = "users";

  async getAll(): Promise<UserType[]> {
    const response: Response = await super.get(this.endpoint);
    return response.json();
  }

  async insertUser(
    { name, surname, username, password, job, section }: UserType,
  ): Promise<void | Error> {
    const response: Response = await super.post(
      this.endpoint,
      JSON.stringify({
        name,
        surname,
        username,
        password,
        job,
        section,
      }),
      { "Content-Type": "application/json"},
    );

    if (!response.ok) throw new Error("Houve um erro na inserção");
  }

  get(id: string): Promise<Response> {
    return super.get(`${this.endpoint}/${id}`);
  }

  post(body: string): Promise<Response> {
    return super.post(this.endpoint, body);
  }

  put(id: string, body: string): Promise<Response> {
    return super.put(`${this.endpoint}/${id}`, body);
  }

  delete(id: string): Promise<Response> {
    return super.delete(`${this.endpoint}/${id}`);
  }
}
