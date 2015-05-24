var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    osc = audioCtx.createOscillator(),
    gain = audioCtx.createGain(),
    freqDiff = 0,
    minFreq = 69,
    maxFreq = 121;

osc.connect(gain);
gain.connect(audioCtx.destination);

osc.type = "sawtooth";
osc.frequency.value = 70;
gain.gain.value = 0.2;
osc.start();

window.onkeydown = function(e) {
  freqDiff = 2;
};

window.onkeyup = function(e) {
  freqDiff = -2;
};

setInterval(function(){
  var currFreq = osc.frequency.value;

  if ((freqDiff < 0 && currFreq > minFreq) || (freqDiff > 0 && currFreq < maxFreq)) {
    osc.frequency.value += freqDiff;
  }
}, 100);
