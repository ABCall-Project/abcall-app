import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {HeaderTitle} from '@components/HeaderTitle';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      canGoBack: true,
      goBack: jest.fn(),
    }),
  };
});

describe('Unit test suite for HeaderTitle component', () => {
  test('Should render the HeaderTitle component', () => {
    render(<HeaderTitle title="Title" />);

    const element = screen.getByText(/Title/i);

    expect(element).toBeTruthy();
  });
});
