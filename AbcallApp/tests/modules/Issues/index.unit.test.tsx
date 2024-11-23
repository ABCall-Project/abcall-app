import React from 'react';
import {
  render,
  screen,
  waitFor,
  renderHook,
  fireEvent
} from '@testing-library/react-native';
import {faker} from '@faker-js/faker';
import {Issues} from '@modules/Issues';
import * as useIssues from '@hooks/useIssues';
import IssueBuilder from '@tests/builders/IssueBuilder';
import {useGetIssuesPaginationByUserId} from '@hooks/useIssues';
import {Issue} from '@models/Issue';

jest.mock('react-native-paper', () => {
  const {Text} = require('react-native');
  return {
    ActivityIndicator: ({size, color}: {size: string; color: string}) => (
      <Text style={{color}}>Loading...</Text>
    ),
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

jest.mock('@components/Issues/SecondaryHeader', () => {
  const React = require('react');
  const {Text, View} = require('react-native');
  return {
    SecondaryHeader: () => (
      <View>
        <Text>Secondary Header mock</Text>
      </View>
    ),
  };
});


describe('Unit test suite for Issues component', () => {
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });
  afterAll(() => {
    jest.unmock('react-native-paper');
    jest.unmock('@components/HeaderTitle');
    jest.unmock('@components/Issues/SecondaryHeader');
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Should render the Issues component', () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockReturnValue({
        page: 1,
      }),
    });
    render(<Issues />);

    const [element] = screen.getAllByText(/Incidentes/i);

    expect(element).toBeTruthy();
  });

  test('Should render the Issues component with loading state', () => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockReturnValue({
        page: 1,
      }),
    });
    jest.spyOn(useIssues, 'useGetIssuesPaginationByUserId').mockReturnValue({
      issues: {
        data: [new IssueBuilder().build()],
        page: 1,
        limit: 10,
        hasNext: false,
      },
      setPage: jest.fn(),
      isLoading: true,
      isRefreshing: false,
      setIsRefreshing: jest.fn(),
      page: 1,
      fetchIssues: jest.fn(),
    });

    render(<Issues />);
    const loadingElement = screen.getByText(/Loading.../i);

    expect(loadingElement).toBeTruthy();
  });
});
