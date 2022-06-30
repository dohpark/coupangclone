import HttpClientAxios from "../services/HttpClientAxios";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import { HTTPClient } from "../../types/service";

class UseRequest {
  private httpReqType: any = null;

  constructor(httpReqType: HTTPClient<any>) {
    this.httpReqType = httpReqType;
  }

  authService = new authService(this.httpReqType);
  userService = new userService(this.httpReqType);
}

export const useRequest = new UseRequest(new HttpClientAxios());
