import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {NavigationBottomMenu} from '@components/NavigationBottomMenu';
import {useGetIssuesPaginationByUserId} from '@hooks/useIssues';

jest.mock('@modules/Chat', () => {
  const {Text} = require('react-native');

  return {
    Chat: () => <Text>Chat</Text>,
  };
});

jest.mock('@modules/Issues', () => {
  const {Text} = require('react-native');

  return {
    Issues: () => <Text>Issues</Text>,
  };
});

jest.mock('@modules/Issue', () => {
  const {Text} = require('react-native');

  return {
    Issue: () => <Text>Issue</Text>,
  };
});

jest.mock('@hooks/useIssues', () => {
  return {
    useGetIssuesPaginationByUserId: () => {
      return {
        setIssues: jest.fn(),
        setIsLoading: jest.fn(),
      };
    },
  };
});

jest.mock('@react-native-community/netinfo', () => {
  return {
    NetInfo: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

jest.mock('@react-navigation/native-stack', () => {
  return {
    createStackNavigator: jest.fn(),
  };
});

jest.mock('react-native-document-picker', () => {
  return {
    pick: jest.fn(),
  };
});

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    NavigationContainer: ({children}: {children: React.ReactNode}) => (
      <>{children}</>
    ),
  };
});

jest.mock('@hooks/useIssues', () => {
  return {
    useGetIssuesPaginationByUserId: {
      setIssues: jest.fn(),
    },
  };
});
describe('NavigationBottomMenu', () => {
  test('renders correctly with initial route and navigates between tabs', async () => {
    const {getByText} = render(<NavigationBottomMenu />);

    await waitFor(() => expect(getByText('Chat')).toBeTruthy());
  });

  test('should renders correctly with initial route and navigates between tabs', async () => {
    const screen = render(<NavigationBottomMenu />);

    const [ issue ] = screen.getAllByText('Problemas');
    fireEvent.press(issue);

    await waitFor(() => expect(issue).toBeTruthy());
  });

  test('Should navigate to reports component', async () => {
    const screen = render(<NavigationBottomMenu />);

    const [ ,reports ] = screen.getAllByText('Reportes');
    fireEvent.press(reports);

    await waitFor(() => expect(reports).toBeTruthy());
  });
});

