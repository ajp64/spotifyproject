import "./App.css";
import { useEffect, useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import { ArtistButton } from "./components/ArtistButton";

function App() {
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState("");
  const [isBool, setBool] = useState(false);

  async function loadData() {
    const response = await fetch(
      `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`
    );
    const data = await response.json();
    console.log(data);
    setSongs(data.payload);
    console.log(songs);
  }

  useEffect(() => {
    loadData();
  }, [isBool]);

  function handleArtist(e) {
    setArtist(e);
    console.log(artist);
  }

  function handleClick() {
    setBool(!isBool);
    console.log(isBool);
  }

  return (
    <div className="App">
      <header className="App-header">Spotify 2021</header>
      <ArtistInput
        handleArtist={(e) => {
          handleArtist(e.target.value);
        }}
      />
      <ArtistButton handleClick={handleClick} />
      <Songs songs={songs} />
    </div>
  );
}

export default App;
