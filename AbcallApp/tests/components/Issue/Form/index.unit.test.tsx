import React from 'react';
import {Alert} from 'react-native';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import {Form} from '@components/Issue/Form';
import * as useAuthContext from '@contexts/AuthContext';

jest.mock('react-native-document-picker', () => {
  return {
    pick: jest.fn(),
    isCancel: jest.fn(),
  };
});

jest.mock('react-native-config', () => ({
  ISSUE_HOST: 'https://mocked-host.com/issue/post',
}));

const mockFetch = jest.fn();

global.fetch = mockFetch;

jest.spyOn(Alert, 'alert');
describe('Unit test suite for Form component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  afterAll(() => {
    jest.unmock('react-native-document-picker');
    jest.unmock('react-native-config');
    jest.clearAllMocks();
  });
  test('Should render the Form component', () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    render(<Form />);

    const element = screen.getByText(/Asunto/i);

    expect(element).toBeTruthy();
  });

  test('Should show an alert if required fields are empty', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    const {getByText} = render(<Form />);

    fireEvent.press(getByText('Registrar Incidencia'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Por favor, completa todos los campos requeridos.',
      );
    });
  });

  test('Should submits form data as JSON if no file is selected', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    const {getByPlaceholderText, getByText} = render(<Form />);

    fireEvent.changeText(
      getByPlaceholderText('Escribe el asunto'),
      'Test Subject',
    );
    fireEvent.changeText(
      getByPlaceholderText('Escribe la descripción del caso'),
      'Test Description',
    );

    const submitButton = getByText('Registrar Incidencia');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  test('Should handles fetch error and shows error alert', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    const {getByPlaceholderText, getByText} = render(<Form />);
    fireEvent.changeText(
      getByPlaceholderText('Escribe el asunto'),
      'Test Subject',
    );
    fireEvent.changeText(
      getByPlaceholderText('Escribe la descripción del caso'),
      'Test Description',
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({ok: false});

    fireEvent.press(getByText('Registrar Incidencia'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Error al crear el incidente',
      );
    });
  });

  test('Should submits form data with file as FormData', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    const documentPickMock = require('react-native-document-picker');
    documentPickMock.pick.mockResolvedValueOnce({
      name: 'test-file.pdf',
      uri: 'file:///test-file.pdf',
      type: 'application/pdf',
    });
    const {getByPlaceholderText, getByText} = render(<Form />);

    fireEvent.changeText(
      getByPlaceholderText('Escribe el asunto'),
      'Test Subject',
    );
    fireEvent.changeText(
      getByPlaceholderText('Escribe la descripción del caso'),
      'Test Description',
    );

    const submitButton = getByText('Registrar Incidencia');
    fireEvent.press(submitButton);

    await waitFor(() => {
      const formData = new FormData();
      formData.append('subject', 'Test Subject');
      formData.append('description', 'Test Description');
      formData.append('auth_user_id', 'e8b8a5d2-0f71-4e4d-b6e3-9c9d64f9cdda');
      formData.append(
        'auth_user_agent_id',
        '7ef4d8e2-f974-4e0a-b5e7-d1bb37ab0170',
      );

      expect(fetch).toHaveBeenCalled();
    });
  });

  test('Should displays alert on submission success', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    mockFetch.mockResolvedValueOnce({ok: true});
    const {getByPlaceholderText, getByText} = render(<Form />);

    fireEvent.changeText(
      getByPlaceholderText('Escribe el asunto'),
      'Test Subject',
    );
    fireEvent.changeText(
      getByPlaceholderText('Escribe la descripción del caso'),
      'Test Description',
    );
    fireEvent.press(getByText('Registrar Incidencia'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Incidente registrado',
        expect.stringContaining('Test Subject'),
      );
    });
  });

  test('Should displays error alert on submission failure', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    mockFetch.mockResolvedValueOnce({ok: false});
    const {getByPlaceholderText, getByText} = render(<Form />);

    fireEvent.changeText(
      getByPlaceholderText('Escribe el asunto'),
      'Test Subject',
    );
    fireEvent.changeText(
      getByPlaceholderText('Escribe la descripción del caso'),
      'Test Description',
    );
    fireEvent.press(getByText('Registrar Incidencia'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Error al crear el incidente',
      );
    });
  });

  test('Should picks a file and updates state when file selected', async () => {
    jest.spyOn(useAuthContext, 'useAuth').mockReturnValue({
      isLoggedIn: true,
      setLoggedIn: jest.fn(),
      user: null,
      setUser: jest.fn(),
    });
    const DocumentPickerMock = require('react-native-document-picker');
    DocumentPickerMock.pick.mockResolvedValueOnce({name: 'sample.pdf'});
    const {getByText} = render(<Form />);

    fireEvent.press(getByText('Seleccionar Archivo'));

    await waitFor(() => expect(DocumentPickerMock.pick).not.toHaveBeenCalled());
  });
});
