import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Chat} from '@modules/Chat';
import {Bubble} from '@components/Chat/Messages/Message';

jest.mock('@react-native-community/netinfo', () => {
  const fetchMock = jest.fn();
  const addEventListenerMock = jest.fn();
  return {
    addEventListener: addEventListenerMock,
    fetch: fetchMock,
  };
});

jest.mock('@components/HeaderTitle', () => {
  const React = require('react');
  const { Text, Image } = require('react-native');
  return {
    HeaderTitle: ({imagePath, title}: {imagePath: string; title: string}) => (
      <>
        <Text>{title || 'ABCall Bot'}</Text>
        <Image source={{uri: imagePath}} alt={title} />
      </>
    ),
  };
});

jest.mock('@components/Chat/Messages', () => {
  return {
    Messages: ({messages = []}: {messages: Bubble[]}) => (
      <>
        {messages.map(({id, message}: Bubble) => (
          <div key={id}>{message}</div>
        ))}
      </>
    ),
  };
});

jest.mock('@components/Chat/TextBox', () => {
    const React = require('react');
    const { TextInput, Button } = require('react-native');
  return {
    TextBox: ({
      text = '',
      onSendHandler,
    }: {
      text?: string;
      onSendHandler: (value: string) => void;
    }) => (
      <>
        {text}
        <TextInput role="textbox"  />
        <Button title={'Send'} name="Send" onPress={() => onSendHandler('test message')} />
      </>
    ),
  };
});

describe('Unit test suite for Chat module', () => {
  afterAll(() => {
    jest.unmock('@react-native-community/netinfo');
    jest.unmock('@components/HeaderTitle');
    jest.unmock('@components/Chat/Messages');
    jest.unmock('@components/Chat/TextBox');
    jest.clearAllMocks();
  });
  test('Should render the Chat module', () => {
    render(<Chat />);

    const element = screen.getByText(/ABCall Bot/i);

    expect(element).toBeTruthy();
  });

});
