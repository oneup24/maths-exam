let ctx=null;
const ac=()=>{if(!ctx)ctx=new(window.AudioContext||window.webkitAudioContext)();return ctx};

const tone=(freq,type,duration,vol,delay=0)=>{
  try{
    const c=ac(),osc=c.createOscillator(),g=c.createGain();
    osc.type=type;osc.connect(g);g.connect(c.destination);
    osc.frequency.setValueAtTime(freq,c.currentTime+delay);
    g.gain.setValueAtTime(vol,c.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+delay+duration);
    osc.start(c.currentTime+delay);osc.stop(c.currentTime+delay+duration);
  }catch{/* intentionally empty — audio may be blocked by browser policy */}
};

export const playCorrect=()=>{
  tone(523,'sine',0.15,0.25);
  tone(659,'sine',0.2,0.25,0.1);
};

export const playWrong=()=>{
  tone(220,'sawtooth',0.08,0.15);
  tone(180,'sawtooth',0.15,0.12,0.08);
};

export const playTick=()=>{
  tone(900,'sine',0.04,0.08);
};

export const playFanfare=()=>{
  [523,659,784,1047].forEach((f,i)=>tone(f,'sine',0.25,0.28,i*0.11));
};

export const playSubmit=()=>{
  tone(440,'sine',0.12,0.2);
  tone(550,'sine',0.15,0.2,0.1);
};
