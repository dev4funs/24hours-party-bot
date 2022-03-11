import * as Tone from "tone";
// import sample from "../samples/houseware_120BPM_BANDLAB";
// import sample from "../samples/blastBack_125BPM_BANDLAB";
import sample from "../samples/jadehouse_118BPM_BANDLAB";

const getUrls = (instruments) => {
  let urls = {};
  for (const key in instruments) {
    for (const { name, url } of instruments[key]) {
      urls[name] = url;
    }
  }
  return urls;
};

class SamplerMachine {
  constructor() {
    // init variables
    this.songIndex = 0;
    this.samples = sample;
    this.tracks = null;
    this.onPlayTracks = null;
    this.notPlayTrack = null;
    this.isPlay = false;
    this.isLoaded = false;
    this.counter = 0;
    this.loop = null;
    this.changeTime = this.samples.changeTime;

    this.changeMap = [
      ["hold", 0.05],
      ["update", 0.35],
      ["reduce", 0.35],
      ["break", 0.25],
    ];

    const urls = getUrls(this.samples.instruments);
    const baseUrl = "https://assets.codepen.io/4076236/";
    Tone.Transport.bpm.value = this.samples.BPM;

    this.initTracks(this.samples.instruments);

    this.multSampler = new Tone.Players({
      urls,
      baseUrl,
      onload: () => {
        console.log("init");
        this.isLoaded = true;
      },
    }).toDestination();

    // init first loop tracks
    for (const { track, sample } of this.samples.initSample)
      this.setTrack(track, sample);

    this.loop = new Tone.Loop((time) => {
      console.log("time", time);
      console.log("time", this.counter);
      if (this.counter % this.changeTime === 0) {
        console.log("change");
        this.autoGenerator();
      }
      console.log(this.tracks);
      for (const trackName in this.tracks) {
        if (this.tracks[trackName] !== "") {
          const sampleName = this.tracks[trackName];
          this.playSample(trackName, sampleName, this.counter, time);
        }
      }
      this.counter++;
    }, "1m").start(0);
  }

  initTracks(instruments) {
    this.tracks = {};
    this.onPlayTracks = new Set();
    this.notPlayTrack = new Set();
    for (const key in instruments) {
      console.log(key);
      this.tracks[key] = "";
      this.notPlayTrack.add(key);
    }
    console.log("initTracks", this.tracks, this.notPlayTrack);
  }

  setTrack(trackName, sampleName) {
    console.log("setTrack", trackName, sampleName);
    this.tracks[trackName] = sampleName;
    this.onPlayTracks.add(trackName);
    this.notPlayTrack.delete(trackName);
  }

  stopTrack(trackName) {
    console.log("stopTrack", trackName);
    this.tracks[trackName] = "";
    this.onPlayTracks.delete(trackName);
    this.notPlayTrack.add(trackName);
  }

  getNextChange() {
    let random = Math.random();
    let index = 0;
    while (random > 0) {
      if (this.changeMap[index][1] >= random) {
        break;
      } else {
        random -= this.changeMap[index][1];
        index++;
      }
    }
    return this.changeMap[index][0];
  }

  changeSampleOnTrack(trackName) {
    this.getRandomSampleFromTrack(trackName);
  }

  break() {
    const trackName = this.tracks[this.samples.rootTrack];
    this.initTracks(this.samples.instruments);
    this.setTrack(this.samples.rootTrack, trackName);
    this.addTrackSample();
    this.addTrackSample();
  }

  autoGenerator() {
    console.log(this.onPlayTracks.size);
    console.log(Object.keys(this.tracks).length);
    const trackLen = Object.keys(this.tracks).length;
    const onPlayTrackLen = this.onPlayTracks.size;
    if (onPlayTrackLen < trackLen) {
      this.addTrackSample();
    } else if (onPlayTrackLen === trackLen) {
      // this.updateTrackSample();
      const action = this.getNextChange();
      console.log("**********change********", action);
      switch (action) {
        case "hold":
          break;
        case "update":
          this.updateTrackSample();
          break;
        case "break":
          this.break();
          break;
        case "reduce":
          this.reduceTrackSample();
          break;
        default:
          break;
      }
    }
  }

  selectRandomItemFromArray(array) {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  getRandomOnPlayTrackName() {
    const onPlayTrackNames = [...this.onPlayTracks];
    if (onPlayTrackNames.length === 0) {
    } else {
      return this.samples.initSample[0].track;
    }
    return this.selectRandomItemFromArray(onPlayTrackNames);
  }

  getRandomNotPlayTrackName() {
    const notPlayTrackNames = [...this.notPlayTrack];
    return this.selectRandomItemFromArray(notPlayTrackNames);
  }

  addTrackSample() {
    const trackName = this.getRandomNotPlayTrackName();
    console.log("add", trackName);
    const sampleName = this.getRandomSampleFromTrack(trackName);
    this.setTrack(trackName, sampleName);
  }

  updateTrackSample() {
    const random = Math.floor(Math.random() * 2);
    const trackNames = this.getRandomOnPlayTrackNames();
    for (let i = 0; i <= random; i++) {
      const updateTrackName = this.selectRandomItemFromArray(trackNames);
      if (this.samples.instruments[updateTrackName].length < 2) {
        this.stopTrack(updateTrackName);
      } else {
        let sampleName = this.getRandomSampleFromTrack(updateTrackName);
        while (sampleName === this.tracks[updateTrackName]) {
          sampleName = this.getRandomSampleFromTrack(updateTrackName);
        }
        this.setTrack(updateTrackName, sampleName);
      }
    }
  }

  getRandomOnPlayTrackNames() {
    const trackNames = [];
    const onPlayTracks = [...this.onPlayTracks];
    for (const key of onPlayTracks) {
      trackNames.push(key);
    }
    return trackNames;
  }

  reduceTrackSample() {
    const random = Math.floor(Math.random() * 2);
    for (let i = 0; i <= random; i++) {
      let trackName = this.getRandomOnPlayTrackName();
      this.stopTrack(trackName);
    }
  }

  getRandomSampleFromTrack(trackName) {
    const track = this.samples.instruments[trackName];
    return this.selectRandomItemFromArray(track).name;
  }

  playSample(trackName, sampleName, count, time) {
    const sample = this.samples.instruments[trackName].find(
      ({ name }) => name === sampleName
    );
    if (sample && sample.length !== undefined) {
      const measure = sample.length / 4;
      if (count % measure === 0) {
        this.multSampler.player(sampleName).start(time);
      }
    }
  }

  play = () => {
    if (!this.isPlay) {
      Tone.loaded().then(() => {
        Tone.Transport.start("+0");
      });
      this.isPlay = true;
    }
  };

  playSnare() {
    console.log("Snare");
    console.log(this.multSampler.player("Snare 01").sampleTime);
    this.multSampler.player("Snare 01").start();
  }

  stopAll() {
    this.multSampler.stopAll();
    this.isPlay = false;
  }
}

export default SamplerMachine;
