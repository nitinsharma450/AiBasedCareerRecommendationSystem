import { ApiConfigs } from "./ApiConfigs";

export class AuthenticationService {
  public static async isAuthenticated() {
    var token =await this.getToken();
    return !!token;
  }

  public static async getToken() {
    var token: any = localStorage.getItem(ApiConfigs.userLocalStorage);
    if (token) {
      try {
        token = JSON.parse(token);
        token = token.token;
      } catch (error) {
        token = "";
      }
    } else {
      token = "";
    }

    return token;
  }
}
