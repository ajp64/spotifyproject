import "./index.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const loadData = async () => {
    const response = await fetch("/history/artist?name=Opeth", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // const apiData = await response.json();
    setData(await response.json());
    console.log(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">
      <h1>Spotify</h1>
    </div>
  );
}
export default App;
