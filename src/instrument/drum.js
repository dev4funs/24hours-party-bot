import * as Tone from "tone";
import houseware from "../samples/houseware_120BPM_BANDLAB";

const getUrls = (instruments) => {
  console.log(Array.isArray(instruments));
  let urls = {};
  for (const key in instruments) {
    for (const { name, url } of instruments[key]) {
      urls[name] = url;
    }
  }
  return urls;
};

class DrumMachine {
  constructor() {
    this.samples = houseware;
    this.tracks = this.initTracks(this.samples.instruments);
    this.isPlay = false;
    this.isLoaded = false;
    this.counter = 0;
    const urls = getUrls(this.samples.instruments);
    const baseUrl = "https://assets.codepen.io/4076236/";

    Tone.Transport.bpm.value = this.samples.BPM;
    this.multSampler = new Tone.Players({
      urls,
      baseUrl,
      onload: () => {
        console.log("init");
        this.isLoaded = true;
      },
    }).toDestination();
    // init first loop tracks
    this.tracks["Kick"] = "Kick 01";
    this.tracks["Pad"] = "Pad 01";

    const loop = new Tone.Loop((time) => {
      console.log("time", time);
      console.log("time", this.counter);
      if (this.counter % 4 === 0) {
        this.tracks["Perc"] = "Perc 02";
      }
      if (this.counter % 8 === 0) {
        this.tracks["Perc"] = "Perc 01";
      }
      for (const trackName in this.tracks) {
        if (this.tracks[trackName] !== "") {
          const sampleName = this.tracks[trackName];
          console.log(sampleName);
          this.playSample(trackName, sampleName, this.counter, time);
        }
      }
      this.counter++;
    }, "1m").start(0);

    Tone.loaded().then(() => {
      Tone.Transport.start("+0");
    });

    /**
     * BASS
     */
    // const bass = new Tone.MonoSynth({
    //   volume: -20,
    //   envelope: {
    //     attack: 0.1,
    //     decay: 0.3,
    //     release: 2,
    //   },
    //   filterEnvelope: {
    //     attack: 0.001,
    //     decay: 0.01,
    //     sustain: 0.5,
    //     baseFrequency: 200,
    //     octaves: 2.6,
    //   },
    // }).toDestination();

    // const bassPart = new Tone.Sequence(
    //   (time, note) => {
    //     bass.triggerAttackRelease(note, "16n", time);
    //   },
    //   ["C2", "C3", "E2", ["D2", "A1"]],
    //   "4n"
    // ).start(0);

    // const loop = new Tone.Loop((time) => {
    //   // triggered every eighth note.
    //   console.log(time);
    //   kick.stop();
    //   kick.start();
    // }, "1n").start(0);

    // bassPart.probability = 0.9;
  }

  initTracks(instruments) {
    const tracks = {};
    for (const key in instruments) {
      tracks[key] = "";
    }
    return tracks;
  }

  autoGenerator() {}

  playSample(trackName, sampleName, count, time) {
    const sample = this.samples.instruments[trackName].find(
      ({ name }) => name === sampleName
    );
    console.log(sample);
    if (sample && sample.length !== undefined) {
      const measure = sample.length / 4;
      if (count % measure === 0) {
        this.multSampler.player(sampleName).start(time);
        console.log("play", sampleName);
      }
    }
  }

  play = () => {
    if (!this.isPlay) {
      // const loop = new Tone.Loop((time) => {
      //   const currentTime = parseInt(time);
      //   console.log("time", time);
      // }, "1n").start(0);

      // // this.autoGenerator();

      // Tone.loaded().then(() => {
      //   Tone.Transport.start();
      // });
      this.isPlay = true;
    }
  };

  playSnare() {
    console.log("Snare");
    console.log(this.multSampler.player("Snare 01").sampleTime);
    this.multSampler.player("Snare 01").start();
  }

  playKick() {
    console.log("Kick");
    this.multSampler.player("Kick 01").start();
  }

  stopAll() {
    this.multSampler.stopAll();
    this.isPlay = false;
  }
}

export default DrumMachine;
