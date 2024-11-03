import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {HeaderTitle} from '@components/HeaderTitle';

jest.mock('@react-navigation/native', () => {
  const canGoBackMock = jest.fn();
  const goBackMock = jest.fn();
  return {
    useNavigation: () => ({
      canGoBack: canGoBackMock,
      goBack: goBackMock,
    }),
    canGoBackMock,
    goBackMock,
  };
});

describe('Unit test suite for HeaderTitle component', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.unmock('@react-navigation/native');
    jest.clearAllMocks();
  });
  test('Should render the HeaderTitle component', () => {
    render(<HeaderTitle title="Title" />);

    const element = screen.getByText(/Title/i);

    expect(element).toBeTruthy();
  });

  test('Should call goBack function in order to change the page', () => {
    render(<HeaderTitle title="Title" />);
    const { goBackMock, canGoBackMock } = require('@react-navigation/native');
    canGoBackMock.mockReturnValue(true);

    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(button).toBeTruthy();
    expect(goBackMock).toHaveBeenCalled();
  });

  test('Should not call goBack function when the navigation can not go back', () => {
    render(<HeaderTitle title="Title" />);
    const { goBackMock, canGoBackMock } = require('@react-navigation/native');
    canGoBackMock.mockReturnValue(false);

    const button = screen.getByRole('button');
    fireEvent.press(button);

    expect(button).toBeTruthy();
    expect(goBackMock).not.toHaveBeenCalled();
  });
});
