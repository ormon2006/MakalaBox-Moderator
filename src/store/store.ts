import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponce";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(boll: boolean) {
    this.isAuth = boll;
  }

  setUser(user: IUser) {
    this.user;
  }

  async login(username: string, password: string) {
    try {
      const response = await AuthService.login(username, password);
      console.log(response);

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    try {
      const refresh = localStorage.getItem("refreshToken");
      if (!refresh) {
        throw new Error("No refresh token found");
      }

      const response = await axios.post<AuthResponse>(
        `${API_URL}jwt/refresh/`,
        {
          refresh: refresh,
          withCredentials: true,
        }
      );

      localStorage.setItem("token", response.data.access);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log("Error refreshing token:", error.response?.data?.message);
    }
  }
}
