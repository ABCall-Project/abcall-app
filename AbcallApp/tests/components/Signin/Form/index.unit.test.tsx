import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FormLogin } from '@components/Signin/Form/index';
import { AuthService } from '@clients/backendForFrontend/authServices';
import * as AuthContext from '@contexts/AuthContext';
import { Alert } from 'react-native';


jest.spyOn(Alert, 'alert');


jest.mock('@clients/backendForFrontend/authServices', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    signIn: jest.fn(),
  })),
}));

describe('FormLogin Component', () => {
  const mockSetUser = jest.fn();
  const mockSetLoggedIn = jest.fn();

  beforeEach(() => {
    jest.spyOn(AuthContext, 'useAuth').mockReturnValue({
      setUser: mockSetUser,
      setLoggedIn: mockSetLoggedIn,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all inputs and buttons', () => {
    const { getByTestId, getByText } = render(<FormLogin />);
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByText('Iniciar Sesión')).toBeTruthy();
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
    expect(getByText('¿Aún no estás registrado?')).toBeTruthy();
  });

  it('shows an alert if fields are empty when "Iniciar Sesión" is pressed', () => {
    const { getByText } = render(<FormLogin />);

    const loginButton = getByText('Iniciar Sesión');
    fireEvent.press(loginButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Error',
      'Por favor, complete todos los campos.'
    );
  });

  it('calls AuthService.signIn with correct data', async () => {
    const mockSignIn = jest.fn().mockResolvedValue({
      id: '1',
      name: 'Test User',
      token: 'test-token',
    });
    (AuthService as jest.Mock).mockImplementation(() => ({
      signIn: mockSignIn,
    }));
  
    const { getByTestId, getByText } = render(<FormLogin />);
  
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com'); 
    fireEvent.changeText(getByTestId('password-input'), 'password123');
  
    const loginButton = getByText('Iniciar Sesión');
    fireEvent.press(loginButton);
  
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(mockSetUser).toHaveBeenCalledWith({
        id: '1',
        name: 'Test User',
        token: 'test-token',
      });
      expect(mockSetLoggedIn).toHaveBeenCalledWith(true);
    });
  });


  it('shows an alert if AuthService.signIn fails', async () => {
    const mockSignIn = jest.fn().mockRejectedValue(new Error('Unauthorized'));
    (AuthService as jest.Mock).mockImplementation(() => ({
      signIn: mockSignIn,
    }));

    const { getByTestId, getByText } = render(<FormLogin />);

    fireEvent.changeText(getByTestId('email-input'), 'test@example.com'); 
    fireEvent.changeText(getByTestId('password-input'), 'wrongpassword');

    const loginButton = getByText('Iniciar Sesión');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Correo o contraseña incorrectos'
      );
    });
  });

  it('toggles password visibility when the icon is pressed', () => {
    const { getByTestId, rerender } = render(<FormLogin />);
    const passwordIcon = getByTestId('password-visibility-icon');
    fireEvent.press(passwordIcon);
    rerender(<FormLogin />);
    fireEvent.press(passwordIcon);
    expect(passwordIcon).toBeTruthy();
  });
});
