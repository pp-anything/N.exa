"use strict";
/* N.exa Cognitive 1.12 — js/core/app.js */
$("start").onclick=start;$("next").onclick=next;$("export").onclick=download;$("restart").onclick=()=>{epoch++;if(window.__nexaStopMic)window.__nexaStopMic();session=null;show("setup")};setupList();
