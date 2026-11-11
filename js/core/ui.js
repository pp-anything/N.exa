"use strict";
/* N.exa Cognitive 1.12 — js/core/ui.js */
function show(id){["setup","runner","results"].forEach(x=>$(x).classList.toggle("hide",x!==id));scrollTo(0,0)}
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function randomSeq(pool,n){let a=[];for(let i=0;i<n;i++){let options=pool.filter(x=>x!==a[a.length-1]);a.push(options[Math.floor(Math.random()*options.length)])}return a}
function node(tag,txt,cls){let x=document.createElement(tag);if(txt!==null)x.textContent=txt;if(cls)x.className=cls;return x}
function makeButton(text,fn,cls){let b=node("button",text,cls);b.onclick=fn;return b}
