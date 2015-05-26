var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    source = audioCtx.createBufferSource(),
    xhr = new XMLHttpRequest(),
    pbDiff = 0,
    minPb = 1.1,
    maxPb = 2.2;

xhr.open("GET", "/sounds/engine.wav", true);
xhr.responseType = "arraybuffer";
xhr.onload = function(e){
  audioCtx.decodeAudioData(this.response, function(buffer) {
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
