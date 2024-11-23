import React, { act } from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
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
  const {Text, Image} = require('react-native');
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
  const { Text } = require('react-native');
  return {
    Messages: ({messages = []}: {messages: Bubble[]}) => (
      <>
        {messages.map(({id, message}: Bubble) => (
          <Text key={id}>{message}</Text>
        ))}
      </>
    ),
  };
});

jest.mock('@components/Chat/TextBox', () => {
  const React = require('react');
  const {TextInput, Button} = require('react-native');
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
        <TextInput role="textbox" />
        <Button
          title={'Send'}
          name="Send"
          onPress={() => onSendHandler('test message')}
        />
      </>
    ),
  };
});

jest.mock('@utils/uuid', () => ({
  generateGuid: jest.fn().mockReturnValue('1234'),
}));
jest.mock('@clients/webSocketClient', () => ({
  socket: {
    on: jest.fn(),
    send: jest.fn(),
    disconnect: jest.fn(),
  },
}));

jest.mock('@hooks/useNetworkCheck', () => jest.fn());

const useNetworkCheck = require('@hooks/useNetworkCheck');

const {socket} = require('@clients/webSocketClient');

describe('Unit test suite for Chat module', () => {
  afterAll(() => {
    jest.unmock('@react-native-community/netinfo');
    jest.unmock('@components/HeaderTitle');
    jest.unmock('@components/Chat/Messages');
    jest.unmock('@components/Chat/TextBox');
    jest.unmock('@utils/uuid');
    jest.unmock('@clients/webSocketClient');
    jest.unmock('@hooks/useNetworkCheck');
    jest.clearAllMocks();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    useNetworkCheck.mockReturnValue({isConnected: true});
  });
  test('Should render the Chat module', () => {
    render(<Chat />);

    const element = screen.getByText(/ABCall Bot/i);

    expect(element).toBeTruthy();
  });

  test('Should sends message successfully when connected', async () => {
    const {getByRole} = render(<Chat />);

    const sendButton = getByRole('button');
    fireEvent.press(sendButton);

    await waitFor(() => {
      expect(socket.send).toHaveBeenCalledWith(JSON.stringify({
        userId: 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda',
        message: 'test message',
      }));
    });
  });

  test('Should displays error message when network is disconnected', async () => {
    useNetworkCheck.mockReturnValue({ isConnected: false });
    const { getByRole, findByText } = render(<Chat />);

    const sendButton = getByRole('button');
    fireEvent.press(sendButton);

    await waitFor(async () => {
      const text = await findByText('Hay un problema de conexión, ¿Podrías revisar tu conexión de internet?');
      expect(text).toBeTruthy();
    });
  });

  test('Should receives and displays response from socket', async () => {
    socket.on.mockImplementationOnce((event, callback) => {
      if (event === 'response') {
        callback('Response message from server');
      }
    });

    const { queryByText } = render(<Chat />);

    await waitFor(() => {
      expect(queryByText('Response message from server')).toBeTruthy();
    });
  });
});
