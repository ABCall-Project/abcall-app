import React from 'react';
import {render} from '@testing-library/react-native';
import {HeaderLanguage} from '@components/Signin/HeaderLanguage';
describe('Unit test suite for HeaderLanguage component', () => {
  test('Should render correctly', () => {
    const {getByText} = render(<HeaderLanguage />);

    expect(getByText('Español')).toBeTruthy();
  });
});
