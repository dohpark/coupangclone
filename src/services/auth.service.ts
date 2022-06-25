import cookies from "js-cookie";
import HttpClientAxios from "./HttpClientAxios";

class AuthService extends HttpClientAxios {
  constructor() {
    super();
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }
    const { data } = await this.usePost<CookieData, null>("/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    console.log("refresh", data);

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup({ email, password, name, phoneNumber, agreements }: Signup) {
    const { data } = await this.usePost<CookieData, Signup>("/auth/signup", {
      email,
      password,
      name,
      phoneNumber,
      agreements,
    });
    console.log("signup", data);

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login({ email, password }: Login) {
    const { data } = await this.usePost<CookieData, Login>("/auth/login", { email, password });
    console.log("login", data);

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }
}

interface CookieData {
  access: string;
  refresh: string;
}

type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

interface Login {
  email: string;
  password: string;
}

interface Signup extends Login {
  name: string;
  phoneNumber: string;
  agreements: SignupAgreements;
}

export default new AuthService();
