declare module 'react-native-config' {
  interface EnvConfig {
    APP_NAME: string;
    APP_ENV: 'development' | 'production';
    ABCALL_WEBSOCKET_SERVICE_BASE_URL: string
    ISSUE_HOST: string,
    ABCALL_BFF_BASE_URL: string
  }

  const Config: EnvConfig;

  export default Config;
}
