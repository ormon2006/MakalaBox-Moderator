import $api, { API_URL } from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponce";


export default class AuthService {
    static async login (username:string, password: string) : Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('jwt/create/', {username, password})
    }

    static async logout()  {
        return $api.delete(`${API_URL}users/{username}`)
    }
}
