import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import css from "./index.module.css";

export function ArtistInput({ handleArtist }) {
  const [artistList, setList] = useState([]);
  let url = "https://my-spotify-2021.herokuapp.com/all";
  const { data } = useFetch(url);

  // a function to use in filter, which removes duplicates from the list of artists you can select from
  function onlyUnique(value, index, self) {
    return (
      index ===
      self.findIndex((t) => t.artist === value.artist && t.name === value.name)
    );
  }

  // function to sort list alphabetically by artist
  function sortArtist(a, b) {
    if (a.artist < b.artist) {
      return -1;
    }
    if (a.artist > b.artist) {
      return 1;
    }
    return 0;
  }

  // data is filtered to unique items, then ordered alphabetically
  useEffect(() => {
    if (data) {
      let filteredArray = data.payload.filter(onlyUnique);
      setList(filteredArray.sort(sortArtist));
    }
  }, [data]);

  if (artistList) {
    return (
      <>
        <input
          className={css.artistInput}
          list="browsers"
          onChange={(e) => handleArtist(e.target.value)}
          placeholder={`Search or choose an artist!`}
        />
        <datalist id="browsers">
          {artistList.map((item, index) => {
            return <option value={item.artist} key={index} />;
          })}
        </datalist>
      </>
    );
  } else {
    return (
      <input
        list="browsers"
        onChange={(e) => handleArtist(e.target.value)}
        placeholder={`Enter an artist!`}
      />
    );
  }
}
