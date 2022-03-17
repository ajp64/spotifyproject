import css from "./App.module.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";

function App() {
  const [artist, setArtist] = useState("");

  function handleArtist(e) {
    if (e.key === "Enter") {
      setArtist(e.target.value);
      console.log(artist);
    }
  }

  return (
    <div>
      <header className={css.appHeader}>The Music of Antony's 2021</header>
      <ArtistInput
        className={css.app}
        handleArtist={handleArtist}
        artist={artist}
      />
      <Songs artist={artist} />
    </div>
  );
}

export default App;
