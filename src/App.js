import DrumMachine from "./instrument/drum";
import "./App.css";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

function App() {
  const drum = useRef(null);
  useEffect(() => {
    if (drum.current === null) {
      drum.current = new DrumMachine();
    }
    return () => {
      drum.current = null;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={async () => {
            await Tone.start();
            console.log("init success");
          }}
        >
          init audio
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
            drum.current && drum.current.playSnare();
          }}
        >
          Snare
        </button>
        <button
          onClick={() => {
            drum.current && drum.current.playKick();
          }}
        >
          Kick
        </button>
        <button
          onClick={() => {
            Tone.Transport.stop();
          }}
        >
          stop
        </button>
      </header>
    </div>
  );
}

export default App;
