import { CardRegistry } from "../Registry";

export const CARDS_ITALIAN: CardRegistry = {
    
    // Base game cards

    BARREL: {
        "name": "Barile",
    },
    DYNAMITE: {
        "name": "Dinamite",
        "description": <div className="draw-description">Perdi 3 punti vita. Se no passa la Dinamite a sinistra.</div>
    },
    SCOPE: {
        "name": "Mirino",
        "description": <>Tu vedi gli altri a distanza -1.</>
    },
    MUSTANG: {
        "name": "Mustang",
        "description": <>Gli altri ti vedono a distanza +1.</>
    },
    JAIL: {
        "name": "Prigione",
        "description": <div className="draw-description">Scarta la Prigione e gioca. Altrimenti scarta la Prigione e salta il turno.</div>
    },
    REMINGTON: {
        "name": "Remington",
    },
    REV_CARABINE: {
        "name": "Rev. Carabine",
    },
    SCHOFIELD: {
        "name": "Schofield",
    },
    VOLCANIC: {
        "name": "Volcanic",
        "description": <div className="weapon-description">Puoi giocare quanti BANG! vuoi.</div>
    },
    WINCHESTER: {
        "name": "Winchester"
    },
    BANG: {
        "name": "Bang!",
    },
    BEER: {
        "name": "Birra",
    },
    CAT_BALOU: {
        "name": "Cat Balou",
    },
    STAGECOACH: {
        "name": "Diligenza",
    },
    DUEL: {
        "name": "Duello",
        "description": <>Un giocatore scarta un BANG!, poi tu, ecc. Il primo che non lo fa perde 1 punto vita.</>
    },
    GENERAL_STORE: {
        "name": "Emporio",
        "description": <>Rivela carte quanti i giocatori. Ognuno ne pesca una.</>
    },
    GATLING: {
        "name": "Gatling",
    },
    INDIANS: {
        "name": "Indiani!",
        "description": <>Tutti gli altri scartano un BANG! o perdono 1 punto vita.</>
    },
    MISSED: {
        "name": "Mancato!",
    },
    PANIC: {
        "name": "Panico!",
    },
    SALOON: {
        "name": "Saloon",
    },
    WELLS_FARGO: {
        "name": "Wells Fargo",  
    },

    // Dodge City cards

    BINOCULAR: {
        "name": "Binocolo",
        "description": <>Tu vedi gli altri a distanza -1.</>
    },
    HIDEOUT: {
        "name": "Riparo",
        "description": <>Gli altri ti vedono a distanza +1.</>
    },
    PUNCH: {
        "name": "Pugno",
    },
    RAG_TIME: {
        "name": "Rag Time",
    },
    BRAWL: {
        "name": "Rissa",
    },
    DODGE: {
        "name": "Schivata",
    },
    SPRINGFIELD: {
        "name": "Springfield",
    },
    TEQUILA: {
        "name": "Tequila",
    },
    WHISKY: {
        "name": "Whisky",
    },
    BIBLE: {
        "name": "Bibbia",
    },
    CANTEEN: {
        "name": "Borraccia",
    },
    CAN_CAN: {
        "name": "Can Can",
    },
    TEN_GALLON_HAT: {
        "name": "Cappello",
    },
    CONESTOGA: {
        "name": "Conestoga",
    },
    DERRINGER: {
        "name": "Derringer",
    },
    BUFFALO_RIFLE: {
        "name": "Fucile da Caccia",
    },
    HOWITZER: {
        "name": "Howitzer",
    },
    PEPPERBOX: {
        "name": "Pepperbox",
    },
    IRON_PLATE: {
        "name": "Placca di Ferro",
    },
    PONY_EXPRESS: {
        "name": "Pony Express",
    },
    KNIFE: {
        "name": "Pugnale",
    },
    SOMBRERO: {
        "name": "Sombrero",
    },

    // Valley of Shadows cards

    GHOST: {
        "name": "Fantasma",
        "description": <>Gioca su un giocatore eliminato. Quel giocatore torna in gioco, ma non può guadagnare né perdere punti vita.</>
    },
    GHOST_2: {
        "name": "Fantasma",
        "description": <>Giocala su un giocatore eliminato. Quel giocatore è di nuovo in gioco senza l'abilità del suo personaggio, non può guadagnare né perdere punti vita e gioca normalmente finché ha questa carta in gioco.</>
    },
    LEMAT: {
        "name": "Lemat",
        "description": <div className="weapon-description">Nel tuo turno, puoi usare ogni carta in mano come carta BANG!.</div>
    },
    LEMAT_2: {
        "name": "Lemat",
        "description": <div className="weapon-description">Nel tuo turno, puoi usare una qualunque carta (tranne il Mancato!) come una carta BANG!.</div>
    },
    RATTLESNAKE: {
        "name": "Serpente a Sonagli",
        "description": <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche, perde 1 punto vita.</>
    },
    SHOTGUN: {
        "name": "Shotgun",
        "description": <div className="weapon-description">Ogni volta che colpisci un giocatore, deve scartare una carta a scelta dalla mano.</div>
    },
    BOUNTY: {
        "name": "Taglia",
        "description": <>Gioca su chiunque. Se quel giocatore è colpito da una carta BANG!, chi ha sparato pesca una carta dal mazzo.</>
    },
    BANDIDOS: {
        "name": "Bandidos",
        "description": <>Ogni giocatore sceglie se scartare 2 carte dalla mano (o 1 se ne ha solo 1) o perdere 1 punto vita.</>
    },
    BANDIDOS_2: {
        "name": "Bandidos",
        "description": <>Tutti gli altri giocatori scartano una carta BANG! oppure 2 carte dalla loro mano a scelta.</>
    },
    ESCAPE: {
        "name": "Fuga",
        "description": <>Può essere giocata fuori turno. Evita l'effetto di una carta marrone (non BANG!) di cui sei uno dei bersagli.</>
    },
    ESCAPE_2: {
        "name": "Fuga",
        "description": <>Se sei l'unico bersaglio di una carta diversa da un BANG!, evita l'effetto di quella carta.</>
    },
    AIM: {
        "name": "Mira",
        "description": <>Gioca questa carta assieme a una carta BANG!. Se il bersaglio viene colpito, perde 2 punti vita.</>
    },
    POKER: {
        "name": "Poker",
        "description": <>Tutti gli altri scartano una carta dalla mano, allo stesso tempo. Se non c'è alcun Asso, pesca fino a 2 di quelle carte.</>
    },
    BACKFIRE: {
        "name": "Ritorno di Fiamma",
        "description": <>Vale una carta Mancato!<br/>Il giocatore che ha sparato è bersaglio di un BANG!.</>
    },
    SAVED: {
        "name": "Salvo!",
        "description": <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore. Se sopravvive, pesca 2 carte dalla sua mano o dal mazzo (scegli).</>
    },
    SAVED_2: {
        "name": "Salvo!",
        "description": <>Giocala solo fuori dal tuo turno<br/>Impedisce a un giocatore di perdere 1 punto vita. Se salvi un giocatore dall'eliminazione, pesca 2 carte dalla mano di quel giocatore.</>,
    },
    FANNING: {
        "name": "Sventagliata",
        "description": <>Conta come l'unico BANG! del turno. Anche un giocatore a tua scelta a distanza 1 dal bersaglio (se c'è, te escluso) è bersaglio di un BANG!.</>
    },
    TOMAHAWK: {
        "name": "Tomahawk",
    },
    TORNADO: {
        "name": "Tornado",
        "description": <>Tutti scartano una carta dalla mano (se possibile), poi pescano 2 carte dal mazzo.</>
    },
    TORNADO_2: {
        "name": "Tornado",
        "description": <>Ogni giocatore deve dare 2 carte dalla mano al giocatore alla propria sinistra.</>
    },
    LAST_CALL: {
        "name": "Ultimo Giro",
    },

    // Armed & Dangerous cards

    CARAVAN: {
        "name": "Carovana",
    },
    A_LITTLE_NIP: {
        "name": "Cicchetto",
    },
    QUICK_SHOT: {
        "name": "Colpo Rapido",
        "description": <div className="cube-description">Colpisci un ulteriore giocatore.</div>
    },
    FLINTLOCK: {
        "name": "Flintlock",
        "description": <div className="cube-description">Se annullato, riprendi questa carta.</div>
    },
    ARROW: {
        "name": "Freccia",
        "description": <>Un giocatore bersaglio scarta una carta BANG! dalla mano o perde 1 punto vita.<div className="cube-description">Colpisci un ulteriore giocatore.</div></>
    },
    DUCK: {
        "name": "Giù la Testa!",
        "description": <div className="cube-description">Riprendi questa carta.</div>
    },
    RELOAD: {
        "name": "Ricarica",
        "description": <>Aggiungi 3 📦 sulle tue carte e/o sul tuo personaggio.</>
    },
    RUST: {
        "name": "Ruggine",
        "description": <>Gli altri spostano 1 📦 dal personaggio e da ogni carta Dangerous sul tuo personaggio.</>
    },
    SQUAW: {
        "name": "Squaw",
        "description": <>Scarta una carta in gioco.<div className="cube-description">Aggiungi la carta scartata alla tua mano.</div></>
    },
    ACE_UP_THE_SLEEVE: {
        "name": "Asso nella Manica",
    },
    BANDOLIER: {
        "name": "Bandoliera",
        "description": <div className="cube-description">Una volta nel tuo turno, puoi giocare una carta BANG! extra.</div>
    },
    BIG_FIFTY: {
        "name": "Big Fifty",
        "description": <div className="cube-description">Annulla le carte in gioco e l'abilità del personaggio del bersaglio.</div>
    },
    BOMB: {
        "name": "Bomba",
        "description": <>Gioca su chiunque. All'inizio del tuo turno, "estrai!":<br/>♥♦=Passa la Bomba a chi vuoi.<br/>♣♠=scarta 2 📦: se finiscono, perdi 2 punti vita.</>
    },
    BUNTLINE_SPECIAL: {
        "name": "Buntline Special",
        "description": <div className="cube-description">Se il BANG! viene annullato il bersaglio deve scartare una carta a scelta dalla mano.</div>
    },
    BELL_TOWER: {
        "name": "Campanile",
        "description": <div className="cube-description">Vedi tutti a distanza 1 per la prossima carta che giochi.</div>
    },
    CRATE: {
        "name": "Cassa",
    },
    TUMBLEWEED: {
        "name": "Cespuglio",
        "description": <div className="cube-description">Ripeti o fai ripetere un "estrarre!".</div>
    },
    DOUBLE_BARREL: {
        "name": "Doppia Canna",
        "description": <div className="cube-description">Se giochi un BANG! di Quadri non può essere annullato.</div>
    },
    WHIP: {
        "name": "Frusta",
        "description": <div className="cube-description">Scarta una carta in gioco.</div>
    },
    BEER_KEG: {
        "name": Math.random() < 0.95 ? "Fusto di Birra" : "Busto di Firra",
    },
    LOCKPICK: {
        "name": "Grimaldello",
        "description": <div className="cube-description">Pesca 1 carta dalla mano di un giocatore.</div>
    },
    THUNDERER: {
        "name": "Thunderer",
        "description": <div className="cube-description">Riprendi la carta BANG! giocata.</div>
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        "name": "Tombarolo",
        "description": <>Metti sul tavolo tante carte dalla cima degli scarti quanti sono i giocatori. Ognuno ne sceglie una.</>
    },
    CARD_SHARPER: {
        "name": "Baro",
        "description": <>Scambia una carta a bordo blu in gioco di fronte a te con un'altra dello stesso colore in gioco di fronte ad un altro giocatore.</>
    },
    MIRAGE: {
        "name": "Miraggio",
        "description": <>Vale una carta Mancato!<br/>Inoltre il giocatore che ha sparato termina immediatamente il proprio turno.</>
    },
    BLOOD_PACT: {
        "name": "Patto di Sangue",
    },
    SACRIFICE: {
        "name": "Sacrificio",
        "description": <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore subendola tu stesso. Se possibile, poi, pesca 2 carte dal mazzo (3, se si previene un colpo fatale).</>
    },
    DISARM: {
        "name": "Disarmare",
        "description": <>Vale una carta Mancato!<br/>Inoltre fai scartare una carta dalla mano al giocatore che ha sparato.</>
    },
    MOLOTOV: {
        "name": "Molotov",
    },
    BULLDOG: {
        "name": "Bulldog",
        "description": <div className="weapon-description">Una sola volta per turno, puoi giocare una carta BANG! come Gatling scartando un'altra carta con essa.</div>
    },
    LAST_WILL: {
        "name": "Ultime Volontà",
        "description": <>Gioca su chiunque. Se il giocatore viene eliminato, può dare fino a 3 carte (dalla mano o in gioco) a un giocatore ancora in gioco.</>
    },
    INDIAN_GUIDE: {
        "name": "Guida Indiana",
        "description": <>Gioca su te stesso. Gli Indiani! e il Sentiero di Guerra non hanno effetto su di te.</>
    },
    TAXMAN: {
        "name": "Esattore",
        "description": <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche o Fiori, pesca una carta in meno in fase 1.</>
    },
    BROTHEL: {
        "name": "Bordello",
        "description": <div className="draw-description">Scarta e gioca, ma perdi la tua abilità fino all'inizio del tuo prossimo turno. Altrimenti scarta e gioca normalmente.</div>
    },
    BRONCO: {
        "name": "Bronco",
        "description": <>Gli altri ti vedono a distanza +1. Non può essere in gioco insieme a Mustang. Può essere rimosso anche scartando 2 carte dalla mano.</>
    },
    PACK_MULE: {
        "name": "Mulo",
        "description": <>Puoi tenere in mano una carta in più rispetto ai tuoi punti vita correnti. Non può essere in gioco insieme a Mustang o Bronco.</>
    },
    WAR_PATH: {
        "name": "Sentiero di Guerra",
        "description": <>Tutti gli altri giocatori scartano una carta BANG! o perdono 1 punto vita.</>
    },
    ARSON: {
        "name": "Incendio",
    },
    FLYING_BULLET: {
        "name": "Proiettile Vagante",
        "description": <>Vale una carta Mancato!<br/>Inoltre un giocatore a tua scelta a distanza 1 da te (se c'è) è bersaglio del BANG!.</>
    },
    ON_THE_HOUSE: {
        "name": "Offre La Casa",
    },
    GUITAR: {
        "name": "Chitarra",
        "description": <>Gioca su chiunque. Finché è in gioco, quel giocatore non può giocare carte BANG! (o carte che dipendono dalla gittata dell'arma).</>
    },
    SCRAPPER: {
        "name": "Attaccabrighe",
    },
    SHYLOCK: {
        "name": "Strozzino",
    },

    // Base game characters

    BART_CASSIDY: {
        "name": "Bart Cassidy",
        "description": <>Ogni volta che viene ferito, pesca una carta.</>
    },
    BLACK_JACK: {
        "name": "Black Jack",
        "description": <>Mostra la seconda carta che pesca. Se è Cuori o Quadri, pesca una carta in più.</>
    },
    CALAMITY_JANET: {
        "name": "Calamity Janet",
        "description": <>Può giocare le carte BANG! come carte Mancato!, e viceversa.</>
    },
    EL_GRINGO: {
        "name": "El Gringo",
        "description": <>Ogni volta che viene ferito da un giocatore, pesca una carta dalla mano di quel giocatore.</>
    },
    JESSE_JONES: {
        "name": "Jesse Jones",
        "description": <>Può pescare la prima carta dalla mano di un giocatore.</>
    },
    JOURDONNAIS: {
        "name": "Jourdonnais",
        "description": <>Ogni volta che è bersaglio di un BANG!, può "estrarre!": se esce Cuori, viene mancato.</>
    },
    KIT_CARLSON: {
        "name": "Kit Carlson",
        "description": <>Guarda le prime tre carte del mazzo e sceglie le due da pescare.</>
    },
    LUCKY_DUKE: {
        "name": "Lucky Duke",
        "description": <>Ogni volta che deve "estrarre!", scopre 2 carte e sceglie.</>
    },
    PAUL_REGRET: {
        "name": "Paul Regret",
        "description": <>Tutti i giocatori lo vedono a distanza aumentata di 1.</>
    },
    PEDRO_RAMIREZ: {
        "name": "Pedro Ramirez",
        "description": <>Può pescare la prima carta dalla cima degli scarti.</>
    },
    ROSE_DOOLAN: {
        "name": "Rose Doolan",
        "description": <>Vede tutti i giocatori a distanza diminuita di 1.</>
    },
    SID_KETCHUM: {
        "name": "Sid Ketchum",
        "description": <>Può scartare 2 carte per recuperare un punto vita.</>
    },
    SLAB_THE_KILLER: {
        "name": "Slab the Killer",
        "description": <>Per evitare i suoi BANG! occorrono due carte Mancato!.</>
    },
    SUZY_LAFAYETTE: {
        "name": "Suzy Lafayette",
        "description": <>Appena rimane senza carte in mano, pesca una carta.</>
    },
    VULTURE_SAM: {
        "name": "Vulture Sam",
        "description": <>Quando un personaggio è eliminato, prende in mano tutte le carte di quel personaggio.</>
    },
    WILLY_THE_KID: {
        "name": "Willy the Kid",
        "description": <>Può giocare un numero qualsiasi di carte BANG!</>
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        "name": "Claus \"The Saint\"",
        "description": <>Pesca tante carte quanti sono i giocatori più una. Ne tiene due per sé, poi ne dà una ad ognuno.</>
    },
    JOHNNY_KISCH: {
        "name": "Johnny Kisch",
        "description": <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome sono scartate.</>
    },
    UNCLE_WILL: {
        "name": "Uncle Will",
        "description": <>Una volta per turno, può giocare una carta qualsiasi dalla mano come un Emporio.</>
    },
    ANNIE_VERSARY: {
        "name": "Annie Versary",
        "description": <>Può giocare una carta qualunque come fosse una carta BANG!</>
    },
    EMILIANO: {
        "name": "Emiliano",
        "description": <>Quando un tuo BANG! viene Mancato!, pesca quel Mancato!; quandi manchi un BANG!, pesca quel BANG!</>
    },

    // Dodge City characters

    APACHE_KID: {
        "name": "Apache Kid",
        "description": <>Le carte di Quadri giocate dagli avversari non hanno effeto su di lui.</>
    },
    BELLE_STAR: {
        "name": "Belle Star",
        "description": <>Nel suo turno, le carte in gioco degli altri giocatori non hanno effetto.</>
    },
    BILL_NOFACE: {
        "name": "Bill Noface",
        "description": <>Pesca 1 carta, più 1 carta per ogni ferita che ha.</>
    },
    CHUCK_WENGAM: {
        "name": "Chuck Wengam",
        "description": <>Nel suo turno può perdere 1 punto vita per pescare 2 carte.</>
    },
    DOC_HOLYDAY: {
        "name": "Doc Holyday",
        "description": <>Nel suo turno può scartare una sola volta due carte per sparare un BANG!.</>
    },
    ELENA_FUENTE: {
        "name": "Elena Fuente",
        "description": <>Può usare una carta qualsiasi come Mancato!.</>
    },
    GREG_DIGGER: {
        "name": "Greg Digger",
        "description": <>Quando un personaggio è eliminato, recupera 2 punti vita.</>
    },
    HERB_HUNTER: {
        "name": "Herb Hunter",
        "description": <>Quando un peronaggio è eliminato, pesca 2 carte extra.</>
    },
    JOSE_DELGADO: {
        "name": Math.random() < 0.95 ? "Josè Delgado" : "Josè Degrado",
        "description": <>Due volte nel suo turno può scartare una carta blu dalla mano per pescare 2 carte.</>
    },
    MOLLY_STARK: {
        "name": "Molly Stark",
        "description": <>Quando usa una carta dalla mano fuori turno, pesca un'altra carta.</>
    },
    PAT_BRENNAN: {
        "name": "Pat Brennan",
        "description": <>Invece di pescare, può prendere una carta in gioco di fronte a un giocatore.</>
    },
    PIXIE_PETE: {
        "name": "Pixie Pete",
        "description": <>Pesca 3 carte invece di 2.</>
    },
    SEAN_MALLORY: {
        "name": "Sean Mallory",
        "description": <>Può rimanere con 10 carte in mano.</>
    },
    TEQUILA_JOE: {
        "name": "Tequila Joe",
        "description": <>Quando gioca una Birra, recupera 2 punti vita.</>
    },
    VERA_CUSTER: {
        "name": "Vera Custer",
        "description": <>Per un intero giro, acquisisce l'abilità di un altro personaggio in gioco a sua scelta.</>
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        "name": "Black Flower",
        "description": <>Una volta nel tuo turno, puoi usare una carta di fiori per sparare un BANG! extra.</>
    },
    COLORADO_BILL: {
        "name": "Colorado Bill",
        "description": <>Ogni volta che giochi una carta BANG!, "estrai!": se è Picche, il colpo non può essere evitato.</>
    },
    COLORADO_BILL_2: {
        "name": "Colorado Bill",
        "description": <>Ogni volta che un altro giocatore gioca una carta Mancato! su una carta BANG! giocata da Colorado Bill, "estrai!": se esce Picche la carta Mancato! non ha effetto e il giocatore attaccato perde 1 punto vita.</>
    },
    DER_SPOT_BURST_RINGER: {
        "name": "Der Spot - Burst Ringer",
        "description": <>Una volta nel tuo turno, puoi usare una carta BANG! come Gatling.</>
    },
    EVELYN_SHEBANG: {
        "name": "Evelyn Shebang",
        "description": <>Puoi rinunciare a pescare carte nella tua fase di pesca. Per ogni carta non pescata, spari un BANG! a distanza raggiungibile, a un diverso bersaglio.</>
    },
    EVELYN_SHEBANG_2: {
        "name": "Evelyn Shebang",
        "description": <>Può pescare una carta in meno del normale per sparare un BANG! extra a distanza 1.</>
    },
    HENRY_BLOCK: {
        "name": "Henry Block",
        "description": <>Chiunque peschi o scarti una tua carta (in gioco o in mano) è bersaglio di un BANG!.</>
    },
    LEMONADE_JIM: {
        "name": "Lemonade Jim",
        "description": <>Ogni volta che un altro giocatore gioca una Birra, puoi scartare una carta dalla mano per riguadagnare anche tu 1 punto vita.</>
    },
    MICK_DEFENDER: {
        "name": "Mick Defender",
        "description": <>Se sei bersaglio di una carta marrone (non BANG!), puoi usare una carta Mancato! per evitarne gli effetti.</>
    },
    MICK_DEFENDER_2: {
        "name": "Mick Defender",
        "description": <>Se è l'unico bersaglio di una carta, può usare un Mancato! per evitare l'effetto di quella carta.</>
    },
    TUCO_FRANZISKANER: {
        "name": "Tuco Franziskaner",
        "description": <>Durante la tua fase di pesca, se non hai carte blu in gioco, pesca 2 carte extra.</>
    },

    // Wild West Show characters

    BIG_SPENCER: {
        "name": "Big Spencer",
        "description": <>Inizia con 5 carte. Non può giocare Mancato!</>
    },
    FLINT_WESTWOOD: {
        "name": "Flint Westwood",
        "description": <>Nel suo turno può scambiare una carta dalla mano con 2 carte a caso dalla mano di un altro giocatore.</>
    },
    GARY_LOOTER: {
        "name": "Gary Looter",
        "description": <>Pesca tutte le carte in eccesso scartate dagli altri giocatori a fine turno.</>
    },
    GREYGORY_DECK: {
        "name": "Greygory Deck",
        "description": <>All'inizio del suo turno può pescare 2 personaggi a caso. Ha tutte le abilità dei personaggi pescati.</>
    },
    JOHN_PAIN: {
        "name": "John Pain",
        "description": <>Se ha meno di 6 carte in mano, quando un giocatore "estrae!", John aggiunge alla mano la carta appena estratta.</>
    },
    LEE_VAN_KLIFF: {
        "name": "Lee Van Kliff",
        "description": <>Nel suo turno, può scartare un BANG! per ripetere l'effetto di una carta a bordo marrone che ha appena giocato.</>
    },
    TEREN_KILL: {
        "name": "Teren Kill",
        "description": <>Ogni volta che sarebbe eliminato "estrai!": se non è Picche, Teren resta a 1 punto vita e pesca 1 carta.</>
    },
    YOUL_GRINNER: {
        "name": "Youl Grinner",
        "description": <>Prima di pescare, i giocatori con più carte in mano di lui devono dargli una carta a scelta.</>
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        "name": "Al Preacher",
        "description": <>Se un altro giocatore gioca una carta a bordo blu o arancione, puoi pagare 2 📦 per pescare 1 carta dal mazzo.</>
    },
    BASS_GREEVES: {
        "name": "Bass Greeves",
        "description": <>Una volta nel tuo turno, puoi scartare 1 carta dalla mano per aggiungere 2 📦 su una tua carta.</>
    },
    BLOODY_MARY: {
        "name": "Bloody Mary",
        "description": <>Ogni volta che una tua carta BANG! è annullata, pesca 1 carta dal mazzo.</>
    },
    FRANKIE_CANTON: {
        "name": "Frankie Canton",
        "description": <>Una volta nel tuo turno, puoi prendere 1 📦 da qualunque carta e metterla qui.</>
    },
    JULIE_CUTTER: {
        "name": "Julie Cutter",
        "description": <>Ogni volta che un giocatore ti fa perdere almeno 1 punto vita, "estrai!":♥♦=è bersaglio di un BANG!<br/></>
    },
    MEXICALI_KID: {
        "name": "Mexicali Kid",
        "description": <>Una volta nel tuo turno, puoi pagare 2 📦 per sparare 1 BANG! extra (non serve la carta).</>
    },
    MS_ABIGAIL: {
        "name": "Ms. Abigail",
        "description": <>Puoi ignorare gli effetti delle carte a bordo marrone di valore J, Q, K e A se sei l'unico bersaglio.</>
    },
    RED_RINGO: {
        "name": "Red Ringo",
        "description": <>Inizi con 4 📦. Una volta nel tuo turno puoi spostare fino a 2 📦 da qui alle tue carte.</>
    },

    // Gold Rush characters

    DON_BELL: {
        "name": "Don Bell",
        "description": <>Alla fine del suo turno, "estrae!": se esce Cuori o Quadri, gioca un turno extra.</>
    },
    DUTCH_WILL: {
        "name": "Dutch Will",
        "description": <>Pesca 2 pepite, ne scarta 1, e prende 1 pepita.</>
    },
    JACKY_MURIETA: {
        "name": "Jacky Murieta",
        "description": <>Nel suo turno può pagare 2 pepite per sparare 1 BANG! extra.</>
    },
    JOSH_MCCLOUD: {
        "name": "Josh McCloud",
        "description": <>Può pescare il primo equipaggiamento del mazzetto pagando 2 pepite.</>
    },
    MADAME_YTO: {
        "name": "Madame Yto",
        "description": <>Ogni volta che viene giocata una Birra, pesca 1 carta dal mazzo.</>
    },
    PRETTY_LUZENA: {
        "name": "Pretty Luzena",
        "description": <>Una volte per turno può pagare un equipaggiamento a costo diminuito di 1.</>
    },
    RADDIE_SNAKE: {
        "name": "Raddie Snake",
        "description": <>Nel suo turno, può scartare 1 pepita per pescare 1 carta dal mazzo (fino a 2 volte).</>
    },
    SIMEON_PICOS: {
        "name": "Simeon Picos",
        "description": <>Ogni volta che perde 1 punto vita, prende 1 pepita.</>
    },

    // High Noon cards

    BLESSING: {
        "name": "Benedizione",
        "description": <>Tutte le carte sono considerate di Cuori.</>
    },
    GHOST_TOWN: {
        "name": "Città Fantasma",
        "description": <>Ogni giocatore eliminato torna, al proprio turno, come fantasma: pesca 3 carte invece di 2, e non può morire. Al termine del proprio turno è eliminato di nuovo.</>
    },
    INVERT_ROTATION: {
        "name": "Corsa all'Oro",
        "description": <>Si gioca un giro in senso antiorario, sempre a partire dallo Sceriff. Gli effetti delle carte restano in senso orario.</>
    },
    THE_DALTONS: {
        "name": "I Dalton",
        "description": <>Quando I Dalton entrano in gioco, chi ha carte blu di fronte a sé ne scarta una a sua scelta.</>
    },
    THE_DOCTOR: {
        "name": "Il Dottore",
        "description": <>Quando Il Dottore entra in gioco, il/i personaggio/i in gioco che ha meno punti vita correnti recupera 1 punto vita.</>
    },
    THE_REVEREND: {
        "name": "Il Reverendo",
        "description": <>Non si possono giocare carte Birra.</>
    },
    TRAIN_ARRIVAL: {
        "name": "Il Treno",
        "description": <>Ogni giocatore pesca una carta extra al termine della fase 1 del proprio turno.</>
    },
    CURSE: {
        "name": "Maledizione",
        "description": <>Tutte le carte sono considerate di Picche.</>
    },
    HANGOVER: {
        "name": "Sbornia",
        "description": <>I presonaggio perdono le loro abilità speciali.</>
    },
    SERMON: {
        "name": "Sermone",
        "description": <>Il giocatore non può usare carte BANG! durante il proprio turno.</>
    },
    THIRST: {
        "name": "Sete",
        "description": <>Ogni giocatore pesca solo la prima carta, e non la seconda, nella fase 1 del proprio turno.</>
    },
    SHOOTOUT: {
        "name": "Sparatoria",
        "description": <>Il giocatore può giocare una seconda carta BANG! durante il proprio turno.</>
    },
    HANDCUFFS: {
        "name": "Manette",
        "description": <>Dopo aver pescato in fase 1, il giocatore di turno dichiara un seme: nel suo turno può giocare solo carte di quel seme.</>
    },
    HANDCUFFS_HEARTS: {
        "name": "Manette: Dichiaro Cuori",
    },
    HANDCUFFS_DIAMONDS: {
        "name": "Manette: Dichiaro Quadri",
    },
    HANDCUFFS_CLUBS: {
        "name": "Manette: Dichiaro Fiori",
    },
    HANDCUFFS_SPADES: {
        "name": "Manette: Dichiaro Picche",
    },
    NEW_IDENTITY: {
        "name": "Nuova Identità",
        // EDIT: the original card said that you should change the character with the one used to display your hp, which is not the case any more.
        "description": <>Ciascuno, all'inizio del proprio turno, prende un altro personaggio a caso: può sostituirlo per sempre al proprio, ripartendo da 2 punti vita.</>
    },
    HIGH_NOON: {
        "name": "Mezzogiorno di Fuoco",
        "description": <>Ogni giocatore perde 1 punto vita all'inizio del proprio turno.</>
    },

    // Fistful of Cards cards

    AMBUSH: {
        "name": "Agguato",
        "description": <>La distanza fra due giocatori qualunque è 1; è modificata solo dalle carte in gioco.</>
    },
    SNIPER: {
        "name": "Cecchino",
        "description": <>Il giocatore di turno può scartare 2 carte BANG! insieme contro un giocatore: vale come un BANG!, ma è annullabile solo con 2 Mancato!.</>
    },
    DEAD_MAN: {
        "name": "Dead Man",
        "description": <>Al proprio turno, il giocatore che è stato eliminato per primo rientra in gioco con 2 punti vita e 2 carte.</>
    },
    BLOOD_BROTHERS: {
        "name": "Fratelli di Sangue",
        "description": <>All'inizio del proprio turno, il giocatore può perdere un punto vita (tranne l'ultimo) per fare recuperare un punto vita a un giocatore a sua scelta.</>
    },
    THE_JUDGE: {
        "name": "Il Giudice",
        "description": <>Non si possono giocare carte di fronte a sé o agli altri.</>
    },
    LASSO: {
        "name": "Lazo",
        "description": <>Le carte in gioco di fronte ai giocatori non hanno effetto.</>
    },
    LAW_OF_THE_WEST: {
        "name": "Legge del West",
        "description": <>Nella propria fase 1, il giocatore mostra la seconda carta che pesca: se può, è obbligato a giocarla nella fase 2.</>
    },
    HARD_LIQUOR: {
        "name": "Liquore Forte",
        "description": <>Il giocatore può saltare la propria fase 1 per recuperare 1 punto vita.</>
    },
    ABANDONED_MINE: {
        "name": "Miniera Abbandonata",
        "description": <>Nella propria fase 1, il giocatore pesca dagli scarti (se finiscono, pesca dal mazzo). Nella propria fase 3, scarta a faccia in giù sul mazzo.</>
    },
    PEYOTE: {
        "name": "Peyote",
        "description": <>Invece di pescare nella fase 1, il giocatore prova a indovinare se il seme della carta in cima al mazzo è rosso o nero. Poi pesca e mostra la carta: se ha indovinato, la tiene e può indovinare ancora, altrimentri passa alla fase 2.</>
    },
    PEYOTE_RED: {
        "name": "Peyote: Dichiaro Rosso",
    },
    PEYOTE_BLACK: {
        "name": "Peyote: Dichiaro Nero",
    },
    RANCH: {
        "name": "Ranch",
        "description": <>Alla fine della propria fase 1, il giocatore per una volta può scartare un qualsiasi numero di carte dalla mano per pescarne altrettante dal mazzo.</>
    },
    RICOCHET: {
        "name": "Rimbalzo",
        "description": <>Il giocatore può scartare BANG! contro carte in gioco di fronte agli altri: ogni carta è scartata se il proprietario non gioca un Mancato! per ciascuna.</>
    },
    RUSSIAN_ROULETTE: {
        "name": "Roulette Russa",
        "description": <>Quando la Roulette Russa entra in gioco, a partire dallo Sceriffo ognuno scarta un Mancato!, a oltranza: il primo che non lo fa perde 2 punti vita, e la Roulette si interrompe.</>
    },
    VENDETTA: {
        "name": "Vendetta",
        "description": <>Alla fine del proprio turno, il giocatore "estrae!": se è Cuori, gioca un altro turno (ma non "estrae!" di nuovo).</>
    },
    A_FISTFUL_OF_CARDS: {
        "name": "Per un Pugno di Carte",
        "description": <>All'inizio del proprio turno, il giocatore subisce tanti BANG! quante sono le carte che ha in mano.</>
    },

    // Wild West Show cards

    GAG: {
        "name": "Bavaglio",
        "description": <>I giocatori non possono parlare (ma possono gesticolare, mugugnare...). Chi parla perde 1 punto vita.</>
    },
    BONE_ORCHARD: {
        "name": "Camposanto",
        "description": <>All'inizio del proprio turno, ogni giocatore eliminato torna in gioco con 1 punto vita. Pesca il ruolo a caso fra quelli dei giocatori eliminati.</>
    },
    DARLING_VALENTINE: {
        "name": "Darling Valentine",
        "description": <>All'inizio del proprio turno, ogni giocatore scarta le carte in mano e ne pesca dal mazzo altrettante.</>
    },
    DOROTHY_RAGE: {
        "name": "Dorothy Rage",
        "description": <>Nel proprio turno, ogni giocatore può obbligarne un altro a giocare una carta.</>
    },
    HELENA_ZONTERO: {
        "name": "Helena Zontero",
        "description": <>Quando Helena entra in gioco, "estrai!": se esce Cuori o Quadri, rimescola i ruoli attivi tranne lo Sceriffo, e ridistribuiscili a caso.</>
    },
    LADY_ROSA_OF_TEXAS: {
        "name": "Lady Rosa del Texas",
        "description": <>Nel proprio turno, ogni giocatore può scambiarsi di posto con quello alla sua destra, il quale salta il prossimo turno.</>
    },
    MISS_SUSANNA: {
        "name": "Miss Susanna",
        "description": <>Nel proprio turno ogni giocatore deve giocare almeno 3 carte. Se non lo fa, perde 1 punto vita.</>
    },
    SHOWDOWN: {
        "name": "Regolamento di Conti",
        // EDIT: BANG! cards can *only* be played as Missed!
        "description": <>Tutte le carte possono essere giocare come se fossero BANG!. Le carte BANG! solo come se fossero Mancato!</>
    },
    SACAGAWAY: {
        "name": "Sacagaway",
        "description": <>Tutti i giocatori giocano a carte scoperte (tranne il ruolo!).</>
    },
    WILD_WEST_SHOW: {
        "name": "Wild West Show",
        "description": <>L'obiettivo di ogni giocatore diventa: "Rimani l'ultimo in gioco!"</>
    },

    // Gold Rush cards

    SHOT: {
        "name": "Bicchierino",
        "description": <>Un giocatore a scelta (anche tu) recupera 1 punto vita.</>
    },
    BOTTLE: {
        "name": "Bottiglia",
        "description": <>Può essere giocata come Panico!, Birra o BANG!</>
    },
    BOTTLE_PANIC: {
        "name": "Bottiglia come Panico!",
    },
    BOTTLE_BEER: {
        "name": "Bottiglia come Birra",
    },
    BOTTLE_BANG: {
        "name": "Bottiglia come Bang!",
    },
    CALUMET: {
        "name": "Calumet",
        "description": <>Le carte di quadri giocate dagli altri non hanno effetto su di te.</>
    },
    GUN_BELT: {
        "name": "Cinturone",
        "description": <>Alla fine del tuo turno puoi tenere in mano fino a 8 carte.</>
    },
    PARDNER: {
        "name": "Complice",
        "description": <>Può essere giocato come Emporio, Duello o Cat Balou.</>
    },
    PARDNER_GENERAL_STORE: {
        "name": "Complice come Emporio",
    },
    PARDNER_DUEL: {
        "name": "Complice come Duello",
    },
    PARDNER_CAT_BALOU: {
        "name": "Complice come Cat Balou",
    },
    GOLD_RUSH: {
        "name": "Corsa all'Oro",
        "description": <>Il tuo turno termina. Recupera tutti i tuoi punti vita, poi gioca un altro turno.</>
    },
    HORSESHOE: {
        "name": "Ferro di Cavallo",
        "description": <>Ogni volta che "estrai!, scopri una carta in più e scegli il risultato.</>
    },
    PICKAXE: {
        "name": "Piccone",
        "description": <>Pesca una carta in più nella tua fase 1.</>
    },
    WANTED: {
        "name": "Ricercato",
        "description": <>Giocala su chi vuoi. Chi elimina quel giocatore pesca 2 carte e prende 1 pepita.</>
    },
    RHUM: {
        "name": "Rum",
        "description": <>"Estrai!" 4 carte: guadagni 1 punto vita per ogni seme diverso.</>
    },
    GOLD_PAN: {
        "name": "Setaccio",
        "description": <>Paga 1 pepita per pescare una carta dal mazzo. Usa questa abilità fino a 2 volte per turno.</>
    },
    BOOTS: {
        "name": "Stivali",
        "description": <>Ogni volta che perdi 1 punto vita, pesca una carta dal mazzo.</>
    },
    LUCKY_CHARM: {
        "name": "Talismano",
        "description": <>Ogni volta che perdi 1 punto vita, prendi una pepita.</>
    },
    UNION_PACIFIC: {
        "name": "Union Pacific",
        "description": <>Pesca 4 carte dal mazzo.</>
    },
    RUCKSACK: {
        "name": "Zaino",
        "description": <>Paga 2 pepite per recuperare 1 punto vita.</>
    },

    // The Great Train Robbery cards

    CACTUS: {
        "name": "Cactus",
    },
    DRAGOON: {
        "name": "Dragoon",
        "description": <>Puoi giocare un BANG! extra a turno.</>
    },
    EVADED: {
        "name": "Per Un Pelo!",
        "description": <>Pesca la carta che hai Mancato!</>
    },
    FULL_STEAM: {
        "name": "A Tutto Vapore",
        "description": <>Manda il treno al capolinea.<br/>Raddoppia o annulla l'effetto della locomotiva.</>
    },
    FULL_STEAM_NO_EFFECT: {
        "name": "A Tutto Vapore: Ignora effetti locomotiva",
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        "name": "A Tutto Vapore: Raddoppia effetti locomotiva",
    },
    KNIFE_REVOLVER: {
        "name": "Knife Revolver",
        "description": <>Conta come il BANG! del turno.<br/>"Estrai!": J, Q, K, A = riprendi questa carta in mano.</>
    },
    MAP: {
        "name": "Mappa",
        "description": <>Al tuo turno, prima di pescare, guarda le prime 2 carte del mazzo: puoi scartarne 1.</>
    },
    MONEY_BAG: {
        "name": "Sacco Di Soldi",
        "description": <>Se la carta in cima agli scarti è a bordo marrone, copiane l'effetto.</>
    },
    MOST_WANTED: {
        "name": "Most Wanted",
        "description": <div className="description-low">Ogni giocatore "estrae!":<br/>♠=perde 1 punto vita.</div>
    },
    NEXT_STOP: {
        "name": "Prossima Fermata",
        "description": <div>Fai avanzare il treno di 1 stazione.</div>
    },
    REFUND: {
        "name": "Rimborso",
        "description": <>Quando un altro giocatore pesca o scarta una tua carta, tranne questa, pesca una carta.</>
    },
    STRONGBOX: {
        "name": "Cassaforte",
        "description": <>Alla fine del tuo turno, pesca una carta.</>
    },
    SWITCH: {
        "name": "Scambio",
        "description": <>Scambia una tua carta in gioco con un'altra carta in gioco.</>
    },
    TRAIN_ROBBERY: {
        "name": "Rapina Al Treno",
        "description": <>Conta come il BANG! del turno.<br/>Il bersaglio sceglie per ogni sua carta in gioco: la scarta o è colpito da un BANG!</>
    },
    TRAIN_ROBBERY_DISCARD: {
        "name": "Rapina Al Treno: Scarta una carta",
    },
    TRAIN_ROBBERY_BANG: {
        "name": "Rapina Al Treno: Ricevi un Bang",
    },
    WATER_TOWER: {
        "name": "Serbatoio",
        "description": <>Prendi gratis un vagone a scelta dal treno.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        "name": "Benny Brawler",
        "description": <>Nel tuo turno, puoi prendere un qualunque numero di vagoni.</>
    },
    EVAN_BABBIT: {
        "name": "Evan Babbit",
        "description": <>Se sei bersaglio di una carta BANG!, puoi deviarla a un giocatore a distanza 1 scartando dalla mano una carta dello stesso seme.</>
    },
    JIMMY_TEXAS: {
        "name": "Jimmy Texas",
        "description": <>Alla fine del tuo turno, pesca una carta.</>
    },
    MANUELITA: {
        "name": "Manuelita",
        "description": <>Ogni volta che il treno arriva al capolinea, pesca 2 carte.</>
    },
    SANCHO: {
        "name": "Sancho",
        "description": <>Una volta nel tuo turno, puoi prendere gratis un vagone a scelta dal treno.</>
    },
    SGT_BLAZE: {
        "name": "Sgt. Blaze",
        // EDIT: dvGiochi made a typo here
        "description": <>Quando giochi una carta o un effetto che bersaglia più giocatori, puoi escluderne uno.</>
    },
    SHADE_OCONNOR: {
        "name": "Shade O'Connor",
        "description": <>Ogni volta che il treno avanza fuori dal tuo turno, puoi scartare una carta dalla mano per pescarne un'altra.</>
    },
    ZIPPY_ROY: {
        "name": "Zippy Roy",
        "description": <>Una volta nel tuo turno, puoi far avanzare il treno di 1 stazione.</>
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        "name": "Annie Oakey",
        "description": <>Può provare a indovinare il colore o il seme di ogni carta pescata in fase 1: pesca + 1 carta per ogni "colore" indovinato (+ 2 per ogni "seme").</>
    },
    ANNIE_OAKEY_RED: {
        "name": "Annie Oakey: Dichiaro Rosso",
    },
    ANNIE_OAKEY_HEARTS: {
        "name": "Annie Oakey: Dichiaro Cuori",
    },
    ANNIE_OAKEY_DIAMONDS: {
        "name": "Annie Oakey: Dichiaro Quadri",
    },
    ANNIE_OAKEY_BLACK: {
        "name": "Annie Oakey: Dichiaro Nero",
    },
    ANNIE_OAKEY_CLUBS: {
        "name": "Annie Oakey: Dichiaro Fiori",
    },
    ANNIE_OAKEY_SPADES: {
        "name": "Annie Oakey: Dichiaro Picche",
    },
    BIG_SPENCER_2: {
        "name": "Big Spencer",
        "description": <>Può incrementare i suoi punti vita fino a un massimo di 6.</>
    },
    BUFFALO_BELL: {
        "name": "Buffalo Bell",
        "description": <>Ogni volta che viene attaccato da un giocatore, può scartare una carta dalla mano per evitare il colpo. Carta giocata + carta schivata: se ≥ 13 = Mancato!; se ≥ 17 = Schivata; se ≥ 20 = Ritorno di fiamma.</>
    },
    CLASH_THE_STAMPEDE: {
        "name": "Clash The Stampede",
        "description": <>Prima di pescare, il giocatore con più carte in mano deve dargliene una a sua scelta.</>
    },
    CRAZY_HOG: {
        "name": "Crazy Hog",
        "description": <>Una volta nel suo turno può scartare una carta a bordo blu dalla mano per pescare 2 carte.</>
    },
    EVA_PLACE: {
        "name": "Eva Place",
        "description": <>Una volta nel suo turno, può scartare una carta dalla mano per pescarne un'altra dal mazzo. Se è Quadri, può pescare ancora.</>
    },
    JOSEY_BASSETT: {
        "name": "Josey Bassett",
        "description": <>Per un intero giro, può beneficiare dell'effetto di una qualsiasi carta a bordo blu in gioco di fronte ad un altro giocatore.</>
    },
    LAURA_BILLION: {
        "name": "Laura Billion",
        "description": <>Ogni volta che una carta è "estratta!", può scartare una carta dalla mano per pescare la carta estratta.</>
    },
    PAT_BARRETT: {
        "name": "Pat Barrett",
        "description": <>Per ogni punto vita in meno, la distanza a cui gli altri giocatori lo vedono è aumentata di 1.</>
    },
    SID_CURRY: {
        "name": "Sid Curry",
        "description": <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome vengono scartate.</>
    },
    SOUNDANCE_KID: {
        "name": "Soundance Kid",
        "description": <>Ogni volta che ferisce un giocatore con un BANG!, pesca una carta dal mazzo.</>
    },
    SPIKE_SPIEZEL: {
        "name": "Spike Spiezel",
        "description": <>Una volta nel suo turno, può scartare una carta BANG! per ripetere l'effetto dell'ultima carta a bordo marrone da lui giocata.</>
    },
    TEREN_KILL_2: {
        "name": "Teren Kill",
        "description": <>Ogni volta che sarebbe eliminato, "estrae!": se non è Picche, resta a 1 punto vita e pesca 1 carta.</>
    },
    WYATT_EARL: {
        "name": "Wyatt Earl",
        "description": <>Le carte che possono avere effetto su più giocatori non hanno effetto su di lui.</>
    },

    // The Great Train Robbery railcar cards

    BAGGAGE_CAR: {
        "name": "Baggage Car",
        "description": <div className="train-description">Scartalo: ottieni l'effetto di un Mancato!, Panico!, Cat Balou o di un BANG! extra.</div>
    },
    BAGGAGE_CAR_MISSED: {
        "name": "Baggage Car come Mancato!",
    },
    BAGGAGE_CAR_PANIC: {
        "name": "Baggage Car come Panico!",
    },
    BAGGAGE_CAR_CAT_BALOU: {
        "name": "Baggage Car come Cat Balou",
    },
    BAGGAGE_CAR_BANG: {
        "name": "Baggage Car come Bang!",
    },
    CABOOSE: {
        "name": "Caboose",
        "description": <div className="train-description">Puoi scartare un'altra tua carta a bordo blu (incluso un vagone) come se fosse un Mancato!</div>
    },
    CATTLE_TRUCK: {
        "name": "Cattle Truck",
        "description": <div className="train-description">Scartalo: guarda le 3 carte in cima agli scarti e pescane 1.</div>
    },
    CIRCUS_WAGON: {
        "name": "Circus Wagon",
        "description": <div className="train-description">Scartalo: ogni altro giocatore deve scartare una carta che ha in gioco.</div>
    },
    COAL_HOPPER: {
        "name": "Coal Hopper",
        "description": <div className="train-description">Scartalo: pesca una carta e scarta un vagone in gioco davanti a un giocatore a tua scelta.</div>
    },
    DINING_CAR: {
        "name": "Dining Car",
        "description": <div className="train-description">A inizio turno, "estrai!": se è Cuori, recuperi 1 punto vita.</div>
    },
    EXPRESS_CAR: {
        "name": "Express Car",
        "description": <div className="train-description">Scartalo: il tuo turno termina. Scarta tutte le carte in mano, poi gioca un altro turno.</div>
    },
    GHOST_CAR: {
        "name": "Ghost Car",
        "description": <div className="train-description">Giocalo su chiunque tranne lo Sceriffo. Se vieni eliminato, invece resti in gioco, ma non puoi guadagnare né perdere punti vita.</div>
    },
    LOUNGE_CAR: {
        "name": "Lounge Car",
        "description": <div className="train-description">Scartalo: pesca 2 vagoni dal mazzo, mettine 1 in gioco di fronte a te e 1 di fronte a un altro giocatore.</div>
    },
    LUMBER_FLATCAR: {
        "name": "Lumber Flatcar",
        "description": <div className="train-description">Giocalo su chiunque.<br/>Vedi tutti gli altri a distanza +1.</div>
    },
    MAIL_CAR: {
        "name": "Mail Car",
        "description": <div className="train-description">Scartalo: pesca 3 carte e dai 1 di esse a un altro giocatore a tua scelta.</div>
    },
    OBSERVATION_CAR: {
        "name": "Observation Car",
        "description": <div className="train-description">Tu vedi gli altri a distanza -1.<br/>Gli altri ti vedono a distanza +1.</div>
    },
    PASSENGER_CAR: {
        "name": "Passenger Car",
        "description": <div className="train-description">Scartalo: pesca una carta (in mano o in gioco) da un altro giocatore.</div>
    },
    PRISONER_CAR: {
        "name": "Prisoner Car",
        "description": <div className="train-description">Le carte Duello e Indiani! giocate dagli altri giocatori non hanno effetto su di te.</div>
    },
    PRIVATE_CAR: {
        "name": "Private Car",
        "description": <div className="train-description">Se non hai carte in mano, non puoi essere bersaglio di carte BANG!</div>
    },
    SLEEPER_CAR: {
        "name": "Sleeper Car",
        "description": <div className="train-description">Una volta per turno, poi scartare un'altra tua carta a bordo blu (incluso un vagone) come un BANG! extra.</div>
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        "name": "Ironhorse",
        "description": <div className="train-description">Al capolinea ogni gioctore è bersaglio di un BANG!</div>
    },
    LELAND: {
        "name": "Leland",
        "description": <div className="train-description">Al capolinea ha l'effetto di un Emporio</div>
    },

    // The Great Train Robbery station cards

    BOOM_TOWN: {
        "name": "Boom Town",
    },
    CATICO: {
        "name": "Catico",
    },
    CREEPY_CREEK: {
        "name": "Creepy Creek",
    },
    CROWNS_HOLE: {
        "name": "Crown's Hole",
    },
    DEATHWOOD: {
        "name": "Deathwood",
    },
    DODGEVILLE: {
        "name": "Dodgeville",
    },
    FORT_WROTH: {
        "name": "Fort Wroth",
    },
    FRISCO: {
        "name": "Frisco",
    },
    MINERS_OATH: {
        "name": "Miner's Oath",
    },
    SAN_TAFE: {
        "name": "San Tafe",
    },
    TOMBROCK: {
        "name": "Tombrock",
    },
    VIRGINIA_TOWN: {
        "name": "Virginia Town",
    },
    YOOMA: {
        "name": "Yooma",
    },

    // Legends feats cards

    FIFTY_GUNS: {
        "name": "Cinquanta Pistole",
    },
    WOUNDED_PRIDE: {
        "name": "Ferito Nell'Orgoglio",
    },
    OLD_WEST_GANG: {
        "name": "Gang Del Vecchio West",
    },
    BOTTLENECK: {
        "name": "Il Collo Di Bottiglia",
    },
    THE_CHUCK_A_LUCK: {
        "name": "Il Mulino D'Oro",
    },
    '3_15_TO_YOOMA': {
        "name": "Il Treno Per Yooma",
    },
    GOOD_COMPANY: {
        "name": "In Buona Compagnia",
    },
    THE_LAST_HERO: {
        "name": "L'Ultimo Eroe",
    },
    THE_MAN_WITH_NO_NAME: {
        "name": "L'Uomo Senza Nome",
    },
    WILHELM_SCREAM: {
        "name": "L'Urlo Di Wilhelm",
    },
    SCRUGS_BALLAD: {
        "name": "La Ballata Di Scrugs",
    },
    BORDERLANDS: {
        "name": "La Frontiera",
    },
    THE_OREGON_TRAIL: {
        "name": "La Pista Dell'Oregon",
    },
    A_THOUSAND_WAYS_TO_DIE: {
        "name": "Mille Modi Per Morire",
    },
    FOR_A_FEW_CARDS_MORE: {
        "name": "Per Qualche Carta In Più",
    },
    A_QUICK_DEATH: {
        "name": "Una Morte Veloce",
    },

    // Button row virtual cards

    ESCAPE_JAIL: {
        "name": "Fuggi di Prigione",
    },
    BECOME_LEGEND: {
        "name": "Diventa una Leggenda",
    },
    CLAIM_FEAT: {
        "name": "Rivendica un'Impresa",
    },
    GAME_PASS: {
        "name": "Termina il turno",
    },
    GAME_CONFIRM: {
        "name": "Conferma",
    },
    GAME_DISMISS: {
        "name": "Continua",
    },
    GAME_SELL_BEER: {
        "name": "Vendi birra",
    },
    GAME_DISCARD_BLACK: {
        "name": "Scarta equip",
    },
    GAME_DISCARD_BRONCO: {
        "name": "Scarta Bronco",
    },

};