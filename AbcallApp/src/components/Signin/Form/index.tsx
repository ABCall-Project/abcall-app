/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthService } from '@clients/backendForFrontend/authServices';
import { useAuth } from '@contexts/AuthContext';


const FormLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const authContext = useAuth();

    if (!authContext) {
        return null;
    }

    const { setUser, setLoggedIn } = authContext;

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Error', 'Por favor, complete todos los campos.');
                return;
            }
            const authService = new AuthService();

            const user = await authService.signIn(email, password);
            setUser(user);
            setLoggedIn(true);

        }
        catch (error) {
            Alert.alert('Error', 'Correo o contraseña incorrectos');
        }
    };


    return (
        <View style={styles.form}>
            <TextInput
                testID="email-input"
                label="Correo"
                mode="outlined" 
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                testID="password-input"
                label="Contraseña"
                mode="outlined"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                right={
                    <TextInput.Icon
                        testID="password-visibility-icon"
                        icon={passwordVisible ? 'eye-off' : 'eye'}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                }
            />
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity >
                <Text style={styles.linkForgotPassword}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <View style={styles.row}>
                <Text style={styles.textLabel}>
                    ¿Aún no estás registrado? &nbsp;
                </Text> 
                <TouchableOpacity >
                    <Text style={styles.link}>Ver Planes</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
        marginEnd:10,
        marginStart:10,
    },
    button: {
        backgroundColor: '#090041',
        paddingVertical: 8,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginStart: 30,
        marginEnd: 30,
        marginTop:20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkForgotPassword:{
        color: '#1AC3D2',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        verticalAlign:'middle',
        marginTop: 20,
    },
    link: {
        color: '#1AC3D2',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        verticalAlign:'middle',
      },
    textLabel:{
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
        verticalAlign:'middle',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    }
});

export { FormLogin };
