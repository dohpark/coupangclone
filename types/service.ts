export abstract class HTTPClient<T> {
  instance: T;

  constructor(instance: T) {
    this.instance = instance;
  }

  abstract usePost<T = any, D = any>(url: string, dataObject?: D, config?: any): Promise<any>;
  abstract useGet<T = any, D = any>(url: string, config?: any): Promise<any>;
  abstract usePut<T = any, D = any>(url: string, dataObject?: D, config?: any): Promise<any>;
  abstract usePatch<T = any, D = any>(url: string, dataObject?: D, config?: any): Promise<any>;
  abstract useDelete<T = any, D = any>(url: string, config?: any): Promise<any>;
}

export interface CookieData {
  access: string;
  refresh: string;
}

export type SignupAgreements = {
  privacy: boolean;
  ad:
    | {
        email: boolean;
        sms: boolean;
        app: boolean;
      }
    | false;
};

export interface Login {
  email: string;
  password: string;
}

export interface Signup extends Login {
  name: string;
  phoneNumber: string;
  agreements: SignupAgreements;
}
