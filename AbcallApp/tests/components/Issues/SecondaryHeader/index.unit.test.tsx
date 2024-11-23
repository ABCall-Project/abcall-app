import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {SecondaryHeader} from '@components/Issues/SecondaryHeader';

jest.mock('@react-navigation/native', () => {
  const navigateMock = jest.fn();
  return {
    useNavigation: () => ({
      canGoBack: true,
      goBack: jest.fn(),
      navigate: navigateMock,
    }),
    navigateMock,
  };
});

describe('Unit test suite for SecondaryHeader component', () => {
  afterAll(() => {
    jest.unmock('@react-navigation/native');
    jest.clearAllMocks();
  });
  test('Should render the SecondaryHeader component', () => {
    render(<SecondaryHeader />);

    const element = screen.getByText(
      /Te presentamos el estado actual de los incidentes reportados por ti/i,
    );

    expect(element).toBeTruthy();
  });

  test('Should press the button and navigate', () => {
    render(<SecondaryHeader />);
    const {navigateMock } = require('@react-navigation/native');

    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(button).toBeTruthy();
    expect(navigateMock).toHaveBeenCalled();
  });
});
