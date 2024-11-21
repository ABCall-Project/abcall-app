import CryptoJS from 'crypto-js';
import Config from "react-native-config";



class AuthService {
  baseUrl: string;
  constructor() {
    this.baseUrl = Config.ABCALL_BFF_BASE_URL;
    this.baseUrl = 'http://localhost:5002/';
  }

  async signIn(email:string, password:string) {
    try {
      const encryptedPassword = this.encryptData(password, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZpcm9ubWVudCI6InRlc3QifQ.oH-jIKbyWL6jjH8YCk5YIEwnlnuB9f-5nXBYNFe3pXY');
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'email':email,
            'password':encryptedPassword,
        }),
      };

      const response = await fetch(`${this.baseUrl}/auth/signin`, options);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
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
