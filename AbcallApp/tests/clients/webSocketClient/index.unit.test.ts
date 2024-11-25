import { io } from 'socket.io-client';

jest.mock('socket.io-client', () => {
    const mSocket = {
      connected: true,
      on: jest.fn(),
      emit: jest.fn(),
      disconnect: jest.fn(),
    };
    return {
      io: jest.fn(() => mSocket),
    };
  });
describe('Unit test suite for webSocketClient', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    test('Should call the fetch function with the correct patch', () => {
        const expectedPatch = `http://localhost:10000`;
        const expectedOptions = {'transports': ['websocket']}
        const { socket } = require('@clients/webSocketClient/index');

        expect(io).toHaveBeenCalledWith(expectedPatch,  expectedOptions);
        expect(socket.connected).toBe(true);
    });
});