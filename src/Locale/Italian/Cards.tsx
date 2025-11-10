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
        "description": <>Aggiungi 3 <div className="cube"/> sulle tue carte e/o sul tuo personaggio.</>
    },
    RUST: {
        "name": "Ruggine",
        "description": <>Gli altri spostano 1 <div className="cube"/> dal personaggio e da ogni carta Dangerous sul tuo personaggio.</>
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
        "description": <>Gioca su chiunque. All'inizio del tuo turno, "estrai!":<br/>♥♦=Passa la Bomba a chi vuoi.<br/>♣♠=scarta 2 <div className="cube"/>: se finiscono, perdi 2 punti vita.</>
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
    },
    BLACK_JACK: {
        "name": "Black Jack",
    },
    CALAMITY_JANET: {
        "name": "Calamity Janet",
    },
    EL_GRINGO: {
        "name": "El Gringo",
    },
    JESSE_JONES: {
        "name": "Jesse Jones",
    },
    JOURDONNAIS: {
        "name": "Jourdonnais",
    },
    KIT_CARLSON: {
        "name": "Kit Carlson",
    },
    LUCKY_DUKE: {
        "name": "Lucky Duke",
    },
    PAUL_REGRET: {
        "name": "Paul Regret",
    },
    PEDRO_RAMIREZ: {
        "name": "Pedro Ramirez",
    },
    ROSE_DOOLAN: {
        "name": "Rose Doolan",
    },
    SID_KETCHUM: {
        "name": "Sid Ketchum",
    },
    SLAB_THE_KILLER: {
        "name": "Slab the Killer",
    },
    SUZY_LAFAYETTE: {
        "name": "Suzy Lafayette",
    },
    VULTURE_SAM: {
        "name": "Vulture Sam",
    },
    WILLY_THE_KID: {
        "name": "Willy the Kid",
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        "name": "Claus \"The Saint\"",
    },
    JOHNNY_KISCH: {
        "name": "Johnny Kisch",
    },
    UNCLE_WILL: {
        "name": "Uncle Will",
    },
    ANNIE_VERSARY: {
        "name": "Annie Versary",
    },
    EMILIANO: {
        "name": "Emiliano",
    },

    // Dodge City characters

    APACHE_KID: {
        "name": "Apache Kid",
    },
    BELLE_STAR: {
        "name": "Belle Star",
    },
    BILL_NOFACE: {
        "name": "Bill Noface",
    },
    CHUCK_WENGAM: {
        "name": "Chuck Wengam",
    },
    DOC_HOLYDAY: {
        "name": "Doc Holyday",
    },
    ELENA_FUENTE: {
        "name": "Elena Fuente",
    },
    GREG_DIGGER: {
        "name": "Greg Digger",
    },
    HERB_HUNTER: {
        "name": "Herb Hunter",
    },
    JOSE_DELGADO: {
        "name": Math.random() < 0.95 ? "Josè Delgado" : "Josè Degrado",
    },
    MOLLY_STARK: {
        "name": "Molly Stark",
    },
    PAT_BRENNAN: {
        "name": "Pat Brennan",
    },
    PIXIE_PETE: {
        "name": "Pixie Pete",
    },
    SEAN_MALLORY: {
        "name": "Sean Mallory",
    },
    TEQUILA_JOE: {
        "name": "Tequila Joe",
    },
    VERA_CUSTER: {
        "name": "Vera Custer",
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        "name": "Black Flower",
    },
    COLORADO_BILL: {
        "name": "Colorado Bill",
    },
    DER_SPOT_BURST_RINGER: {
        "name": "Der Spot - Burst Ringer",
    },
    EVELYN_SHEBANG: {
        "name": "Evelyn Shebang",
    },
    HENRY_BLOCK: {
        "name": "Henry Block",
    },
    LEMONADE_JIM: {
        "name": "Lemonade Jim",
    },
    MICK_DEFENDER: {
        "name": "Mick Defender",
    },
    TUCO_FRANZISKANER: {
        "name": "Tuco Franziskaner",
    },

    // Wild West Show characters

    BIG_SPENCER: {
        "name": "Big Spencer",
    },
    FLINT_WESTWOOD: {
        "name": "Flint Westwood",
    },
    GARY_LOOTER: {
        "name": "Gary Looter",
    },
    GREYGORY_DECK: {
        "name": "Greygory Deck",
    },
    JOHN_PAIN: {
        "name": "John Pain",
    },
    LEE_VAN_KLIFF: {
        "name": "Lee Van Kliff",
    },
    TEREN_KILL: {
        "name": "Teren Kill",
    },
    YOUL_GRINNER: {
        "name": "Youl Grinner",
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        "name": "Al Preacher",
    },
    BASS_GREEVES: {
        "name": "Bass Greeves",
    },
    BLOODY_MARY: {
        "name": "Bloody Mary",
    },
    FRANKIE_CANTON: {
        "name": "Frankie Canton",
    },
    JULIE_CUTTER: {
        "name": "Julie Cutter",
    },
    MEXICALI_KID: {
        "name": "Mexicali Kid",
    },
    MS_ABIGAIL: {
        "name": "Ms. Abigail",
    },
    RED_RINGO: {
        "name": "Red Ringo",
    },

    // Gold Rush characters

    DON_BELL: {
        "name": "Don Bell",
    },
    DUTCH_WILL: {
        "name": "Dutch Will",
    },
    JACKY_MURIETA: {
        "name": "Jacky Murieta",
    },
    JOSH_MCCLOUD: {
        "name": "Josh McCloud",
    },
    MADAME_YTO: {
        "name": "Madame Yto",
    },
    PRETTY_LUZENA: {
        "name": "Pretty Luzena",
    },
    RADDIE_SNAKE: {
        "name": "Raddie Snake",
    },
    SIMEON_PICOS: {
        "name": "Simeon Picos",
    },

    // High Noon cards

    BLESSING: {
        "name": "Benedizione",
    },
    GHOST_TOWN: {
        "name": "Città Fantasma",
    },
    INVERT_ROTATION: {
        "name": "Corsa all'Oro",
    },
    THE_DALTONS: {
        "name": "I Dalton",
    },
    THE_DOCTOR: {
        "name": "Il Dottore",
    },
    THE_REVEREND: {
        "name": "Il Reverendo",
    },
    TRAIN_ARRIVAL: {
        "name": "Il Treno",
    },
    CURSE: {
        "name": "Maledizione",
    },
    HANGOVER: {
        "name": "Sbornia",
    },
    SERMON: {
        "name": "Sermone",
    },
    THIRST: {
        "name": "Sete",
    },
    SHOOTOUT: {
        "name": "Sparatoria",
    },
    HANDCUFFS: {
        "name": "Manette",
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
    },
    HIGH_NOON: {
        "name": "Mezzogiorno di Fuoco",
    },

    // Fistful of Cards cards

    AMBUSH: {
        "name": "Agguato",
    },
    SNIPER: {
        "name": "Cecchino",
    },
    DEAD_MAN: {
        "name": "Dead Man",
    },
    BLOOD_BROTHERS: {
        "name": "Fratelli di Sangue",
    },
    THE_JUDGE: {
        "name": "Il Giudice",
    },
    LASSO: {
        "name": "Lazo",
    },
    LAW_OF_THE_WEST: {
        "name": "Legge del West",
    },
    HARD_LIQUOR: {
        "name": "Liquore Forte",
    },
    ABANDONED_MINE: {
        "name": "Miniera Abbandonata",
    },
    PEYOTE: {
        "name": "Peyote",
    },
    PEYOTE_RED: {
        "name": "Peyote: Dichiaro Rosso",
    },
    PEYOTE_BLACK: {
        "name": "Peyote: Dichiaro Nero",
    },
    RANCH: {
        "name": "Ranch",
    },
    RICOCHET: {
        "name": "Rimbalzo",
    },
    RUSSIAN_ROULETTE: {
        "name": "Roulette Russa",
    },
    VENDETTA: {
        "name": "Vendetta",
    },
    A_FISTFUL_OF_CARDS: {
        "name": "Per un Pugno di Carte",
    },

    // Wild West Show cards

    GAG: {
        "name": "Bavaglio",
    },
    BONE_ORCHARD: {
        "name": "Camposanto",
    },
    DARLING_VALENTINE: {
        "name": "Darling Valentine",
    },
    DOROTHY_RAGE: {
        "name": "Dorothy Rage",
    },
    HELENA_ZONTERO: {
        "name": "Helena Zontero",
    },
    LADY_ROSA_OF_TEXAS: {
        "name": "Lady Rosa del Texas",
    },
    MISS_SUSANNA: {
        "name": "Miss Susanna",
    },
    SHOWDOWN: {
        "name": "Regolamento di Conti",
    },
    SACAGAWAY: {
        "name": "Sacagaway",
    },
    WILD_WEST_SHOW: {
        "name": "Wild West Show",
    },

    // Gold Rush cards

    SHOT: {
        "name": "Bicchierino",
    },
    BOTTLE: {
        "name": "Bottiglia",
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
    },
    GUN_BELT: {
        "name": "Cinturone",
    },
    PARDNER: {
        "name": "Complice",
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
        "name": "Corsa all' Oro",
    },
    HORSESHOE: {
        "name": "Ferro di Cavallo",
    },
    PICKAXE: {
        "name": "Piccone",
    },
    WANTED: {
        "name": "Ricercato",
    },
    RHUM: {
        "name": "Rum",
    },
    GOLD_PAN: {
        "name": "Setaccio",
    },
    BOOTS: {
        "name": "Stivali",
    },
    LUCKY_CHARM: {
        "name": "Talismano",
    },
    UNION_PACIFIC: {
        "name": "Union Pacific",
    },
    RUCKSACK: {
        "name": "Zaino",
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
    },
    EVAN_BABBIT: {
        "name": "Evan Babbit",
    },
    JIMMY_TEXAS: {
        "name": "Jimmy Texas",
    },
    MANUELITA: {
        "name": "Manuelita",
    },
    SANCHO: {
        "name": "Sancho",
    },
    SGT_BLAZE: {
        "name": "Sgt. Blaze",
    },
    SHADE_OCONNOR: {
        "name": "Shade O'Connor",
    },
    ZIPPY_ROY: {
        "name": "Zippy Roy",
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        "name": "Annie Oakey",
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
    PAT_BARRETT: {
        "name": "Pat Barrett",
    },
    BIG_SPENCER_2: {
        "name": "Big Spencer",
    },
    BUFFALO_BELL: {
        "name": "Buffalo Bell",
    },
    CLASH_THE_STAMPEDE: {
        "name": "Clash The Stampede",
    },
    CRAZY_HOG: {
        "name": "Crazy Hog",
    },
    EVA_PLACE: {
        "name": "Eva Place",
    },
    JOSEY_BASSETT: {
        "name": "Josey Bassett",
    },
    LAURA_BILLION: {
        "name": "Laura Billion",
    },
    SID_CURRY: {
        "name": "Sid Curry",
    },
    SPIKE_SPIEZEL: {
        "name": "Spike Spiezel",
    },
    TEREN_KILL_2: {
        "name": "Teren Kill",
    },
    WYATT_EARL: {
        "name": "Wyatt Earl",
    },

    // The Great Train Robbery railcar cards

    BAGGAGE_CAR: {
        "name": "Baggage Car",
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
    },
    CATTLE_TRUCK: {
        "name": "Cattle Truck",
    },
    CIRCUS_WAGON: {
        "name": "Circus Wagon",
    },
    COAL_HOPPER: {
        "name": "Coal Hopper",
    },
    DINING_CAR: {
        "name": "Dining Car",
    },
    EXPRESS_CAR: {
        "name": "Express Car",
    },
    GHOST_CAR: {
        "name": "Ghost Car",
    },
    LOUNGE_CAR: {
        "name": "Lounge Car",
    },
    LUMBER_FLATCAR: {
        "name": "Lumber Flatcar",
    },
    MAIL_CAR: {
        "name": "Mail Car",
    },
    OBSERVATION_CAR: {
        "name": "Observation Car",
    },
    PASSENGER_CAR: {
        "name": "Passenger Car",
    },
    PRISONER_CAR: {
        "name": "Prisoner Car",
    },
    PRIVATE_CAR: {
        "name": "Private Car",
    },
    SLEEPER_CAR: {
        "name": "Sleeper Car",
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        "name": "Ironhorse",
    },
    LELAND: {
        "name": "Leland",
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