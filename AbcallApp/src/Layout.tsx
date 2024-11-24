import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {global} from '@styles/global';
import { Header } from '@components/Header';
import { NavigationBottomMenu } from '@components/NavigationBottomMenu';
import {lightTheme} from '@styles/lightTheme';
import { useAuth } from '@contexts/AuthContext';
import { Signin } from '@modules/Signin/index';

const Layout: React.FC<{children: React.ReactNode | null}> = ({children}) => {
  const styles = global(lightTheme);
  const authContext = useAuth();
  if (!authContext) {
    return null;
  }
  const {isLoggedIn} = authContext;
  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <SafeAreaView style={styles.container}>
          {isLoggedIn && <Header />}
            <View style={styles.containerPages}>
              {!isLoggedIn ? <Signin /> : children}
            </View>
            {isLoggedIn && <NavigationBottomMenu />}
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export {Layout};
