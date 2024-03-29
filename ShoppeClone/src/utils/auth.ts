export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const clearAccessTokenToLS = () => {
  localStorage.removeItem('access_token')
}

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''
