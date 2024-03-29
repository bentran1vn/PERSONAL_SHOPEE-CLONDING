import { createContext, useState } from 'react'
import { getAccessTokenToLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const intialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(intialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(intialAppContext.isAuthenticated)
  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>
}
