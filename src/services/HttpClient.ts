import axios, { AxiosInstance } from "axios";

class HttpClient {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
    });
    this.initializeResponseInterceptor();
  }

  initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      response => response,
      error => {
        // 에러 종류에 따라 일괄적으로 처리 가능
        if (axios.isAxiosError(error)) {
          // axios error
          // can access to config, request, and response
          // error 종류 및 status에 따른 일괄적인 처리 가능
          return Promise.reject(error);
        } else {
          // stock error
          console.log(error);
        }
      }
    );
  };
}

export default HttpClient;

// https://github.com/axios/axios/issues/1510
// https://minhyeong-jang.github.io/2020/01/08/js-axios-interceptors-error
