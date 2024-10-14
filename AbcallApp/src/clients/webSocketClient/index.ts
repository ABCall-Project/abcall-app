import Config from "react-native-config";
import { io } from "socket.io-client";

const socket = io(Config.ABCALL_WEBSOCKET_SERVICE_BASE_URL);

export {
    socket,
}