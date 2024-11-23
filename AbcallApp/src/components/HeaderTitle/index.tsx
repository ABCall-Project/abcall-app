import React from 'react';
import {View, StyleSheet, Image, Text, ImageSourcePropType} from 'react-native';
import {IconButton} from 'react-native-paper';
import {COLORS} from '@styles/colors';
import {useNavigation} from '@react-navigation/native';

type HeaderTitleProps = {
  imagePath?: ImageSourcePropType;
  title: string;
};



const HeaderTitle = ({imagePath, title}: HeaderTitleProps) => {
  const navigation = useNavigation();

  const _goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerContainer}>
      <Image style={styles.logo} source={imagePath} />
      <Text style={styles.title}>{title}</Text>
      <IconButton icon="keyboard-return" iconColor={COLORS.WHITE} size={24} onPress={_goBack} />
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
