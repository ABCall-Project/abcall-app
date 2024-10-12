import { StyleSheet } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

  const DEFAULT_TEXT_COLOR: string = '#333';

  const global = (theme: MD3Theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: DEFAULT_TEXT_COLOR,
        marginBottom: 12,
      },
      paragraph: {
        fontSize: 16,
        color: DEFAULT_TEXT_COLOR,
        lineHeight: 24,
      },
      button: {
        marginTop: 12,
        backgroundColor: theme.colors.primary,
      },
      icon: {
        color: '#090041',
      }
    });
  
  export { global };