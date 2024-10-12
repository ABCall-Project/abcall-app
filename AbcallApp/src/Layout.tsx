import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {global} from '@styles/global';
import {lightTheme} from '@styles/lightTheme';

const Layout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const styles = global(lightTheme);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <SafeAreaView style={styles.container}>
           {children}
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export {Layout};
