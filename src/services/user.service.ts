import cookies from "js-cookie";
import HttpClientAxios from "./HttpClientAxios";

class UserService extends HttpClientAxios {
  constructor() {
    super();
  }

  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const { data } = await this.useGet("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("me", data);

    return data;
  }

  async read(id: number) {
    const { data } = await this.useGet(`/users/${id}`);
    console.log("read", data);

    return data;
  }
}

export default new UserService();
