import React, { createContext, useState, useContext, useEffect } from 'react'

interface User {
  id: number
  name: string
  email: string
}

export interface AuthContextProps {
  authToken: string | null
  setAuthToken: (token: string) => void
  user: User | null
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [authToken, setAuthTokenState] = useState<string | null>(
    localStorage.getItem('authToken') || null
  )
  const [user, setUserState] = useState<User | null>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  )

  const handleSetAuthToken = (token: string) => {
    setAuthTokenState(token)
    localStorage.setItem('authToken', token)
  }

  const handleSetUser = (user: User | null) => {
    setUserState(user)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user') // Clear user from localStorage on logout
    }
  }

  const clearAuth = () => {
    setAuthTokenState(null)
    setUserState(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  useEffect(() => {
    if (!authToken) {
      clearAuth()
    }
  }, [authToken])

  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken: handleSetAuthToken,
        user,
        setUser: handleSetUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export type TAuthContext = ReturnType<typeof useAuth>
