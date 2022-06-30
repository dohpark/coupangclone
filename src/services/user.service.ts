import cookies from "js-cookie";
import { HTTPClient } from "../../types/service";

class UserService {
  private httpReqType: HTTPClient<any>;

  constructor(httpReqType: HTTPClient<any>) {
    this.httpReqType = httpReqType;
  }

  async me() {
    const accessToken = cookies.get("accessToken");
    if (!accessToken) {
      return;
    }

    const data = await this.httpReqType.useGet("/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async read(id: number) {
    const data = await this.httpReqType.useGet(`/users/${id}`);

    return data;
  }
}

export default UserService;
