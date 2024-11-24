/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image, StyleSheet } from 'react-native';

const HeaderLanguage = () => {
  return (
    <View style={styles.container}>
        <Image source={require('@assets/spanish.png')} style={styles.flag} />
        <Text style={styles.text}>Español</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  flag: {
    width: 53,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
  
});

export { HeaderLanguage };
