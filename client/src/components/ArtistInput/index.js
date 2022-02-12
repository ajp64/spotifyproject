import { useFetch } from "../../hooks/useFetch";
import { useState, useEffect } from "react";

export function ArtistInput({ handleArtist }) {
  const [artistList, setList] = useState([]);
  let url = "https://my-spotify-2021.herokuapp.com/all";
  const { data } = useFetch(url);

  function onlyUnique(value, index, self) {
    return (
      index ===
      self.findIndex((t) => t.artist === value.artist && t.name === value.name)
    );
  }

  useEffect(() => {
    if (data) {
      setList(data.payload.filter(onlyUnique));
    }
  }, [data]);

  if (artistList) {
    return (
      <>
        <input
          list="browsers"
          onChange={(e) => handleArtist(e.target.value)}
          placeholder={`Enter an artist!`}
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
