import React, {ReactNode} from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Header} from '@components/Header';

global.console.log = jest.fn();

jest.mock('react-native-paper', () => {
  const React = require('react');
  const {Button, Image, View} = require('react-native');
  const mockAppbarAction = ({
    onPress,
    testID,
  }: {
    onPress: () => void;
    testID: string;
  }) => (
    <Button
      title={'Mocked Action'}
      name=" Mocked Action"
      onPress={onPress}
      data-testid={testID}>
      Mocked Action
    </Button>
  );

  return {
    Appbar: {
      Header: ({children}: {children: ReactNode}) => (
        <View>
          <Image source={{uri: 'logo'}} alt={'logo'} testID="header-logo"/>
          {children}
        </View>
      ),
      Action: mockAppbarAction,
    },
  };
});

describe('Header component', () => {
    afterAll(() => {
        jest.unmock('react-native-paper');
        jest.clearAllMocks();
    });
  test('Should render the menu icon and logo image', () => {
    render(<Header />);

    // Check if the Appbar.Action with the menu icon is rendered
    const menuIcon = screen.getByText('Mocked Action');
    expect(menuIcon).toBeTruthy();

    // Check if the logo image is rendered
    const logoImage = screen.getByTestId('header-logo');
    expect(logoImage).toBeTruthy();
  });

    test('Should calls _goBack function when menu icon is pressed', () => {
      render(
          <Header />,
      );

      const menuIcon = screen.getByText('Mocked Action');
      fireEvent.press(menuIcon);

      expect(console.log).toHaveBeenCalledWith('Went back');
    });
});
