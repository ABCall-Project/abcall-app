/* eslint-disable react/react-in-jsx-scope */
import { View, Image, StyleSheet,Text } from 'react-native';

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('@assets/signinabcalllogo.png')} style={styles.logo} />
      <Text style={styles.text}>SERVICIO AL CLIENTE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      },
      logo: {
        width: 151,
        height: 107,
        resizeMode: 'contain',
      },
      text: {
        marginTop: 4,
        fontSize: 16,
        color: '#918DBF',
        textAlign: 'center',
      },
});

export { Logo };
