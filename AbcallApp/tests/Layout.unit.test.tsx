import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Layout} from '@app/Layout';
import {Text} from 'react-native';

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaProvider: ({children}: {children: React.ReactNode}) => (
      <>{children}</>
    ),
    SafeAreaView: ({children}: {children: React.ReactNode}) => <>{children}</>,
  };
});

jest.mock('react-native-paper', () => {
  const PaperProviderMock = ({children}: {children: React.ReactNode}) => (
    <>{children}</>
  );
  return {
    Provider: PaperProviderMock,
    DefaultTheme: jest.fn(),
  };
});

jest.mock('@components/Header', () => {
  return {
    Header: () => <div>Mocked Header</div>,
  };
});

jest.mock('@components/NavigationBottomMenu', () => {
  return {
    NavigationBottomMenu: () => <div>Mocked Navigation bottom</div>,
  };
});

describe('Unit test suite for Layout', () => {
  afterAll(() => {
    jest.unmock('react-native-safe-area-context');
    jest.unmock('react-native-paper');
    jest.unmock('@components/Header');
    jest.unmock('@components/NavigationBottomMenu');
    jest.clearAllMocks();
  });
  test('Should render the Layout component', () => {
    render(
      <Layout>
        <Text>learn react</Text>
      </Layout>,
    );

    const element = screen.getByText(/learn react/i);

    expect(element).toBeTruthy();
  });
});
