var audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    osc = audioCtx.createOscillator(),
    gain = audioCtx.createGain(),
    distortion = audioCtx.createWaveShaper();

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;

  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }

  return curve;
};

distortion.curve = makeDistortionCurve(400);
osc.connect(distortion);
osc.connect(gain);
gain.connect(audioCtx.destination);

osc.type = "sawtooth";
osc.frequency.value = 70;
gain.gain.value = 0.2;
osc.start();

setInterval(function(){
  osc.frequency.value += 1;
}, 100);
