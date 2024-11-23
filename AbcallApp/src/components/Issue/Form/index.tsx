import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {COLORS} from '@styles/colors';
import Config from 'react-native-config';

const Form = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<any>(null);
  const [userId, setUserId] = useState<string>(
    'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda',
  );
  const ISSUE_HOST = Config.ISSUE_HOST;

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.allFiles,
        ],
      });
      setFile(result);
    } catch (err: unknown) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Selección de archivo cancelada');
      } else {
        if (err instanceof Error) {
          Alert.alert('Error al seleccionar el archivo', err.message);
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!subject || !description) {
      Alert.alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    if (file) {
      // Enviar como FormData
      const formData = new FormData();
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('auth_user_id', userId);
      formData.append(
        'auth_user_agent_id',
        '7ef4d8e2-f974-4e0a-b5e7-d1bb37ab0170',
      );
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });

      try {
        const response = await fetch(`${ISSUE_HOST}/issue/post`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error al crear el incidente');
        }

        Alert.alert('Incidente registrado');
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        } else {
          Alert.alert('Error', 'Ha ocurrido un error desconocido');
        }
      }
    } else {
      // Enviar como application/json
      const jsonData = JSON.stringify({
        subject,
        description,
        auth_user_id: userId,
        auth_user_agent_id: '7ef4d8e2-f974-4e0a-b5e7-d1bb37ab0170',
      });

      try {
        const response = await fetch(`${ISSUE_HOST}/issue/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonData,
        });

        if (!response.ok) {
          throw new Error('Error al crear el incidente');
        }

        Alert.alert(
          'Incidente registrado',
          `Asunto: ${subject}\nDescripción: ${description}`,
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          Alert.alert('Error', error.message);
        }
      }
    }

    setSubject('');
    setDescription('');
    setFile(null);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.label}>Asunto:</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Escribe el asunto"
      />

      <Text style={styles.label}>Descripción del caso:</Text>
      <TextInput
        style={styles.textarea}
        value={description}
        onChangeText={setDescription}
        placeholder="Escribe la descripción del caso"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        testID="chooseFile"
        style={styles.button}
        onPress={handleFilePick}>
        <Text style={styles.buttonText}>Seleccionar Archivo</Text>
      </TouchableOpacity>
      {file && (
        <Text style={styles.fileText}>Archivo seleccionado: {file.name}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar Incidencia</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 0,
    fontSize: 24,
  },
  textarea: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontSize: 24,
  },
  fileText: {
    marginVertical: 8,
    color: COLORS.INPUT_BORDER_COLOR,
  },
  icon: {
    textAlignVertical: 'center',
  },
  textBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: COLORS.INPUT_BORDER_COLOR,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.PRIMARY, // Azul
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.WHITE, // Texto blanco
    fontSize: 16,
  },
});

export {Form};
