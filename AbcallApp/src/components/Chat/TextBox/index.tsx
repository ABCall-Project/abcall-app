import React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import { COLORS } from '@styles/colors';
import { Icon } from 'react-native-paper';

type TextBoxProps = {
    text?: string,
}

const TextBox = (props: TextBoxProps) => {
    return (
        <View style={textBoxStyles.mainContainer}>
            <View style={textBoxStyles.textBoxContainer}>
                <TextInput style={textBoxStyles.input} placeholder="Ingresa tu mensaje..." value={props.text} />
                <Icon style={textBoxStyles.icon} source="send-outline" size={32} color={COLORS.PRIMARY_VARIATY}  />
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

export {TextBox};
