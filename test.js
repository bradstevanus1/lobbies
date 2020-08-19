import Lobbies from "./client";

// Player 1
const lobbies = new Lobbies("https://localhost:5000");
const giveToPlayer2 = lobbies.getLobbyName();
lobbies.onReceive((json) => alert(json));

lobbies.send("put x on (0,0)");

// Player 2
const lobbies = new Lobbies("https://localhost:5000", giveToPlayer2);
lobbies.onReceive((json) => alert(json));

lobbies.send("put y on (1, 2)");
