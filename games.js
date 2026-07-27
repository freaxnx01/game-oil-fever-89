// games.js — the three action-sequence games, drawn at 320x200 (registers window.OilGames)
(function(){
"use strict";
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const F1='7px "Silkscreen",monospace',F2='9px "Silkscreen",monospace',F3='14px "Silkscreen",monospace';
const C={oil:'#0c0906',ink:'#100c08',cream:'#e8e0cc',label:'#c8c8d2',led:'#38e858',amber:'#f0b020',red:'#e03828'};
const LCOLS=[['#c08850','#a87038'],['#a87038','#8a5828'],['#8a5828','#6e4a26'],['#6e4a26','#5a4c34'],['#5a4c34','#464032'],['#464032','#36322a']];
function px(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(x|0,y|0,w,h);}
function dith(g,x,y,w,h,cA,cB){px(g,x,y,w,h,cA);g.fillStyle=cB;for(let j=0;j<h;j++)for(let i=(j%2);i<w;i+=2)g.fillRect((x+i)|0,(y+j)|0,1,1);}
function bevel(g,x,y,w,h,face,hi,lo){px(g,x,y,w,h,lo);px(g,x,y,w-1,h-1,hi);px(g,x+1,y+1,w-2,h-2,face);}
function inset(g,x,y,w,h,face,hi,lo){px(g,x,y,w,h,hi);px(g,x,y,w-1,h-1,lo);px(g,x+1,y+1,w-2,h-2,face);}
function plate(g,x,y,w,h){bevel(g,x,y,w,h,'#2e2e38','#52525e','#0c0c12');}
function ledWin(g,x,y,w,h){inset(g,x,y,w,h,'#0a1006','#52525e','#04060a');}
function txt(g,s,x,y,c,f,al){g.font=f||F2;g.fillStyle=c;g.textAlign=al||'left';g.textBaseline='top';g.fillText(s,x|0,y|0);}
function ledSeg(g,x,y,n,v,bl){for(let i=0;i<n;i++){const on=v>(i+0.5)/n;let c='#141c16';
 if(on)c=i<n*0.55?C.led:i<n*0.8?C.amber:(bl?'#ff7050':C.red);
 px(g,x+i*7,y,5,6,c);if(on)px(g,x+i*7,y,5,1,'rgba(255,255,255,0.3)');}}
function derrickSil(g,x,base,h,c){g.strokeStyle=c;g.lineWidth=1;g.beginPath();
 const w=Math.max(4,h*0.32);g.moveTo(x-w,base);g.lineTo(x,base-h);g.lineTo(x+w,base);
 for(let i=1;i<5;i++){const t=i/5,yy=base-h*t,ww=w*(1-t)+1;g.moveTo(x-ww,yy);g.lineTo(x+ww,yy);}g.stroke();
 px(g,x-2,base-h-4,5,5,c);}
function pumpjackSil(g,x,base,c){px(g,x-7,base-4,14,4,c);px(g,x-1,base-10,3,7,c);px(g,x-9,base-12,18,3,c);px(g,x-11,base-13,4,6,c);}
// pipe tube painters (26px cells, 10px tube)
const TB={hi:'#d6d6e0',li:'#b2b2bc',mid:'#8a8a94',lo:'#565660',ink:'#1c1c24',fl:'#3e3e48'};
function vertRun(g,x,y,h){px(g,x,y,10,h,TB.ink);px(g,x+1,y,1,h,TB.hi);px(g,x+2,y,2,h,TB.li);px(g,x+4,y,3,h,TB.mid);px(g,x+7,y,2,h,TB.lo);}
function horizRun(g,x,y,w){px(g,x,y,w,10,TB.ink);px(g,x,y+1,w,1,TB.hi);px(g,x,y+2,w,2,TB.li);px(g,x,y+4,w,3,TB.mid);px(g,x,y+7,w,2,TB.lo);}
function pipeDraw(g,x,y,t){const cs=CONN[t];
 for(const d of cs){
  if(d===0){vertRun(g,x+8,y,13);px(g,x+7,y,12,2,TB.fl);px(g,x+7,y,12,1,TB.ink);}
  else if(d===2){vertRun(g,x+8,y+13,13);px(g,x+7,y+24,12,2,TB.fl);px(g,x+7,y+25,12,1,TB.ink);}
  else if(d===3){horizRun(g,x,y+8,13);px(g,x,y+7,2,12,TB.fl);px(g,x,y+7,1,12,TB.ink);}
  else{horizRun(g,x+13,y+8,13);px(g,x+24,y+7,2,12,TB.fl);px(g,x+25,y+7,1,12,TB.ink);}}
 px(g,x+7,y+7,12,12,TB.ink);px(g,x+8,y+8,10,10,TB.mid);px(g,x+8,y+8,10,1,TB.li);px(g,x+8,y+8,1,10,TB.li);
 px(g,x+16,y+9,1,9,TB.lo);px(g,x+9,y+17,8,1,TB.lo);
 px(g,x+8,y+8,1,1,TB.hi);px(g,x+17,y+17,1,1,TB.ink);px(g,x+8,y+17,1,1,TB.ink);px(g,x+17,y+8,1,1,TB.ink);}
function oilIn(g,x,y,d,f){const L=Math.round(13*Math.max(0,Math.min(1,f)));if(L<=0)return;
 if(d===0)px(g,x+11,y,4,L,C.oil);else if(d===2)px(g,x+11,y+26-L,4,L,C.oil);
 else if(d===3)px(g,x,y+11,L,4,C.oil);else px(g,x+26-L,y+11,L,4,C.oil);}
function oilOut(g,x,y,d,f){const L=Math.round(13*Math.max(0,Math.min(1,f)));if(L<=0)return;
 if(d===0)px(g,x+11,y+13-L,4,L,C.oil);else if(d===2)px(g,x+11,y+13,4,L,C.oil);
 else if(d===3)px(g,x+13-L,y+11,L,4,C.oil);else px(g,x+13,y+11,L,4,C.oil);}
class Base{
 constructor(cv,o){this.cv=cv;this.ctx=cv.getContext('2d');this.ctx.imageSmoothingEnabled=false;
  this.o=o;this.T=o.text||{};this.au=o.audio;this.phase='ready';this.dead=false;this.keys={};this.anim=0;this.elapsed=0;this.beganAt=0;
  this.mouse={x:160,y:100,down:false,in:false};
  this._kd=e=>{this.keys[e.code]=true;if(this.active())this.key(e.code);};
  this._ku=e=>{this.keys[e.code]=false;};
  this._mm=e=>{const r=this.cv.getBoundingClientRect();this.mouse.x=(e.clientX-r.left)/r.width*320;this.mouse.y=(e.clientY-r.top)/r.height*200;this.mouse.in=true;};
  this._md=e=>{this._mm(e);this.mouse.down=true;if(this.active())this.click(this.mouse.x,this.mouse.y);};
  this._mu=()=>{this.mouse.down=false;};
  this._ml=()=>{this.mouse.in=false;this.mouse.down=false;};
  window.addEventListener('keydown',this._kd);window.addEventListener('keyup',this._ku);
  cv.addEventListener('mousemove',this._mm);cv.addEventListener('mousedown',this._md);
  window.addEventListener('mouseup',this._mu);cv.addEventListener('mouseleave',this._ml);
  this._last=performance.now();
  const loop=t=>{if(this.dead)return;const dt=Math.min(0.05,Math.max(0,(t-this._last)/1000));this._last=t;this.anim+=dt;
   if(this.phase==='run'){this.elapsed+=dt;this.step(dt);}else this.idle(dt);
   this.draw();requestAnimationFrame(loop);};
  requestAnimationFrame(loop);}
 mkbg(){this.bg=document.createElement('canvas');this.bg.width=320;this.bg.height=200;return this.bg.getContext('2d');}
 active(){return this.phase==='run'&&performance.now()-this.beganAt>250;}
 dir(){return ((this.keys.ArrowLeft||this.keys.KeyA)?-1:0)+((this.keys.ArrowRight||this.keys.KeyD)?1:0);}
 blink(hz){return ((this.anim*hz)|0)%2===0;}
 key(){}click(){}idle(){}step(){}quiet(){}
 begin(){if(this.phase!=='ready')return;this.phase='run';this.beganAt=performance.now();this.onBegin&&this.onBegin();}
 end(res,msg){if(this.phase==='ended')return;this.phase='ended';this.endAt=this.anim;this.quiet();
  const cb=this.o.onEnd;cb&&setTimeout(()=>{if(!this.dead)cb(res,msg);},1100);}
 destroy(){this.dead=true;this.quiet();
  window.removeEventListener('keydown',this._kd);window.removeEventListener('keyup',this._ku);window.removeEventListener('mouseup',this._mu);
  this.cv.removeEventListener('mousemove',this._mm);this.cv.removeEventListener('mousedown',this._md);this.cv.removeEventListener('mouseleave',this._ml);}
}
/* ============ DRILLING ============ */
class DrillGame extends Base{
 constructor(cv,o){super(cv,o);const d=o.diff||'normal';const R=rng((Date.now()&0xffff)^0x9e37);this.R=R;
  this.speed={easy:2.7,normal:3.3,hard:4.1}[d]||3.3;
  this.jit={easy:60,normal:95,hard:135}[d]||95;
  this.x=160;this.vx=0;this.depth=0;this.stress=0;this.gushP=null;
  this.path=new Float32Array(200);this.path.fill(160);
  this.layers=[];let y=24,i=0;
  while(y<200){const h=16+R()*20;this.layers.push({y0:y,y1:Math.min(202,y+h),hard:Math.min(1,0.12+i*0.15+R()*0.12)});y+=h;i++;}
  this.rocks=[];for(let k=0;k<10;k++)this.rocks.push({x:36+R()*248,y:64+R()*112,r:4.5+R()*6.5,hit:false});
  this.ox=80+R()*160;
  this.buildBg();}
 buildBg(){const g=this.mkbg();const Rg=rng(0xBEEF);
  const sky=[['#9cc0ea',8],['#8cb4e4',6],['#7ca8de',6],['#6c9cd6',4]];
  let y=0;for(let i=0;i<sky.length;i++){px(g,0,y,320,sky[i][1],sky[i][0]);
   if(i<sky.length-1)dith(g,0,y+sky[i][1]-1,320,2,sky[i][0],sky[i+1][0]);y+=sky[i][1];}
  g.fillStyle='#f8e8a0';g.beginPath();g.arc(38,9,7,0,7);g.fill();
  g.fillStyle='#fdf4cc';g.beginPath();g.arc(36,8,4,0,7);g.fill();
  dith(g,84,6,30,4,'#e8f0fa','#9cc0ea');dith(g,88,4,20,2,'#e8f0fa','#9cc0ea');dith(g,238,12,34,4,'#dce8f6','#7ca8de');
  derrickSil(g,300,24,12,'#3a4a6a');derrickSil(g,282,24,9,'#3a4a6a');
  for(let i=0;i<this.layers.length;i++){const L=this.layers[i];px(g,0,L.y0,320,L.y1-L.y0,LCOLS[Math.min(5,i)][0]);}
  for(let i=1;i<this.layers.length;i++){const L=this.layers[i];
   dith(g,0,L.y0-1,320,3,LCOLS[Math.min(5,i-1)][0],LCOLS[Math.min(5,i)][0]);}
  for(let i=0;i<this.layers.length;i++){const L=this.layers[i];const c=LCOLS[Math.min(5,i)];
   for(let k=0;k<110;k++)px(g,(Rg()*320)|0,L.y0+2+((Rg()*Math.max(1,L.y1-L.y0-3))|0),Rg()<0.3?2:1,1,c[1]);}
  px(g,0,24,320,3,'#4a7c30');for(let i=0;i<70;i++)px(g,(Rg()*320)|0,24+((Rg()*3)|0),1,1,'#3a6424');
  for(const r of this.rocks){
   g.fillStyle='#221e1a';g.beginPath();g.arc(r.x,r.y,r.r+1,0,7);g.fill();
   g.fillStyle='#565049';g.beginPath();g.arc(r.x,r.y,r.r,0,7);g.fill();
   g.fillStyle='#6e675e';g.beginPath();g.arc(r.x-r.r*0.3,r.y-r.r*0.35,r.r*0.5,0,7);g.fill();
   g.fillStyle='#3c3730';g.beginPath();g.arc(r.x+r.r*0.25,r.y+r.r*0.3,r.r*0.45,0,7);g.fill();}
  g.fillStyle='#241809';g.beginPath();g.ellipse(this.ox,187,24,10,0,0,7);g.fill();
  g.fillStyle=C.oil;g.beginPath();g.ellipse(this.ox,187,22,9,0,0,7);g.fill();
  px(g,this.ox-10,182,5,1,'#2c2417');px(g,this.ox-6,184,3,1,'#2c2417');
  g.strokeStyle='#1c1410';g.lineWidth=1;g.beginPath();
  g.moveTo(146,24);g.lineTo(159,3);g.moveTo(174,24);g.lineTo(161,3);
  g.moveTo(150,18);g.lineTo(170,18);g.moveTo(153,12);g.lineTo(167,12);g.moveTo(156,7);g.lineTo(164,7);
  g.moveTo(150,18);g.lineTo(167,12);g.moveTo(170,18);g.lineTo(153,12);g.stroke();
  px(g,156,1,9,3,'#1c1410');px(g,158,0,5,1,'#1c1410');
  px(g,168,18,15,6,'#6a4022');px(g,167,16,17,2,'#1c1410');px(g,176,20,4,4,'#2c1c10');
  plate(g,3,3,92,18);txt(g,this.T.depth||'DEPTH',8,5,C.cream,F1);
  plate(g,225,3,92,18);txt(g,this.T.stress||'STRESS',229,5,C.cream,F1);}
 onBegin(){this.au&&this.au.drillStart();}
 quiet(){this.au&&this.au.drillStop();}
 hardAt(y){let i=0;for(const L of this.layers){if(y>=L.y0&&y<L.y1)return L.hard;i++;}return 1;}
 step(dt){const y=24+this.depth,h=this.hardAt(y);
  this.au&&this.au.drillSet(h);
  const prev=Math.floor(this.depth);
  this.depth+=this.speed*dt;
  this.vx+=(this.R()-0.5)*this.jit*(0.25+h)*dt;
  let st=this.dir();
  if(this.mouse.down&&this.mouse.in)st+=Math.max(-1,Math.min(1,(this.mouse.x-this.x)/10));
  this.vx+=st*85*dt;
  this.vx*=Math.exp(-2.6*dt);
  this.x+=this.vx*dt*2.4;
  for(const r of this.rocks){const dx=this.x-r.x,dy=y-r.y;
   if(dx*dx+dy*dy<(r.r+2)*(r.r+2)&&!r.hit){r.hit=true;this.vx+=(dx>=0?1:-1)*(26+this.R()*22);this.stress=Math.min(1,this.stress+0.1);this.au&&this.au.clank();}}
  if(this.x<14){this.x=14;this.vx=Math.abs(this.vx)*0.3;}
  if(this.x>306){this.x=306;this.vx=-Math.abs(this.vx)*0.3;}
  const idx=Math.min(199,Math.floor(this.depth));
  for(let j=prev+1;j<=idx;j++)this.path[j]=this.x;
  this.path[idx]=this.x;
  const over=Math.max(0,Math.abs(this.vx)-15);
  this.stress=Math.max(0,Math.min(1,this.stress+(over*0.018*(0.35+h)-0.06)*3*dt));
  if(this.stress>=1){this.au&&this.au.snap();this.end('fail','snap');return;}
  if(this.depth>=158){
   if(Math.abs(this.x-this.ox)<=20){this.gushP=[];this.au&&this.au.gush();this.end('win','gusher');}
   else this.end('fail','dry');}}
 idle(dt){if(this.gushP&&this.anim-this.endAt<4){
   if(this.anim-this.endAt<2.6)for(let i=0;i<5;i++)this.gushP.push({x:158+Math.random()*4,y:22,vx:(Math.random()-0.5)*36,vy:-(55+Math.random()*55),a:0});
   for(const p of this.gushP){p.a+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=85*dt;}
   this.gushP=this.gushP.filter(p=>p.y<205);}}
 draw(){const g=this.ctx;
  g.drawImage(this.bg,0,0);
  const dep=Math.min(199,Math.floor(this.depth));
  const won=this.gushP&&this.phase==='ended';
  for(let i=0;i<=dep;i++){const X=this.path[i];px(g,X-1,24+i,3,1,'#2a1c12');px(g,X,24+i,1,1,won?C.oil:'#6a4a26');}
  for(let i=10;i<=dep;i+=16)px(g,this.path[i]-2,24+i,5,2,'#1a1008');
  if(this.gushP){const k=Math.min(1,(this.anim-this.endAt)/3);
   g.fillStyle=C.oil;g.beginPath();g.ellipse(160,26,6+k*40,2+k*3.5,0,0,7);g.fill();}
  if(this.phase!=='ended'||!this.gushP){
   const h=this.hardAt(24+this.depth);const jx=this.phase==='run'?(this.R()-0.5)*2*(0.3+h):0;
   const hx=(this.x+jx)|0,hy=(24+Math.min(172,this.depth))|0;const f=((this.anim*14)|0)%2;
   px(g,hx-3,hy-2,7,2,'#b8b8c2');px(g,hx-3,hy-2,7,1,'#dcdce4');
   px(g,hx-2,hy,5,2,'#8a8a94');
   if(f){px(g,hx-2,hy+2,2,2,'#d8d8e2');px(g,hx+1,hy+2,2,2,'#d8d8e2');px(g,hx-1,hy+4,3,1,'#8a8a94');}
   else{px(g,hx-1,hy+2,3,2,'#d8d8e2');px(g,hx-2,hy+4,2,1,'#8a8a94');px(g,hx+1,hy+4,2,1,'#8a8a94');}
   if(this.phase==='run'&&h>0.5&&this.R()<0.55){
    px(g,hx+(this.R()<0.5?-5:4),hy+1+((this.R()*3)|0),1,1,this.R()<0.5?'#f8e070':'#ffffff');}}
  if(this.gushP)for(const p of this.gushP)px(g,p.x,p.y,2,2,C.oil);
  txt(g,String(Math.min(9999,(this.depth*12)|0)).padStart(4,'0')+'M',10,11,C.led,F2);
  ledSeg(g,229,12,11,this.stress,this.stress>0.7&&this.blink(6));}
}
/* ============ PIPELINE ============ */
const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
const CONN={H:[1,3],V:[0,2],NE:[0,1],NW:[0,3],SE:[1,2],SW:[2,3],X:[0,1,2,3]};
class PipeGame extends Base{
 constructor(cv,o){super(cv,o);const d=o.diff||'normal';const R=rng(Date.now()&0xfffff);this.R=R;
  this.cols=8;this.rows=5;this.cs=26;this.gx=56;this.gy=26;
  this.grid={};this.startC=[7,4];this.tankC=[0,0];
  this.cd={easy:20,normal:15,hard:11}[d]||15;this.cdActive=true;
  this.speed={easy:2.4,normal:2.0,hard:1.6}[d]||2.0;
  const types=['H','V','NE','NW','SE','SW','H','V','NE','NW','SE','SW','X'];
  this.queue=[];for(let i=0;i<64;i++)this.queue.push(types[(R()*types.length)|0]);
  const okFirst=t=>CONN[t].includes(2);
  if(!okFirst(this.queue[0])){const j=this.queue.findIndex(okFirst);const t=this.queue.splice(j,1)[0];this.queue.unshift(t);}
  this.cur={cx:4,cy:2};this.flow=null;this.filled=[];this.spillAt=null;this.tankFill=0;this.winning=false;
  this.buildBg();}
 buildBg(){const g=this.mkbg();const Rg=rng(0xF00D);const gx=this.gx,gy=this.gy;
  px(g,0,0,320,200,'#a87c48');
  for(let i=0;i<180;i++)px(g,(Rg()*320)|0,(Rg()*200)|0,Rg()<0.3?2:1,1,'#93672f');
  for(let i=0;i<70;i++)px(g,(Rg()*320)|0,(Rg()*200)|0,1,1,'#bb9058');
  for(let i=0;i<16;i++){const tx=(Rg()*320)|0,ty=(Rg()*200)|0;px(g,tx,ty,1,2,'#4a7c30');px(g,tx+1,ty+1,1,1,'#3a6424');}
  derrickSil(g,26,130,36,'#2c2014');pumpjackSil(g,30,152,'#2c2014');
  px(g,282,86,30,22,'#1c1c24');px(g,283,87,6,20,'#c4c4ce');px(g,289,87,14,20,'#9494a0');px(g,303,87,8,20,'#62626e');
  px(g,283,92,28,1,'#3c3c46');px(g,283,99,28,1,'#3c3c46');px(g,284,86,26,1,'#d8d8e0');
  px(g,290,108,4,14,'#565660');px(g,290,120,4,2,'#3e3e48');
  px(g,gx-6,gy-6,this.cols*26+12,this.rows*26+12,'#6c4e24');
  px(g,gx-6,gy-6,this.cols*26+12,1,'#8a6a34');px(g,gx-6,gy-6,1,this.rows*26+12,'#8a6a34');
  px(g,gx-6,gy+this.rows*26+5,this.cols*26+12,1,'#4a3414');px(g,gx+this.cols*26+5,gy-6,1,this.rows*26+12,'#4a3414');
  const bolts=[[gx-4,gy-4],[gx+this.cols*26+2,gy-4],[gx-4,gy+this.rows*26+2],[gx+this.cols*26+2,gy+this.rows*26+2]];
  for(const b of bolts){px(g,b[0],b[1],2,2,'#3a2a12');px(g,b[0],b[1],1,1,'#8a6a34');}
  for(let cy=0;cy<this.rows;cy++)for(let cx=0;cx<this.cols;cx++)
   inset(g,gx+cx*26,gy+cy*26,26,26,'#8e6a36','#b8925a','#66491f');
  // tank (goal, cell 0,0)
  {const x=gx,y=gy;
   px(g,x+2,y+2,22,21,'#1c1c24');
   px(g,x+3,y+3,4,19,'#c4c4ce');px(g,x+7,y+3,10,19,'#9494a0');px(g,x+17,y+3,6,19,'#62626e');
   px(g,x+3,y+8,20,1,'#3c3c46');px(g,x+3,y+14,20,1,'#3c3c46');px(g,x+3,y+20,20,1,'#3c3c46');
   px(g,x+4,y+2,18,1,'#d8d8e0');
   inset(g,x+8,y+6,10,13,'#141210','#52525e','#040406');
   txt(g,this.T.tank||'TANK',x+1,13,'#3a2810',F1);txt(g,this.T.tank||'TANK',x,12,'#f8ecd0',F1);}
  // well (start, cell 7,4)
  {const x=gx+7*26,y=gy+4*26;
   vertRun(g,x+8,y+1,6);px(g,x+7,y+1,12,2,TB.fl);
   horizRun(g,x+1,y+8,6);px(g,x+1,y+7,2,12,TB.fl);
   px(g,x+10,y+9,6,13,'#20202a');px(g,x+11,y+9,1,13,'#3a3a48');
   px(g,x+7,y+13,3,3,'#c02818');px(g,x+16,y+13,3,3,'#c02818');
   px(g,x+8,y+14,1,1,'#e86048');px(g,x+17,y+14,1,1,'#e86048');
   px(g,x+9,y+22,8,3,'#1c1c24');
   txt(g,this.T.well||'WELL',273,139,'#3a2810',F1);txt(g,this.T.well||'WELL',272,138,'#f8ecd0',F1);}
  // console
  plate(g,0,162,320,38);
  const nx=this.T.next||'NEXT';
  for(let i=0;i<4;i++)txt(g,nx[i]||'',3,165+i*8,C.label,F1);
  for(let i=0;i<5;i++){inset(g,12+i*33,166,30,30,'#42424e','#5e5e6c','#101018');}
  px(g,12,166,30,1,C.amber);px(g,12,195,30,1,C.amber);px(g,12,166,1,30,C.amber);px(g,41,166,1,30,C.amber);
  ledWin(g,240,168,74,26);}
 key(k){const c=this.cur;
  if(k==='ArrowLeft'||k==='KeyA')c.cx=Math.max(0,c.cx-1);
  else if(k==='ArrowRight'||k==='KeyD')c.cx=Math.min(this.cols-1,c.cx+1);
  else if(k==='ArrowUp'||k==='KeyW')c.cy=Math.max(0,c.cy-1);
  else if(k==='ArrowDown'||k==='KeyS')c.cy=Math.min(this.rows-1,c.cy+1);
  else if(k==='Space'||k==='Enter')this.place(c.cx,c.cy);}
 click(mx,my){const cx=Math.floor((mx-this.gx)/this.cs),cy=Math.floor((my-this.gy)/this.cs);
  if(cx>=0&&cy>=0&&cx<this.cols&&cy<this.rows){this.cur={cx,cy};this.place(cx,cy);}}
 isEnd(cx,cy){return (cx===this.startC[0]&&cy===this.startC[1])||(cx===this.tankC[0]&&cy===this.tankC[1]);}
 canPlace(cx,cy){if(this.isEnd(cx,cy))return false;
  if(this.flow&&this.flow.cx===cx&&this.flow.cy===cy)return false;
  if(this.filled.some(f=>f.cx===cx&&f.cy===cy))return false;
  return true;}
 place(cx,cy){if(!this.queue.length||!this.canPlace(cx,cy))return;
  this.grid[cx+','+cy]=this.queue.shift();this.au&&this.au.clank();}
 doSpill(cx,cy,exit){this.spillAt={x:this.gx+cx*this.cs+13+DIRS[exit][0]*13,y:this.gy+cy*this.cs+13+DIRS[exit][1]*13,age:0};
  this.flow=null;this.au&&this.au.spill();}
 advance(){const f=this.flow;const t=this.grid[f.cx+','+f.cy];const conns=CONN[t];
  const exit=t==='X'?(f.enter+2)%4:(conns[0]===f.enter?conns[1]:conns[0]);
  this.filled.push({cx:f.cx,cy:f.cy,enter:f.enter,exit});
  const nx=f.cx+DIRS[exit][0],ny=f.cy+DIRS[exit][1],nen=(exit+2)%4;
  if(nx===this.tankC[0]&&ny===this.tankC[1]){this.flow=null;this.winning=true;this.au&&this.au.gush();return;}
  if(nx<0||ny<0||nx>=this.cols||ny>=this.rows){this.doSpill(f.cx,f.cy,exit);return;}
  const t2=this.grid[nx+','+ny];
  if(!t2||!CONN[t2].includes(nen)){this.doSpill(f.cx,f.cy,exit);return;}
  this.speed=Math.max(0.9,this.speed*0.96);
  this.flow={cx:nx,cy:ny,enter:nen,prog:0};this.au&&this.au.blip();}
 step(dt){
  if(this.cdActive){const p=this.cd;this.cd-=dt;
   if(Math.ceil(this.cd)!==Math.ceil(p)&&this.cd<5&&this.cd>0)this.au&&this.au.tick();
   if(this.cd<=0){this.cdActive=false;
    const a=this.grid['7,3'],b=this.grid['6,4'];
    if(a&&CONN[a].includes(2))this.flow={cx:7,cy:3,enter:2,prog:0};
    else if(b&&CONN[b].includes(1))this.flow={cx:6,cy:4,enter:1,prog:0};
    else this.doSpill(7,4,0);}}
  if(this.flow){this.flow.prog+=dt/this.speed;if(this.flow.prog>=1)this.advance();}
  if(this.winning){this.tankFill+=dt/1.1;if(this.tankFill>=1){this.winning=false;this.end('win','delivered');}}
  if(this.spillAt){this.spillAt.age+=dt;if(this.spillAt.age>1.2)this.end('fail','spill');}}
 idle(dt){if(this.spillAt&&this.spillAt.age<3)this.spillAt.age+=dt;}
 cellXY(cx,cy){return [this.gx+cx*this.cs,this.gy+cy*this.cs];}
 draw(){const g=this.ctx,cs=this.cs;
  g.drawImage(this.bg,0,0);
  const [wx,wy]=this.cellXY(7,4);
  if(this.cdActive)px(g,wx+11,wy+3,4,4,this.blink(2)?C.amber:'#5a4410');
  for(const k in this.grid){const p=k.split(',');const [x,y]=this.cellXY(+p[0],+p[1]);pipeDraw(g,x,y,this.grid[k]);}
  for(const f of this.filled){const [x,y]=this.cellXY(f.cx,f.cy);oilIn(g,x,y,f.enter,1);px(g,x+11,y+11,4,4,C.oil);oilOut(g,x,y,f.exit,1);}
  if(this.flow){const f=this.flow;const t=this.grid[f.cx+','+f.cy];
   if(t){const [x,y]=this.cellXY(f.cx,f.cy);const cn=CONN[t];
    const exit=t==='X'?(f.enter+2)%4:(cn[0]===f.enter?cn[1]:cn[0]);
    if(f.prog<0.5)oilIn(g,x,y,f.enter,f.prog*2);
    else{oilIn(g,x,y,f.enter,1);px(g,x+11,y+11,4,4,C.oil);oilOut(g,x,y,exit,(f.prog-0.5)*2);}}}
  {const [tx,ty]=this.cellXY(0,0);const fh=Math.round(11*Math.min(1,this.tankFill));
   if(fh>0)px(g,tx+9,ty+18-fh,8,fh,C.oil);}
  if(this.spillAt){const s=this.spillAt;g.fillStyle=C.oil;g.beginPath();
   g.ellipse(s.x,s.y,Math.min(20,4+s.age*16),Math.min(10,2+s.age*8),0,0,7);g.fill();
   for(let i=0;i<6;i++){const a=i/6*6.28+s.age*3;
    px(g,s.x+Math.cos(a)*(6+s.age*10),s.y+Math.sin(a)*(3+s.age*5),2,2,C.oil);}}
  const hx=Math.floor((this.mouse.x-this.gx)/cs),hy=Math.floor((this.mouse.y-this.gy)/cs);
  const hOk=this.mouse.in&&hx>=0&&hy>=0&&hx<this.cols&&hy<this.rows;
  if(hOk&&this.phase==='run'&&this.canPlace(hx,hy)&&this.queue[0]){const [x,y]=this.cellXY(hx,hy);
   g.globalAlpha=0.45;pipeDraw(g,x,y,this.queue[0]);g.globalAlpha=1;}
  if(hOk){const [x,y]=this.cellXY(hx,hy);g.strokeStyle='rgba(255,255,255,0.7)';g.strokeRect(x+0.5,y+0.5,cs-1,cs-1);}
  {const [x,y]=this.cellXY(this.cur.cx,this.cur.cy);
   if(this.blink(3)){g.fillStyle=C.amber;
    px(g,x+1,y+1,6,2,C.amber);px(g,x+1,y+1,2,6,C.amber);
    px(g,x+cs-7,y+1,6,2,C.amber);px(g,x+cs-3,y+1,2,6,C.amber);
    px(g,x+1,y+cs-3,6,2,C.amber);px(g,x+1,y+cs-7,2,6,C.amber);
    px(g,x+cs-7,y+cs-3,6,2,C.amber);px(g,x+cs-3,y+cs-7,2,6,C.amber);}}
  for(let i=0;i<5;i++)if(this.queue[i])pipeDraw(g,14+i*33,168,this.queue[i]);
  if(this.cdActive){const n=Math.ceil(this.cd);
   txt(g,this.T.oilin||'OIL IN',246,171,C.label,F1);
   txt(g,String(n),308,177,n<=5&&this.blink(3)?'#ff5040':C.led,F3,'right');}
  else{const on=this.blink(2);px(g,246,176,6,6,on?C.led:'#123a1a');
   txt(g,this.T.flow||'OIL FLOWING',256,177,on?C.led:'#1e5c2a',F1);}}
}
/* ============ FIREFIGHTING ============ */
class FireGame extends Base{
 constructor(cv,o){super(cv,o);const d=o.diff||'normal';const R=rng(Date.now()&0xfffff);this.R=R;
  this.heatR={easy:0.55,normal:0.75,hard:1.0}[d]||0.75;
  this.timeMax={easy:80,normal:65,hard:50}[d]||65;
  this.x=18;this.face=1;this.walk=0;this.heat=0;this.time=this.timeMax;this.sticks=3;this.stick=null;this.boomFx=null;this.pend=null;
  this.burn=true;this.craters=[];this.collapseT=0;this.smokeLeft=0;
  this.parts=[];this.smoke=[];this.stars=[];
  while(this.stars.length<26){const sx=(R()*320)|0,sy=24+((R()*66)|0);
   if(sx>256&&sy<40)continue;this.stars.push([sx,sy]);}
  this.fx=252;this.warned=false;
  this.buildBg();}
 buildBg(){const g=this.mkbg();const Rg=rng(0xCAFE);
  const sky=[['#04040e',40],['#0a0a1c',38],['#121026',34],['#1a1432',28],['#241a3a',16]];
  let y=0;for(let i=0;i<sky.length;i++){px(g,0,y,320,sky[i][1],sky[i][0]);
   if(i<sky.length-1)dith(g,0,y+sky[i][1]-2,320,2,sky[i][0],sky[i+1][0]);y+=sky[i][1];}
  g.fillStyle='#d8d8c8';g.beginPath();g.arc(272,22,8,0,7);g.fill();
  g.fillStyle='#0a0a1c';g.beginPath();g.arc(276,20,8,0,7);g.fill();
  px(g,0,152,320,4,'#0a0814');
  for(let i=0;i<12;i++)px(g,(Rg()*320)|0,150,3+((Rg()*4)|0),2,'#0a0814');
  px(g,0,156,320,44,'#3e2c14');
  for(let i=0;i<130;i++)px(g,(Rg()*320)|0,158+((Rg()*42)|0),Rg()<0.3?2:1,1,'#2e2008');
  for(let i=0;i<18;i++)px(g,(Rg()*320)|0,160+((Rg()*38)|0),2,1,'#55432a');
  // shed with lit window
  px(g,8,132,36,24,'#12101e');px(g,6,130,40,3,'#080610');px(g,7,128,38,2,'#12101e');
  px(g,30,140,8,8,'#f0b020');px(g,33,140,1,8,'#12101e');px(g,30,144,8,1,'#12101e');
  px(g,12,142,10,14,'#0a0816');px(g,20,148,1,2,'#3a3648');
  // TNT crate
  px(g,48,146,14,10,'#7a1e12');px(g,48,146,14,1,'#a43424');px(g,48,150,14,2,C.amber);px(g,48,155,14,1,'#3c0e06');
  // manifold at derrick base
  px(g,242,150,20,6,'#1c1c26');px(g,243,150,18,1,'#34343e');px(g,250,147,4,3,'#c02818');
  // console
  plate(g,0,0,320,20);
  txt(g,this.T.heat||'HEAT',6,3,C.cream,F1);
  txt(g,this.T.tnt||'TNT',120,3,C.cream,F1);
  txt(g,this.T.time||'TIME',314,3,C.cream,F1,'right');}
 onBegin(){this.au&&this.au.crackleStart();}
 quiet(){this.au&&this.au.crackleStop();}
 key(k){if(k==='Space'||k==='Enter')this.plant();}
 plant(){if(!this.active()||this.stick||this.boomFx||!this.burn||this.sticks<=0)return;
  this.sticks--;this.stick={x:this.x+8,fuse:2.6,beep:0};this.au&&this.au.clank();}
 fxTick(dt){
  if(this.burn){for(let i=0;i<6;i++)this.parts.push({x:this.fx-9+this.R()*18,y:148-this.R()*6,vx:(this.R()-0.5)*9,vy:-(22+this.R()*36),a:0,l:0.4+this.R()*0.5});
   if(this.R()<0.5)this.smoke.push({x:this.fx-8+this.R()*16,y:96+this.R()*10,vx:(this.R()-0.5)*6+3,vy:-(8+this.R()*8),a:0,l:1.6+this.R()*1.2});}
  else if(this.smokeLeft>0){this.smokeLeft-=dt;
   if(this.R()<0.6)this.smoke.push({x:this.fx-6+this.R()*12,y:146,vx:(this.R()-0.5)*6+2,vy:-(14+this.R()*10),a:0,l:1.8});}
  for(const p of this.parts){p.a+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}
  this.parts=this.parts.filter(p=>p.a<p.l);
  for(const p of this.smoke){p.a+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}
  this.smoke=this.smoke.filter(p=>p.a<p.l);
  if(this.boomFx){this.boomFx.t+=dt;if(this.boomFx.t>0.7)this.boomFx=null;}
  if(this.collapseT>0&&this.collapseT<1.4)this.collapseT+=dt;}
 idle(dt){this.fxTick(dt);}
 step(dt){this.fxTick(dt);
  if(this.burn&&this.collapseT===0){this.time-=dt;
   if(this.time<=0){this.collapseT=0.001;this.au&&this.au.boom();
    this.burn=false;this.smokeLeft=5;this.end('fail','late');}}
  let mdir=0;
  if(this.mouse.down&&this.mouse.in&&Math.abs(this.mouse.x-8-this.x)>5)mdir=Math.sign(this.mouse.x-8-this.x);
  const d=this.dir()||mdir;
  if(d){this.x=Math.max(8,Math.min(232,this.x+d*46*dt));this.face=d;this.walk+=dt;}
  const dist=Math.abs(this.fx-this.x);
  if(this.burn&&dist<95)this.heat+=dt*this.heatR*(95-dist)/95;else this.heat-=dt*0.28;
  this.heat=Math.max(0,Math.min(1,this.heat));
  if(this.heat>=1){this.end('fail','hot');return;}
  if(this.heat>0.75&&!this.warned){this.warned=true;this.au&&this.au.beep();}
  if(this.heat<0.6)this.warned=false;
  if(this.stick){const s=this.stick;s.fuse-=dt;s.beep-=dt;
   if(s.beep<=0){this.au&&this.au.beep();s.beep=Math.max(0.1,s.fuse*0.22);}
   if(s.fuse<=0){this.boomFx={x:s.x,t:0};this.au&&this.au.boom();
    const nearFire=Math.abs(s.x-this.fx)<46,nearTech=Math.abs(this.x-s.x)<62;
    if(nearTech)this.pend=['fail','singed'];
    else if(nearFire){this.burn=false;this.smokeLeft=6;this.pend=['win','capped'];}
    else{this.craters.push(s.x);if(this.sticks<=0)this.pend=['fail','nodyn'];}
    this.stick=null;}}
  if(this.pend&&!this.boomFx){const p=this.pend;this.pend=null;this.end(p[0],p[1]);}}
 draw(){const g=this.ctx;
  px(g,0,0,320,200,'#000000');
  let sx=0,sy=0;
  if(this.boomFx&&this.boomFx.t<0.4){sx=(this.R()-0.5)*5;sy=(this.R()-0.5)*4;}
  g.save();g.translate(sx|0,sy|0);
  g.drawImage(this.bg,0,0);
  for(const s of this.stars)if(((s[0]*7+s[1])%3)!==0||this.blink(2))px(g,s[0],s[1],1,1,'#8fa4d8');
  if(this.burn){g.globalAlpha=0.10+0.05*Math.abs(Math.sin(this.anim*13));g.fillStyle='#e06018';
   g.beginPath();g.arc(this.fx,148,64,0,7);g.fill();g.globalAlpha=0.05;g.beginPath();g.arc(this.fx,148,115,0,7);g.fill();g.globalAlpha=1;}
  for(const c of this.craters){g.fillStyle='#221405';g.beginPath();g.ellipse(c,157,12,4,0,0,7);g.fill();}
  // derrick
  g.save();
  if(this.collapseT>0){g.translate(this.fx,156);g.rotate(Math.min(1.1,this.collapseT*1.2));g.translate(-this.fx,-156);}
  g.strokeStyle='#181420';g.lineWidth=1;g.beginPath();
  g.moveTo(this.fx-12,156);g.lineTo(this.fx-1,114);g.moveTo(this.fx+12,156);g.lineTo(this.fx+1,114);
  g.moveTo(this.fx-9,146);g.lineTo(this.fx+9,146);g.moveTo(this.fx-6,134);g.lineTo(this.fx+6,134);g.moveTo(this.fx-4,124);g.lineTo(this.fx+4,124);
  g.moveTo(this.fx-9,146);g.lineTo(this.fx+6,134);g.moveTo(this.fx+9,146);g.lineTo(this.fx-6,134);g.stroke();
  px(g,this.fx-4,110,9,5,'#181420');
  px(g,this.fx-1,107,3,3,this.burn&&this.blink(2)?'#ff4030':'#5a1410');
  g.restore();
  px(g,this.fx-7,148,15,8,'#20201c');px(g,this.fx-4,146,9,2,'#2c2c28');
  // fire base glow
  if(this.burn){g.globalAlpha=0.5+0.2*Math.sin(this.anim*17);g.fillStyle='#f4c832';
   g.beginPath();g.ellipse(this.fx,151,11+Math.sin(this.anim*23)*2,4,0,0,7);g.fill();g.globalAlpha=1;}
  for(const p of this.smoke){const k=p.a/p.l;px(g,p.x,p.y,k<0.5?2:3,k<0.5?2:3,k<0.4?'#6a6a6a':'#4a4a4e');}
  for(const p of this.parts){const k=p.a/p.l;
   px(g,p.x,p.y,2,2,k<0.2?'#fff8e0':k<0.45?'#f4c832':k<0.7?'#e06018':'#a02414');}
  // dynamite
  if(this.stick){const s=this.stick;
   px(g,s.x-3,149,7,7,'#26241f');px(g,s.x-2,150,5,5,'#a02418');px(g,s.x-2,152,5,1,C.amber);
   if(this.blink(8))px(g,s.x+((this.R()*3)|0)-1,145+((this.R()*3)|0),1,1,'#ffffff');}
  // explosion
  if(this.boomFx){const b=this.boomFx,k=b.t/0.7;const r=k*80;
   g.globalAlpha=1-k;
   g.fillStyle='#a02414';g.beginPath();g.arc(b.x,152,r,0,7);g.fill();
   g.fillStyle='#e06018';g.beginPath();g.arc(b.x,152,r*0.7,0,7);g.fill();
   g.fillStyle='#f4c832';g.beginPath();g.arc(b.x,152,r*0.45,0,7);g.fill();
   g.fillStyle='#ffffff';g.beginPath();g.arc(b.x,152,r*0.2,0,7);g.fill();
   g.globalAlpha=(1-k)*0.8;g.strokeStyle='#f8e8b0';g.lineWidth=1;
   g.beginPath();g.arc(b.x,152,r*1.15,0,7);g.stroke();g.globalAlpha=1;}
  // technician
  {const x=this.x|0,f=((this.walk*7)|0)%2,fc=this.face;
   px(g,x-3,136,7,2,C.amber);px(g,x-2,133,5,3,C.amber);px(g,x-2,134,2,1,'#f8d878');
   px(g,x-2,138,5,4,'#e8b088');px(g,x+(fc>0?1:-2),139,1,1,'#181410');
   px(g,x-3,142,7,6,'#2444b8');px(g,x-3,145,7,1,'#16265c');
   px(g,x+(fc>0?4:-5),143,2,4,'#2444b8');
   px(g,x-3+(f?1:0),148,3,6,'#182a6a');px(g,x+1-(f?1:0),148,3,6,'#182a6a');
   px(g,x-3+(f?1:0),154,3,2,'#0c0a08');px(g,x+1-(f?1:0),154,3,2,'#0c0a08');
   if(this.sticks>0&&!this.stick){const bx=x+(fc>0?6:-11);
    px(g,bx,146,5,7,'#a02418');px(g,bx,149,5,1,C.amber);px(g,bx,146,5,1,'#c8402c');}}
  // HUD dynamics (inside shake, over bg console)
  ledSeg(g,6,11,12,this.heat,this.heat>0.75&&this.blink(6));
  for(let i=0;i<this.sticks;i++){px(g,120+i*9,10,6,9,'#c02818');px(g,120+i*9,13,6,1,C.amber);px(g,120+i*9,10,6,1,'#e05038');}
  txt(g,String(Math.max(0,Math.ceil(this.time))),314,10,this.time<12&&this.blink(4)?'#ff5838':'#ffffff',F2,'right');
  g.restore();}
}
/* ============ MENU PIXEL ART (banner + icons) ============ */
function banner(g){
 const bands=[['#140a30',9],['#301048',8],['#58185c',8],['#8a2258',8],['#b83048',8],['#d84c30',7],['#ee7028',4],['#f89838',2]];
 let y=0;for(let i=0;i<bands.length;i++){px(g,0,y,320,bands[i][1],bands[i][0]);
  if(i<bands.length-1)dith(g,0,y+bands[i][1]-1,320,2,bands[i][0],bands[i+1][0]);y+=bands[i][1];}
 g.fillStyle='#f8d878';g.beginPath();g.arc(160,54,24,Math.PI,0);g.fill();
 g.fillStyle='#f8ecb0';g.beginPath();g.arc(160,54,17,Math.PI,0);g.fill();
 px(g,130,36,60,1,'#b83048');px(g,128,41,66,1,'#d84c30');px(g,126,46,70,2,'#ee7028');px(g,124,51,74,2,'#f89838');
 const s='#0a0512';
 px(g,0,54,320,20,s);
 derrickSil(g,36,54,26,s);derrickSil(g,196,54,30,s);derrickSil(g,290,54,18,s);
 pumpjackSil(g,86,54,s);pumpjackSil(g,246,54,s);
 px(g,120,44,16,10,s);px(g,121,42,14,2,s);px(g,138,48,10,6,s);
 const b='#1a0e2e';
 px(g,64,16,2,1,b);px(g,67,15,2,1,b);px(g,66,16,1,1,b);
 px(g,80,22,2,1,b);px(g,83,21,2,1,b);px(g,82,22,1,1,b);
 px(g,232,12,2,1,b);px(g,235,11,2,1,b);px(g,234,12,1,1,b);
 for(let i=0;i<26;i++)px(g,(i*37+11)%320,55+((i*13)%3),1,1,'#1c1030');}
const icons={
 drill(g){
  px(g,0,15,20,5,'#a06838');for(let i=0;i<10;i++)px(g,(i*7)%20,16+((i*3)%4),1,1,'#7c5028');
  px(g,5,18,10,2,'#0c0906');
  g.strokeStyle='#10101c';g.lineWidth=1;g.beginPath();
  g.moveTo(4,15);g.lineTo(9.5,2);g.moveTo(15,15);g.lineTo(10.5,2);
  g.moveTo(6,11);g.lineTo(14,11);g.moveTo(7,7);g.lineTo(13,7);g.stroke();
  px(g,8,1,4,2,'#10101c');
  px(g,9,11,2,7,'#9a9aa4');px(g,9,11,1,7,'#d8d8e2');},
 pipe(g){
  horizRun(g,0,6,14);vertRun(g,6,6,14);
  px(g,5,5,10,10,TB.ink);px(g,6,6,8,8,TB.mid);px(g,6,6,8,1,TB.li);px(g,6,6,1,8,TB.li);
  px(g,0,5,2,12,TB.fl);px(g,5,18,12,2,TB.fl);
  px(g,8,8,4,4,'#0c0906');},
 fire(g){
  const r='#c02818',o='#e86018',yl='#f0c838',w='#ffffff';
  px(g,9,1,2,2,r);px(g,8,3,3,2,r);px(g,6,5,7,2,r);
  px(g,5,7,10,4,r);px(g,4,11,12,5,r);px(g,5,16,10,2,r);px(g,7,18,6,1,r);
  px(g,7,8,6,3,o);px(g,6,11,8,4,o);px(g,7,15,6,2,o);
  px(g,8,10,4,3,yl);px(g,7,13,6,3,yl);
  px(g,9,13,2,3,w);}};
window.OilGames={DrillGame,PipeGame,FireGame,icons,banner};
})();
