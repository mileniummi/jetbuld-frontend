import io from "socket.io-client";
import { toast } from "react-toastify";
import { IUser } from "@/models/User";

export default class Socket {
  private socket: any;
  private joinedRoom: boolean;

  constructor() {
    // @ts-ignore
    this.socket = io(process.env.REACT_APP_WEBSOCKETS_PATH);
    this.joinedRoom = false;
    this.socket.on("eventsToClient", (msg: string) => {
      toast(`🦄 ${msg}`);
    });
  }

  joinRooms(user: IUser) {
    this.socket.emit("joinRoom", user.id);
    this.joinedRoom = true;
  }
  public emit(room: string, text: string, user: IUser) {
    if (!this.joined()) {
      this.joinRooms(user);
    }
    this.socket.emit("eventsToServer", { room, text });
  }

  public joined() {
    return this.joinedRoom;
  }
}
