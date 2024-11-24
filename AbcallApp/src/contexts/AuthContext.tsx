import React, { createContext, useContext, useState } from 'react';
import { AuthUserResponse } from '@models/AuthUserResponse';

type AuthContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  user: AuthUserResponse | null;
  setUser: (user: AuthUserResponse | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUserResponse | null>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | undefined => {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
