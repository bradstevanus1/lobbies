import io from "socket.io-client";
import { v4 as uuid4 } from "uuid";

class Lobbies {
  _connected = false;
  _lobbyName = null;

  constructor(url, lobbyName = null) {
    this._socket = io(url);

    this._socket.on("connect", () => {
      if (lobbyName == null) {
        lobbyName = uuid4().replace("-", "");
        this._socket.emit("room", lobbyName);
      } else {
        this._socket.emit("room", lobbyName);
      }
    });

    _lobbyName = lobbyName;
  }

  send(json) {
    if (!this._connected) {
      throw new Error(
        "The connection to the lobby has not been established yet."
      );
    }
    this._socket.emit("send", json);
  }

  onReceive(callback) {
    this._socket.on("receive", (json) => {
      callback(json);
    });
  }

  leave() {
    this._socket.emit("disconnect");
  }

  getLobbyName() {
    return this._lobbyName;
  }
}

export default Lobbies;
