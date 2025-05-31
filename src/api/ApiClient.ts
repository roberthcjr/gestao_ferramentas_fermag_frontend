import { getCookie } from "cookies-next/client";

export default class ApiClient {
  api: string = process.env.NEXT_PUBLIC_API ?? "http://localhost:8080";
  headers: Headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${this.getSession()}`,
  });

  get(url: string): Promise<Response> {
    const getRequest = new Request(`${this.api}/${url}`, {
      method: "GET",
      headers: this.headers,
    });
    return fetch(getRequest);
  }

  post(
    url: string,
    body: string | FormData,
    headers?: { "Content-Type": string; Authorization?: string },
  ): Promise<Response> {
    const customHeaders = this.headers;
    if (headers)
      for (const [key, value] of Object.entries(headers)) {
        customHeaders.set(key, value);
      }
    const postRequest = new Request(`${this.api}/${url}`, {
      method: "POST",
      headers: customHeaders,
      body,
    });
    return fetch(postRequest);
  }

  put(url: string, body: string): Promise<Response> {
    const putRequest = new Request(`${this.api}/${url}`, {
      method: "PUT",
      headers: this.headers,
      body,
    });
    return fetch(putRequest);
  }

  delete(url: string): Promise<Response> {
    const deleteRequest = new Request(`${this.api}/${url}`, {
      method: "DELETE",
      headers: this.headers,
    });
    return fetch(deleteRequest);
  }

  getSession(): string | undefined {
    return getCookie("session")?.toString();
  }
}
