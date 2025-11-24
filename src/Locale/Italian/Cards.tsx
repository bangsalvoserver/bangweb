import { CardRegistry } from "../Registry";

export const CARDS_ITALIAN: CardRegistry = {
    
    // Base game cards

    BARREL: {
        name: "Barile",
        hideTitle: true
    },
    DYNAMITE: {
        name: "Dinamite",
        hideTitle: true,
        description: <>Perdi 3 punti vita. Se no passa la <i>Dinamite</i> a sinistra.</>,
        descriptionClass: "draw-description",
    },
    SCOPE: {
        name: "Mirino",
        hideTitle: true,
        description: <>Tu vedi gli altri a distanza -1.</>
    },
    MUSTANG: {
        name: "Mustang",
        hideTitle: true,
        description: <>Gli altri ti vedono a distanza +1.</>
    },
    JAIL: {
        name: "Prigione",
        hideTitle: true,
        description: <>Scarta la <i>Prigione</i> e gioca. Altrimenti scarta la <i>Prigione</i> e salta il turno.</>,
        descriptionClass: "draw-description",
    },
    REMINGTON: {
        name: "Remington",
        hideTitle: true
    },
    REV_CARABINE: {
        name: "Rev. Carabine",
        hideTitle: true
    },
    SCHOFIELD: {
        name: "Schofield",
        hideTitle: true
    },
    VOLCANIC: {
        name: "Volcanic",
        hideTitle: true,
        description: <>Puoi giocare quanti <i>BANG!</i> vuoi.</>,
        descriptionClass: "weapon-description",
    },
    WINCHESTER: {
        name: "Winchester",
        hideTitle: true
    },
    BANG: {
        name: "Bang!",
        hideTitle: true
    },
    BEER: {
        name: "Birra",
        hideTitle: true
    },
    CAT_BALOU: {
        name: "Cat Balou",
        hideTitle: true
    },
    STAGECOACH: {
        name: "Diligenza",
        hideTitle: true
    },
    DUEL: {
        name: "Duello",
        hideTitle: true,
        description: <>Un giocatore scarta un <i>BANG!</i>, poi tu, ecc. Il primo che non lo fa perde 1 punto vita.</>
    },
    GENERAL_STORE: {
        name: "Emporio",
        hideTitle: true,
        description: <>Rivela carte quanti i giocatori. Ognuno ne pesca una.</>
    },
    GATLING: {
        name: "Gatling",
        hideTitle: true
    },
    INDIANS: {
        name: "Indiani!",
        hideTitle: true,
        description: <>Tutti gli altri scartano un <i>BANG!</i> o perdono 1 punto vita.</>
    },
    MISSED: {
        name: "Mancato!",
        hideTitle: true
    },
    PANIC: {
        name: "Panico!",
        hideTitle: true
    },
    SALOON: {
        name: "Saloon",
        hideTitle: true
    },
    WELLS_FARGO: {
        name: "Wells Fargo",
        hideTitle: true
    },

    // Dodge City cards

    BINOCULAR: {
        name: "Binocolo",
        hideTitle: true,
        description: <>Tu vedi gli altri a distanza -1.</>
    },
    HIDEOUT: {
        name: "Riparo",
        hideTitle: true,
        description: <>Gli altri ti vedono a distanza +1.</>
    },
    PUNCH: {
        name: "Pugno",
        hideTitle: true
    },
    RAG_TIME: {
        name: "Rag Time",
        hideTitle: true
    },
    BRAWL: {
        name: "Rissa",
        hideTitle: true
    },
    DODGE: {
        name: "Schivata",
        hideTitle: true
    },
    SPRINGFIELD: {
        name: "Springfield",
        hideTitle: true
    },
    TEQUILA: {
        name: "Tequila",
        hideTitle: true
    },
    WHISKY: {
        name: "Whisky",
        hideTitle: true
    },
    BIBLE: {
        name: "Bibbia",
        hideTitle: true
    },
    CANTEEN: {
        name: "Borraccia",
        hideTitle: true
    },
    CAN_CAN: {
        name: "Can Can",
        hideTitle: true
    },
    TEN_GALLON_HAT: {
        name: "Cappello",
        hideTitle: true
    },
    CONESTOGA: {
        name: "Conestoga",
        hideTitle: true
    },
    DERRINGER: {
        name: "Derringer",
        hideTitle: true
    },
    BUFFALO_RIFLE: {
        name: "Fucile da Caccia",
        hideTitle: true
    },
    HOWITZER: {
        name: "Howitzer",
        hideTitle: true
    },
    PEPPERBOX: {
        name: "Pepperbox",
        hideTitle: true
    },
    IRON_PLATE: {
        name: "Placca di Ferro",
        hideTitle: true
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true
    },
    KNIFE: {
        name: "Pugnale",
        hideTitle: true
    },
    SOMBRERO: {
        name: "Sombrero",
        hideTitle: true
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Fantasma",
        hideTitle: true,
        description: <>Gioca su un giocatore eliminato. Quel giocatore torna in gioco, ma non può guadagnare né perdere punti vita.</>
    },
    GHOST_2: {
        name: "Fantasma",
        hideTitle: true,
        description: <>Giocala su un giocatore eliminato. Quel giocatore è di nuovo in gioco senza l'abilità del suo personaggio, non può guadagnare né perdere punti vita e gioca normalmente finché ha questa carta in gioco.</>,
        descriptionClass: "card-description text-smallest"
    },
    LEMAT: {
        name: "Lemat",
        hideTitle: true,
        description: <>Nel tuo turno, puoi usare ogni carta in mano come carta <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    LEMAT_2: {
        name: "Lemat",
        hideTitle: true,
        description: <>Nel tuo turno, puoi usare una qualunque carta (tranne il Mancato!) come una carta <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    RATTLESNAKE: {
        name: "Serpente a Sonagli",
        hideTitle: true,
        description: <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche, perde 1 punto vita.</>
    },
    SHOTGUN: {
        name: "Shotgun",
        hideTitle: true,
        description: <>Ogni volta che colpisci un giocatore, deve scartare una carta a scelta dalla mano.</>,
        descriptionClass: "weapon-description",
    },
    BOUNTY: {
        name: "Taglia",
        hideTitle: true,
        description: <>Gioca su chiunque. Se quel giocatore è colpito da una carta <i>BANG!</i>, chi ha sparato pesca una carta dal mazzo.</>
    },
    BANDIDOS: {
        name: "Bandidos",
        hideTitle: true,
        description: <>Ogni giocatore sceglie se scartare 2 carte dalla mano (o 1 se ne ha solo 1) o perdere 1 punto vita.</>
    },
    BANDIDOS_2: {
        name: "Bandidos",
        hideTitle: true,
        description: <>Tutti gli altri giocatori scartano una carta <i>BANG!</i> oppure 2 carte dalla loro mano a scelta.</>
    },
    ESCAPE: {
        name: "Fuga",
        hideTitle: true,
        description: <>Può essere giocata fuori turno. Evita l'effetto di una carta marrone (non <i>BANG!</i>) di cui sei uno dei bersagli.</>
    },
    ESCAPE_2: {
        name: "Fuga",
        hideTitle: true,
        description: <>Se sei l'unico bersaglio di una carta diversa da un <i>BANG!</i>, evita l'effetto di quella carta.</>
    },
    AIM: {
        name: "Mira",
        hideTitle: true,
        description: <>Gioca questa carta assieme a una carta <i>BANG!</i>. Se il bersaglio viene colpito, perde 2 punti vita.</>
    },
    POKER: {
        name: "Poker",
        hideTitle: true,
        description: <>Tutti gli altri scartano una carta dalla mano, allo stesso tempo. Se non c'è alcun Asso, pesca fino a 2 di quelle carte.</>
    },
    BACKFIRE: {
        name: "Ritorno di Fiamma",
        hideTitle: true,
        description: <>Vale una carta <i>Mancato!</i><br/>Il giocatore che ha sparato è bersaglio di un <i>BANG!</i>.</>
    },
    SAVED: {
        name: "Salvo!",
        hideTitle: true,
        description: <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore. Se sopravvive, pesca 2 carte dalla sua mano o dal mazzo (scegli).</>,
        descriptionClass: "card-description-higher"
    },
    SAVED_2: {
        name: "Salvo!",
        hideTitle: true,
        description: <>Giocala solo fuori dal tuo turno.<br/>Impedisce a un giocatore di perdere 1 punto vita. Se salvi un giocatore dall'eliminazione, pesca 2 carte dalla mano di quel giocatore.</>,
        descriptionClass: "card-description-higher text-smallest"
    },
    FANNING: {
        name: "Sventagliata",
        hideTitle: true,
        description: <>Conta come l'unico <i>BANG!</i> del turno. Anche un giocatore a tua scelta a distanza 1 dal bersaglio (se c'è, te escluso) è bersaglio di un <i>BANG!</i>.</>,
        descriptionClass: "card-description text-smaller"
    },
    TOMAHAWK: {
        name: "Tomahawk",
        hideTitle: true
    },
    TORNADO: {
        name: "Tornado",
        hideTitle: true,
        description: <>Tutti scartano una carta dalla mano (se possibile), poi pescano 2 carte dal mazzo.</>
    },
    TORNADO_2: {
        name: "Tornado",
        hideTitle: true,
        description: <>Ogni giocatore deve dare 2 carte dalla mano al giocatore alla propria sinistra.</>
    },
    LAST_CALL: {
        name: "Ultimo Giro",
        hideTitle: true
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Carovana",
        hideTitle: true
    },
    A_LITTLE_NIP: {
        name: "Cicchetto",
        hideTitle: true
    },
    QUICK_SHOT: {
        name: "Colpo Rapido",
        hideTitle: true,
        description: <>Colpisci un ulteriore giocatore.</>,
        descriptionClass: "cube-description",
    },
    FLINTLOCK: {
        name: "Flintlock",
        hideTitle: true,
        description: <>Se annullato, riprendi questa carta.</>,
        descriptionClass: "cube-description-lower",
    },
    ARROW: {
        name: "Freccia",
        hideTitle: true,
        description: [
            <>Un giocatore bersaglio scarta una carta <i>BANG!</i> dalla mano o perde 1 punto vita.</>,
            <>Colpisci un ulteriore giocatore.</>
        ],
        descriptionClass: "cube-description-double",
    },
    DUCK: {
        name: "Giù la Testa!",
        hideTitle: true,
        description: <>Riprendi questa carta.</>,
        descriptionClass: "cube-description-lower",
    },
    RELOAD: {
        name: "Ricarica",
        hideTitle: true,
        description: <>Aggiungi 3 📦 sulle tue carte e/o sul tuo personaggio.</>
    },
    RUST: {
        name: "Ruggine",
        hideTitle: true,
        description: <>Gli altri spostano 1 📦 dal personaggio e da ogni carta Dangerous sul tuo personaggio.</>
    },
    SQUAW: {
        name: "Squaw",
        hideTitle: true,
        description: [
            <>Scarta una carta in gioco.</>,
            <>Aggiungi la carta scartata alla tua mano.</>
        ],
        descriptionClass: "cube-description-double",
    },
    ACE_UP_THE_SLEEVE: {
        name: "Asso nella Manica",
        hideTitle: true
    },
    BANDOLIER: {
        name: "Bandoliera",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi giocare una carta <i>BANG!</i> extra.</>,
        descriptionClass: "cube-description",
    },
    BIG_FIFTY: {
        name: "Big Fifty",
        hideTitle: true,
        description: <>Annulla le carte in gioco e l'abilità del personaggio del bersaglio.</>,
        descriptionClass: "cube-description",
    },
    BOMB: {
        name: "Bomba",
        hideTitle: true,
        description: <>Gioca su chiunque. All'inizio del tuo turno, "estrai!":<br/>♥♦=Passa la <i>Bomba</i> a chi vuoi.<br/>♣♠=scarta 2 📦: se finiscono, perdi 2 punti vita.</>,
        descriptionClass: "card-description-higher text-smaller"
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        hideTitle: true,
        description: <>Se il <i>BANG!</i> viene annullato il bersaglio deve scartare una carta a scelta dalla mano.</>,
        descriptionClass: "cube-description",
    },
    BELL_TOWER: {
        name: "Campanile",
        hideTitle: true,
        description: <>Vedi tutti a distanza 1 per la prossima carta che giochi.</>,
        descriptionClass: "cube-description",
    },
    CRATE: {
        name: "Cassa",
        hideTitle: true
    },
    TUMBLEWEED: {
        name: "Cespuglio",
        hideTitle: true,
        description: <>Ripeti o fai ripetere un "estrarre!".</>,
        descriptionClass: "cube-description",
    },
    DOUBLE_BARREL: {
        name: "Doppia Canna",
        hideTitle: true,
        description: <>Se giochi un <i>BANG!</i> di Quadri non può essere annullato.</>,
        descriptionClass: "cube-description-lower",
    },
    WHIP: {
        name: "Frusta",
        hideTitle: true,
        description: <>Scarta una carta in gioco.</>,
        descriptionClass: "cube-description",
    },
    BEER_KEG: {
        name: Math.random() < 0.95 ? "Fusto di Birra" : "Busto di Firra",
        hideTitle: true
    },
    LOCKPICK: {
        name: "Grimaldello",
        hideTitle: true,
        description: <>Pesca 1 carta dalla mano di un giocatore.</>,
        descriptionClass: "cube-description",
    },
    THUNDERER: {
        name: "Thunderer",
        hideTitle: true,
        description: <>Riprendi la carta <i>BANG!</i> giocata.</>,
        descriptionClass: "cube-description",
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Tombarolo",
        hideTitle: true,
        description: <>Metti sul tavolo tante carte dalla cima degli scarti quanti sono i giocatori. Ognuno ne sceglie una.</>
    },
    CARD_SHARPER: {
        name: "Baro",
        hideTitle: true,
        description: <>Scambia una carta a bordo blu in gioco di fronte a te con un'altra dello stesso colore in gioco di fronte ad un altro giocatore.</>,
        descriptionClass: "card-description text-smaller"
    },
    MIRAGE: {
        name: "Miraggio",
        hideTitle: true,
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre il giocatore che ha sparato termina immediatamente il proprio turno.</>
    },
    BLOOD_PACT: {
        name: "Patto di Sangue",
        hideTitle: true
    },
    SACRIFICE: {
        name: "Sacrificio",
        hideTitle: true,
        description: <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore subendola tu stesso. Se possibile, poi, pesca 2 carte dal mazzo (3, se si previene un colpo fatale).</>,
        descriptionClass: "card-description text-smaller"
    },
    DISARM: {
        name: "Disarmare",
        hideTitle: true,
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre fai scartare una carta dalla mano al giocatore che ha sparato.</>
    },
    MOLOTOV: {
        name: "Molotov",
        hideTitle: true
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true,
        description: <>Una sola volta per turno, puoi giocare una carta <i>BANG!</i> come <i>Gatling</i> scartando un'altra carta con essa.</>,
        descriptionClass: "weapon-description text-smaller",
    },
    LAST_WILL: {
        name: "Ultime Volontà",
        hideTitle: true,
        description: <>Gioca su chiunque. Se il giocatore viene eliminato, può dare fino a 3 carte (dalla mano o in gioco) a un giocatore ancora in gioco.</>
    },
    INDIAN_GUIDE: {
        name: "Guida Indiana",
        hideTitle: true,
        description: <>Gioca su te stesso. Gli <i>Indiani!</i> e il <i>Sentiero di Guerra</i> non hanno effetto su di te.</>
    },
    TAXMAN: {
        name: "Esattore",
        hideTitle: true,
        description: <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche o Fiori, pesca una carta in meno in fase 1.</>,
        descriptionClass: "card-description"
    },
    BROTHEL: {
        name: "Bordello",
        hideTitle: true,
        description: <>Scarta e gioca, ma perdi la tua abilità fino all'inizio del tuo prossimo turno. Altrimenti scarta e gioca normalmente.</>,
        descriptionClass: "draw-description",
    },
    BRONCO: {
        name: "Bronco",
        hideTitle: true,
        description: <>Gli altri ti vedono a distanza +1. Non può essere in gioco insieme a <i>Mustang</i>. Può essere rimosso anche scartando 2 carte dalla mano.</>
    },
    PACK_MULE: {
        name: "Mulo",
        hideTitle: true,
        description: <>Puoi tenere in mano una carta in più rispetto ai tuoi punti vita correnti. Non può essere in gioco insieme a <i>Mustang</i> o <i>Bronco</i>.</>
    },
    WAR_PATH: {
        name: "Sentiero di Guerra",
        hideTitle: true,
        description: <>Tutti gli altri giocatori scartano una carta <i>BANG!</i> o perdono 1 punto vita.</>
    },
    ARSON: {
        name: "Incendio",
        hideTitle: true
    },
    FLYING_BULLET: {
        name: "Proiettile Vagante",
        hideTitle: true,
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre un giocatore a tua scelta a distanza 1 da te (se c'è) è bersaglio del <i>BANG!</i>.</>
    },
    ON_THE_HOUSE: {
        name: "Offre La Casa",
        hideTitle: true
    },
    GUITAR: {
        name: "Chitarra",
        hideTitle: true,
        description: <>Gioca su chiunque. Finché è in gioco, quel giocatore non può giocare carte <i>BANG!</i> (o carte che dipendono dalla gittata dell'arma).</>
    },
    SCRAPPER: {
        name: "Attaccabrighe",
        hideTitle: true
    },
    SHYLOCK: {
        name: "Strozzino",
        hideTitle: true
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Ogni volta che viene ferito, pesca una carta.</>,
        descriptionClass: "character-description"
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Mostra la seconda carta che pesca. Se è Cuori o Quadri, pesca una carta in più.</>,
        descriptionClass: "character-description"
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Può giocare le carte <i>BANG!</i> come carte <i>Mancato!</i>, e viceversa.</>,
        descriptionClass: "character-description"
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Ogni volta che viene ferito da un giocatore, pesca una carta dalla mano di quel giocatore.</>,
        descriptionClass: "character-description"
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Può pescare la prima carta dalla mano di un giocatore.</>,
        descriptionClass: "character-description"
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Ogni volta che è bersaglio di un <i>BANG!</i>, può "estrarre!": se esce Cuori, viene mancato.</>,
        descriptionClass: "character-description"
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Guarda le prime tre carte del mazzo e sceglie le due da pescare.</>,
        descriptionClass: "character-description"
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Ogni volta che deve "estrarre!", scopre 2 carte e sceglie.</>,
        descriptionClass: "character-description"
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Tutti i giocatori lo vedono a distanza aumentata di 1.</>,
        descriptionClass: "character-description"
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Può pescare la prima carta dalla cima degli scarti.</>,
        descriptionClass: "character-description"
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Vede tutti i giocatori a distanza diminuita di 1.</>,
        descriptionClass: "character-description"
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Può scartare 2 carte per recuperare un punto vita.</>,
        descriptionClass: "character-description"
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Per evitare i suoi <i>BANG!</i> occorrono due carte <i>Mancato!</i>.</>,
        descriptionClass: "character-description"
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Appena rimane senza carte in mano, pesca una carta.</>,
        descriptionClass: "character-description"
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Quando un personaggio è eliminato, prende in mano tutte le carte di quel personaggio.</>,
        descriptionClass: "character-description"
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Può giocare un numero qualsiasi di carte <i>BANG!</i></>,
        descriptionClass: "character-description"
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\"",
        hideTitle: true,
        description: <>Pesca tante carte quanti sono i giocatori più una. Ne tiene due per sé, poi ne dà una ad ognuno.</>,
        descriptionClass: "character-description"
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true,
        description: <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome sono scartate.</>,
        descriptionClass: "character-description"
    },
    UNCLE_WILL: {
        name: "Uncle Will",
        hideTitle: true,
        description: <>Una volta per turno, può giocare una carta qualsiasi dalla mano come un <i>Emporio</i>.</>,
        descriptionClass: "character-description"
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true,
        description: <>Può giocare una carta qualunque come fosse una carta <i>BANG!</i></>,
        descriptionClass: "character-description"
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true,
        description: <>Quando un tuo <i>BANG!</i> viene <i>Mancato!</i>, pesca quel <i>Mancato!</i>; quandi manchi un <i>BANG!</i>, pesca quel <i>BANG!</i></>,
        descriptionClass: "character-description"
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        hideTitle: true,
        description: <>Le carte di Quadri giocate dagli avversari non hanno effeto su di lui.</>,
        descriptionClass: "character-description"
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true,
        description: <>Nel suo turno, le carte in gioco degli altri giocatori non hanno effetto.</>,
        descriptionClass: "character-description"
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true,
        description: <>Pesca 1 carta, più 1 carta per ogni ferita che ha.</>,
        descriptionClass: "character-description"
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true,
        description: <>Nel suo turno può perdere 1 punto vita per pescare 2 carte.</>,
        descriptionClass: "character-description"
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true,
        description: <>Nel suo turno può scartare una sola volta due carte per sparare un <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true,
        description: <>Può usare una carta qualsiasi come <i>Mancato!</i>.</>,
        descriptionClass: "character-description"
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true,
        description: <>Quando un personaggio è eliminato, recupera 2 punti vita.</>,
        descriptionClass: "character-description"
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true,
        description: <>Quando un peronaggio è eliminato, pesca 2 carte extra.</>,
        descriptionClass: "character-description"
    },
    JOSE_DELGADO: {
        name: Math.random() < 0.95 ? "Josè Delgado" : "Josè Degrado",
        hideTitle: true,
        description: <>Due volte nel suo turno può scartare una carta blu dalla mano per pescare 2 carte.</>,
        descriptionClass: "character-description"
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true,
        description: <>Quando usa una carta dalla mano fuori turno, pesca un'altra carta.</>,
        descriptionClass: "character-description"
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true,
        description: <>Invece di pescare, può prendere una carta in gioco di fronte a un giocatore.</>,
        descriptionClass: "character-description"
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true,
        description: <>Pesca 3 carte invece di 2.</>,
        descriptionClass: "character-description"
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true,
        description: <>Può rimanere con 10 carte in mano.</>,
        descriptionClass: "character-description"
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true,
        description: <>Quando gioca una <i>Birra</i>, recupera 2 punti vita.</>,
        descriptionClass: "character-description"
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true,
        description: <>Per un intero giro, acquisisce l'abilità di un altro personaggio in gioco a sua scelta.</>,
        descriptionClass: "character-description"
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi usare una carta di fiori per sparare un <i>BANG!</i> extra.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Ogni volta che giochi una carta <i>BANG!</i>, "estrai!": se è Picche, il colpo non può essere evitato.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Ogni volta che un altro giocatore gioca una carta Mancato! su una carta <i>BANG!</i> giocata da <i>Colorado Bill</i>, "estrai!": se esce Picche la carta Mancato! non ha effetto e il giocatore attaccato perde 1 punto vita.</>,
        descriptionClass: "character-description text-smaller line-smaller"
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi usare una carta <i>BANG!</i> come <i>Gatling</i>.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Puoi rinunciare a pescare carte nella tua fase di pesca. Per ogni carta non pescata, spari un <i>BANG!</i> a distanza raggiungibile, a un diverso bersaglio.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Può pescare una carta in meno del normale per sparare un <i>BANG!</i> extra a distanza 1.</>,
        descriptionClass: "character-description"
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true,
        description: <>Chiunque peschi o scarti una tua carta (in gioco o in mano) è bersaglio di un <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim",
        hideTitle: true,
        description: <>Ogni volta che un altro giocatore gioca una <i>Birra</i>, puoi scartare una carta dalla mano per riguadagnare anche tu 1 punto vita.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Se sei bersaglio di una carta marrone (non <i>BANG!</i>), puoi usare una carta <i>Mancato!</i> per evitarne gli effetti.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Se è l'unico bersaglio di una carta, può usare un <i>Mancato!</i> per evitare l'effetto di quella carta.</>,
        descriptionClass: "character-description"
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true,
        description: <>Durante la tua fase di pesca, se non hai carte blu in gioco, pesca 2 carte extra.</>,
        descriptionClass: "character-description"
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Inizia con 5 carte. Non può giocare <i>Mancato!</i></>,
        descriptionClass: "character-description"
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true,
        description: <>Nel suo turno può scambiare una carta dalla mano con 2 carte a caso dalla mano di un altro giocatore.</>,
        descriptionClass: "character-description"
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true,
        description: <>Pesca tutte le carte in eccesso scartate dagli altri giocatori a fine turno.</>,
        descriptionClass: "character-description"
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true,
        description: <>All'inizio del suo turno può pescare 2 personaggi a caso. Ha tutte le abilità dei personaggi pescati.</>,
        descriptionClass: "character-description"
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true,
        description: <>Se ha meno di 6 carte in mano, quando un giocatore "estrae!", John aggiunge alla mano la carta appena estratta.</>,
        descriptionClass: "character-description"
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true,
        description: <>Nel suo turno, può scartare un <i>BANG!</i> per ripetere l'effetto di una carta a bordo marrone che ha appena giocato.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Ogni volta che sarebbe eliminato "estrai!": se non è Picche, <i>Teren</i> resta a 1 punto vita e pesca 1 carta.</>,
        descriptionClass: "character-description"
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true,
        description: <>Prima di pescare, i giocatori con più carte in mano di lui devono dargli una carta a scelta.</>,
        descriptionClass: "character-description"
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true,
        description: <>Se un altro giocatore gioca una carta a bordo blu o arancione, puoi pagare 2 📦 per pescare 1 carta dal mazzo.</>,
        descriptionClass: "character-description"
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi scartare 1 carta dalla mano per aggiungere 2 📦 su una tua carta.</>,
        descriptionClass: "character-description"
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true,
        description: <>Ogni volta che una tua carta <i>BANG!</i> è annullata, pesca 1 carta dal mazzo.</>,
        descriptionClass: "character-description"
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi prendere 1 📦 da qualunque carta e metterla qui.</>,
        descriptionClass: "character-description"
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true,
        description: <>Ogni volta che un giocatore ti fa perdere almeno 1 punto vita, "estrai!":<br/>♥♦=è bersaglio di un <i>BANG!</i><br/></>,
        descriptionClass: "character-description"
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi pagare 2 📦 per sparare 1 <i>BANG!</i> extra (non serve la carta).</>,
        descriptionClass: "character-description"
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true,
        description: <>Puoi ignorare gli effetti delle carte a bordo marrone di valore J, Q, K e A se sei l'unico bersaglio.</>,
        descriptionClass: "character-description"
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true,
        description: <>Inizi con 4 📦. Una volta nel tuo turno puoi spostare fino a 2 📦 da qui alle tue carte.</>,
        descriptionClass: "character-description"
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true,
        description: <>Alla fine del suo turno, "estrae!": se esce Cuori o Quadri, gioca un turno extra.</>,
        descriptionClass: "character-description"
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true,
        description: <>Pesca 2 pepite, ne scarta 1, e prende 1 pepita.</>,
        descriptionClass: "character-description"
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true,
        description: <>Nel suo turno può pagare 2 pepite per sparare 1 <i>BANG!</i> extra.</>,
        descriptionClass: "character-description"
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true,
        description: <>Può pescare il primo equipaggiamento del mazzetto pagando 2 pepite.</>,
        descriptionClass: "character-description"
    },
    MADAME_YTO: {
        name: "Madam Yto",
        hideTitle: true,
        description: <>Ogni volta che viene giocata una <i>Birra</i>, pesca 1 carta dal mazzo.</>,
        descriptionClass: "character-description"
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true,
        description: <>Una volte per turno può pagare un equipaggiamento a costo diminuito di 1.</>,
        descriptionClass: "character-description"
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true,
        description: <>Nel suo turno, può scartare 1 pepita per pescare 1 carta dal mazzo (fino a 2 volte).</>,
        descriptionClass: "character-description"
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true,
        description: <>Ogni volta che perde 1 punto vita, prende 1 pepita.</>,
        descriptionClass: "character-description"
    },

    // High Noon cards

    BLESSING: {
        name: "Benedizione",
        hideTitle: true,
        description: <>Tutte le carte sono considerate di Cuori.</>
    },
    GHOST_TOWN: {
        name: "Città Fantasma",
        hideTitle: true,
        description: <>Ogni giocatore eliminato torna, al proprio turno, come fantasma: pesca 3 carte invece di 2, e non può morire. Al termine del proprio turno è eliminato di nuovo.</>,
        descriptionClass: "card-description text-smallest"
    },
    INVERT_ROTATION: {
        name: "Corsa all'Oro",
        hideTitle: true,
        description: <>Si gioca un giro in senso antiorario, sempre a partire dallo Sceriffo. Gli effetti delle carte restano in senso orario.</>
    },
    THE_DALTONS: {
        name: "I Dalton",
        hideTitle: true,
        description: <>Quando <i>I Dalton</i> entrano in gioco, chi ha carte blu di fronte a sé ne scarta una a sua scelta.</>
    },
    THE_DOCTOR: {
        name: "Il Dottore",
        hideTitle: true,
        description: <>Quando <i>Il Dottore</i> entra in gioco, il/i personaggio/i in gioco che ha meno punti vita correnti recupera 1 punto vita.</>
    },
    THE_REVEREND: {
        name: "Il Reverendo",
        hideTitle: true,
        description: <>Non si possono giocare carte <i>Birra</i>.</>
    },
    TRAIN_ARRIVAL: {
        name: "Il Treno",
        hideTitle: true,
        description: <>Ogni giocatore pesca una carta extra al termine della fase 1 del proprio turno.</>
    },
    CURSE: {
        name: "Maledizione",
        hideTitle: true,
        description: <>Tutte le carte sono considerate di Picche.</>
    },
    HANGOVER: {
        name: "Sbornia",
        hideTitle: true,
        description: <>I presonaggio perdono le loro abilità speciali.</>
    },
    SERMON: {
        name: "Sermone",
        hideTitle: true,
        description: <>Il giocatore non può usare carte <i>BANG!</i> durante il proprio turno.</>
    },
    THIRST: {
        name: "Sete",
        hideTitle: true,
        description: <>Ogni giocatore pesca solo la prima carta, e non la seconda, nella fase 1 del proprio turno.</>
    },
    SHOOTOUT: {
        name: "Sparatoria",
        hideTitle: true,
        description: <>Il giocatore può giocare una seconda carta <i>BANG!</i> durante il proprio turno.</>
    },
    HANDCUFFS: {
        name: "Manette",
        hideTitle: true,
        description: <>Dopo aver pescato in fase 1, il giocatore di turno dichiara un seme: nel suo turno può giocare solo carte di quel seme.</>
    },
    HANDCUFFS_HEARTS: {
        name: "Manette: Dichiaro Cuori",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Manette: Dichiaro Quadri",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_CLUBS: {
        name: "Manette: Dichiaro Fiori",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_SPADES: {
        name: "Manette: Dichiaro Picche",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    NEW_IDENTITY: {
        name: "Nuova Identità",
        hideTitle: true,
        // EDIT: the original card said that you should change the character with the one used to display your hp, which is not the case any more.
        description: <>Ciascuno, all'inizio del proprio turno, prende un altro personaggio a caso: può sostituirlo per sempre al proprio, ripartendo da 2 punti vita.</>,
        descriptionClass: "card-description text-smallest"
    },
    HIGH_NOON: {
        name: "Mezzogiorno di Fuoco",
        hideTitle: true,
        description: <>Ogni giocatore perde 1 punto vita all'inizio del proprio turno.</>
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Agguato",
        hideTitle: true,
        description: <>La distanza fra due giocatori qualunque è 1; è modificata solo dalle carte in gioco.</>
    },
    SNIPER: {
        name: "Cecchino",
        hideTitle: true,
        description: <>Il giocatore di turno può scartare 2 carte <i>BANG!</i> insieme contro un giocatore: vale come un <i>BANG!</i>, ma è annullabile solo con 2 <i>Mancato!</i>.</>,
        descriptionClass: "card-description text-smallest"
    },
    DEAD_MAN: {
        name: "Dead Man",
        hideTitle: true,
        description: <>Al proprio turno, il giocatore che è stato eliminato per primo rientra in gioco con 2 punti vita e 2 carte.</>
    },
    BLOOD_BROTHERS: {
        name: "Fratelli di Sangue",
        hideTitle: true,
        description: <>All'inizio del proprio turno, il giocatore può perdere un punto vita (tranne l'ultimo) per fare recuperare un punto vita a un giocatore a sua scelta.</>,
        descriptionClass: "card-description text-smallest"
    },
    THE_JUDGE: {
        name: "Il Giudice",
        hideTitle: true,
        description: <>Non si possono giocare carte di fronte a sé o agli altri.</>
    },
    LASSO: {
        name: "Lazo",
        hideTitle: true,
        description: <>Le carte in gioco di fronte ai giocatori non hanno effetto.</>
    },
    LAW_OF_THE_WEST: {
        name: "Legge del West",
        hideTitle: true,
        description: <>Nella propria fase 1, il giocatore mostra la seconda carta che pesca: se può, è obbligato a giocarla nella fase 2.</>
    },
    HARD_LIQUOR: {
        name: "Liquore Forte",
        hideTitle: true,
        description: <>Il giocatore può saltare la propria fase 1 per recuperare 1 punto vita.</>
    },
    ABANDONED_MINE: {
        name: "Miniera Abbandonata",
        hideTitle: true,
        description: <>Nella propria fase 1, il giocatore pesca dagli scarti (se finiscono, pesca dal mazzo). Nella propria fase 3, scarta a faccia in giù sul mazzo.</>,
        descriptionClass: "card-description text-smallest"
    },
    PEYOTE: {
        name: "Peyote",
        hideTitle: true,
        description: <>Invece di pescare nella fase 1, il giocatore prova a indovinare se il seme della carta in cima al mazzo è rosso o nero. Poi pesca e mostra la carta: se ha indovinato, la tiene e può indovinare ancora, altrimentri passa alla fase 2.</>,
        descriptionClass: "card-description text-smallest line-smaller"
    },
    PEYOTE_RED: {
        name: "Peyote: Dichiaro Rosso",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    PEYOTE_BLACK: {
        name: "Peyote: Dichiaro Nero",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    RANCH: {
        name: "Ranch",
        hideTitle: true,
        description: <>Alla fine della propria fase 1, il giocatore per una volta può scartare un qualsiasi numero di carte dalla mano per pescarne altrettante dal mazzo.</>,
        descriptionClass: "card-description text-smallest"
    },
    RICOCHET: {
        name: "Rimbalzo",
        hideTitle: true,
        description: <>Il giocatore può scartare <i>BANG!</i> contro carte in gioco di fronte agli altri: ogni carta è scartata se il proprietario non gioca un <i>Mancato!</i> per ciascuna.</>,
        descriptionClass: "card-description text-smallest"
    },
    RUSSIAN_ROULETTE: {
        name: "Roulette Russa",
        hideTitle: true,
        description: <>Quando la <i>Roulette Russa</i> entra in gioco, a partire dallo Sceriffo ognuno scarta un <i>Mancato!</i>, a oltranza: il primo che non lo fa perde 2 punti vita, e la <i>Roulette</i> si interrompe.</>,
        descriptionClass: "card-description text-smallest line-smaller"
    },
    VENDETTA: {
        name: "Vendetta",
        hideTitle: true,
        description: <>Alla fine del proprio turno, il giocatore "estrae!": se è Cuori, gioca un altro turno (ma non "estrae!" di nuovo).</>
    },
    A_FISTFUL_OF_CARDS: {
        name: "Per un Pugno di Carte",
        hideTitle: true,
        description: <>All'inizio del proprio turno, il giocatore subisce tanti <i>BANG!</i> quante sono le carte che ha in mano.</>
    },

    // Wild West Show cards

    GAG: {
        name: "Bavaglio",
        hideTitle: true,
        description: <>I giocatori non possono parlare (ma possono gesticolare, mugugnare...). Chi parla perde 1 punto vita.</>
    },
    BONE_ORCHARD: {
        name: "Camposanto",
        hideTitle: true,
        description: <>All'inizio del proprio turno, ogni giocatore eliminato torna in gioco con 1 punto vita. Pesca il ruolo a caso fra quelli dei giocatori eliminati.</>
    },
    DARLING_VALENTINE: {
        name: "Darling Valentine",
        hideTitle: true,
        description: <>All'inizio del proprio turno, ogni giocatore scarta le carte in mano e ne pesca dal mazzo altrettante.</>
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage",
        hideTitle: true,
        description: <>Nel proprio turno, ogni giocatore può obbligarne un altro a giocare una carta.</>
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        hideTitle: true,
        description: <>Quando <i>Helena</i> entra in gioco, "estrai!": se esce Cuori o Quadri, rimescola i ruoli attivi tranne lo Sceriffo, e ridistribuiscili a caso.</>
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa del Texas",
        hideTitle: true,
        description: <>Nel proprio turno, ogni giocatore può scambiarsi di posto con quello alla sua destra, il quale salta il prossimo turno.</>
    },
    MISS_SUSANNA: {
        name: "Miss Susanna",
        hideTitle: true,
        description: <>Nel proprio turno ogni giocatore deve giocare almeno 3 carte. Se non lo fa, perde 1 punto vita.</>
    },
    SHOWDOWN: {
        name: "Regolamento di Conti",
        hideTitle: true,
        // EDIT: BANG! cards can *only* be played as Missed!
        description: <>Tutte le carte possono essere giocare come se fossero <i>BANG!</i>. Le carte <i>BANG!</i> solo come se fossero <i>Mancato!</i></>
    },
    SACAGAWAY: {
        name: "Sacagaway",
        hideTitle: true,
        description: <>Tutti i giocatori giocano a carte scoperte (tranne il ruolo!).</>
    },
    WILD_WEST_SHOW: {
        name: "Wild West Show",
        hideTitle: true,
        description: <>L'obiettivo di ogni giocatore diventa: "Rimani l'ultimo in gioco!"</>
    },

    // Gold Rush cards

    SHOT: {
        name: "Bicchierino",
        hideTitle: true,
        description: <>Un giocatore a scelta (anche tu) recupera 1 punto vita.</>
    },
    BOTTLE: {
        name: "Bottiglia",
        hideTitle: true,
        description: <>Può essere giocata come <i>Panico!</i>, <i>Birra</i> o <i>BANG!</i></>
    },
    BOTTLE_PANIC: {
        name: "Bottiglia come Panico!",
        hideTitle: true
    },
    BOTTLE_BEER: {
        name: "Bottiglia come Birra",
        hideTitle: true
    },
    BOTTLE_BANG: {
        name: "Bottiglia come Bang!",
        hideTitle: true
    },
    CALUMET: {
        name: "Calumet",
        hideTitle: true,
        description: <>Le carte di quadri giocate dagli altri non hanno effetto su di te.</>
    },
    GUN_BELT: {
        name: "Cinturone",
        hideTitle: true,
        description: <>Alla fine del tuo turno puoi tenere in mano fino a 8 carte.</>
    },
    PARDNER: {
        name: "Complice",
        hideTitle: true,
        description: <>Può essere giocato come <i>Emporio</i>, <i>Duello</i> o <i>Cat Balou.</i></>
    },
    PARDNER_GENERAL_STORE: {
        name: "Complice come Emporio",
        hideTitle: true,
        description: <>Rivela carte quanti i giocatori. Ognuno ne pesca una.</>
    },
    PARDNER_DUEL: {
        name: "Complice come Duello",
        hideTitle: true,
        description: <>Un giocatore scarta un <i>BANG!</i>, poi tu, ecc. Il primo che non lo fa perde 1 punto vita.</>
    },
    PARDNER_CAT_BALOU: {
        name: "Complice come Cat Balou",
        hideTitle: true
    },
    GOLD_RUSH: {
        name: "Corsa all'Oro",
        hideTitle: true,
        description: <>Il tuo turno termina. Recupera tutti i tuoi punti vita, poi gioca un altro turno.</>
    },
    HORSESHOE: {
        name: "Ferro di Cavallo",
        hideTitle: true,
        description: <>Ogni volta che "estrai!", scopri una carta in più e scegli il risultato.</>
    },
    PICKAXE: {
        name: "Piccone",
        hideTitle: true,
        description: <>Pesca una carta in più nella tua fase 1.</>
    },
    WANTED: {
        name: "Ricercato",
        hideTitle: true,
        description: <>Giocala su chi vuoi. Chi elimina quel giocatore pesca 2 carte e prende 1 pepita.</>
    },
    RHUM: {
        name: "Rum",
        hideTitle: true,
        description: <>"Estrai!" 4 carte: guadagni 1 punto vita per ogni seme diverso.</>
    },
    GOLD_PAN: {
        name: "Setaccio",
        hideTitle: true,
        description: <>Paga 1 pepita per pescare una carta dal mazzo. Usa questa abilità fino a 2 volte per turno.</>
    },
    BOOTS: {
        name: "Stivali",
        hideTitle: true,
        description: <>Ogni volta che perdi 1 punto vita, pesca una carta dal mazzo.</>
    },
    LUCKY_CHARM: {
        name: "Talismano",
        hideTitle: true,
        description: <>Ogni volta che perdi 1 punto vita, prendi una pepita.</>
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        hideTitle: true,
        description: <>Pesca 4 carte dal mazzo.</>
    },
    RUCKSACK: {
        name: "Zaino",
        hideTitle: true,
        description: <>Paga 2 pepite per recuperare 1 punto vita.</>
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Cactus",
        hideTitle: true
    },
    DRAGOON: {
        name: "Dragoon",
        hideTitle: true,
        description: <>Puoi giocare un <i>BANG!</i> extra a turno.</>
    },
    EVADED: {
        name: "Per Un Pelo!",
        hideTitle: true,
        description: <>Pesca la carta che hai <i>Mancato!</i></>,
        descriptionClass: "card-description-lower"
    },
    FULL_STEAM: {
        name: "A Tutto Vapore",
        hideTitle: true,
        description: <>Manda il treno al capolinea.<br/>Raddoppia o annulla l'effetto della locomotiva.</>
    },
    FULL_STEAM_NO_EFFECT: {
        name: "A Tutto Vapore: Ignora effetti locomotiva",
        hideTitle: true
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "A Tutto Vapore: Raddoppia effetti locomotiva",
        hideTitle: true
    },
    KNIFE_REVOLVER: {
        name: "Knife Revolver",
        hideTitle: true,
        description: <>Conta come il <i>BANG!</i> del turno.<br/>"Estrai!": J, Q, K, A = riprendi questa carta in mano.</>
    },
    MAP: {
        name: "Mappa",
        hideTitle: true,
        description: <>Al tuo turno, prima di pescare, guarda le prime 2 carte del mazzo: puoi scartarne 1.</>
    },
    MONEY_BAG: {
        name: "Sacco Di Soldi",
        hideTitle: true,
        description: <>Se la carta in cima agli scarti è a bordo marrone, copiane l'effetto.</>
    },
    MOST_WANTED: {
        name: "Most Wanted",
        hideTitle: true,
        description: <>Ogni giocatore "estrae!":<br/>♠=perde 1 punto vita.</>
    },
    NEXT_STOP: {
        name: "Prossima Fermata",
        hideTitle: true,
        description: <>Fai avanzare il treno di 1 stazione.</>,
        descriptionClass: "card-description-lower"
    },
    REFUND: {
        name: "Rimborso",
        hideTitle: true,
        description: <>Quando un altro giocatore pesca o scarta una tua carta, tranne questa, pesca una carta.</>
    },
    STRONGBOX: {
        name: "Cassaforte",
        hideTitle: true,
        description: <>Alla fine del tuo turno, pesca una carta.</>
    },
    SWITCH: {
        name: "Scambio",
        hideTitle: true,
        description: <>Scambia una tua carta in gioco con un'altra carta in gioco.</>
    },
    TRAIN_ROBBERY: {
        name: "Rapina Al Treno",
        hideTitle: true,
        description: <>Conta come il <i>BANG!</i> del turno.<br/>Il bersaglio sceglie per ogni sua carta in gioco: la scarta o è colpito da un <i>BANG!</i></>,
        descriptionClass: "card-description text-smaller"
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Rapina Al Treno: Scarta una carta",
        hideTitle: true
    },
    TRAIN_ROBBERY_BANG: {
        name: "Rapina Al Treno: Ricevi un Bang",
        hideTitle: true
    },
    WATER_TOWER: {
        name: "Serbatoio",
        hideTitle: true,
        description: <>Prendi gratis un vagone a scelta dal treno.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        hideTitle: true,
        description: <>Nel tuo turno, puoi prendere un qualunque numero di vagoni.</>,
        descriptionClass: "character-description"
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true,
        description: <>Se sei bersaglio di una carta <i>BANG!</i>, puoi deviarla a un giocatore a distanza 1 scartando dalla mano una carta dello stesso seme.</>,
        descriptionClass: "character-description"
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true,
        description: <>Alla fine del tuo turno, pesca una carta.</>,
        descriptionClass: "character-description"
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true,
        description: <>Ogni volta che il treno arriva al capolinea, pesca 2 carte.</>,
        descriptionClass: "character-description"
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi prendere gratis un vagone a scelta dal treno.</>,
        descriptionClass: "character-description"
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true,
        // EDIT: dvGiochi made a typo here
        description: <>Quando giochi una carta o un effetto che bersaglia più giocatori, puoi escluderne uno.</>,
        descriptionClass: "character-description"
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true,
        description: <>Ogni volta che il treno avanza fuori dal tuo turno, puoi scartare una carta dalla mano per pescarne un'altra.</>,
        descriptionClass: "character-description"
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true,
        description: <>Una volta nel tuo turno, puoi far avanzare il treno di 1 stazione.</>,
        descriptionClass: "character-description"
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true,
        description: <>Può provare a indovinare il colore o il seme di ogni carta pescata in fase 1: pesca + 1 carta per ogni "colore" indovinato (+ 2 per ogni "seme").</>,
        descriptionClass: "character-description"
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Dichiaro Rosso",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Dichiaro Cuori",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Dichiaro Quadri",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Dichiaro Nero",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Dichiaro Fiori",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Dichiaro Picche",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Può incrementare i suoi punti vita fino a un massimo di 6.</>,
        descriptionClass: "character-description"
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true,
        description: <>Ogni volta che viene attaccato da un giocatore, può scartare una carta dalla mano per evitare il colpo. Carta giocata + carta schivata: se ≥ 13 = <i>Mancato!</i>; se ≥ 17 = <i>Schivata</i>; se ≥ 20 = <i>Ritorno di Fiamma.</i></>,
        descriptionClass: "character-description text-smaller"
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true,
        description: <>Prima di pescare, il giocatore con più carte in mano deve dargliene una a sua scelta.</>,
        descriptionClass: "character-description"
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true,
        description: <>Una volta nel suo turno può scartare una carta a bordo blu dalla mano per pescare 2 carte.</>,
        descriptionClass: "character-description"
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true,
        description: <>Una volta nel suo turno, può scartare una carta dalla mano per pescarne un'altra dal mazzo. Se è Quadri, può pescare ancora.</>,
        descriptionClass: "character-description"
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true,
        description: <>Per un intero giro, può beneficiare dell'effetto di una qualsiasi carta a bordo blu in gioco di fronte ad un altro giocatore.</>,
        descriptionClass: "character-description"
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true,
        description: <>Ogni volta che una carta è "estratta!", può scartare una carta dalla mano per pescare la carta estratta.</>,
        descriptionClass: "character-description"
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        hideTitle: true,
        description: <>Per ogni punto vita in meno, la distanza a cui gli altri giocatori lo vedono è aumentata di 1.</>,
        descriptionClass: "character-description"
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true,
        description: <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome vengono scartate.</>,
        descriptionClass: "character-description"
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true,
        description: <>Ogni volta che ferisce un giocatore con un <i>BANG!</i>, pesca una carta dal mazzo.</>,
        descriptionClass: "character-description"
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true,
        description: <>Una volta nel suo turno, può scartare una carta <i>BANG!</i> per ripetere l'effetto dell'ultima carta a bordo marrone da lui giocata.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Ogni volta che sarebbe eliminato, "estrae!": se non è Picche, resta a 1 punto vita e pesca 1 carta.</>,
        descriptionClass: "character-description"
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true,
        description: <>Le carte che possono avere effetto su più giocatori non hanno effetto su di lui.</>,
        descriptionClass: "character-description"
    },

    // The Great Train Robbery railcar cards

    BAGGAGE_CAR: {
        name: "Baggage Car",
        hideTitle: true,
        description: <>Scartalo: ottieni l'effetto di un <i>Mancato!</i>, <i>Panico!</i>, <i>Cat Balou</i> o di un <i>BANG!</i> extra.</>,
        descriptionClass: "train-description",
    },
    BAGGAGE_CAR_MISSED: {
        name: "Baggage Car come Mancato!",
        hideTitle: true
    },
    BAGGAGE_CAR_PANIC: {
        name: "Baggage Car come Panico!",
        hideTitle: true
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Baggage Car come Cat Balou",
        hideTitle: true
    },
    BAGGAGE_CAR_BANG: {
        name: "Baggage Car come Bang!",
        hideTitle: true
    },
    CABOOSE: {
        name: "Caboose",
        hideTitle: true,
        description: <>Puoi scartare un'altra tua carta a bordo blu (incluso un vagone) come se fosse un <i>Mancato!</i></>,
        descriptionClass: "train-description",
    },
    CATTLE_TRUCK: {
        name: "Cattle Truck",
        hideTitle: true,
        description: <>Scartalo: guarda le 3 carte in cima agli scarti e pescane 1.</>,
        descriptionClass: "train-description",
    },
    CIRCUS_WAGON: {
        name: "Circus Wagon",
        hideTitle: true,
        description: <>Scartalo: ogni altro giocatore deve scartare una carta che ha in gioco.</>,
        descriptionClass: "train-description",
    },
    COAL_HOPPER: {
        name: "Coal Hopper",
        hideTitle: true,
        description: <>Scartalo: pesca una carta e scarta un vagone in gioco davanti a un giocatore a tua scelta.</>,
        descriptionClass: "train-description",
    },
    DINING_CAR: {
        name: "Dining Car",
        hideTitle: true,
        description: <>A inizio turno, "estrai!":<br/>se è Cuori, recuperi 1 punto vita.</>,
        descriptionClass: "train-description",
    },
    EXPRESS_CAR: {
        name: "Express Car",
        hideTitle: true,
        description: <>Scartalo: il tuo turno termina. Scarta tutte le carte in mano, poi gioca un altro turno.</>,
        descriptionClass: "train-description",
    },
    GHOST_CAR: {
        name: "Ghost Car",
        hideTitle: true,
        description: <>Giocalo su chiunque tranne lo Sceriffo.<br/>Se vieni eliminato, invece resti in gioco, ma non puoi guadagnare né perdere punti vita.</>,
        descriptionClass: "train-description",
    },
    LOUNGE_CAR: {
        name: "Lounge Car",
        hideTitle: true,
        description: <>Scartalo: pesca 2 vagoni dal mazzo, mettine 1 in gioco di fronte a te e 1 di fronte a un altro giocatore.</>,
        descriptionClass: "train-description",
    },
    LUMBER_FLATCAR: {
        name: "Lumber Flatcar",
        hideTitle: true,
        description: <>Giocalo su chiunque.<br/>Vedi tutti gli altri a distanza +1.</>,
        descriptionClass: "train-description",
    },
    MAIL_CAR: {
        name: "Mail Car",
        hideTitle: true,
        description: <>Scartalo: pesca 3 carte e dai 1 di esse a un altro giocatore a tua scelta.</>,
        descriptionClass: "train-description",
    },
    OBSERVATION_CAR: {
        name: "Observation Car",
        hideTitle: true,
        description: <>Tu vedi gli altri a distanza -1.<br/>Gli altri ti vedono a distanza +1.</>,
        descriptionClass: "train-description",
    },
    PASSENGER_CAR: {
        name: "Passenger Car",
        hideTitle: true,
        description: <>Scartalo: pesca una carta (in mano o in gioco) da un altro giocatore.</>,
        descriptionClass: "train-description",
    },
    PRISONER_CAR: {
        name: "Prisoner Car",
        hideTitle: true,
        description: <>Le carte Duello e Indiani! giocate dagli altri giocatori non hanno effetto su di te.</>,
        descriptionClass: "train-description",
    },
    PRIVATE_CAR: {
        name: "Private Car",
        hideTitle: true,
        description: <>Se non hai carte in mano, non puoi essere bersaglio di carte <i>BANG!</i></>,
        descriptionClass: "train-description",
    },
    SLEEPER_CAR: {
        name: "Sleeper Car",
        hideTitle: true,
        description: <>Una volta per turno, poi scartare un'altra tua carta a bordo blu (incluso un vagone) come un <i>BANG!</i> extra.</>,
        descriptionClass: "train-description",
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        hideTitle: true,
        description: <>Al capolinea ogni gioctore è bersaglio di un <i>BANG!</i></>,
        descriptionClass: "locomotive-description",
    },
    LELAND: {
        name: "Leland",
        hideTitle: true,
        description: <>Al capolinea ha l'effetto di un <i>Emporio</i></>,
        descriptionClass: "locomotive-description",
    },

    // The Great Train Robbery station cards

    BOOM_TOWN: {
        name: "Boom Town",
        hideTitle: true
    },
    CATICO: {
        name: "Catico",
        hideTitle: true
    },
    CREEPY_CREEK: {
        name: "Creepy Creek",
        hideTitle: true
    },
    CROWNS_HOLE: {
        name: "Crown's Hole",
        hideTitle: true
    },
    DEATHWOOD: {
        name: "Deathwood",
        hideTitle: true
    },
    DODGEVILLE: {
        name: "Dodgeville",
        hideTitle: true
    },
    FORT_WROTH: {
        name: "Fort Wroth",
        hideTitle: true
    },
    FRISCO: {
        name: "Frisco",
        hideTitle: true
    },
    MINERS_OATH: {
        name: "Miner's Oath",
        hideTitle: true
    },
    SAN_TAFE: {
        name: "San Tafe",
        hideTitle: true
    },
    TOMBROCK: {
        name: "Tombrock",
        hideTitle: true
    },
    VIRGINIA_TOWN: {
        name: "Virginia Town",
        hideTitle: true
    },
    YOOMA: {
        name: "Yooma",
        hideTitle: true
    },

    // Legends characters

    LEGEND_BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Se vieni ferito, peschi 2 carte.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Puoi scoprire carte finché la loro somma non supera 21, poi pescale.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Ogni tua carta vale come <i>BANG!</i> o <i>Mancato!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Se vieni ferito da un giocatore, peschi una carta dalla sua mano e la carta che ti ha ferito.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Guarda le carte in mano a un giocatore, pescane una ,poi pescane un'altra dal mazzo.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Se sei bersaglio di una carta marrone, puoi "estrarre!":<br/>J, Q, K, A = ignora la carta.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Peschi 3 carte. Puoi darne 1 di esse a un altro giocatore.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Se una carta fa "estrarre!", scopri tu 2 carte e scegli quella da usare. Se è il tuo turno, pescala.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Gli altri ti vedono a distanza +1.<br/>Per giocarti un <i>BANG!</i> contro, occorre scartare una carta aggiuntiva dalla mano.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Peschi 2 carte più quella in cima agli scarti.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Puoi vedere tutti a distanza 1.<br/>Una volta nel tuo turno, puoi scartare una tua carta blu, in mano o in gioco, come <i>Panico!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Puoi scartare 2 carte per recuperare un punto vita. Una volta nel tuo turno, se recuperi un punto vita, puoi sparare un <i>BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>I tuoi <i>BANG!</i> non possono essere annullati.<br/>Se rivendichi un'Impresa puoi rimuovere anche l'ultimo punto vita.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Se rimani con meno di 2 carte in mano, peschi fino a tornare a 2.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Se un personaggio è eliminato, prendi in mano tutte le sue carte. Se vieni eliminato, resti in gioco con 4 punti vita, ma torni sul lato normale.</>,
        descriptionClass: "legends-description text-smaller line-smaller",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Puoi giocare quante carte <i>BANG!</i> vuoi.<br/>Invece di rivendicare un'Impresa, puoi sparare un <i>BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },

    // Legends feats cards

    FIFTY_GUNS: {
        name: "Cinquanta Pistole",
        hideTitle: true,
        description: <>Prendi o scarta un'arma.</>,
        descriptionClass: "feats-description",
    },
    WOUNDED_PRIDE: {
        name: "Ferito Nell'Orgoglio",
        hideTitle: true,
        description: <>Un altro giocatore manca una tua carta <i>BANG!</i></>,
        descriptionClass: "feats-description",
    },
    OLD_WEST_GANG: {
        name: "Gang Del Vecchio West",
        hideTitle: true,
        description: <>Ferisci 2 o più giocatori nello stesso turno.</>,
        descriptionClass: "feats-description",
    },
    BOTTLENECK: {
        name: "Il Collo Di Bottiglia",
        hideTitle: true,
        description: <>Scarta una <i>Birra</i>.</>,
        descriptionClass: "feats-description",
    },
    THE_CHUCK_A_LUCK: {
        name: "Il Mulino D'Oro",
        hideTitle: true,
        description: <>Scarta una carta <i>BANG!</i></>,
        descriptionClass: "feats-description",
    },
    "3_15_TO_YOOMA": {
        name: "Il Treno Per Yooma",
        hideTitle: true,
        description: <>Attiva o fai attivare un "estrarre!" (anche a inizio turno).</>,
        descriptionClass: "feats-description",
    },
    GOOD_COMPANY: {
        name: "In Buona Compagnia",
        hideTitle: true,
        description: <>Scarta una carta, poi gioca una carta con lo stesso nome (o viceversa).</>,
        descriptionClass: "feats-description",
    },
    THE_LAST_HERO: {
        name: "L'Ultimo Eroe",
        hideTitle: true,
        description: <>Scarta una carta blu in gioco.</>,
        descriptionClass: "feats-description",
    },
    THE_MAN_WITH_NO_NAME: {
        name: "L'Uomo Senza Nome",
        hideTitle: true,
        description: <>Perdi un punto vita (non l'ultimo).</>,
        descriptionClass: "feats-description",
    },
    WILHELM_SCREAM: {
        name: "L'Urlo Di Wilhelm",
        hideTitle: true,
        description: <>Gioca una carta <i>BANG!</i> a distanza 2 o più.</>,
        descriptionClass: "feats-description",
    },
    SCRUGS_BALLAD: {
        name: "La Ballata Di Scrugs",
        hideTitle: true,
        description: <>Perdi un <i>Duello</i>.</>,
        descriptionClass: "feats-description",
    },
    BORDERLANDS: {
        name: "La Frontiera",
        hideTitle: true,
        description: <>Scarta la tua mano (anche se è di zero carte).</>,
        descriptionClass: "feats-description",
    },
    THE_OREGON_TRAIL: {
        name: "La Pista Dell'Oregon",
        hideTitle: true,
        description: <>Durante la fase di pesca, rinuncia alla prima carta che dovresti pescare.</>,
        descriptionClass: "feats-description",
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Mille Modi Per Morire",
        hideTitle: true,
        description: <>Mostra dalla mano un <i>Mancato!</i> e una carta dello stesso seme.</>,
        descriptionClass: "feats-description",
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "Per Qualche Carta In Più",
        hideTitle: true,
        description: <>Scarta almeno una carta in eccesso a fine turno.</>,
        descriptionClass: "feats-description",
    },
    A_QUICK_DEATH: {
        name: "Una Morte Veloce",
        hideTitle: true,
        description: <>Ferisci con una carta <i>BANG!</i> un altro giocatore al massimo dei suoi punti vita.</>,
        descriptionClass: "feats-description",
    },

    // Button row virtual cards

    ESCAPE_JAIL: {
        name: "Fuggi di Prigione"
    },
    BECOME_LEGEND: {
        name: "Diventa una Leggenda"
    },
    CLAIM_FEAT: {
        name: "Rivendica un'Impresa"
    },
    GAME_PASS: {
        name: "Termina il turno"
    },
    GAME_CONFIRM: {
        name: "Conferma"
    },
    GAME_DISMISS: {
        name: "Continua"
    },
    GAME_SELL_BEER: {
        name: "Vendi birra"
    },
    GAME_DISCARD_BLACK: {
        name: "Scarta equip"
    },
    GAME_DISCARD_BRONCO: {
        name: "Scarta Bronco"
    },

    // Player roles

    ROLE_UNKNOWN: {
        name: "(Ruolo sconosciuto)",
        hideTitle: true
    },
    ROLE_SHERIFF: {
        name: "Sceriffo",
        hideTitle: true,
        description: <>Elimina tutti i fuorilegge e il Rinnegato!</>,
    },
    ROLE_DEPUTY: {
        name: "Vice",
        hideTitle: true,
        description: <>Proteggi lo Sceriffo! Elimina tutti i fuorilegge e il Rinnegato!</>
    },
    ROLE_OUTLAW: {
        name: "Fuorilegge",
        hideTitle: true,
        description: <>Elimina lo Sceriffo!</>
    },
    ROLE_RENEGADE: {
        name: "Rinnegato",
        hideTitle: true,
        description: <>Rimani l'ultimo personaggio in gioco!</>
    },
    ROLE_DEPUTY_3P: {
        name: "Vice",
        hideTitle: true,
        description: <>Elimina il Rinnegato!</>
    },
    ROLE_OUTLAW_3P: {
        name: "Fuorilegge",
        hideTitle: true,
        description: <>Elimina il Vice!</>
    },
    ROLE_RENEGADE_3P: {
        name: "Rinnegato",
        hideTitle: true,
        description: <>Elimina il Fuorilegge!</>
    },
    ROLE_SHADOW_DEPUTY: {
        name: "Vice Ombra",
        hideTitle: true,
        description: <>Proteggi lo Sceriffo! Elimina tutti i Fuorilegge!</>
    },
    ROLE_SHADOW_OUTLAW: {
        name: "Fuorilegge Ombra",
        hideTitle: true,
        description: <>Elimina lo Sceriffo!</>
    },

};