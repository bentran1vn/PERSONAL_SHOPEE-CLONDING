import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

export const logoutAccount = () => http.post('/logout')
