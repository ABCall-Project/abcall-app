import {StyleSheet} from 'react-native';
import type {MD3Theme} from 'react-native-paper';
import { COLORS } from './colors';

const global = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.DEFAULT_TEXT_COLOR,
      marginBottom: 12,
    },
    paragraph: {
      fontSize: 16,
      color: COLORS.DEFAULT_TEXT_COLOR,
      lineHeight: 24,
    },
    button: {
      marginTop: 12,
      backgroundColor: theme.colors.primary,
    },
    icon: {
      color: COLORS.PRIMARY,
    },
    containerPages: {
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
    }
  });

export {global};
