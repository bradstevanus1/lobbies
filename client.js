import io from "socket.io-client";
import { v4 as uuid4 } from "uuid";

class Lobbies {
  _connected = false;

  constructor(url, onReceive, lobbyName = null) {
    this._socket = io(url);

    this._socket.on("connect", () => {
      if (lobbyName == null) {
        lobbyName = uuid4().replace("-", "");
        this._socket.emit("room", lobbyName);
      } else {
        this._socket.emit("room", lobbyName);
      }
    });

    this._socket.on("receive", (json) => {
      onReceive(json);
    });
  }

  send(json) {
    if (!this._connected) {
      throw new Error(
        "The connection to the lobby has not been established yet."
      );
    }
    this._socket.emit("send", json);
  }

  leave() {
    this._socket.emit("disconnect");
  }
}

export default Lobbies;
