import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constant/httpStatusCode.enum'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenToLS, saveAccessTokenToLS, setProfileToLS } from './auth'
import path from 'src/constant/path'

class Http {
  instance: AxiosInstance
  private accessToken: string
  //Tại sao cần phải tạo thêm 1 Instance ở Class, Nếu lúc nào cũng phải lấy Data từ LS.
  //Data trong LS là nó lưu trong ổ cứng, SSD
  //Lưu ở code thì nó lưu trên Ram, lấy ra sẽ rất là nhanh
  // => Tối ưu bằng cách kết hợp lưu trên Ram và LS
  constructor() {
    this.accessToken = getAccessTokenToLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
