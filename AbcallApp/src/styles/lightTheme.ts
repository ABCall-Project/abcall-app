import { DefaultTheme, MD3Theme } from 'react-native-paper';
import { COLORS } from './colors';

const lightTheme: MD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.PRIMARY,
      background: COLORS.BACKGROUND,
    },
  };

  export { lightTheme };
