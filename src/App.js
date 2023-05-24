import { connect } from 'socket.io-client';
import './App.css';
import Lobby from './Components/Lobby';
import WaitingArea from './Components/WaitingArea';
import { useState, useEffect } from 'react';

function App() {
  const [connected, setConnected] = useState(false);
  const [lobbies, setLobbies] = useState([]);
  const [socket, setSocket] = useState(null); // Declare socket state

  const onClick = () => {
    if (socket) {
      return; // Return early if socket connection already exists
    }
  
    const newSocket = new WebSocket('ws://salvoserver.my.to:47654');
    newSocket.onopen = function () {
      console.log('WebSocket connection established.');
      newSocket.send(
        JSON.stringify({
          connect: {
            user_name: 'Tizio',
            profile_image: '',
            commit_hash: '',
          },
        })
      );
      newSocket.send(
        JSON.stringify({
          lobby_list: {},
        })
      );
      // Update the connected state when the connection is established
      setConnected(true);
    };
  
    setSocket(newSocket);
  };
  

  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        var data = JSON.parse(event.data);
        console.log(data);

//{lobby_update: {…}}
// lobby_update
// : 
// {lobby_id: 1, name: 'Kasplode', num_players: 1, state: 'waiting'}
// [[Prototype]]
// : 
// Object

        //if message is lobby_removed or Lobby_update add the info to the lobby array
        if (data.lobby_removed) {
          setLobbies(lobbies => lobbies.filter((lobby) => lobby.lobby_id !== data.lobby_removed.lobby_id));
          
        }
        if (data.lobby_update) {
          setLobbies(lobbies => lobbies.filter((lobby) => lobby.lobby_id !== data.lobby_update.lobby_id).concat(data.lobby_update));
        }
        
      };
  
      socket.addEventListener('message', handleMessage);
  
      return () => {
        socket.removeEventListener('message', handleMessage);
      };
    }
  }, [socket]);

function checkLobbyes () {
  console.log(lobbies);
  socket.send(
    JSON.stringify({
      lobby_list: {},
    })
  );
}

  return (
    <div className="App">
      <h1>React App</h1>

      <button onClick={checkLobbyes}>Check</button>
      {connected ? <WaitingArea />: <button onClick={onClick}>Click</button>}
      {lobbies.map((lobby_data) => ( // Map over the lobbies array and render a Lobby component for each lobby
        <Lobby key={lobby_data.lobby_id} lobby={lobby_data}/>
      ))}


    </div>
  );
}

export default App;
