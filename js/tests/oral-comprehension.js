"use strict";
/* N.exa Cognitive 1.12 — js/tests/oral-comprehension.js */
function renderOral(t){
const item=oralItems[t.itemIndex],params=session.settings.parameters.oral,area=$("stage"),token=epoch;
$("prompt").textContent="Comprensione orale";$("instructions").textContent="Ascolta la frase e poi rispondi alla domanda. Il testo della frase non viene mostrato.";
const support=("speechSynthesis" in window)&&("SpeechSynthesisUtterance" in window);
const info=node("p","Premi «Ascolta la frase» per iniziare.","notice"),listen=makeButton("▶ Ascolta la frase",play,"primary"),question=node("div"),answers=node("div"),count=node("p",null,"muted small");
area.append(info,listen,count,question,answers);
let listens=0,heard=false,answered=false,voiceName=null;
if(!support){listen.disabled=true;info.textContent="La sintesi vocale non è disponibile in questo browser. Questo test non può essere eseguito qui.";area.append(makeButton("Salta questa prova",()=>{if(answered)return;answered=true;record(t,{skipped:true,reason:"speech_synthesis_unavailable",correct:null});done(null,"Prova saltata.")}));return}
function play(){if(answered||listens>=params.max_listens||token!==epoch)return;window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(item.sentence);utterance.lang="it-IT";utterance.rate=.9;const voices=window.speechSynthesis.getVoices();const voice=voices.find(v=>v.lang.toLowerCase()==="it-it")||voices.find(v=>v.lang.toLowerCase().startsWith("it"));if(voice){utterance.voice=voice;voiceName=voice.name}
listens++;listen.disabled=true;count.textContent="Ascolti: "+listens+"/"+params.max_listens;info.textContent="Riproduzione in corso…";
utterance.onend=()=>{if(token!==epoch||answered)return;heard=true;info.textContent="Ascolto terminato.";listen.disabled=listens>=params.max_listens;showQuestion()};
utterance.onerror=()=>{if(token!==epoch||answered)return;listen.disabled=listens>=params.max_listens;info.textContent="Riproduzione non riuscita. Verifica volume e impostazioni audio.";if(listens>=params.max_listens){listens--;listen.disabled=false}};
window.speechSynthesis.speak(utterance)}
function showQuestion(){if(question.childNodes.length)return;question.append(node("h3",item.question));const shuffled=shuffle(item.options.map((text,i)=>({text,correct:i===item.answer})));const shownAt=performance.now();for(const o of shuffled)answers.append(makeButton(o.text,()=>{if(answered||!heard)return;answered=true;window.speechSynthesis.cancel();listen.disabled=true;const rt=Math.round(performance.now()-shownAt);record(t,{sentence:item.sentence,question:item.question,response:o.text,correct_response:item.options[item.answer],correct:o.correct,listen_count:listens,voice_name:voiceName,voice_language:"it-IT",response_time_after_audio_ms:rt,audio_mode:"browser_tts"});Array.from(answers.children).forEach(b=>b.disabled=true);done(o.correct,o.correct?"Risposta corretta.":"Risposta registrata.")},"choice"))}
}
