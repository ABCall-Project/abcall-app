/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View style={styles.form}>
        <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    form: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#090041',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginStart:30,
        marginEnd:30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export { FormLogin };
