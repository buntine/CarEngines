window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      xhr = new XMLHttpRequest(),
      pitchDiff = 0,
      minPitch = 1.1,
      maxPitch = 2.2,
      source, intervalId;

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
    var audioData = this.response;

    window.addEventListener("keydown", createPitchDiff(0.02))
    window.addEventListener("keyup", createPitchDiff(-0.02))

    start.addEventListener("click", function(e){
      source = audioCtx.createBufferSource();

      audioCtx.decodeAudioData(audioData, function(buffer) {
        source.buffer = buffer;
        source.loop = true;
        source.connect(audioCtx.destination);
        source.start();
      });

      intervalId = setInterval(function(){
        var currPitch = source.playbackRate.value;

        if ((pitchDiff < 0 && currPitch > minPitch) ||
            (pitchDiff > 0 && currPitch < maxPitch)) {
          source.playbackRate.value += pitchDiff;
        }
      }, 50);
    });

    stop.addEventListener("click", function(e){
      if (source) {
        source.stop();
      }
      clearInterval(intervalId);
    });
  };

  xhr.send();
};
