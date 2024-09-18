import axios from "axios"
import { localStorageKeys } from "../constants/localStorageKeys"
import { IApiResponse } from "../interfaces/IApiResponse"
import { ILocalStorageService } from "../interfaces/ILocalStorageService"

const PRODUCTION_ENDPOINT = "https://api.my-search-console.com"
const DEVELOPMENT_ENDPOINT = "http://localhost:3000"

export class ApiService {
  constructor(private localStorageService: ILocalStorageService) {
    axios.defaults.validateStatus = function (status) {
      return status < 500
    }
  }

  private endpoint: string =
    process.env.NODE_ENV === "production"
      ? PRODUCTION_ENDPOINT
      : DEVELOPMENT_ENDPOINT

  get<T>(url: string) {
    const headers = {
      Authorization:
        "Bearer " + this.localStorageService.get(localStorageKeys.TOKEN_KEY),
    }

    return axios.get<IApiResponse<T>>(`${this.endpoint}${url}`, {
      headers,
    })
  }

  post<T>(url: string, data: any) {
    return axios.post<IApiResponse<T>>(`${this.endpoint}${url}`, data, {
      headers: {
        Authorization:
          "Bearer " + this.localStorageService.get(localStorageKeys.TOKEN_KEY),
      },
    })
  }

  put<T>(url: string, data: any) {
    return axios.put<IApiResponse<T>>(`${this.endpoint}${url}`, data, {
      headers: {
        Authorization:
          "Bearer " + this.localStorageService.get(localStorageKeys.TOKEN_KEY),
      },
    })
  }

  delete<T>(url: string, data: any) {
    return axios.delete<IApiResponse<T>>(`${this.endpoint}${url}`, {
      data,
      headers: {
        Authorization:
          "Bearer " + this.localStorageService.get(localStorageKeys.TOKEN_KEY),
      },
    })
  }
}
