import React from 'react';
import {Header} from '@components/Chat/Header';
import {Messages} from '@components/Chat/Messages';
import { TextBox } from '@components/Chat/TextBox';

const Chat = () => {
  return (
    <>
      <Header />
      <Messages />
      <TextBox text="" />
    </>
  );
};

export {Chat};
