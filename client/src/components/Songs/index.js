import { useFetch } from "../../hooks/useFetch";

export function Songs({ artist, handleArtist }) {
  const url = `https://my-spotify-2021.herokuapp.com/artist?name=${artist}`;
  const { data } = useFetch(url);

  if (data) {
    return data.payload.map((item, index) => {
      return <p key={index}>{item.track}</p>;
    });
  } else {
    return null;
  }
}
