import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn,setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn,setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('AuthContext:', context); // Depuración: Verifica el contexto

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
