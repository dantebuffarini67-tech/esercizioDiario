"use strict";
let contaAvventura = 0;
let contaGiallo = 0;
let contaFantasy = 0;
let contaStorico = 0;
let sommaStelle = 0;
let numeroLibri = 0;
let stelleMassime = 0;
let titoloPreferito = "";
let autorePreferito = "";
function registra() {
    let titolo = document.querySelector("#titolo").value;
    let autore = document.querySelector("#autore").value;
    let genere = document.querySelector("#genere").value;
    let formato = document.querySelector('input[name="formato"]:checked');
    let stelle = Number(document.querySelector("#stelle").value);
    let consigliato = document.querySelector("#consigliato").checked;
    let messaggio = document.querySelector("#messaggio");
    if (titolo.trim() == "" || autore.trim() == "") {
        messaggio.textContent = "Inserisci titolo e autore.";
        return;
    }
    if (genere == "") {
        messaggio.textContent = "Scegli il genere.";
        return;
    }
    if (formato == null) {
        messaggio.textContent = "Scegli il formato.";
        return;
    }
    if (!Number.isInteger(stelle) || stelle < 1 || stelle > 5) {
        messaggio.textContent = "Il voto deve essere un numero intero da 1 a 5.";
        return;
    }
    let giudizio;
    if (stelle <= 2) {
        giudizio = "Da evitare";
    }
    else if (stelle == 3) {
        giudizio = "Discreto";
    }
    else if (stelle == 4) {
        giudizio = "Bellissimo";
    }
    else {
        giudizio = "Imperdibile";
    }
    let immagine = document.querySelector("#immagine");
    switch (genere) {
        case "avventura":
            immagine.src = "img/avventura.svg";
            immagine.alt = "Genere avventura";
            break;
        case "giallo":
            immagine.src = "img/giallo.svg";
            immagine.alt = "Genere giallo";
            break;
        case "fantasy":
            immagine.src = "img/fantasy.svg";
            immagine.alt = "Genere fantasy";
            break;
        case "storico":
            immagine.src = "img/storico.svg";
            immagine.alt = "Genere storico";
            break;
    }
    let elenco = document.querySelector("#elenco");
    let li = document.createElement("li");
    let simbolo = "";
    switch (formato.value) {
        case "C":
            simbolo = "📖";
            break;
        case "EB":
            simbolo = "📱";
            break;
    }
    li.textContent = simbolo + " " + titolo + " - " + autore + " (" + formato.value + ") - " + "★".repeat(stelle) + " - " + giudizio;
    if (consigliato) {
        li.textContent += " - Consigliato";
    }
    let link = document.createElement("a");
    link.textContent = " Cerca";
    link.href = "https://www.google.com/search?q=" + encodeURIComponent(titolo + " " + autore);
    link.target = "_blank";
    li.appendChild(link);
    elenco.appendChild(li);
    switch (genere) {
        case "avventura":
            contaAvventura++;
            document.querySelector("#conta-avventura").textContent = String(contaAvventura);
            break;
        case "giallo":
            contaGiallo++;
            document.querySelector("#conta-giallo").textContent = String(contaGiallo);
            break;
        case "fantasy":
            contaFantasy++;
            document.querySelector("#conta-fantasy").textContent = String(contaFantasy);
            break;
        case "storico":
            contaStorico++;
            document.querySelector("#conta-storico").textContent = String(contaStorico);
            break;
    }
    sommaStelle += stelle;
    numeroLibri++;
    let media = sommaStelle / numeroLibri;
    document.querySelector("#media").textContent = "Media delle stelle: " + media.toFixed(2);
    if (media >= 4) {
        document.querySelector("#media").textContent += " - Classe di lettori appassionati!";
    }
    if (stelle > stelleMassime) {
        stelleMassime = stelle;
        titoloPreferito = titolo;
        autorePreferito = autore;
        let preferito = document.querySelector("#preferito");
        preferito.textContent = titoloPreferito + " - " + autorePreferito + " (" + stelleMassime + " stelle)";
        let linkPreferito = document.createElement("a");
        linkPreferito.textContent = " Cerca";
        linkPreferito.href = "https://www.google.com/search?q=" + encodeURIComponent(titoloPreferito + " " + autorePreferito);
        linkPreferito.target = "_blank";
        preferito.appendChild(linkPreferito);
    }
    document.querySelector("#titolo").value = "";
    document.querySelector("#autore").value = "";
    messaggio.textContent = "Libro registrato correttamente!";
}
//# sourceMappingURL=main.js.map