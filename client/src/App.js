import css from "./App.module.css";
import { useState } from "react";
import { Songs } from "./components/Songs";
import { ArtistInput } from "./components/ArtistInput";
import { SimpleBarChart } from "./components/SongChart/songchart.js";

const testdata = [
  { name: "Page A", pv: 240 },
  { name: "B", pv: 2210 },
  { name: "C", pv: 2300 },
  { name: "Page D", pv: 2000 },
  { name: "Zero", pv: 0 },
  { name: "Hi", pv: 123 },
  { name: "Bye", pv: 2091 },
];

function App() {
  const [artist, setArtist] = useState("");

  function handleArtist(e) {
    setArtist(e);
    console.log(artist);
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
