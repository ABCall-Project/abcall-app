import {renderHook, act, waitFor} from '@testing-library/react-native';
import useNetworkCheck from '@hooks/useNetworkCheck';



jest.mock('@react-native-community/netinfo', () => {
    const fetchMock = jest.fn();
    const addEventListenerMock = jest.fn();
    return {
      addEventListener: addEventListenerMock,
      fetch: fetchMock,
    };
  });

describe('Unit test suite for useNetworkCheck custom hook', () => {
    afterAll(() => {
        jest.unmock('@react-native-community/netinfo');
    });
    test('Should return default connection status',() => {
        const {result} = renderHook(() => useNetworkCheck());

        expect(result.current.isConnected).toBeNull();
    });


  test('Should update connection status when network changes', async () => {
    const mockNetInfo = {
      isConnected: true,
    };
    const { fetch, addEventListener } = require('@react-native-community/netinfo');
    fetch.mockResolvedValue(mockNetInfo);
    const { result } = renderHook(() => useNetworkCheck());

    act(() => {
        const callback = addEventListener.mock.calls[0][0];
        callback({ isConnected: true });
      });
   
    await waitFor(() => {
        expect(result.current.isConnected).toBeNull();
    });
    act(() => {
      const callback = addEventListener.mock.calls[1][0];
      callback({ isConnected: false });
    });

    expect(result.current.isConnected).toBeFalsy();
  });
});
