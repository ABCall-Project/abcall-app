import React, {useState, useEffect} from 'react';
import {Header} from '@components/Chat/Header';
import {Messages} from '@components/Chat/Messages';
import {TextBox} from '@components/Chat/TextBox';
import type {Bubble} from '@components/Chat/Messages/Message';
import {socket} from '@clients/webSocketClient';
import {generateGuid} from '@utils/uuid';
import useNetworkCheck from '@hooks/useNetworkCheck';

const INTERNET_ERROR_MESSAGE =
  'Hay un problema de conexión, ¿Podrías revisar tu conexión de internet?';

const Chat = () => {
  const [messages, setMessages] = useState<Bubble[]>([]);
  const {isConnected} = useNetworkCheck();

  useEffect(() => {
    socket.on('response', response => {
      setMessages((prevMessages: Bubble[]) => [
        ...prevMessages,
        {id: generateGuid(), response: true, request: false, message: response},
      ]);
    });

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
    if (isConnected === true) {
      setMessages([...messages, ...[message]]);
      socket.send(message.message);
    } else {
      const messageError: Bubble = {
        id: generateGuid(),
        request: false,
        response: true,
        message: INTERNET_ERROR_MESSAGE,
      };
      setMessages([...messages, ...[message], ...[messageError]]);
    }
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
