import axios, { AxiosError } from "axios";
import cookies from "js-cookie";
import HttpClient from "./HttpClient";

class AuthService extends HttpClient {
  constructor() {
    super();
  }

  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) {
      return;
    }
    try {
      const { data } = await this.instance.post<CookieData>("/auth/refresh", null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      cookies.set("accessToken", data.access, { expires: 1 });
      cookies.set("refreshToken", data.refresh, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup({ email, password, name, phoneNumber, agreements }: Signup) {
    try {
      const { data } = await this.instance.post<CookieData>("/auth/signup", {
        email,
        password,
        name,
        phoneNumber,
        agreements,
      });

      cookies.set("accessToken", data.access, { expires: 1 });
      cookies.set("refreshToken", data.refresh, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login({ email, password }: Login) {
    try {
      const { data } = await this.instance.post<CookieData>("/auth/login", { email, password });

      cookies.set("accessToken", data.access, { expires: 1 });
      cookies.set("refreshToken", data.refresh, { expires: 7 });
    } catch (error) {
      console.log(error);
    }
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
