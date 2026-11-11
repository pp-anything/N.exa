"use strict";
/* N.exa Cognitive 1.12 — js/data/language.js */
const oralItems=[
{sentence:"La bambina ha messo il cappello perché fuori faceva freddo.",question:"Perché la bambina ha messo il cappello?",options:["Per il freddo","Per la pioggia","Per dormire","Per nuotare"],answer:0},
{sentence:"Prima di uscire, Marco ha spento la luce e chiuso la porta.",question:"Che cosa ha fatto Marco prima di chiudere la porta?",options:["Ha spento la luce","Ha acceso il televisore","Ha aperto la finestra","Ha telefonato"],answer:0},
{sentence:"Il cane dorme vicino al divano, mentre il gatto è sopra la sedia.",question:"Dove si trova il gatto?",options:["Sopra la sedia","Vicino al divano","Sotto il tavolo","In giardino"],answer:0},
{sentence:"Giulia ha prestato a Paolo un libro che aveva comprato ieri.",question:"Chi ha ricevuto il libro in prestito?",options:["Paolo","Giulia","Nessuno","La madre"],answer:0},
{sentence:"Il treno delle otto arriva dopo l'autobus delle sette.",question:"Quale mezzo arriva per primo?",options:["L'autobus","Il treno","Entrambi","Non è specificato"],answer:0},
{sentence:"Elena ha lasciato le chiavi sul tavolo della cucina, accanto a un bicchiere.",question:"Dove ha lasciato le chiavi?",options:["Sul tavolo della cucina","Nella borsa","Sul comodino","In automobile"],answer:0}
];

const languageTests={
semantic:{title:"Associazioni semantiche",desc:"Individua la parola più associata.",items:[["Forchetta","Cucchiaio","Nuvola","Finestra","Scarpa"],["Biblioteca","Libro","Ombrello","Fiume","Forno"],["Medico","Ospedale","Montagna","Violino","Tappeto"],["Seme","Pianta","Orologio","Bicicletta","Specchio"],["Inverno","Freddo","Sabbia","Estate","Fiore"]]},
comprehension:{title:"Comprensione scritta",desc:"Comprendi una frase e scegli la risposta.",items:[["Luca prende l'ombrello perché piove. Perché lo prende?","Per la pioggia","Per il sole","Per fare sport","Per dormire"],["Il gatto è sotto il tavolo. Dove si trova?","Sotto il tavolo","Sopra il tetto","Dentro l'armadio","Dietro la porta"],["Anna ha dato il libro a Marco. Chi lo ha ricevuto?","Marco","Anna","Nessuno","Non si sa"],["Sara chiude la finestra e poi accende la luce. Che cosa fa prima?","Chiude la finestra","Accende la luce","Esce","Apre la porta"],["Il treno parte dopo l'autobus. Quale parte per primo?","L'autobus","Il treno","Entrambi","Non si sa"]]},
lexical:{title:"Selezione lessicale",desc:"Completa la frase.",items:[["Per tagliare la carta uso le ____.", "forbici","nuvole","scale","foglie"],["Di notte nel cielo si vedono le ____.", "stelle","sedie","tazze","porte"],["Per misurare il tempo guardo l'____.", "orologio","ombrello","albero","armadio"],["Per scrivere uso una ____.", "penna","forchetta","pietra","scarpa"],["Il pesce nuota nell'____.", "acqua","aria","sabbia","erba"]]}};
