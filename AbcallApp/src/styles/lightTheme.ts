import { DefaultTheme, MD3Theme } from 'react-native-paper';

const lightTheme: MD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee',
      background: '#FBFBFF'
    },
  };

  export { lightTheme };
