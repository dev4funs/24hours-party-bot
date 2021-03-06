import SamplerMachine from "./instrument/sampler";
import "./App.css";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

function App() {
  const drum = useRef(null);
  useEffect(() => {
    if (drum.current === null) {
      drum.current = new SamplerMachine();
    }
    return () => {
      drum.current = null;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <select name="cars" id="cars">
          <option value="blastBack">blastBack</option>
          <option value="houseware">houseware</option>
        </select> */}
        <button
          onClick={async () => {
            await Tone.start();
            console.log("init success");
          }}
        >
          Init Audio
        </button>
        <button
          onClick={() => {
            drum.current && drum.current.play();
          }}
        >
          Play
        </button>
        <button
          onClick={() => {
            Tone.Transport.stop();
          }}
        >
          Stop
        </button>
      </header>
    </div>
  );
}

export default App;
