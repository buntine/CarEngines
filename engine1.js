window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      freqDiff = 0,
      minFreq = 69,
      maxFreq = 121,
      osc, intervalId;

  function createFreqDiff(n) {
    return function(e) {
      if (e.keyCode == 38) {
        freqDiff = n;
      }
    }
  }

  window.addEventListener("keydown", createFreqDiff(1));
  window.addEventListener("keyup", createFreqDiff(-1));

  start.addEventListener("click", function(e){
    var gain = audioCtx.createGain();
     
    osc = audioCtx.createOscillator(),
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sawtooth";
    osc.frequency.value = minFreq + 1;
    gain.gain.value = 0.2;
    osc.start();

    intervalId = setInterval(function(){
      var currFreq = osc.frequency.value;

      if ((freqDiff < 0 && currFreq > minFreq) ||
          (freqDiff > 0 && currFreq < maxFreq)) {
        osc.frequency.value += freqDiff;
      }
    }, 40);
  });

  stop.addEventListener("click", function(e){
    if (osc) {
      osc.stop();
    }
    clearInterval(intervalId);
  });
};
