# N.exa Cognitive 1.12 — versione modulare

Questa versione riorganizza **la release 1.11** in file separati, mantenendo i test e i dati originali.

## Pubblicazione

1. Estrai il contenuto dello ZIP.
2. Carica **il contenuto della cartella** `nexa-cognitive-1.12` nella radice del repository GitHub (non la cartella contenitrice).
3. Abilita GitHub Pages sul branch desiderato, oppure pubblica la stessa cartella su Cloudflare Pages.
4. Apri il sito via HTTPS. Per audio e microfono servono permessi del browser.

## Struttura

- `index.html`: struttura della pagina e caricamento degli script.
- `css/style.css`: interfaccia grafica.
- `js/core/`: configurazione, sessioni, utilità, stato, risultati.
- `js/tests/`: logica dei test, suddivisa per famiglia.
- `js/data/`: catalogo, modelli di figure, parole e stimoli.

## Note tecniche

La migrazione usa **script JavaScript classici con `defer`**, caricati nell'ordine indicato da `index.html`, per conservare l'ambiente condiviso della 1.11 senza riscrivere la logica dei test. È una prima modularizzazione per file, non ancora un'architettura ES Modules con import/export. Non cambiare l'ordine degli script senza verificare le dipendenze.

Il vocabolario per l'apprendimento verbale si trova in `js/data/word-pool.js`.

## Verifiche consigliate

Controllare da Safari iPhone: Stroop vocale, lettura/rievocazione delle parole, disegno e anteprima PNG, esportazione JSON. L'analisi dei disegni non produce ancora un punteggio clinico automatico.

Questa versione non implementa autenticazione. Per condividerla soltanto con tester selezionati, utilizzare hosting con controllo degli accessi.
