import axios from "axios";
import cookies from "js-cookie";

const apiHost = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`
})

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

class AuthService {
  /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
  async refresh() {
    const refreshToken = cookies.get("refreshToken"); // undefined 반환할 수 있는 것이 마음에 안듬
    if (!refreshToken) {
      return; // undefined 반환 마음에 안듬
    }

    const { data } = await apiHost.post(
      "/auth/refresh",
      null,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    ); // 먼가 안예쁨. data 타입 any 괜찮은가

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
  async signup(
    email: string,
    password: string,
    name: string,
    phoneNumber: string,
    agreements: SignupAgreements
  ) { // 타입 설정 미리 할 수 있지 않을까
    const { data } = await apiHost.post(
      "/auth/signup",
      { email, password, name, phoneNumber, agreements }
    ); // 먼가 복잡함. 데이터 타입 any 괜찮은가

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }

  /** 이미 생성된 계정의 토큰을 발급받습니다. */
  async login(email: string, password: string) {
    const { data } = await apiHost.post(
      "/auth/login",
      { email, password }
    ); // 위와 유사한 문제

    cookies.set("accessToken", data.access, { expires: 1 });
    cookies.set("refreshToken", data.refresh, { expires: 7 });
  }
}

// 원본
// class AuthService {
//   /** refreshToken을 이용해 새로운 토큰을 발급받습니다. */
//   async refresh() {
//     const refreshToken = cookies.get("refreshToken");
//     if (!refreshToken) {
//       return;
//     }

//     const { data } = await axios.post(
//       process.env.NEXT_PUBLIC_API_HOST + "/auth/refresh",
//       null,
//       {
//         headers: {
//           Authorization: `Bearer ${refreshToken}`,
//         },
//       }
//     );

//     cookies.set("accessToken", data.access, { expires: 1 });
//     cookies.set("refreshToken", data.refresh, { expires: 7 });
//   }

//   /** 새로운 계정을 생성하고 토큰을 발급받습니다. */
//   async signup(
//     email: string,
//     password: string,
//     name: string,
//     phoneNumber: string,
//     agreements: SignupAgreements
//   ) {
//     const { data } = await axios.post(
//       process.env.NEXT_PUBLIC_API_HOST + "/auth/signup",
//       { email, password, name, phoneNumber, agreements }
//     );

//     cookies.set("accessToken", data.access, { expires: 1 });
//     cookies.set("refreshToken", data.refresh, { expires: 7 });
//   }

//   /** 이미 생성된 계정의 토큰을 발급받습니다. */
//   async login(email: string, password: string) {
//     const { data } = await axios.post(
//       process.env.NEXT_PUBLIC_API_HOST + "/auth/login",
//       { email, password }
//     );

//     cookies.set("accessToken", data.access, { expires: 1 });
//     cookies.set("refreshToken", data.refresh, { expires: 7 });
//   }
// }

export default new AuthService();
