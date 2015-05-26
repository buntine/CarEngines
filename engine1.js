window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      freqDiff = 0,
      minFreq = 69,
      maxFreq = 121,
      osc, intervalId, incFreq, decFreq;

  function createFreqDiff(n) {
    return function(e) {
      if (e.keyCode == 38) {
        freqDiff = n;
      }
    }
  }

  incFreq = createFreqDiff(1);
  decFreq = createFreqDiff(-1);

  start.addEventListener("click", function(e){
    var gain = audioCtx.createGain();
     
    osc = audioCtx.createOscillator(),
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sawtooth";
    osc.frequency.value = 70;
    gain.gain.value = 0.2;
    osc.start();

    window.addEventListener("keydown", incFreq);
    window.addEventListener("keyup", decFreq);

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
    window.removeEventListener("keydown", incFreq);
    window.removeEventListener("keyup", decFreq);
    clearInterval(intervalId);
  });
};
