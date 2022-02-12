import "./App.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";

function App() {
  const [artist, setArtist] = useState("");

  function handleArtist(e) {
    setArtist(e);
    console.log(artist);
  }

  return (
    <div className="App">
      <header className="App-header">Spotify 2021</header>
      <ArtistInput handleArtist={handleArtist} />
      <Songs artist={artist} />
    </div>
  );
}

export default App;
