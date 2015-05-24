var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    osc = audioCtx.createOscillator(),
    gain = audioCtx.createGain();

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.type = "sine";
osc.frequency.value = 50;
gain.gain.value = 1.0;
osc.start();
