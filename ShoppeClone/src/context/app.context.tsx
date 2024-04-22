import { createContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenToLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchase: ExtendedPurchase[]
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const intialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenToLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null
}

export const AppContext = createContext<AppContextInterface>(intialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(intialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(intialAppContext.profile)
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(intialAppContext.extendedPurchase)
  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile, extendedPurchase, setExtendedPurchase }}
    >
      {children}
    </AppContext.Provider>
  )
}
