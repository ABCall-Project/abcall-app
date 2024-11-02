import React from 'react';
import {render, screen} from '@testing-library/react-native';
import { SecondaryHeader } from '@components/Issues/SecondaryHeader';

describe('Unit test suite for SecondaryHeader component', () => {
    test('Should render the SecondaryHeader component', () => {
        render(<SecondaryHeader />);
        
        const element = screen.getByText(/Te presentamos el estado actual de los incidentes reportados por ti/i);

        expect(element).toBeTruthy();
    });
});
