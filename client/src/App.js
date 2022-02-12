import "./App.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import { ArtistButton } from "./components/ArtistButton";

function App() {
  const [artist, setArtist] = useState("");
  const [isBool, setBool] = useState(false);

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
      <ArtistInput handleArtist={handleArtist} />
      <ArtistButton handleClick={handleClick} />
      <Songs artist={artist} />
    </div>
  );
}

export default App;
