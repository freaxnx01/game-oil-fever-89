// audio.js — original chiptune engine + tunes (all composed here, homage style)
(function(){
"use strict";
const NN={C:0,'C#':1,D:2,'D#':3,E:4,F:5,'F#':6,G:7,'G#':8,A:9,'A#':10,B:11};
function nfreq(tok){const m=/^([A-G]#?)(-?\d)$/.exec(tok);if(!m)return 0;return 440*Math.pow(2,(NN[m[1]]+12*(+m[2]+1)-69)/12);}
function parse(p){return p.trim().split(/\s+/);}
function compile(w,v,pat){const tk=parse(pat);const ev=[];for(let i=0;i<tk.length;i++){const t=tk[i];if(t==='.'||t==='-')continue;let len=1;for(let j=i+1;j<tk.length&&tk[j]==='-';j++)len++;ev.push({row:i,f:nfreq(t),len});}return {w,v,ev,rows:tk.length};}
const bar=p=>(p+' ').repeat(4);
const bassP=(a,b)=>`${a} - . . ${a} - . . ${b} - . . ${a} - . . `;
const bass8=(a,b)=>`${a} . ${b} . ${a} . ${b} . ${a} . ${b} . ${a} . ${b} . `;
function mk(bpm,lead,bass,arp,dr){const chs=[compile('square',0.26,lead),compile('triangle',0.55,bass),compile('square',0.09,arp)];return {bpm,chs,rows:chs[0].rows,dr:parse(dr)};}
// ---- TITLE (Dm) ----
const T_arp=bar('D3 F3 A3 F3')+bar('A#2 D3 F3 D3')+bar('F3 A3 C4 A3')+bar('C3 E3 G3 E3')+bar('D3 F3 A3 F3')+bar('A#2 D3 F3 D3')+bar('A2 C#3 E3 C#3')+bar('A2 C#3 E3 C#3');
const T_bass=bassP('D2','A2')+bassP('A#1','F2')+bassP('F2','C3')+bassP('C2','G2')+bassP('D2','A2')+bassP('A#1','F2')+bassP('A1','E2')+bassP('A1','E2');
const T_lead='A4 - - - - - - - G4 - - - F4 - - - '+'D4 - - - - - - - F4 - - - D4 - - - '+'A4 - - - G4 - - - F4 - - - E4 - - - '+'E4 - - - - - - - G4 - - - E4 - - - '+'F4 - - - E4 - - - D4 - - - - - - - '+'D5 - - - C5 - - - A#4 - - - A4 - - - '+'G4 - - - E4 - - - C#4 - - - E4 - - - '+'A3 - - - C#4 - - - E4 - - - G4 - - - ';
const T_dr=('k . h . s . h h k . h . s . h . ').repeat(8);
// ---- DRILL (Em, driving) ----
const D_arp=bar('E3 G3 B3 G3')+bar('E3 G3 B3 G3')+bar('C3 E3 G3 E3')+bar('D3 F#3 A3 F#3');
const D_bass=bass8('E2','E3')+bass8('E2','E3')+bass8('C2','C3')+bass8('D2','D3');
const D_lead='E4 . E4 . G4 - . . E4 . D4 . E4 - - - '+'B4 - - - A4 - - - G4 - - - F#4 - - - '+'G4 . G4 . E4 - . . C4 . D4 . E4 - - - '+'A4 - - - F#4 - - - D4 - - - . . . . ';
const D_dr=('k . h h s . h . k k h h s . h h ').repeat(4);
// ---- PIPE (C, bouncy) ----
const P_arp=bar('C3 E3 G3 E3')+bar('F3 A3 C4 A3')+bar('G3 B3 D4 B3')+bar('C3 E3 G3 E3');
const P_bass='C2 . G2 . E2 . G2 . C2 . G2 . E2 . G2 . '+'F2 . C3 . A2 . C3 . F2 . C3 . A2 . C3 . '+'G2 . D3 . B2 . D3 . G2 . D3 . B2 . D3 . '+'C2 . G2 . E2 . G2 . C2 . G2 . C2 . . . ';
const P_lead='E4 . G4 . C5 . G4 . A4 . G4 . E4 . D4 . '+'F4 . A4 . C5 . A4 . D5 . C5 . A4 . F4 . '+'G4 . B4 . D5 . B4 . E5 . D5 . B4 . G4 . '+'C5 - - - E4 . G4 . C5 - - - . . . . ';
const P_dr=('k . h . s . h . k . h . s . h h ').repeat(4);
// ---- FIRE (Am, urgent) ----
const F_arp=bar('A2 C3 E3 C3')+bar('A2 C3 E3 C3')+bar('F2 A2 C3 A2')+bar('E2 G#2 B2 G#2');
const F_bass=bass8('A2','A3')+bass8('A2','A3')+bass8('F2','F3')+bass8('E2','E3');
const F_lead='E5 . D#5 . E5 . D#5 . E5 - - - . . . . '+'A4 . B4 . C5 . B4 . A4 - - - . . . . '+'C5 - - - A4 - - - F4 . G4 . A4 - - - '+'B4 - - - G#4 - - - E4 - - - - - - - ';
const F_dr=('k . h k s . h . k . h k s . h h ').repeat(4);
const TUNES={title:mk(112,T_lead,T_bass,T_arp,T_dr),drill:mk(138,D_lead,D_bass,D_arp,D_dr),pipe:mk(144,P_lead,P_bass,P_arp,P_dr),fire:mk(152,F_lead,F_bass,F_arp,F_dr)};

class AudioEngine{
 constructor(){this.ctx=null;this.musicOn=true;this.sfxOn=true;this._vol=0.25;this.want=null;this.cur=null;this.curName=null;this.timer=null;}
 ensure(){
  if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
   this.ctx=new AC();
   this.master=this.ctx.createGain();this.master.gain.value=0.9;this.master.connect(this.ctx.destination);
   this.mus=this.ctx.createGain();this.mus.gain.value=this._vol;this.mus.connect(this.master);
   this.sfx=this.ctx.createGain();this.sfx.gain.value=this.sfxOn?0.5:0;this.sfx.connect(this.master);
   const len=this.ctx.sampleRate;const buf=this.ctx.createBuffer(1,len,this.ctx.sampleRate);const d=buf.getChannelData(0);
   for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noise=buf;}
  if(this.ctx.state==='suspended')this.ctx.resume();
  if(this.want&&!this.cur&&this.musicOn)this._start(this.want);
 }
 setVol(v){this._vol=v;if(this.mus)this.mus.gain.value=v;}
 setMusic(on){this.musicOn=on;if(!on)this._halt();else if(this.want&&this.ctx)this._start(this.want);}
 setSfx(on){this.sfxOn=on;if(this.sfx)this.sfx.gain.value=on?0.5:0;}
 play(name){this.want=name;if(this.ctx&&this.musicOn)this._start(name);}
 stopMusic(){this.want=null;this._halt();}
 _halt(){if(this.timer)clearInterval(this.timer);this.timer=null;this.cur=null;this.curName=null;}
 _start(name){if(this.curName===name&&this.cur)return;this._halt();const t=TUNES[name];if(!t||!this.ctx)return;
  this.cur={t,row:0,time:this.ctx.currentTime+0.06};this.curName=name;
  this.timer=setInterval(()=>this._tick(),30);}
 _tick(){const c=this.cur;if(!c||!this.ctx)return;const spr=60/c.t.bpm/4;
  while(c.time<this.ctx.currentTime+0.16){const row=c.row;
   for(const ch of c.t.chs)for(const e of ch.ev)if(e.row===row)this._note(ch,e,c.time,spr);
   const d=c.t.dr[row%c.t.dr.length];if(d&&d!=='.')this._drum(d,c.time);
   c.row=(c.row+1)%c.t.rows;c.time+=spr;}}
 _note(ch,e,t,spr){const dur=Math.max(0.06,e.len*spr*0.95);
  const o=this.ctx.createOscillator();o.type=ch.w;o.frequency.value=e.f;
  const g=this.ctx.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(ch.v,t+0.008);
  g.gain.exponentialRampToValueAtTime(Math.max(0.001,ch.v*0.35),t+dur);g.gain.linearRampToValueAtTime(0.0001,t+dur+0.03);
  o.connect(g);g.connect(this.mus);o.start(t);o.stop(t+dur+0.05);}
 _drum(d,t){
  if(d==='k'){const o=this.ctx.createOscillator();o.type='sine';o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+0.1);
   const g=this.ctx.createGain();g.gain.setValueAtTime(0.5,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.12);
   o.connect(g);g.connect(this.mus);o.start(t);o.stop(t+0.13);}
  else if(d==='s'){this._nz(t,0.11,'bandpass',1700,0,0.28);const o=this.ctx.createOscillator();o.type='triangle';o.frequency.value=196;
   const g=this.ctx.createGain();g.gain.setValueAtTime(0.2,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.05);
   o.connect(g);g.connect(this.mus);o.start(t);o.stop(t+0.06);}
  else if(d==='h')this._nz(t,0.035,'highpass',7500,0,0.11);}
 _nz(t,dur,type,f0,f1,vol,bus){if(!this.ctx)return;const s=this.ctx.createBufferSource();s.buffer=this.noise;s.loop=true;
  const f=this.ctx.createBiquadFilter();f.type=type;f.frequency.setValueAtTime(f0,t);
  if(f1)f.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
  const g=this.ctx.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+dur);
  s.connect(f);f.connect(g);g.connect(bus||this.mus);s.start(t);s.stop(t+dur+0.02);}
 _j(fr,t,dur,wave,vol){if(!this.ctx)return;const o=this.ctx.createOscillator();o.type=wave;o.frequency.value=fr;
  const g=this.ctx.createGain();g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+0.01);
  g.gain.exponentialRampToValueAtTime(0.001,t+dur);o.connect(g);g.connect(this.sfx);o.start(t);o.stop(t+dur+0.03);}
 _sweep(f0,f1,dur,wave,vol){if(!this.ctx)return;const t=this.ctx.currentTime;const o=this.ctx.createOscillator();o.type=wave;
  o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
  const g=this.ctx.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+dur);
  o.connect(g);g.connect(this.sfx);o.start(t);o.stop(t+dur+0.03);}
 // ------- one-shot SFX -------
 ui(){if(this.ctx)this._j(720,this.ctx.currentTime,0.06,'square',0.2);}
 tick(){if(this.ctx)this._j(900,this.ctx.currentTime,0.05,'square',0.2);}
 blip(){if(this.ctx)this._j(480,this.ctx.currentTime,0.04,'square',0.13);}
 beep(){if(this.ctx)this._j(1500,this.ctx.currentTime,0.06,'square',0.22);}
 clank(){if(!this.ctx)return;this._sweep(950,320,0.08,'square',0.3);this._nz(this.ctx.currentTime,0.04,'highpass',3500,0,0.2,this.sfx);}
 snap(){if(!this.ctx)return;this._sweep(220,30,0.22,'square',0.5);this._nz(this.ctx.currentTime,0.15,'highpass',2400,0,0.35,this.sfx);}
 gush(){if(!this.ctx)return;const t=this.ctx.currentTime;this._nz(t,1.4,'bandpass',300,900,0.5,this.sfx);this._sweep(80,160,0.9,'triangle',0.2);}
 spill(){if(!this.ctx)return;this._nz(this.ctx.currentTime,0.9,'lowpass',900,180,0.45,this.sfx);this._sweep(200,60,0.5,'triangle',0.25);}
 boom(){if(!this.ctx)return;const t=this.ctx.currentTime;this._nz(t,1.1,'lowpass',600,60,0.9,this.sfx);this._sweep(100,24,0.9,'sine',0.8);this._nz(t,0.15,'highpass',3000,0,0.4,this.sfx);}
 win(){if(!this.ctx)return;const t=this.ctx.currentTime;['C5','E5','G5','C6'].forEach((n,i)=>this._j(nfreq(n),t+i*0.09,i===3?0.55:0.12,'square',0.3));}
 fail(){if(!this.ctx)return;const t=this.ctx.currentTime;['E4','C4','A3'].forEach((n,i)=>this._j(nfreq(n),t+i*0.17,i===2?0.55:0.16,'square',0.3));}
 // ------- loops -------
 drillStart(){if(!this.ctx)return;this.drillStop();
  const s=this.ctx.createBufferSource();s.buffer=this.noise;s.loop=true;
  const f=this.ctx.createBiquadFilter();f.type='lowpass';f.frequency.value=420;
  const g=this.ctx.createGain();g.gain.value=0.16;s.connect(f);f.connect(g);g.connect(this.sfx);s.start();
  const o=this.ctx.createOscillator();o.type='sawtooth';o.frequency.value=42;
  const og=this.ctx.createGain();og.gain.value=0.09;o.connect(og);og.connect(this.sfx);o.start();
  this._dr={s,f,g,o,og};}
 drillSet(h){if(this._dr){this._dr.f.frequency.value=280+h*1100;this._dr.g.gain.value=0.11+h*0.13;this._dr.o.frequency.value=38+h*26;}}
 drillStop(){if(this._dr){try{this._dr.s.stop();this._dr.o.stop();}catch(e){}this._dr=null;}}
 crackleStart(){if(!this.ctx)return;this.crackleStop();
  const s=this.ctx.createBufferSource();s.buffer=this.noise;s.loop=true;
  const f=this.ctx.createBiquadFilter();f.type='bandpass';f.frequency.value=1900;f.Q.value=0.7;
  const g=this.ctx.createGain();g.gain.value=0.12;
  const lfo=this.ctx.createOscillator();lfo.type='sine';lfo.frequency.value=9;
  const lg=this.ctx.createGain();lg.gain.value=0.055;lfo.connect(lg);lg.connect(g.gain);lfo.start();
  const s2=this.ctx.createBufferSource();s2.buffer=this.noise;s2.loop=true;
  const f2=this.ctx.createBiquadFilter();f2.type='lowpass';f2.frequency.value=140;
  const g2=this.ctx.createGain();g2.gain.value=0.14;
  s.connect(f);f.connect(g);g.connect(this.sfx);s.start();
  s2.connect(f2);f2.connect(g2);g2.connect(this.sfx);s2.start();
  this._cr={s,s2,lfo};}
 crackleStop(){if(this._cr){try{this._cr.s.stop();this._cr.s2.stop();this._cr.lfo.stop();}catch(e){}this._cr=null;}}
}
window.OilAudio=AudioEngine;
})();
