"use strict";
/* N.exa Cognitive 1.12 — js/core/stimulus.js */
async function present(seq,draw,token,ms=850,gap=320){for(const v of seq){if(token!==epoch)return;draw(v);await sleep(ms);if(token!==epoch)return;draw(null);await sleep(gap)}}
