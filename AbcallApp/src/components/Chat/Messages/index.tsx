import React from 'react';
import { ScrollView } from 'react-native';
import { global } from '@styles/global';
import { lightTheme } from '@styles/lightTheme';
import { MessageBubble, Bubble } from '@components/Chat/Messages/Message';

const renderBubbleList = (messages: Bubble[]) => {
    return messages.map((message: Bubble) => <MessageBubble key={message.id} {...message} />,
    );
};

type MessagesProps = {
    messages?: Bubble[],
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
