import React from 'react';
import { render } from '@testing-library/react-native';
import { Signin } from '@modules/Signin/index'; // Ajusta la ruta según tu estructura
import * as AuthContext from '@contexts/AuthContext';

jest.mock('@components/Signin/HeaderLanguage', () => {
  const { View } = require('react-native');
  return {
    HeaderLanguage: () => <View testID="HeaderLanguage" />,
  };
});

jest.mock('@components/Signin/Logo', () => {
  const { View } = require('react-native');
  return {
    Logo: () => <View testID="Logo" />,
  };
});

jest.mock('@components/Signin/Tabs', () => {
  const { View } = require('react-native');
  return {
    Tabs: () => <View testID="Tabs" />,
  };
});

jest.mock('@components/Signin/Form', () => {
  const { View } = require('react-native');
  return {
    FormLogin: () => <View testID="FormLogin" />,
  };
});

describe('Signin Component', () => {
  const mockSetLoggedIn = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when auth context is provided', () => {
    jest.spyOn(AuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: false,
      setLoggedIn: mockSetLoggedIn,
    });

    const { getByTestId } = render(<Signin />);

    expect(getByTestId('HeaderLanguage')).toBeTruthy();
    expect(getByTestId('Logo')).toBeTruthy();
    expect(getByTestId('Tabs')).toBeTruthy();
    expect(getByTestId('FormLogin')).toBeTruthy();
  });

  it('returns null when auth context is not provided', () => {
    jest.spyOn(AuthContext, 'useAuth').mockReturnValue(null);

    const { queryByTestId } = render(<Signin />);

    expect(queryByTestId('HeaderLanguage')).toBeNull();
    expect(queryByTestId('Logo')).toBeNull();
    expect(queryByTestId('Tabs')).toBeNull();
    expect(queryByTestId('FormLogin')).toBeNull();
  });
});
