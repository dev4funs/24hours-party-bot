import * as Tone from "tone";
import DrumMachine from "./instrument/drum";
import { demoTrack } from "../assets/js/patterns";
class MusicBot {
  constructor(bpm) {
    this.drum = new DrumMachine();
    this.bpm = bpm;

    this.state = {
      bpm: 94,
      position: 0,
      volume: -6,
      playing: false,
      bside: false,
      currentPattern: demoTrack,
    };
  }

  startStop() {
    if (this.state.playing) {
      Tone.Transport.stop();
      this.state.playing = false;
    } else {
      Tone.Transport.start("+0.25");
      this.state.playing = false;
    }
  }

  changeTempo(newTemp) {
    let newTempo;
    if (isNaN(newTempo)) {
      newTempo = 10;
    }
    if (newTempo > 200) {
      newTempo = 200;
    }
    Tone.Transport.bpm.value = newTempo;
    this.state.bpm = newTempo;
  }

  play() {}
}

export default MusicBot;
