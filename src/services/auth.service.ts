import cookies from "js-cookie";
import { HTTPClient, CookieData, Signup, Login } from "../../types/service";

class AuthService {
  private httpReqType: HTTPClient<any>;

  constructor(HttpReqType: HTTPClient<any>) {
    this.httpReqType = HttpReqType;
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }
    const data = await this.httpReqType.usePost<CookieData, null>("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup({ email, password, name, phoneNumber, agreements }: Signup) {
    const data = await this.httpReqType.usePost<CookieData, Signup>("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login({ email, password }: Login) {
    const data = await this.httpReqType.usePost<CookieData, Login>("/auth/login", { email, password });

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }
}

export default AuthService;
