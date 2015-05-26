window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      xhr = new XMLHttpRequest(),
      pitchDiff = 0,
      minPitch = 1.1,
      maxPitch = 2.2,
      incPitch, decPitch, intervalId;

  function createPitchDiff(n) {
    return function(e) {
      if (e.keyCode == 38) {
        pitchDiff = n;
      }
    }
  }

  xhr.open("GET", "/sounds/engine.wav", true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function(e){
    var source = audioCtx.createBufferSource(),
        audioData = this.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
      source.buffer = buffer;
      source.loop = true;
      source.connect(audioCtx.destination);
      source.start();
    });
  };

  xhr.send();

  window.onkeyup = function(e) {
    if (e.keyCode == 38) {
      pbDiff = -0.02;
    }
  };

  window.onkeydown = function(e) {
    if (e.keyCode == 38) {
      pbDiff = 0.02;
    }
  };

  setInterval(function(){
    var currPb = source.playbackRate.value;

    if ((pbDiff < 0 && currPb > minPb) || (pbDiff > 0 && currPb < maxPb)) {
      source.playbackRate.value += pbDiff;
    }
  }, 50);
};
