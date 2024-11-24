import { AuthService } from '@clients/backendForFrontend/authServices'; 
import { AuthUserResponse } from '@models/AuthUserResponse';
import { waitFor } from '@testing-library/react-native';

global.fetch = jest.fn(); // Mock global para fetch

describe('AuthService', () => {
  const authService = new AuthService();
  const mockFetch = global.fetch as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return an AuthUserResponse on successful login', async () => {
      const mockResponse = {
        id: '123',
        name: 'John',
        last_name: 'Doe',
        phone_number: '123456789',
        email: 'test@example.com',
        address: '123 Test St',
        birthdate: '1990-01-01',
        role_id: 'admin',
        token: 'mock-token',
        customer_id: 'customer123',
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await authService.signIn('test@example.com', 'password123');

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    it('should throw an error if the response is not ok', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 401,
          statusText: 'Unauthorized',
        });
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        await expect(authService.signIn('test@example.com', 'wrongpassword')).rejects.toThrow(
          'Error 401: Unauthorized'
        );

        // Verifica que console.error fue llamado con el error esperado
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Error during sign-in:',
          expect.any(Error)
        );
        consoleErrorSpy.mockRestore();
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
          });
      });

  });

  describe('deriveKeyFromPassphrase', () => {
    it('should derive a key from a given passphrase', () => {
      const passphrase = 'test-passphrase';
      const derivedKey = authService.deriveKeyFromPassphrase(passphrase);

      expect(derivedKey).toBeDefined();
      expect(typeof derivedKey).toBe('string');
    });
  });

  describe('encryptData', () => {
    it('should encrypt data with a given passphrase', () => {
      const data = 'password123';
      const passphrase = 'test-passphrase';
      const encryptedData = authService.encryptData(data, passphrase);

      expect(encryptedData).toBeDefined();
      expect(typeof encryptedData).toBe('string');
    });
  });
});
