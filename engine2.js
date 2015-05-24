var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    freqDiff = 0,
    minFreq = 69,
    maxFreq = 121;

window.onkeydown = function(e) {
  freqDiff = 1;
};

window.onkeyup = function(e) {
  freqDiff = -1;
};
