import io from "socket.io-client";
import { toast } from "react-toastify";

export default class Socket {
  constructor() {
    this.socket = io(process.env.REACT_APP_WEBSOCKETS_PATH);
    this.joinedRoom = false;
    this.socket.on("eventsToClient", (msg) => {
      toast(`🦄 ${msg}`);
    });
  }

  joinRooms(user) {
    this.socket.emit("joinRoom", user.id);
    this.joinedRoom = true;
  }
  emit(room, text, user) {
    if (!this.joined()) {
      this.joinRooms(user);
    }
    this.socket.emit("eventsToServer", { room, text });
  }

  joined() {
    return this.joinedRoom;
  }
}
