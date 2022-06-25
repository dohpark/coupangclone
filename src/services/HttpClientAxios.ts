import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { HTTPClient } from "../../types/service";

// axios 설정
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}`,
});

class HttpClientAxios extends HTTPClient<AxiosInstance> {
  constructor() {
    super(axiosInstance);
    this.initializeResponseInterceptor();
  }

  async usePost<T, D>(url: string, dataObject?: D, config?: AxiosRequestConfig<D>) {
    return await this.instance.post<T, AxiosResponse<T>, D>(url, dataObject, config);
  }

  async useGet(url: string, config?: AxiosRequestConfig<any>) {
    return await this.instance.get(url, config);
  }

  async usePatch<T, D>(url: string, dataObject?: D, config?: AxiosRequestConfig<D>) {
    return await this.instance.patch<T, AxiosResponse<T>, D>(url, dataObject, config);
  }

  async useDelete(url: string, config?: AxiosRequestConfig<any>) {
    return await this.instance.delete(url, config);
  }

  async usePut<T, D>(url: string, dataObject?: D, config?: AxiosRequestConfig<D>) {
    return await this.instance.put<T, AxiosResponse<T>, D>(url, dataObject, config);
  }

  initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      response => response,
      error => {
        // 에러 종류에 따라 일괄적으로 처리 가능
        if (axios.isAxiosError(error)) {
          // axios error 종류 및 status에 따른 일괄적인 처리 가능
        } else {
          // not axios error
        }
        return Promise.reject(error);
      }
    );
  };
}

export default HttpClientAxios;

// https://github.com/axios/axios/issues/1510
// https://minhyeong-jang.github.io/2020/01/08/js-axios-interceptors-error
