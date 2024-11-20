import React from 'react';
import { Layout } from '@app/Layout';
import { AuthProvider } from './contexts/AuthContext';

function App(): React.JSX.Element {

  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

export default App;
