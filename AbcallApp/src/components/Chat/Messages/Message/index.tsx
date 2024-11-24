import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '@styles/colors';

export type Bubble = {
    id: string,
    request: boolean,
    response: boolean,
    message: string,
};
const MessageBubble = (bubble: Bubble) => {
    const bubbleStyle = bubble.request ? style.request : style.response;
    const bubbleTextStyle = bubble.request ? style.textRequest : style.textResponse;
    return (
        <View style={{...bubbleStyle, ...style.bubble}}>
            <Text style={{...bubbleTextStyle}}>
                {bubble.message}
            </Text>
        </View>
    );
};

const style = StyleSheet.create({
    bubble: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 50,
        height: 'auto',
        maxWidth: 200,
        marginBottom: 10,
        shadowColor: COLORS.BLACK,
        elevation: 10,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    request: {
        backgroundColor: COLORS.PRIMARY_VARIATY,
        alignSelf: 'flex-end',
    },
    textRequest: {
        color: COLORS.WHITE,
    },
    response: {
        backgroundColor: COLORS.SECONDARY_VARIATY,
    },
    textResponse: {
        color: COLORS.PRIMARY,
    },
});

export {
    MessageBubble,
};
