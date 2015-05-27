window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      freq = {step: 0, min: 69, max: 121},
      osc, intervalId;

  function createFreqDiff(n) {
    return function(e) {
      if (e.keyCode == 38) {
        freq.step = n;
      }
    }
  }

  window.addEventListener("keydown", createFreqDiff(1));
  window.addEventListener("keyup", createFreqDiff(-1));

  start.addEventListener("click", function(e){
    if (!osc) {
      var gain = audioCtx.createGain();
       
      osc = audioCtx.createOscillator(),
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sawtooth";
      osc.frequency.value = freq.min + 1;
      gain.gain.value = 0.2;
      osc.start();

      intervalId = setInterval(function(){
        var currFreq = osc.frequency.value;

        if ((freq.step < 0 && currFreq > freq.min) ||
            (freq.step > 0 && currFreq < freq.max)) {
          osc.frequency.value += freq.step;
        }
      }, 40);
    }
  });

  stop.addEventListener("click", function(e){
    if (osc) {
      osc.stop();
      osc = null;
      clearInterval(intervalId);
    }
  });
};
