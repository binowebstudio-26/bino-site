/* ==========================================================
   sound.js — cat sounds 🔊
   ----------------------------------------------------------
   How it works:
   - Sound starts OFF (so nobody gets surprised at work).
   - The "Cat sounds" buttons turn it on/off.
   - The choice is remembered for next time.
   - Anything with  data-meow  in the HTML meows when clicked.

   The sounds come from  sounds/meow.mp3  and  sounds/purr.mp3.
   If a file is missing, a computer-made sound is used instead.

   Other files can use:
     meow()        → one meow (meow(1.2) = a higher, smaller-cat meow)
     startPurr()   → start purring (keeps going)
     stopPurr()    → fade the purr out
   ========================================================== */


/* ---------- 1. Remember the on/off choice ---------- */
const SOUND_KEY = 'bino-sound';

function loadSoundSetting() {
  try {
    return localStorage.getItem(SOUND_KEY) === 'on';
  } catch (error) {
    return false; // some private browsers block storage, that's ok
  }
}

function saveSoundSetting(isOn) {
  try {
    localStorage.setItem(SOUND_KEY, isOn ? 'on' : 'off');
  } catch (error) {
    // ignore, the toggle still works for this visit
  }
}

let soundOn = loadSoundSetting();


/* ---------- 2. The "Cat sounds" buttons ----------
   (one under the laptop on the Home page, one in every footer.
   They all stay in sync.) */
const soundButtons = document.querySelectorAll('.sound-toggle');

function updateSoundButtons() {
  soundButtons.forEach((button) => {
    button.setAttribute('aria-pressed', soundOn);
    const state = button.querySelector('.sound-state');
    if (state) state.textContent = soundOn ? 'on' : 'off';
  });
}

updateSoundButtons();
soundButtons.forEach((button) => {
  button.addEventListener('click', () => {
    soundOn = !soundOn;
    saveSoundSetting(soundOn);
    updateSoundButtons();
    if (soundOn) meow(); // a little meow to say "sound is on!"
    else stopPurr();
  });
});


/* ---------- 3. The sound engine ----------
   Browsers only allow sound after the visitor clicks or taps once,
   so the first click/tap/key press anywhere "unlocks" it. */
let audioContext = null;

function getAudioContext() {
  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function unlockSound() {
  if (soundOn) {
    getAudioContext();
    loadRecordings();
  }
}
document.addEventListener('pointerdown', unlockSound);
document.addEventListener('keydown', unlockSound);

// The two recordings, loaded once and kept ready
const recordings = { meow: null, purr: null };
let recordingsRequested = false;

function loadRecordings() {
  if (recordingsRequested) return;
  recordingsRequested = true;
  const ctx = getAudioContext();
  ['meow', 'purr'].forEach((name) => {
    fetch(`sounds/${name}.mp3`)
      .then((response) => response.arrayBuffer())
      .then((data) => ctx.decodeAudioData(data))
      .then((buffer) => { recordings[name] = buffer; })
      .catch(() => { /* no file (or opened without a server): use the computer-made sound */ });
  });
}

// Get the recordings ready as soon as the page opens, so the first meow isn't late
loadRecordings();


/* ---------- 4. Meow ---------- */
// rate: 1 = normal, bigger = higher pitch (a smaller cat), smaller = deeper
function meow(rate = 1) {
  if (!soundOn) return;
  const ctx = getAudioContext();
  loadRecordings();

  if (recordings.meow) {
    const player = ctx.createBufferSource();
    player.buffer = recordings.meow;
    player.playbackRate.value = rate;
    player.connect(ctx.destination);
    player.start();
  } else {
    synthMeow(ctx, rate);
  }
}

// Computer-made meow: the pitch slides up then down, like "mee-ow"
function synthMeow(ctx, rate) {
  const now = ctx.currentTime;
  const voice = ctx.createOscillator();
  const softener = ctx.createBiquadFilter();
  const volume = ctx.createGain();

  voice.type = 'triangle';
  const pitch = (620 + Math.random() * 120) * rate;
  voice.frequency.setValueAtTime(pitch, now);
  voice.frequency.linearRampToValueAtTime(pitch * 1.45, now + 0.12);
  voice.frequency.linearRampToValueAtTime(pitch * 0.8, now + 0.38);

  softener.type = 'lowpass';
  softener.frequency.value = 1800;

  volume.gain.setValueAtTime(0.0001, now);
  volume.gain.exponentialRampToValueAtTime(0.18, now + 0.05);
  volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

  voice.connect(softener).connect(volume).connect(ctx.destination);
  voice.start(now);
  voice.stop(now + 0.45);
}


/* ---------- 5. Purr (keeps going until you stop it) ---------- */
const PURR_VOLUME = 0.45; // 1 = full volume. Lower this number for a quieter purr.

let purrPlayer = null; // the sound that is playing right now
let purrVolume = null; // its volume knob (used to fade in and out)

function startPurr() {
  if (!soundOn || purrPlayer) return; // sound off, or already purring
  const ctx = getAudioContext();
  loadRecordings();
  const now = ctx.currentTime;

  purrVolume = ctx.createGain();
  purrVolume.gain.setValueAtTime(0.0001, now);
  purrVolume.gain.exponentialRampToValueAtTime(PURR_VOLUME, now + 0.3); // gentle fade in
  purrVolume.connect(ctx.destination);

  if (recordings.purr) {
    // Play the recording on repeat, so the purr never runs out
    purrPlayer = ctx.createBufferSource();
    purrPlayer.buffer = recordings.purr;
    purrPlayer.loop = true;
    purrPlayer.connect(purrVolume);
  } else {
    purrPlayer = makeSynthPurr(ctx, purrVolume);
  }
  purrPlayer.start(now);
}

function stopPurr() {
  if (!purrPlayer) return;
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  purrVolume.gain.cancelScheduledValues(now);
  purrVolume.gain.setValueAtTime(purrVolume.gain.value, now);
  purrVolume.gain.exponentialRampToValueAtTime(0.0001, now + 0.5); // gentle fade out
  purrPlayer.stop(now + 0.55);
  purrPlayer = null;
  purrVolume = null;
}

// Computer-made purr: warm "fuzz" that pulses about 24 times a second.
// Returns an object with start() and stop() so it works like the recording.
function makeSynthPurr(ctx, output) {
  const noise = ctx.createBufferSource();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noise.buffer = buffer;
  noise.loop = true;

  const warmth = ctx.createBiquadFilter();
  warmth.type = 'bandpass';
  warmth.frequency.value = 260;
  warmth.Q.value = 0.9;

  const pulse = ctx.createGain();
  pulse.gain.value = 0;
  const pulser = ctx.createOscillator();
  pulser.frequency.value = 24;
  const depth = ctx.createGain();
  depth.gain.value = 1;
  pulser.connect(depth).connect(pulse.gain);

  const boost = ctx.createGain();
  boost.gain.value = 3;

  noise.connect(warmth).connect(pulse).connect(boost).connect(output);

  return {
    start(time) { noise.start(time); pulser.start(time); },
    stop(time) { noise.stop(time); pulser.stop(time); },
  };
}


// Let other files (like cats.js) use these
window.meow = meow;
window.startPurr = startPurr;
window.stopPurr = stopPurr;


/* ---------- 6. Meow on click ---------- */
document.querySelectorAll('[data-meow]').forEach((el) => {
  el.addEventListener('click', () => meow());
});
