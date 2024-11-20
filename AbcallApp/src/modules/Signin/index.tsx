/* eslint-disable react/react-in-jsx-scope */
import { useAuth } from '../../../contexts/AuthContext';
import {Button, View, Text } from 'react-native';



const Signin = () => {

    const { isLoggedIn, setLoggedIn } = useAuth();

    return (
      <View>
        <Text>{isLoggedIn ? '¡Ya estás autenticado!' : 'Por favor, inicia sesión'}</Text>
        <Button title="Iniciar Sesión" onPress={() => setLoggedIn(true)} />
      </View>
    );
};


export {Signin};
