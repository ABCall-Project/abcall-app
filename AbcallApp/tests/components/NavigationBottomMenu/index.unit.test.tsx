import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {NavigationBottomMenu} from '@components/NavigationBottomMenu';
import {Chat} from '@modules/Chat';
import {Issues} from '@modules/Issues';

jest.mock('@modules/Chat', () => {
  const {Text} = require('react-native');
  return {
    Chat: () => <p>Chat Component</p>,
  };
});

jest.mock('@modules/Issues', () => {
  const {Text} = require('react-native');
  return {
    Issues: () => <Text>Issues Component</Text>,
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const {Image} = require('react-native');
  return {
    Icon: ({
      name,
      size,
      color,
    }: {
      name: string;
      size: number;
      color: string;
    }) => {
      return <Image source={{uri: 'icon'}} alt={name} />;
    },
  };
});

describe('Unit test suite for NavigationBottomMenu', () => {
  test('Should render the NavigationBottomMenu component', () => {
    const {debug} = render(
      <SafeAreaProvider>
        <NavigationBottomMenu />
      </SafeAreaProvider>,
    );

    debug();

    const element = screen.getByText(/Chat Component/i);

    expect(element).toBeTruthy();
  });
});
