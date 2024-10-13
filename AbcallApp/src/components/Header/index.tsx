import * as React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

const Header = () => {
  const _goBack = () => console.log('Went back');

  return (
    <Appbar.Header style={styles.containerHeader}>
        <Appbar.Action icon="menu" onPress={_goBack} />
        <Image source={require('@assets/abcalllogo.png')} style={styles.logo} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 100,
    resizeMode: 'contain',
  },
});

export {Header};
