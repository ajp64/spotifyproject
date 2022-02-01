import "./App.css";
import { useEffect } from "react";

function App() {
  async function loadData() {
    const response = await fetch(
      "https://my-spotify-2021.herokuapp.com/artist?name=emperor"
    );
    const data = response.json();
    console.log(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">Spotify 2021</header>
    </div>
  );
}

export default App;
