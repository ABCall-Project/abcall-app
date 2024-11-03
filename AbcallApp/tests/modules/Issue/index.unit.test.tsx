import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Issue} from '@modules/Issue';

jest.mock('react-native-document-picker', () => {
  return {
    pick: jest.fn(),
  };
});

jest.mock('@components/HeaderTitle', () => {
  const {Text} = require('react-native');
  return {
    HeaderTitle: ({title}: {title: string}) => <Text>{title}</Text>,
  };
});

jest.mock('@hooks/useIssues');
describe('Unit test suite for Issue module', () => {
  afterAll(() => {
    jest.unmock('react-native-document-picker');
    jest.unmock('@components/HeaderTitle');
    jest.unmock('@hooks/useIssues');
    jest.clearAllMocks();
  });

  test('Should render the Issue module', () => {
    render(<Issue />);
    const element = screen.getByText(/Nuevo Incidente/i);
    expect(element).toBeTruthy();
  });
});
