const houseware = {
  name: "houseware_120BPM_BANDLAB",
  instruments: {
    Snare: [
      {
        id: 1,
        name: "Snare 01",
        url: "Houseware+Snare+01-120BPM-BANDLAB.wav",
        length: 4,
      },
      {
        id: 2,
        name: "Snare 02",
        url: "Houseware+Snare+02-120BPM-BANDLAB.wav",
        length: 8,
      },
    ],
    Kick: [
      {
        id: 1,
        name: "Kick 01",
        url: "Houseware+Kick+01-120BPM-BANDLAB_1.wav",
        length: 4,
      },
      {
        id: 2,
        name: "Kick 02",
        url: "Houseware+Kick+02-120BPM-BANDLAB_1.wav",
        length: 4,
      },
    ],
    Perc: [
      {
        id: 1,
        name: "Perc 01",
        url: "Houseware+Perc+01-120BPM-BANDLAB_1.wav",
        length: 4,
      },
      {
        id: 2,
        name: "Perc 02",
        url: "Houseware+Perc+02-120BPM-C+major-BANDLAB_1.wav",
        length: 8,
      },
    ],
    Pad: [
      {
        id: 1,
        name: "Pad 01",
        url: "Houseware+Pad+01-120BPM-C+major-BANDLAB_1.wav",
        length: 16,
      },
      {
        id: 2,
        name: "Pad 02",
        url: "Houseware+Pad+02-120BPM-C+major-BANDLAB_1.wav",
        length: 16,
      },
    ],
    Lead: [
      {
        id: 1,
        name: "Lead 01",
        url: "Houseware+Lead-120BPM-C+major-BANDLAB_1.wav",
        length: 16,
      },
    ],
    Bass: [
      {
        id: 1,
        name: "Bass 01",
        url: "Houseware+Bass-120BPM-C+major-BANDLAB_1.wav",
        length: 16,
      },
    ],
    FX: [
      {
        id: 1,
        name: "FX 01",
        url: "Houseware+FX-120BPM-BANDLAB_1.wav",
        length: 16,
      },
    ],
  },
  instrumentNum: 7,
  BPM: 120,
  changeTime: 8,
  initSample: [
    { track: "Kick", sample: "Kick 01" },
    { track: "Pad", sample: "Pad 01" },
  ],
  rootTrack: "Kick",
};

export default houseware;
