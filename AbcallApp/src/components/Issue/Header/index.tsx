import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Icon } from 'react-native-paper';
import { COLORS } from '@styles/colors';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={require('@assets/check.png')} />
      <Text style={styles.title}>Nuevo Incidente</Text>
      <Icon source="keyboard-return" color={COLORS.WHITE} size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.PRIMARY,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',

  },
});

export { Header };
