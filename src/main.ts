type Giudizio = "Da evitare" | "Discreto" | "Bellissimo" | "Imperdibile";

let contaAvventura=0;
let contaGiallo=0;
let contaFantasy=0;
let contaStorico=0;

let sommaStelle=0;
let numeroLibri=0;

let stelleMassime=0;
let titoloPreferito="";
let autorePreferito="";

function registra() {

    let titolo=(document.querySelector("#titolo") as HTMLInputElement).value;
    let autore=(document.querySelector("#autore") as HTMLInputElement).value;
    let genere=(document.querySelector("#genere") as HTMLSelectElement).value;
    let formato=document.querySelector('input[name="formato"]:checked') as HTMLInputElement | null;
    let stelle=Number((document.querySelector("#stelle") as HTMLInputElement).value);
    let consigliato=(document.querySelector("#consigliato") as HTMLInputElement).checked;
    let messaggio=document.querySelector("#messaggio") as HTMLParagraphElement;


    if(titolo.trim()=="" || autore.trim()=="") 
    {
        messaggio.textContent="Inserisci titolo e autore.";
        return;
    }

    if (genere=="") 
    {
        messaggio.textContent="Scegli il genere.";
        return;
    }

    if (formato==null)
    {
        messaggio.textContent="Scegli il formato.";
        return;
    }

    if (!Number.isInteger(stelle) || stelle<1 || stelle>5) 
    {
        messaggio.textContent="Il voto deve essere un numero intero da 1 a 5.";
        return;
    }

    let giudizio:Giudizio;
    if (stelle<=2) 
    {
        giudizio="Da evitare";
    } 
    else if(stelle==3) 
    {
        giudizio="Discreto";
    } 
    else if (stelle==4) 
    {
        giudizio="Bellissimo";
    } 
    else 
    {
        giudizio="Imperdibile";
    }

    let immagine=document.querySelector("#immagine") as HTMLImageElement;

    switch (genere) 
    {
        case "avventura":
            immagine.src="img/avventura.svg";
            immagine.alt="Genere avventura";
            break;

        case "giallo":
            immagine.src="img/giallo.svg";
            immagine.alt="Genere giallo";
            break;

        case "fantasy":
            immagine.src="img/fantasy.svg";
            immagine.alt="Genere fantasy";
            break;

        case "storico":
            immagine.src="img/storico.svg";
            immagine.alt="Genere storico";
            break;
    }

    let elenco=document.querySelector("#elenco") as HTMLUListElement;
    let li=document.createElement("li");
    let simbolo="";

    switch(formato.value) 
    {
        case "C":
            simbolo="📖";
            break;

        case "EB":
            simbolo="📱";
            break;
    }

    li.textContent=simbolo + " " + titolo + " - " + autore + " (" + formato.value + ") - " + "★".repeat(stelle) + " - " + giudizio;

    if(consigliato) 
    {
        li.textContent +=" - Consigliato";
    }

    let link=document.createElement("a");

    link.textContent=" Cerca";
    link.href="https://www.google.com/search?q=" + encodeURIComponent(titolo + " " + autore);
    link.target="_blank";

    li.appendChild(link);
    elenco.appendChild(li);

    switch(genere) 
    {
        case "avventura":
            contaAvventura++;
            (document.querySelector("#conta-avventura") as HTMLElement).textContent=String(contaAvventura);
            break;

        case "giallo":
            contaGiallo++;
            (document.querySelector("#conta-giallo") as HTMLElement).textContent=String(contaGiallo);
            break;

        case "fantasy":
            contaFantasy++;
            (document.querySelector("#conta-fantasy") as HTMLElement).textContent=String(contaFantasy);
            break;

        case "storico":
            contaStorico++;
            (document.querySelector("#conta-storico") as HTMLElement).textContent=String(contaStorico);
            break;
    }
    sommaStelle += stelle;
    numeroLibri++;

    let media=sommaStelle/numeroLibri;

    (document.querySelector("#media") as HTMLElement).textContent="Media delle stelle: " + media.toFixed(2);
    if (media>=4) 
    {
        (document.querySelector("#media") as HTMLElement).textContent +=" - Classe di lettori appassionati!";
    }

    if(stelle>stelleMassime)
    {
        stelleMassime=stelle;
        titoloPreferito=titolo;
        autorePreferito=autore;

        let preferito=document.querySelector("#preferito") as HTMLElement;

        preferito.textContent=titoloPreferito + " - " + autorePreferito + " (" + stelleMassime + " stelle)";

        let linkPreferito=document.createElement("a");

        linkPreferito.textContent=" Cerca";
        linkPreferito.href="https://www.google.com/search?q="+ encodeURIComponent(titoloPreferito + " " + autorePreferito);
        linkPreferito.target="_blank";
        preferito.appendChild(linkPreferito);
    }

    (document.querySelector("#titolo") as HTMLInputElement).value="";
    (document.querySelector("#autore") as HTMLInputElement).value="";

    messaggio.textContent="Libro registrato correttamente!";
}