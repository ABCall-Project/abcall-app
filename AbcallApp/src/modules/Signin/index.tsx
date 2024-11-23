/* eslint-disable react/react-in-jsx-scope */
import { HeaderLanguage } from '@components/Signin/HeaderLanguage';
import { useAuth } from '@contexts/AuthContext';
import {Button, View, Text } from 'react-native';
import { Logo } from '@components/Signin/Logo';
import { Tabs } from '@components/Signin/Tabs';
import { FormLogin } from '@components/Signin/Form';



const Signin = () => {

    const authContext= useAuth();
    if (!authContext) {
        return null;
    }
    const {isLoggedIn, setLoggedIn} = authContext;
    return (
      <View>
        <HeaderLanguage/>
        <Logo/>
        <Tabs/>
        <FormLogin/>
        <Text>{isLoggedIn ? '¡Ya estás autenticado!' : 'Por favor, inicia sesión'}</Text>
        <Button title="Iniciar Sesión" onPress={() => setLoggedIn(true)} />
      </View>
    );
};


export {Signin};
