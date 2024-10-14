import React, {useState, useEffect} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Header} from '@components/Chat/Header';
import {Messages} from '@components/Chat/Messages';
import {TextBox} from '@components/Chat/TextBox';
import type {Bubble} from '@components/Chat/Messages/Message';
import {socket} from '@clients/webSocketClient';
import {generateGuid} from '@utils/uuid';

const INITIALIZATE_STATE = {
  id: '',
  request: false,
  response: false,
  message: '',
};

const Chat = () => {
  const [messages, setMessages] = useState<Bubble[]>([]);

  useEffect(() => {
    socket.on('response', (response) => {
      setMessages((prevMessages: Bubble[]) => [
        ...prevMessages, 
        { id: generateGuid(), response: true, request: false, message: response }
      ]);
    });

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const onSend = (text: string) => {
    const message: Bubble = {
      id: generateGuid(),
      request: true,
      response: false,
      message: text,
    };
    socket.send(message.message);
    setMessages([
        ...messages,
        ...[message],
    ]);
  };

  return (
    <>
      <Header />
      <Messages messages={messages} />
      <TextBox onSendHandler={onSend} />
    </>
  );
};

export {Chat};
