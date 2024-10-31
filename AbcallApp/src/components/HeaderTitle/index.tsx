import React from 'react';
import {View, StyleSheet, Image, Text, ImageSourcePropType} from 'react-native';
import { Icon } from 'react-native-paper';
import {COLORS} from '@styles/colors';

type HeaderTitleProps = {
    imagePath?: ImageSourcePropType,
    title: string,
};


const HeaderTitle = ({ imagePath, title }: HeaderTitleProps) => {
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={imagePath} />
      <Text style={styles.title}>{title}</Text>
      <Icon source="keyboard-return"  color={COLORS.WHITE} size={24}  />
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

export {HeaderTitle};
