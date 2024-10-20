import React, { useState } from 'react';
import { View, StyleSheet, TextInput, GestureResponderEvent, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { COLORS } from '@styles/colors';
import { IconButton } from 'react-native-paper';

type TextBoxProps = {
    text?: string,
    onSendHandler: (value: string) => void
};

const TextBox = ({ text = '', onSendHandler }: TextBoxProps) => {
    const [value, setValue] = useState(text);

    const onChangeHandler = (newText: string) => {
        setValue(newText);
    };

    const onClick = () => {
        onSendHandler(value);
        setValue('');
    };

    return (
        <View style={textBoxStyles.mainContainer}>
            <View style={textBoxStyles.textBoxContainer}>
                <TextInput style={textBoxStyles.input} placeholder="Ingresa tu mensaje..." value={value} onChangeText={onChangeHandler} />
                <IconButton style={textBoxStyles.icon} icon="send-outline" size={32} iconColor={COLORS.PRIMARY_VARIATY} onPress={onClick} />
            </View>
        </View>
    );
};

const textBoxStyles = StyleSheet.create({
    textBoxContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: COLORS.INPUT_BORDER_COLOR,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    mainContainer: {
        paddingRight: 5,
        paddingLeft: 5,
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        borderWidth: 0,
        fontSize: 24,
    },
    icon: {
        textAlignVertical: 'center',
    },
});

export { TextBox };
