import { AuthUserResponse } from '@models/AuthUserResponse';
import CryptoJS from 'crypto-js';
import Config from 'react-native-config';



class AuthService {
  baseUrl: string;
  phraseKey: string;
  constructor() {
    this.baseUrl = Config.ABCALL_BFF_BASE_URL;
    this.phraseKey = Config.PHRASE_KEY;
  }

  async signIn(email: string, password: string): Promise<AuthUserResponse> {
    try {
      const encryptedPassword = this.encryptData(password, this.phraseKey);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password: encryptedPassword,
        }),
      };

      const response = await fetch(`${this.baseUrl}/auth/signin`, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return new AuthUserResponse(
        data.id,
        data.name,
        data.last_name,
        data.phone_number,
        data.email,
        data.address,
        data.birthdate,
        data.role_id,
        data.token,
        data.customer_id
      );
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }


  deriveKeyFromPassphrase(passphrase:string) {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    return CryptoJS.PBKDF2(passphrase, salt, {
      keySize: 256 / 32,
      iterations: 100000,
    }).toString();
  }

  encryptData(data:string , passphrase:string ) {
    const hash = CryptoJS.HmacSHA256(data, passphrase).toString(CryptoJS.enc.Base64);
    return hash;
  }
}

export {  AuthService };
