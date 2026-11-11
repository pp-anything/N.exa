"use strict";
/* N.exa Cognitive 1.12 — js/tests/stroop-voice.js */
function renderStroopVoice(t){
const params=session.settings.parameters.stroop,Recognition=window.SpeechRecognition||window.webkitSpeechRecognition,area=$("stage"),colors=[["ROSSO","#d13f3f"],["BLU","#176bba"],["VERDE","#19835b"],["GIALLO","#b18400"]],token=epoch;
$("prompt").textContent="Stroop · risposta vocale";
$("instructions").textContent="Attiva il microfono una sola volta all'inizio. Pronuncia il colore dell'inchiostro: il test passa automaticamente allo stimolo successivo. Puoi usare i pulsanti in caso di necessità.";
const stim=node("div",null,"execstim"),status=node("p",null,"muted small"),feedback=node("p",null,"muted small"),actions=node("div",null,"execactions"),fallback=node("div",null,"execactions");
area.append(stim,status,feedback,actions,fallback);
let i=0,correct=0,records=[],started=0,recognizer=null,completed=false,enabled=false,starting=false,serial=0,delayHandle=null,waitingNext=false;
const sequence=Array.from({length:params.items},()=>{const word=Math.floor(Math.random()*4),ink=Math.random()<.5?word:Math.floor(Math.random()*4);return {word,ink}});
const mic=makeButton("🎙 Attiva microfono",enableMic,"primary"),skip=makeButton("Nessuna risposta",()=>commit(null,"no_response",null));
actions.append(mic,skip);
for(let k=0;k<4;k++)fallback.append(makeButton(colors[k][0],()=>commit(k,"touch_fallback",null)));
if(!Recognition){mic.disabled=true;feedback.textContent="Riconoscimento vocale non disponibile: usa i pulsanti."}
function normalize(raw){const v=(raw||"").toLocaleLowerCase("it-IT").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z ]/g," ").trim();for(let k=0;k<4;k++){const c=colors[k][0].toLowerCase();if(new RegExp("(^|\\s)"+c+"($|\\s)").test(v))return k}return null}
function clearRecognizer(){const r=recognizer;recognizer=null;starting=false;if(r){r.onresult=null;r.onerror=null;r.onend=null;try{r.abort()}catch(e){}}}
function stopAll(){enabled=false;serial++;clearTimeout(delayHandle);clearRecognizer()}
window.__nexaStopMic=stopAll;
function enableMic(){if(!Recognition||completed||token!==epoch)return;enabled=true;mic.textContent="🎙 Microfono attivo";mic.disabled=true;feedback.textContent="Autorizza il microfono, se richiesto.";listen()}
function listen(){if(!enabled||completed||token!==epoch||recognizer||starting||waitingNext)return;
const mySerial=++serial,r=new Recognition();recognizer=r;starting=true;r.lang="it-IT";r.continuous=true;r.interimResults=false;r.maxAlternatives=1;
r.onresult=e=>{if(token!==epoch||completed||!enabled||mySerial!==serial||waitingNext)return;for(let j=e.resultIndex;j<e.results.length;j++){const res=e.results[j];if(!res.isFinal)continue;const transcript=res[0]?.transcript||"",answer=normalize(transcript);if(answer===null){feedback.textContent="Non ho riconosciuto un colore. Ripeti il colore visualizzato.";continue}commit(answer,"voice",transcript);break}};
r.onerror=e=>{if(mySerial!==serial||completed||token!==epoch)return;feedback.textContent="Microfono: "+e.error+". "+(["not-allowed","service-not-allowed","audio-capture"].includes(e.error)?"Usa i pulsanti o riattiva il microfono.":"Tentativo di riconnessione…");if(["not-allowed","service-not-allowed","audio-capture"].includes(e.error)){enabled=false;mic.disabled=false;mic.textContent="🎙 Riattiva microfono"}};
r.onend=()=>{if(mySerial!==serial||completed||token!==epoch)return;recognizer=null;starting=false;if(enabled){delayHandle=setTimeout(listen,350)}};
try{r.start();starting=false;feedback.textContent="Microfono in ascolto continuo."}catch(e){recognizer=null;starting=false;feedback.textContent="Avvio del microfono non riuscito. Usa i pulsanti.";enabled=false;mic.disabled=false;mic.textContent="🎙 Riprova microfono"}}
function commit(value,source,transcript){if(completed||token!==epoch||waitingNext)return;waitingNext=true;const v=sequence[i],rt=Math.round(performance.now()-started),ok=value===v.ink;if(ok)correct++;records.push({index:i+1,stimulus:v,expected:colors[v.ink][0],response:value===null?null:colors[value][0],response_source:source,transcript,correct:ok,reaction_time_ms:rt,latency_note:source==="voice"?"Include latenza del riconoscimento vocale":null});i++;feedback.textContent="Risposta registrata.";delayHandle=setTimeout(()=>{if(token!==epoch)return;waitingNext=false;present()},350)}
function present(){if(token!==epoch)return;if(i>=sequence.length){completed=true;stopAll();mic.disabled=true;skip.disabled=true;fallback.querySelectorAll("button").forEach(b=>b.disabled=true);stim.textContent="Completato";status.textContent="Risposte corrette: "+correct+"/"+sequence.length;feedback.textContent="";record(t,{settings:params,stimuli:sequence,responses:records,correct_count:correct,total_items:sequence.length,correct:correct===sequence.length,recognition_engine:Recognition?"browser_speech_recognition":"unavailable",microphone_activation:"once_per_execution_auto_restart"});done(null,"Blocco completato.");return}
const v=sequence[i];stim.textContent=colors[v.word][0];stim.style.color=colors[v.ink][1];status.textContent="Stimolo "+(i+1)+" di "+sequence.length;feedback.textContent=enabled?"Microfono attivo: pronuncia il colore.":"";started=performance.now()}
present()
}
