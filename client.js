import io from "socket.io-client";
import { v4 as uuid4 } from "uuid";

class Lobbies {
  constructor(url) {
    this._socket = io(url);
  }

  create() {
    const lobbyName = uuid4().replace("-", "");
    console.log(lobbyName);
    this._socket.emit("room");
  }

  join(name) {}

  send(json) {}

  leave() {}

  close() {}
}

export default Lobbies;
