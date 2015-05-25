var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    source = audioCtx.createBufferSource(),
    xhr = new XMLHttpRequest();

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
};

window.onkeydown = function(e) {
};
