"use strict";
/* N.exa Cognitive 1.12 — js/tests/executive.js */
function renderExecutive(t){
const params=session.settings.parameters[t.id],total=params.items,area=$("stage"),stim=node("div",null,"execstim"),actions=node("div",null,"execactions"),status=node("p",null,"muted small");
area.append(stim,status,actions);let i=0,correct=0,records=[],locked=false,timer=null,token=epoch,started=0;
const colors=[["ROSSO","#d13f3f"],["BLU","#176bba"],["VERDE","#19835b"],["GIALLO","#b18400"]];
let sequence=Array.from({length:total},()=>{if(t.id==="gonogo")return Math.random()<.7?"GO":"NO-GO";if(t.id==="flanker"){let dir=Math.random()<.5?"left":"right",congruent=Math.random()<.5;return {dir,congruent}}let word=Math.floor(Math.random()*4),ink=Math.random()<.5?word:Math.floor(Math.random()*4);return {word,ink}});
if(t.id==="gonogo"){$("prompt").textContent="Go/No-Go";$("instructions").textContent="Tocca «Rispondi» solo quando compare il cerchio verde. Non rispondere al cerchio rosso.";actions.append(makeButton("Rispondi",()=>respond("go"),"primary"))}
if(t.id==="flanker"){$("prompt").textContent="Flanker";$("instructions").textContent="Indica la direzione della freccia centrale, ignorando quelle laterali.";actions.append(makeButton("← Sinistra",()=>respond("left")),makeButton("Destra →",()=>respond("right")))}
if(t.id==="stroop"){$("prompt").textContent="Stroop digitale";$("instructions").textContent="Indica il COLORE del testo, non la parola scritta.";for(let k=0;k<4;k++){const b=makeButton(colors[k][0],()=>respond(k));b.style.borderColor=colors[k][1];actions.append(b)}}
function expected(v){return t.id==="gonogo"?(v==="GO"?"go":"none"):t.id==="flanker"?v.dir:v.ink}
function present(){if(token!==epoch)return;if(i>=total){clearTimeout(timer);actions.querySelectorAll("button").forEach(b=>b.disabled=true);stim.textContent="Completato";status.textContent="Risposte corrette: "+correct+"/"+total;record(t,{settings:params,stimuli:sequence,responses:records,correct_count:correct,total_items:total,correct:correct===total});done(null,"Blocco completato.");return}
locked=false;const v=sequence[i];status.textContent="Stimolo "+(i+1)+" di "+total;if(t.id==="gonogo"){stim.textContent="●";stim.style.color=v==="GO"?"#19835b":"#d13f3f"}else if(t.id==="flanker"){const arrow=v.dir==="left"?"←":"→",other=v.dir==="left"?"→":"←";stim.textContent=(v.congruent?arrow:other).repeat(2)+arrow+(v.congruent?arrow:other).repeat(2);stim.style.color="#18334b"}else{stim.textContent=colors[v.word][0];stim.style.color=colors[v.ink][1]}started=performance.now();timer=setTimeout(()=>respond("timeout"),params.duration_ms)}
function respond(value){if(locked||token!==epoch)return;locked=true;clearTimeout(timer);const v=sequence[i],answer=expected(v),rt=Math.round(performance.now()-started);let ok=value===answer||(value==="timeout"&&answer==="none");if(ok)correct++;records.push({index:i+1,stimulus:v,expected:answer,response:value,correct:ok,reaction_time_ms:value==="timeout"?null:rt});i++;stim.textContent="";timer=setTimeout(present,260)}
present()
}

