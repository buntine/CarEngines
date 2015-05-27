window.onload = function(){
  var start = document.getElementById("start"),
      stop = document.getElementById("stop"),
      audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
      xhr = new XMLHttpRequest(),
      pitch = {step: 0, min: 1.1, max: 2.2},
      source, intervalId;

  function createPitchStep(n) {
    return function(e) {
      if (e.keyCode == 38) {
        pitch.step = n;
      }
    }
  }

  xhr.open("GET", "/sounds/engine.wav", true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function(e){
    var audioData = this.response;

    window.addEventListener("keydown", createPitchStep(0.02))
    window.addEventListener("keyup", createPitchStep(-0.02))

    start.addEventListener("click", function(e){
      if (!source) {
        source = audioCtx.createBufferSource();

        audioCtx.decodeAudioData(audioData, function(buffer) {
          source.buffer = buffer;
          source.loop = true;
          source.connect(audioCtx.destination);
          source.start();
        });

        intervalId = setInterval(function(){
          var currPitch = source.playbackRate.value;

          if ((pitch.step < 0 && currPitch > pitch.min) ||
              (pitch.step > 0 && currPitch < pitch.max)) {
            source.playbackRate.value += pitch.step;
          }
        }, 50);
      }
    });

    stop.addEventListener("click", function(e){
      if (source) {
        source.stop();
        source = null;
        clearInterval(intervalId);
      }
    });
  };

  xhr.send();
};
