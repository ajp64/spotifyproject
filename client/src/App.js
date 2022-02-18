import css from "./App.module.css";
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
    <div>
      <header className={css.appHeader}>The Music of Antony's 2021</header>
      <ArtistInput className={css.app} handleArtist={handleArtist} />
      <Songs artist={artist} />
    </div>
  );
}

export default App;
