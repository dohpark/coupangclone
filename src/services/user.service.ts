import axios from "axios";
import cookies from "js-cookie";
import HttpClient from "./HttpClient";

class UserService extends HttpClient {
  constructor() {
    super();
  }

  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await this.instance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async read(id: number) {
    const { data } = await this.instance.get(`/users/${id}`);

    return data;
  }
}

export default new UserService();
