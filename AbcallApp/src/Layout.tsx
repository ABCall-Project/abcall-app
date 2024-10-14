import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { View } from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {global} from '@styles/global';
import { Header } from '@components/Header';
import { NavigationBottomMenu } from '@components/NavigationBottomMenu';
import {lightTheme} from '@styles/lightTheme';

const Layout: React.FC<{children: React.ReactNode | null}> = ({children}) => {
  const styles = global(lightTheme);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <SafeAreaView style={styles.container}>
          <Header />
            <View style={styles.containerPages}>
              {children}
            </View>
           <NavigationBottomMenu />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export {Layout};
