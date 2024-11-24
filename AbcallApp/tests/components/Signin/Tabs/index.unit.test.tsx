import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tabs } from '@components/Signin/Tabs/index'; 

describe('Tabs Component', () => {
  it('renders correctly with "Empresas" selected by default', () => {
    const { getByText } = render(<Tabs />);
    const empresasTab = getByText('Empresas');
    const internosTab = getByText('Internos');

    expect(empresasTab).toBeTruthy();
    expect(internosTab).toBeTruthy();

    expect(empresasTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#000',
      })
    );


    expect(internosTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#767676',
      })
    );
  });

  it('switches to "Internos" when clicked', () => {
    const { getByText } = render(<Tabs />);
    
    const empresasTab = getByText('Empresas');
    const internosTab = getByText('Internos');

    fireEvent.press(internosTab);

    expect(internosTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#000', 
      })
    );

    expect(empresasTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#767676',
      })
    );
  });

  it('switches back to "Empresas" when clicked', () => {
    const { getByText } = render(<Tabs />);
    
    const empresasTab = getByText('Empresas');
    const internosTab = getByText('Internos');


    fireEvent.press(internosTab);


    fireEvent.press(empresasTab);

    expect(empresasTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#000', 
      })
    );

   
    expect(internosTab.props.style).toContainEqual(
      expect.objectContaining({
        color: '#767676', 
      })
    );
  });
});
