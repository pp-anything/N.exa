"use strict";
/* N.exa Cognitive 1.12 — js/tests/visual-search.js */
function renderSearch(t){
const params=session.settings.parameters.search,area=$("stage"),icons=params.stimulus_set==="icons",target=icons?"★":"●",distractors=icons?["♥","☀","☂","♫","✿","✈","♣"]:["○","■","◆","▲","△","□"],n=params.items,k=params.targets;
$("prompt").textContent="Ricerca visiva";$("instructions").textContent="Tocca tutti i simboli bersaglio indicati. Quando hai finito, premi «Termina ricerca».";
const grid=node("div",null,"searchgrid"),status=node("p",null,"muted small"),finishBtn=makeButton("Termina ricerca",finishSearch,"primary");area.append(node("p","Bersaglio: "+target,"searchtarget"),status,grid,finishBtn);
const arr=shuffle([...Array(k).fill(target),...Array.from({length:n-k},()=>distractors[Math.floor(Math.random()*distractors.length)])]);
const selected=new Set(),started=performance.now();let finished=false;arr.forEach((symbol,i)=>{const b=makeButton(symbol,()=>{if(finished)return;if(selected.has(i)){selected.delete(i);b.classList.remove("selected");b.setAttribute("aria-pressed","false")}else{selected.add(i);b.classList.add("selected");b.setAttribute("aria-pressed","true")}status.textContent="Selezionati: "+selected.size});b.setAttribute("aria-pressed","false");grid.append(b)});status.textContent="Selezionati: 0";
function finishSearch(){if(finished)return;finished=true;const hits=[...selected].filter(i=>arr[i]===target).length,falseAlarms=[...selected].filter(i=>arr[i]!==target).length;grid.querySelectorAll("button").forEach(b=>b.disabled=true);finishBtn.disabled=true;record(t,{stimulus_set:params.stimulus_set,target,stimuli:arr,selected_indices:[...selected],correct_count:hits,total_items:k,omissions:k-hits,false_alarms:falseAlarms,correct:hits===k&&falseAlarms===0,completion_time_ms:Math.round(performance.now()-started)});done(hits===k&&falseAlarms===0,"Bersagli individuati: "+hits+"/"+k+" · Falsi allarmi: "+falseAlarms)}
}
