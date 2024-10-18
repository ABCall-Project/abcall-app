import React from 'react';
import Config from 'react-native-config';
import {ScrollView} from 'react-native';
import { global } from '@styles/global';
import { lightTheme } from '@styles/lightTheme';
import { MessageBubble, Bubble } from '@components/Chat/Messages/Message';

const messagesMock: Bubble[] = [
    {
        id: '1',
        message: 'Hola!',
        request: true,
        response: false,
    },
    {
        id: '2',
        message: '!Hola Miguel! ¿En que te puedo ayudar hoy?',
        request: false,
        response: true,
    },
    {
        id: '3',
        message: 'Tengo un error',
        request: true,
        response: false,
    },
    {
        id: '1',
        message: 'Hola!',
        request: true,
        response: false,
    },
    {
        id: '2',
        message: '!Hola Miguel! ¿En que te puedo ayudar hoy?',
        request: false,
        response: true,
    },
    {
        id: '3',
        message: 'Tengo un error',
        request: true,
        response: false,
    },
    {
        id: '1',
        message: 'Hola!',
        request: true,
        response: false,
    },
    {
        id: '2',
        message: '!Hola Miguel! ¿En que te puedo ayudar hoy?',
        request: false,
        response: true,
    },
    {
        id: '3',
        message: 'Tengo un error',
        request: true,
        response: false,
    },
    {
        id: '1',
        message: 'Hola!',
        request: true,
        response: false,
    },
    {
        id: '2',
        message: '!Hola Miguel! ¿En que te puedo ayudar hoy?',
        request: false,
        response: true,
    },
    {
        id: '3',
        message: `${Config.ABCALL_WEBSOCKET_SERVICE_BASE_URL}`,
        request: true,
        response: false,
    },
];

const renderBubbleList = (messages: Bubble[]) => {
    return messages.map((message: Bubble) => <MessageBubble key={message.id} {...message} />,
    );
};

type MessagesProps = {
    messages: Bubble[],
}


const Messages = ({ messages = [] }: MessagesProps) => {
    const styles = global(lightTheme);
    return (
        <ScrollView style={styles.containerPages}>
            {renderBubbleList(messages)}
        </ScrollView>
    );
};



export { Messages };
