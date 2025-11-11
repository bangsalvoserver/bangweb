import { CardRegistry } from "../Registry";

export const CARDS_ITALIAN: CardRegistry = {
    
    // Base game cards

    BARREL: {
        name: "Barile"
    },
    DYNAMITE: {
        name: "Dinamite",
        description: <>Perdi 3 punti vita. Se no passa la <i>Dinamite</i> a sinistra.</>,
        descriptionClass: "draw-description",
    },
    SCOPE: {
        name: "Mirino",
        description: <>Tu vedi gli altri a distanza -1.</>
    },
    MUSTANG: {
        name: "Mustang",
        description: <>Gli altri ti vedono a distanza +1.</>
    },
    JAIL: {
        name: "Prigione",
        description: <>Scarta la <i>Prigione</i> e gioca. Altrimenti scarta la <i>Prigione</i> e salta il turno.</>,
        descriptionClass: "draw-description",
    },
    REMINGTON: {
        name: "Remington"
    },
    REV_CARABINE: {
        name: "Rev. Carabine"
    },
    SCHOFIELD: {
        name: "Schofield"
    },
    VOLCANIC: {
        name: "Volcanic",
        description: <>Puoi giocare quanti <i>BANG!</i> vuoi.</>,
        descriptionClass: "weapon-description",
    },
    WINCHESTER: {
        name: "Winchester"
    },
    BANG: {
        name: "Bang!"
    },
    BEER: {
        name: "Birra"
    },
    CAT_BALOU: {
        name: "Cat Balou"
    },
    STAGECOACH: {
        name: "Diligenza"
    },
    DUEL: {
        name: "Duello",
        description: <>Un giocatore scarta un <i>BANG!</i>, poi tu, ecc. Il primo che non lo fa perde 1 punto vita.</>
    },
    GENERAL_STORE: {
        name: "Emporio",
        description: <>Rivela carte quanti i giocatori. Ognuno ne pesca una.</>
    },
    GATLING: {
        name: "Gatling"
    },
    INDIANS: {
        name: "Indiani!",
        description: <>Tutti gli altri scartano un <i>BANG!</i> o perdono 1 punto vita.</>
    },
    MISSED: {
        name: "Mancato!"
    },
    PANIC: {
        name: "Panico!"
    },
    SALOON: {
        name: "Saloon"
    },
    WELLS_FARGO: {
        name: "Wells Fargo",  
    },

    // Dodge City cards

    BINOCULAR: {
        name: "Binocolo",
        description: <>Tu vedi gli altri a distanza -1.</>
    },
    HIDEOUT: {
        name: "Riparo",
        description: <>Gli altri ti vedono a distanza +1.</>
    },
    PUNCH: {
        name: "Pugno"
    },
    RAG_TIME: {
        name: "Rag Time"
    },
    BRAWL: {
        name: "Rissa"
    },
    DODGE: {
        name: "Schivata"
    },
    SPRINGFIELD: {
        name: "Springfield"
    },
    TEQUILA: {
        name: "Tequila"
    },
    WHISKY: {
        name: "Whisky"
    },
    BIBLE: {
        name: "Bibbia"
    },
    CANTEEN: {
        name: "Borraccia"
    },
    CAN_CAN: {
        name: "Can Can"
    },
    TEN_GALLON_HAT: {
        name: "Cappello"
    },
    CONESTOGA: {
        name: "Conestoga"
    },
    DERRINGER: {
        name: "Derringer"
    },
    BUFFALO_RIFLE: {
        name: "Fucile da Caccia"
    },
    HOWITZER: {
        name: "Howitzer"
    },
    PEPPERBOX: {
        name: "Pepperbox"
    },
    IRON_PLATE: {
        name: "Placca di Ferro"
    },
    PONY_EXPRESS: {
        name: "Pony Express"
    },
    KNIFE: {
        name: "Pugnale"
    },
    SOMBRERO: {
        name: "Sombrero"
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Fantasma",
        description: <>Gioca su un giocatore eliminato. Quel giocatore torna in gioco, ma non può guadagnare né perdere punti vita.</>
    },
    GHOST_2: {
        name: "Fantasma",
        description: <>Giocala su un giocatore eliminato. Quel giocatore è di nuovo in gioco senza l'abilità del suo personaggio, non può guadagnare né perdere punti vita e gioca normalmente finché ha questa carta in gioco.</>
    },
    LEMAT: {
        name: "Lemat",
        description: <>Nel tuo turno, puoi usare ogni carta in mano come carta <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    LEMAT_2: {
        name: "Lemat",
        description: <>Nel tuo turno, puoi usare una qualunque carta (tranne il Mancato!) come una carta <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    RATTLESNAKE: {
        name: "Serpente a Sonagli",
        description: <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche, perde 1 punto vita.</>
    },
    SHOTGUN: {
        name: "Shotgun",
        description: <>Ogni volta che colpisci un giocatore, deve scartare una carta a scelta dalla mano.</>,
        descriptionClass: "weapon-description",
    },
    BOUNTY: {
        name: "Taglia",
        description: <>Gioca su chiunque. Se quel giocatore è colpito da una carta <i>BANG!</i>, chi ha sparato pesca una carta dal mazzo.</>
    },
    BANDIDOS: {
        name: "Bandidos",
        description: <>Ogni giocatore sceglie se scartare 2 carte dalla mano (o 1 se ne ha solo 1) o perdere 1 punto vita.</>
    },
    BANDIDOS_2: {
        name: "Bandidos",
        description: <>Tutti gli altri giocatori scartano una carta <i>BANG!</i> oppure 2 carte dalla loro mano a scelta.</>
    },
    ESCAPE: {
        name: "Fuga",
        description: <>Può essere giocata fuori turno. Evita l'effetto di una carta marrone (non <i>BANG!</i>) di cui sei uno dei bersagli.</>
    },
    ESCAPE_2: {
        name: "Fuga",
        description: <>Se sei l'unico bersaglio di una carta diversa da un <i>BANG!</i>, evita l'effetto di quella carta.</>
    },
    AIM: {
        name: "Mira",
        description: <>Gioca questa carta assieme a una carta <i>BANG!</i>. Se il bersaglio viene colpito, perde 2 punti vita.</>
    },
    POKER: {
        name: "Poker",
        description: <>Tutti gli altri scartano una carta dalla mano, allo stesso tempo. Se non c'è alcun Asso, pesca fino a 2 di quelle carte.</>
    },
    BACKFIRE: {
        name: "Ritorno di Fiamma",
        description: <>Vale una carta <i>Mancato!</i><br/>Il giocatore che ha sparato è bersaglio di un <i>BANG!</i>.</>
    },
    SAVED: {
        name: "Salvo!",
        description: <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore. Se sopravvive, pesca 2 carte dalla sua mano o dal mazzo (scegli).</>
    },
    SAVED_2: {
        name: "Salvo!",
        description: <>Giocala solo fuori dal tuo turno<br/>Impedisce a un giocatore di perdere 1 punto vita. Se salvi un giocatore dall'eliminazione, pesca 2 carte dalla mano di quel giocatore.</>,
    },
    FANNING: {
        name: "Sventagliata",
        description: <>Conta come l'unico <i>BANG!</i> del turno. Anche un giocatore a tua scelta a distanza 1 dal bersaglio (se c'è, te escluso) è bersaglio di un <i>BANG!</i>.</>
    },
    TOMAHAWK: {
        name: "Tomahawk"
    },
    TORNADO: {
        name: "Tornado",
        description: <>Tutti scartano una carta dalla mano (se possibile), poi pescano 2 carte dal mazzo.</>
    },
    TORNADO_2: {
        name: "Tornado",
        description: <>Ogni giocatore deve dare 2 carte dalla mano al giocatore alla propria sinistra.</>
    },
    LAST_CALL: {
        name: "Ultimo Giro"
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Carovana"
    },
    A_LITTLE_NIP: {
        name: "Cicchetto"
    },
    QUICK_SHOT: {
        name: "Colpo Rapido",
        description: <>Colpisci un ulteriore giocatore.</>,
        descriptionClass: "cube-description",
    },
    FLINTLOCK: {
        name: "Flintlock",
        description: <>Se annullato, riprendi questa carta.</>,
        descriptionClass: "cube-description",
    },
    ARROW: {
        name: "Freccia",
        description: <><p>Un giocatore bersaglio scarta una carta <i>BANG!</i> dalla mano o perde 1 punto vita.</p><p>Colpisci un ulteriore giocatore.</p></>,
        descriptionClass: "cube-description-double",
    },
    DUCK: {
        name: "Giù la Testa!",
        description: <>Riprendi questa carta.</>,
        descriptionClass: "cube-description",
    },
    RELOAD: {
        name: "Ricarica",
        description: <>Aggiungi 3 📦 sulle tue carte e/o sul tuo personaggio.</>
    },
    RUST: {
        name: "Ruggine",
        description: <>Gli altri spostano 1 📦 dal personaggio e da ogni carta Dangerous sul tuo personaggio.</>
    },
    SQUAW: {
        name: "Squaw",
        description: <><p>Scarta una carta in gioco.</p><p>Aggiungi la carta scartata alla tua mano.</p></>,
        descriptionClass: "cube-description-double",
    },
    ACE_UP_THE_SLEEVE: {
        name: "Asso nella Manica"
    },
    BANDOLIER: {
        name: "Bandoliera",
        description: <>Una volta nel tuo turno, puoi giocare una carta <i>BANG!</i> extra.</>,
        descriptionClass: "cube-description",
    },
    BIG_FIFTY: {
        name: "Big Fifty",
        description: <>Annulla le carte in gioco e l'abilità del personaggio del bersaglio.</>,
        descriptionClass: "cube-description",
    },
    BOMB: {
        name: "Bomba",
        description: <>Gioca su chiunque. All'inizio del tuo turno, "estrai!":<br/>♥♦=Passa la <i>Bomba</i> a chi vuoi.<br/>♣♠=scarta 2 📦: se finiscono, perdi 2 punti vita.</>
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        description: <>Se il <i>BANG!</i> viene annullato il bersaglio deve scartare una carta a scelta dalla mano.</>,
        descriptionClass: "cube-description",
    },
    BELL_TOWER: {
        name: "Campanile",
        description: <>Vedi tutti a distanza 1 per la prossima carta che giochi.</>,
        descriptionClass: "cube-description",
    },
    CRATE: {
        name: "Cassa"
    },
    TUMBLEWEED: {
        name: "Cespuglio",
        description: <>Ripeti o fai ripetere un "estrarre!".</>,
        descriptionClass: "cube-description",
    },
    DOUBLE_BARREL: {
        name: "Doppia Canna",
        description: <>Se giochi un <i>BANG!</i> di Quadri non può essere annullato.</>,
        descriptionClass: "cube-description",
    },
    WHIP: {
        name: "Frusta",
        description: <>Scarta una carta in gioco.</>,
        descriptionClass: "cube-description",
    },
    BEER_KEG: {
        name: Math.random() < 0.95 ? "Fusto di Birra" : "Busto di Firra"
    },
    LOCKPICK: {
        name: "Grimaldello",
        description: <>Pesca 1 carta dalla mano di un giocatore.</>,
        descriptionClass: "cube-description",
    },
    THUNDERER: {
        name: "Thunderer",
        description: <>Riprendi la carta <i>BANG!</i> giocata.</>,
        descriptionClass: "cube-description",
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Tombarolo",
        description: <>Metti sul tavolo tante carte dalla cima degli scarti quanti sono i giocatori. Ognuno ne sceglie una.</>
    },
    CARD_SHARPER: {
        name: "Baro",
        description: <>Scambia una carta a bordo blu in gioco di fronte a te con un'altra dello stesso colore in gioco di fronte ad un altro giocatore.</>
    },
    MIRAGE: {
        name: "Miraggio",
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre il giocatore che ha sparato termina immediatamente il proprio turno.</>
    },
    BLOOD_PACT: {
        name: "Patto di Sangue"
    },
    SACRIFICE: {
        name: "Sacrificio",
        description: <>Può essere giocata fuori turno. Previeni la perdita di 1 punto vita di un altro giocatore subendola tu stesso. Se possibile, poi, pesca 2 carte dal mazzo (3, se si previene un colpo fatale).</>
    },
    DISARM: {
        name: "Disarmare",
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre fai scartare una carta dalla mano al giocatore che ha sparato.</>
    },
    MOLOTOV: {
        name: "Molotov"
    },
    BULLDOG: {
        name: "Bulldog",
        description: <>Una sola volta per turno, puoi giocare una carta <i>BANG!</i> come <i>Gatling</i> scartando un'altra carta con essa.</>,
        descriptionClass: "weapon-description",
    },
    LAST_WILL: {
        name: "Ultime Volontà",
        description: <>Gioca su chiunque. Se il giocatore viene eliminato, può dare fino a 3 carte (dalla mano o in gioco) a un giocatore ancora in gioco.</>
    },
    INDIAN_GUIDE: {
        name: "Guida Indiana",
        description: <>Gioca su te stesso. Gli <i>Indiani!</i> e il <i>Sentiero di Guerra</i> non hanno effetto su di te.</>
    },
    TAXMAN: {
        name: "Esattore",
        description: <>Gioca su chiunque. All'inizio del turno, quel giocatore "estrae!": se è Picche o Fiori, pesca una carta in meno in fase 1.</>
    },
    BROTHEL: {
        name: "Bordello",
        description: <>Scarta e gioca, ma perdi la tua abilità fino all'inizio del tuo prossimo turno. Altrimenti scarta e gioca normalmente.</>,
        descriptionClass: "draw-description",
    },
    BRONCO: {
        name: "Bronco",
        description: <>Gli altri ti vedono a distanza +1. Non può essere in gioco insieme a <i>Mustang</i>. Può essere rimosso anche scartando 2 carte dalla mano.</>
    },
    PACK_MULE: {
        name: "Mulo",
        description: <>Puoi tenere in mano una carta in più rispetto ai tuoi punti vita correnti. Non può essere in gioco insieme a <i>Mustang</i> o <i>Bronco</i>.</>
    },
    WAR_PATH: {
        name: "Sentiero di Guerra",
        description: <>Tutti gli altri giocatori scartano una carta <i>BANG!</i> o perdono 1 punto vita.</>
    },
    ARSON: {
        name: "Incendio"
    },
    FLYING_BULLET: {
        name: "Proiettile Vagante",
        description: <>Vale una carta <i>Mancato!</i><br/>Inoltre un giocatore a tua scelta a distanza 1 da te (se c'è) è bersaglio del <i>BANG!</i>.</>
    },
    ON_THE_HOUSE: {
        name: "Offre La Casa"
    },
    GUITAR: {
        name: "Chitarra",
        description: <>Gioca su chiunque. Finché è in gioco, quel giocatore non può giocare carte <i>BANG!</i> (o carte che dipendono dalla gittata dell'arma).</>
    },
    SCRAPPER: {
        name: "Attaccabrighe"
    },
    SHYLOCK: {
        name: "Strozzino"
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy",
        description: <>Ogni volta che viene ferito, pesca una carta.</>
    },
    BLACK_JACK: {
        name: "Black Jack",
        description: <>Mostra la seconda carta che pesca. Se è Cuori o Quadri, pesca una carta in più.</>
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        description: <>Può giocare le carte <i>BANG!</i> come carte <i>Mancato!</i>, e viceversa.</>
    },
    EL_GRINGO: {
        name: "El Gringo",
        description: <>Ogni volta che viene ferito da un giocatore, pesca una carta dalla mano di quel giocatore.</>
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        description: <>Può pescare la prima carta dalla mano di un giocatore.</>
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        description: <>Ogni volta che è bersaglio di un <i>BANG!</i>, può "estrarre!": se esce Cuori, viene mancato.</>
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        description: <>Guarda le prime tre carte del mazzo e sceglie le due da pescare.</>
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        description: <>Ogni volta che deve "estrarre!", scopre 2 carte e sceglie.</>
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        description: <>Tutti i giocatori lo vedono a distanza aumentata di 1.</>
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        description: <>Può pescare la prima carta dalla cima degli scarti.</>
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        description: <>Vede tutti i giocatori a distanza diminuita di 1.</>
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        description: <>Può scartare 2 carte per recuperare un punto vita.</>
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        description: <>Per evitare i suoi <i>BANG!</i> occorrono due carte <i>Mancato!</i>.</>
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        description: <>Appena rimane senza carte in mano, pesca una carta.</>
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        description: <>Quando un personaggio è eliminato, prende in mano tutte le carte di quel personaggio.</>
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        description: <>Può giocare un numero qualsiasi di carte <i>BANG!</i></>
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\"",
        description: <>Pesca tante carte quanti sono i giocatori più una. Ne tiene due per sé, poi ne dà una ad ognuno.</>
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        description: <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome sono scartate.</>
    },
    UNCLE_WILL: {
        name: "Uncle Will",
        description: <>Una volta per turno, può giocare una carta qualsiasi dalla mano come un <i>Emporio</i>.</>
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        description: <>Può giocare una carta qualunque come fosse una carta <i>BANG!</i></>
    },
    EMILIANO: {
        name: "Emiliano",
        description: <>Quando un tuo <i>BANG!</i> viene <i>Mancato!</i>, pesca quel <i>Mancato!</i>; quandi manchi un <i>BANG!</i>, pesca quel <i>BANG!</i></>
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        description: <>Le carte di Quadri giocate dagli avversari non hanno effeto su di lui.</>
    },
    BELLE_STAR: {
        name: "Belle Star",
        description: <>Nel suo turno, le carte in gioco degli altri giocatori non hanno effetto.</>
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        description: <>Pesca 1 carta, più 1 carta per ogni ferita che ha.</>
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        description: <>Nel suo turno può perdere 1 punto vita per pescare 2 carte.</>
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        description: <>Nel suo turno può scartare una sola volta due carte per sparare un <i>BANG!</i>.</>
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        description: <>Può usare una carta qualsiasi come <i>Mancato!</i>.</>
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        description: <>Quando un personaggio è eliminato, recupera 2 punti vita.</>
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        description: <>Quando un peronaggio è eliminato, pesca 2 carte extra.</>
    },
    JOSE_DELGADO: {
        name: Math.random() < 0.95 ? "Josè Delgado" : "Josè Degrado",
        description: <>Due volte nel suo turno può scartare una carta blu dalla mano per pescare 2 carte.</>
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        description: <>Quando usa una carta dalla mano fuori turno, pesca un'altra carta.</>
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        description: <>Invece di pescare, può prendere una carta in gioco di fronte a un giocatore.</>
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        description: <>Pesca 3 carte invece di 2.</>
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        description: <>Può rimanere con 10 carte in mano.</>
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        description: <>Quando gioca una <i>Birra</i>, recupera 2 punti vita.</>
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        description: <>Per un intero giro, acquisisce l'abilità di un altro personaggio in gioco a sua scelta.</>
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        description: <>Una volta nel tuo turno, puoi usare una carta di fiori per sparare un <i>BANG!</i> extra.</>
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        description: <>Ogni volta che giochi una carta <i>BANG!</i>, "estrai!": se è Picche, il colpo non può essere evitato.</>
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        description: <>Ogni volta che un altro giocatore gioca una carta Mancato! su una carta <i>BANG!</i> giocata da <i>Colorado Bill</i>, "estrai!": se esce Picche la carta Mancato! non ha effetto e il giocatore attaccato perde 1 punto vita.</>
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        description: <>Una volta nel tuo turno, puoi usare una carta <i>BANG!</i> come <i>Gatling</i>.</>
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        description: <>Puoi rinunciare a pescare carte nella tua fase di pesca. Per ogni carta non pescata, spari un <i>BANG!</i> a distanza raggiungibile, a un diverso bersaglio.</>
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        description: <>Può pescare una carta in meno del normale per sparare un <i>BANG!</i> extra a distanza 1.</>
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        description: <>Chiunque peschi o scarti una tua carta (in gioco o in mano) è bersaglio di un <i>BANG!</i>.</>
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim",
        description: <>Ogni volta che un altro giocatore gioca una <i>Birra</i>, puoi scartare una carta dalla mano per riguadagnare anche tu 1 punto vita.</>
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        description: <>Se sei bersaglio di una carta marrone (non <i>BANG!</i>), puoi usare una carta <i>Mancato!</i> per evitarne gli effetti.</>
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        description: <>Se è l'unico bersaglio di una carta, può usare un <i>Mancato!</i> per evitare l'effetto di quella carta.</>
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        description: <>Durante la tua fase di pesca, se non hai carte blu in gioco, pesca 2 carte extra.</>
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        description: <>Inizia con 5 carte. Non può giocare <i>Mancato!</i></>
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        description: <>Nel suo turno può scambiare una carta dalla mano con 2 carte a caso dalla mano di un altro giocatore.</>
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        description: <>Pesca tutte le carte in eccesso scartate dagli altri giocatori a fine turno.</>
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        description: <>All'inizio del suo turno può pescare 2 personaggi a caso. Ha tutte le abilità dei personaggi pescati.</>
    },
    JOHN_PAIN: {
        name: "John Pain",
        description: <>Se ha meno di 6 carte in mano, quando un giocatore "estrae!", John aggiunge alla mano la carta appena estratta.</>
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        description: <>Nel suo turno, può scartare un <i>BANG!</i> per ripetere l'effetto di una carta a bordo marrone che ha appena giocato.</>
    },
    TEREN_KILL: {
        name: "Teren Kill",
        description: <>Ogni volta che sarebbe eliminato "estrai!": se non è Picche, <i>Teren</i> resta a 1 punto vita e pesca 1 carta.</>
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        description: <>Prima di pescare, i giocatori con più carte in mano di lui devono dargli una carta a scelta.</>
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher",
        description: <>Se un altro giocatore gioca una carta a bordo blu o arancione, puoi pagare 2 📦 per pescare 1 carta dal mazzo.</>
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        description: <>Una volta nel tuo turno, puoi scartare 1 carta dalla mano per aggiungere 2 📦 su una tua carta.</>
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        description: <>Ogni volta che una tua carta <i>BANG!</i> è annullata, pesca 1 carta dal mazzo.</>
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        description: <>Una volta nel tuo turno, puoi prendere 1 📦 da qualunque carta e metterla qui.</>
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        description: <>Ogni volta che un giocatore ti fa perdere almeno 1 punto vita, "estrai!":<br/>♥♦=è bersaglio di un <i>BANG!</i><br/></>
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        description: <>Una volta nel tuo turno, puoi pagare 2 📦 per sparare 1 <i>BANG!</i> extra (non serve la carta).</>
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        description: <>Puoi ignorare gli effetti delle carte a bordo marrone di valore J, Q, K e A se sei l'unico bersaglio.</>
    },
    RED_RINGO: {
        name: "Red Ringo",
        description: <>Inizi con 4 📦. Una volta nel tuo turno puoi spostare fino a 2 📦 da qui alle tue carte.</>
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        description: <>Alla fine del suo turno, "estrae!": se esce Cuori o Quadri, gioca un turno extra.</>
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        description: <>Pesca 2 pepite, ne scarta 1, e prende 1 pepita.</>
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        description: <>Nel suo turno può pagare 2 pepite per sparare 1 <i>BANG!</i> extra.</>
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        description: <>Può pescare il primo equipaggiamento del mazzetto pagando 2 pepite.</>
    },
    MADAME_YTO: {
        name: "Madame Yto",
        description: <>Ogni volta che viene giocata una <i>Birra</i>, pesca 1 carta dal mazzo.</>
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        description: <>Una volte per turno può pagare un equipaggiamento a costo diminuito di 1.</>
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        description: <>Nel suo turno, può scartare 1 pepita per pescare 1 carta dal mazzo (fino a 2 volte).</>
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        description: <>Ogni volta che perde 1 punto vita, prende 1 pepita.</>
    },

    // High Noon cards

    BLESSING: {
        name: "Benedizione",
        description: <>Tutte le carte sono considerate di Cuori.</>
    },
    GHOST_TOWN: {
        name: "Città Fantasma",
        description: <>Ogni giocatore eliminato torna, al proprio turno, come fantasma: pesca 3 carte invece di 2, e non può morire. Al termine del proprio turno è eliminato di nuovo.</>
    },
    INVERT_ROTATION: {
        name: "Corsa all'Oro",
        description: <>Si gioca un giro in senso antiorario, sempre a partire dallo Sceriffo. Gli effetti delle carte restano in senso orario.</>
    },
    THE_DALTONS: {
        name: "I Dalton",
        description: <>Quando <i>I Dalton</i> entrano in gioco, chi ha carte blu di fronte a sé ne scarta una a sua scelta.</>
    },
    THE_DOCTOR: {
        name: "Il Dottore",
        description: <>Quando <i>Il Dottore</i> entra in gioco, il/i personaggio/i in gioco che ha meno punti vita correnti recupera 1 punto vita.</>
    },
    THE_REVEREND: {
        name: "Il Reverendo",
        description: <>Non si possono giocare carte <i>Birra</i>.</>
    },
    TRAIN_ARRIVAL: {
        name: "Il Treno",
        description: <>Ogni giocatore pesca una carta extra al termine della fase 1 del proprio turno.</>
    },
    CURSE: {
        name: "Maledizione",
        description: <>Tutte le carte sono considerate di Picche.</>
    },
    HANGOVER: {
        name: "Sbornia",
        description: <>I presonaggio perdono le loro abilità speciali.</>
    },
    SERMON: {
        name: "Sermone",
        description: <>Il giocatore non può usare carte <i>BANG!</i> durante il proprio turno.</>
    },
    THIRST: {
        name: "Sete",
        description: <>Ogni giocatore pesca solo la prima carta, e non la seconda, nella fase 1 del proprio turno.</>
    },
    SHOOTOUT: {
        name: "Sparatoria",
        description: <>Il giocatore può giocare una seconda carta <i>BANG!</i> durante il proprio turno.</>
    },
    HANDCUFFS: {
        name: "Manette",
        description: <>Dopo aver pescato in fase 1, il giocatore di turno dichiara un seme: nel suo turno può giocare solo carte di quel seme.</>
    },
    HANDCUFFS_HEARTS: {
        name: "Manette: Dichiaro Cuori"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Manette: Dichiaro Quadri"
    },
    HANDCUFFS_CLUBS: {
        name: "Manette: Dichiaro Fiori"
    },
    HANDCUFFS_SPADES: {
        name: "Manette: Dichiaro Picche"
    },
    NEW_IDENTITY: {
        name: "Nuova Identità",
        // EDIT: the original card said that you should change the character with the one used to display your hp, which is not the case any more.
        description: <>Ciascuno, all'inizio del proprio turno, prende un altro personaggio a caso: può sostituirlo per sempre al proprio, ripartendo da 2 punti vita.</>
    },
    HIGH_NOON: {
        name: "Mezzogiorno di Fuoco",
        description: <>Ogni giocatore perde 1 punto vita all'inizio del proprio turno.</>
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Agguato",
        description: <>La distanza fra due giocatori qualunque è 1; è modificata solo dalle carte in gioco.</>
    },
    SNIPER: {
        name: "Cecchino",
        description: <>Il giocatore di turno può scartare 2 carte <i>BANG!</i> insieme contro un giocatore: vale come un <i>BANG!</i>, ma è annullabile solo con 2 <i>Mancato!</i>.</>
    },
    DEAD_MAN: {
        name: "Dead Man",
        description: <>Al proprio turno, il giocatore che è stato eliminato per primo rientra in gioco con 2 punti vita e 2 carte.</>
    },
    BLOOD_BROTHERS: {
        name: "Fratelli di Sangue",
        description: <>All'inizio del proprio turno, il giocatore può perdere un punto vita (tranne l'ultimo) per fare recuperare un punto vita a un giocatore a sua scelta.</>
    },
    THE_JUDGE: {
        name: "Il Giudice",
        description: <>Non si possono giocare carte di fronte a sé o agli altri.</>
    },
    LASSO: {
        name: "Lazo",
        description: <>Le carte in gioco di fronte ai giocatori non hanno effetto.</>
    },
    LAW_OF_THE_WEST: {
        name: "Legge del West",
        description: <>Nella propria fase 1, il giocatore mostra la seconda carta che pesca: se può, è obbligato a giocarla nella fase 2.</>
    },
    HARD_LIQUOR: {
        name: "Liquore Forte",
        description: <>Il giocatore può saltare la propria fase 1 per recuperare 1 punto vita.</>
    },
    ABANDONED_MINE: {
        name: "Miniera Abbandonata",
        description: <>Nella propria fase 1, il giocatore pesca dagli scarti (se finiscono, pesca dal mazzo). Nella propria fase 3, scarta a faccia in giù sul mazzo.</>
    },
    PEYOTE: {
        name: "Peyote",
        description: <>Invece di pescare nella fase 1, il giocatore prova a indovinare se il seme della carta in cima al mazzo è rosso o nero. Poi pesca e mostra la carta: se ha indovinato, la tiene e può indovinare ancora, altrimentri passa alla fase 2.</>
    },
    PEYOTE_RED: {
        name: "Peyote: Dichiaro Rosso"
    },
    PEYOTE_BLACK: {
        name: "Peyote: Dichiaro Nero"
    },
    RANCH: {
        name: "Ranch",
        description: <>Alla fine della propria fase 1, il giocatore per una volta può scartare un qualsiasi numero di carte dalla mano per pescarne altrettante dal mazzo.</>
    },
    RICOCHET: {
        name: "Rimbalzo",
        description: <>Il giocatore può scartare <i>BANG!</i> contro carte in gioco di fronte agli altri: ogni carta è scartata se il proprietario non gioca un <i>Mancato!</i> per ciascuna.</>
    },
    RUSSIAN_ROULETTE: {
        name: "Roulette Russa",
        description: <>Quando la <i>Roulette Russa</i> entra in gioco, a partire dallo Sceriffo ognuno scarta un <i>Mancato!</i>, a oltranza: il primo che non lo fa perde 2 punti vita, e la <i>Roulette</i> si interrompe.</>
    },
    VENDETTA: {
        name: "Vendetta",
        description: <>Alla fine del proprio turno, il giocatore "estrae!": se è Cuori, gioca un altro turno (ma non "estrae!" di nuovo).</>
    },
    A_FISTFUL_OF_CARDS: {
        name: "Per un Pugno di Carte",
        description: <>All'inizio del proprio turno, il giocatore subisce tanti <i>BANG!</i> quante sono le carte che ha in mano.</>
    },

    // Wild West Show cards

    GAG: {
        name: "Bavaglio",
        description: <>I giocatori non possono parlare (ma possono gesticolare, mugugnare...). Chi parla perde 1 punto vita.</>
    },
    BONE_ORCHARD: {
        name: "Camposanto",
        description: <>All'inizio del proprio turno, ogni giocatore eliminato torna in gioco con 1 punto vita. Pesca il ruolo a caso fra quelli dei giocatori eliminati.</>
    },
    DARLING_VALENTINE: {
        name: "Darling Valentine",
        description: <>All'inizio del proprio turno, ogni giocatore scarta le carte in mano e ne pesca dal mazzo altrettante.</>
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage",
        description: <>Nel proprio turno, ogni giocatore può obbligarne un altro a giocare una carta.</>
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        description: <>Quando <i>Helena</i> entra in gioco, "estrai!": se esce Cuori o Quadri, rimescola i ruoli attivi tranne lo Sceriffo, e ridistribuiscili a caso.</>
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa del Texas",
        description: <>Nel proprio turno, ogni giocatore può scambiarsi di posto con quello alla sua destra, il quale salta il prossimo turno.</>
    },
    MISS_SUSANNA: {
        name: "Miss Susanna",
        description: <>Nel proprio turno ogni giocatore deve giocare almeno 3 carte. Se non lo fa, perde 1 punto vita.</>
    },
    SHOWDOWN: {
        name: "Regolamento di Conti",
        // EDIT: BANG! cards can *only* be played as Missed!
        description: <>Tutte le carte possono essere giocare come se fossero <i>BANG!</i>. Le carte <i>BANG!</i> solo come se fossero <i>Mancato!</i></>
    },
    SACAGAWAY: {
        name: "Sacagaway",
        description: <>Tutti i giocatori giocano a carte scoperte (tranne il ruolo!).</>
    },
    WILD_WEST_SHOW: {
        name: "Wild West Show",
        description: <>L'obiettivo di ogni giocatore diventa: "Rimani l'ultimo in gioco!"</>
    },

    // Gold Rush cards

    SHOT: {
        name: "Bicchierino",
        description: <>Un giocatore a scelta (anche tu) recupera 1 punto vita.</>
    },
    BOTTLE: {
        name: "Bottiglia",
        description: <>Può essere giocata come <i>Panico!</i>, <i>Birra</i> o <i>BANG!</i></>
    },
    BOTTLE_PANIC: {
        name: "Bottiglia come Panico!"
    },
    BOTTLE_BEER: {
        name: "Bottiglia come Birra"
    },
    BOTTLE_BANG: {
        name: "Bottiglia come Bang!"
    },
    CALUMET: {
        name: "Calumet",
        description: <>Le carte di quadri giocate dagli altri non hanno effetto su di te.</>
    },
    GUN_BELT: {
        name: "Cinturone",
        description: <>Alla fine del tuo turno puoi tenere in mano fino a 8 carte.</>
    },
    PARDNER: {
        name: "Complice",
        description: <>Può essere giocato come <i>Emporio</i>, <i>Duello</i> o <i>Cat Balou.</i></>
    },
    PARDNER_GENERAL_STORE: {
        name: "Complice come Emporio"
    },
    PARDNER_DUEL: {
        name: "Complice come Duello"
    },
    PARDNER_CAT_BALOU: {
        name: "Complice come Cat Balou"
    },
    GOLD_RUSH: {
        name: "Corsa all'Oro",
        description: <>Il tuo turno termina. Recupera tutti i tuoi punti vita, poi gioca un altro turno.</>
    },
    HORSESHOE: {
        name: "Ferro di Cavallo",
        description: <>Ogni volta che "estrai!", scopri una carta in più e scegli il risultato.</>
    },
    PICKAXE: {
        name: "Piccone",
        description: <>Pesca una carta in più nella tua fase 1.</>
    },
    WANTED: {
        name: "Ricercato",
        description: <>Giocala su chi vuoi. Chi elimina quel giocatore pesca 2 carte e prende 1 pepita.</>
    },
    RHUM: {
        name: "Rum",
        description: <>"Estrai!" 4 carte: guadagni 1 punto vita per ogni seme diverso.</>
    },
    GOLD_PAN: {
        name: "Setaccio",
        description: <>Paga 1 pepita per pescare una carta dal mazzo. Usa questa abilità fino a 2 volte per turno.</>
    },
    BOOTS: {
        name: "Stivali",
        description: <>Ogni volta che perdi 1 punto vita, pesca una carta dal mazzo.</>
    },
    LUCKY_CHARM: {
        name: "Talismano",
        description: <>Ogni volta che perdi 1 punto vita, prendi una pepita.</>
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        description: <>Pesca 4 carte dal mazzo.</>
    },
    RUCKSACK: {
        name: "Zaino",
        description: <>Paga 2 pepite per recuperare 1 punto vita.</>
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Cactus"
    },
    DRAGOON: {
        name: "Dragoon",
        description: <>Puoi giocare un <i>BANG!</i> extra a turno.</>
    },
    EVADED: {
        name: "Per Un Pelo!",
        description: <>Pesca la carta che hai <i>Mancato!</i></>
    },
    FULL_STEAM: {
        name: "A Tutto Vapore",
        description: <>Manda il treno al capolinea.<br/>Raddoppia o annulla l'effetto della locomotiva.</>
    },
    FULL_STEAM_NO_EFFECT: {
        name: "A Tutto Vapore: Ignora effetti locomotiva"
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "A Tutto Vapore: Raddoppia effetti locomotiva"
    },
    KNIFE_REVOLVER: {
        name: "Knife Revolver",
        description: <>Conta come il <i>BANG!</i> del turno.<br/>"Estrai!": J, Q, K, A = riprendi questa carta in mano.</>
    },
    MAP: {
        name: "Mappa",
        description: <>Al tuo turno, prima di pescare, guarda le prime 2 carte del mazzo: puoi scartarne 1.</>
    },
    MONEY_BAG: {
        name: "Sacco Di Soldi",
        description: <>Se la carta in cima agli scarti è a bordo marrone, copiane l'effetto.</>
    },
    MOST_WANTED: {
        name: "Most Wanted",
        description: <>Ogni giocatore "estrae!":<br/>♠=perde 1 punto vita.</>,
        descriptionClass: "description-low",
    },
    NEXT_STOP: {
        name: "Prossima Fermata",
        description: <>Fai avanzare il treno di 1 stazione.</>
    },
    REFUND: {
        name: "Rimborso",
        description: <>Quando un altro giocatore pesca o scarta una tua carta, tranne questa, pesca una carta.</>
    },
    STRONGBOX: {
        name: "Cassaforte",
        description: <>Alla fine del tuo turno, pesca una carta.</>
    },
    SWITCH: {
        name: "Scambio",
        description: <>Scambia una tua carta in gioco con un'altra carta in gioco.</>
    },
    TRAIN_ROBBERY: {
        name: "Rapina Al Treno",
        description: <>Conta come il <i>BANG!</i> del turno.<br/>Il bersaglio sceglie per ogni sua carta in gioco: la scarta o è colpito da un <i>BANG!</i></>
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Rapina Al Treno: Scarta una carta"
    },
    TRAIN_ROBBERY_BANG: {
        name: "Rapina Al Treno: Ricevi un Bang"
    },
    WATER_TOWER: {
        name: "Serbatoio",
        description: <>Prendi gratis un vagone a scelta dal treno.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        description: <>Nel tuo turno, puoi prendere un qualunque numero di vagoni.</>
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        description: <>Se sei bersaglio di una carta <i>BANG!</i>, puoi deviarla a un giocatore a distanza 1 scartando dalla mano una carta dello stesso seme.</>
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        description: <>Alla fine del tuo turno, pesca una carta.</>
    },
    MANUELITA: {
        name: "Manuelita",
        description: <>Ogni volta che il treno arriva al capolinea, pesca 2 carte.</>
    },
    SANCHO: {
        name: "Sancho",
        description: <>Una volta nel tuo turno, puoi prendere gratis un vagone a scelta dal treno.</>
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        // EDIT: dvGiochi made a typo here
        description: <>Quando giochi una carta o un effetto che bersaglia più giocatori, puoi escluderne uno.</>
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        description: <>Ogni volta che il treno avanza fuori dal tuo turno, puoi scartare una carta dalla mano per pescarne un'altra.</>
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        description: <>Una volta nel tuo turno, puoi far avanzare il treno di 1 stazione.</>
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        description: <>Può provare a indovinare il colore o il seme di ogni carta pescata in fase 1: pesca + 1 carta per ogni "colore" indovinato (+ 2 per ogni "seme").</>
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Dichiaro Rosso"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Dichiaro Cuori"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Dichiaro Quadri"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Dichiaro Nero"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Dichiaro Fiori"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Dichiaro Picche"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        description: <>Può incrementare i suoi punti vita fino a un massimo di 6.</>
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        description: <>Ogni volta che viene attaccato da un giocatore, può scartare una carta dalla mano per evitare il colpo. Carta giocata + carta schivata: se ≥ 13 = <i>Mancato!</i>; se ≥ 17 = <i>Schivata</i>; se ≥ 20 = <i>Ritorno di Fiamma.</i></>
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        description: <>Prima di pescare, il giocatore con più carte in mano deve dargliene una a sua scelta.</>
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        description: <>Una volta nel suo turno può scartare una carta a bordo blu dalla mano per pescare 2 carte.</>
    },
    EVA_PLACE: {
        name: "Eva Place",
        description: <>Una volta nel suo turno, può scartare una carta dalla mano per pescarne un'altra dal mazzo. Se è Quadri, può pescare ancora.</>
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        description: <>Per un intero giro, può beneficiare dell'effetto di una qualsiasi carta a bordo blu in gioco di fronte ad un altro giocatore.</>
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        description: <>Ogni volta che una carta è "estratta!", può scartare una carta dalla mano per pescare la carta estratta.</>
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        description: <>Per ogni punto vita in meno, la distanza a cui gli altri giocatori lo vedono è aumentata di 1.</>
    },
    SID_CURRY: {
        name: "Sid Curry",
        description: <>Quando mette una carta in gioco, tutte le altre carte in gioco con lo stesso nome vengono scartate.</>
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        description: <>Ogni volta che ferisce un giocatore con un <i>BANG!</i>, pesca una carta dal mazzo.</>
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        description: <>Una volta nel suo turno, può scartare una carta <i>BANG!</i> per ripetere l'effetto dell'ultima carta a bordo marrone da lui giocata.</>
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        description: <>Ogni volta che sarebbe eliminato, "estrae!": se non è Picche, resta a 1 punto vita e pesca 1 carta.</>
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        description: <>Le carte che possono avere effetto su più giocatori non hanno effetto su di lui.</>
    },

    // The Great Train Robbery railcar cards

    BAGGAGE_CAR: {
        name: "Baggage Car",
        description: <>Scartalo: ottieni l'effetto di un <i>Mancato!</i>, <i>Panico!</i>, <i>Cat Balou</i> o di un <i>BANG!</i> extra.</>,
        descriptionClass: "train-description",
    },
    BAGGAGE_CAR_MISSED: {
        name: "Baggage Car come Mancato!"
    },
    BAGGAGE_CAR_PANIC: {
        name: "Baggage Car come Panico!"
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Baggage Car come Cat Balou"
    },
    BAGGAGE_CAR_BANG: {
        name: "Baggage Car come Bang!"
    },
    CABOOSE: {
        name: "Caboose",
        description: <>Puoi scartare un'altra tua carta a bordo blu (incluso un vagone) come se fosse un <i>Mancato!</i></>,
        descriptionClass: "train-description",
    },
    CATTLE_TRUCK: {
        name: "Cattle Truck",
        description: <>Scartalo: guarda le 3 carte in cima agli scarti e pescane 1.</>,
        descriptionClass: "train-description",
    },
    CIRCUS_WAGON: {
        name: "Circus Wagon",
        description: <>Scartalo: ogni altro giocatore deve scartare una carta che ha in gioco.</>,
        descriptionClass: "train-description",
    },
    COAL_HOPPER: {
        name: "Coal Hopper",
        description: <>Scartalo: pesca una carta e scarta un vagone in gioco davanti a un giocatore a tua scelta.</>,
        descriptionClass: "train-description",
    },
    DINING_CAR: {
        name: "Dining Car",
        description: <>A inizio turno, "estrai!": se è Cuori, recuperi 1 punto vita.</>,
        descriptionClass: "train-description",
    },
    EXPRESS_CAR: {
        name: "Express Car",
        description: <>Scartalo: il tuo turno termina. Scarta tutte le carte in mano, poi gioca un altro turno.</>,
        descriptionClass: "train-description",
    },
    GHOST_CAR: {
        name: "Ghost Car",
        description: <>Giocalo su chiunque tranne lo Sceriffo. Se vieni eliminato, invece resti in gioco, ma non puoi guadagnare né perdere punti vita.</>,
        descriptionClass: "train-description",
    },
    LOUNGE_CAR: {
        name: "Lounge Car",
        description: <>Scartalo: pesca 2 vagoni dal mazzo, mettine 1 in gioco di fronte a te e 1 di fronte a un altro giocatore.</>,
        descriptionClass: "train-description",
    },
    LUMBER_FLATCAR: {
        name: "Lumber Flatcar",
        description: <>Giocalo su chiunque.<br/>Vedi tutti gli altri a distanza +1.</>,
        descriptionClass: "train-description",
    },
    MAIL_CAR: {
        name: "Mail Car",
        description: <>Scartalo: pesca 3 carte e dai 1 di esse a un altro giocatore a tua scelta.</>,
        descriptionClass: "train-description",
    },
    OBSERVATION_CAR: {
        name: "Observation Car",
        description: <>Tu vedi gli altri a distanza -1.<br/>Gli altri ti vedono a distanza +1.</>,
        descriptionClass: "train-description",
    },
    PASSENGER_CAR: {
        name: "Passenger Car",
        description: <>Scartalo: pesca una carta (in mano o in gioco) da un altro giocatore.</>,
        descriptionClass: "train-description",
    },
    PRISONER_CAR: {
        name: "Prisoner Car",
        description: <>Le carte Duello e Indiani! giocate dagli altri giocatori non hanno effetto su di te.</>,
        descriptionClass: "train-description",
    },
    PRIVATE_CAR: {
        name: "Private Car",
        description: <>Se non hai carte in mano, non puoi essere bersaglio di carte <i>BANG!</i></>,
        descriptionClass: "train-description",
    },
    SLEEPER_CAR: {
        name: "Sleeper Car",
        description: <>Una volta per turno, poi scartare un'altra tua carta a bordo blu (incluso un vagone) come un <i>BANG!</i> extra.</>,
        descriptionClass: "train-description",
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        description: <>Al capolinea ogni gioctore è bersaglio di un <i>BANG!</i></>,
        descriptionClass: "train-description",
    },
    LELAND: {
        name: "Leland",
        description: <>Al capolinea ha l'effetto di un <i>Emporio</i></>,
        descriptionClass: "train-description",
    },

    // The Great Train Robbery station cards

    BOOM_TOWN: {
        name: "Boom Town"
    },
    CATICO: {
        name: "Catico"
    },
    CREEPY_CREEK: {
        name: "Creepy Creek"
    },
    CROWNS_HOLE: {
        name: "Crown's Hole"
    },
    DEATHWOOD: {
        name: "Deathwood"
    },
    DODGEVILLE: {
        name: "Dodgeville"
    },
    FORT_WROTH: {
        name: "Fort Wroth"
    },
    FRISCO: {
        name: "Frisco"
    },
    MINERS_OATH: {
        name: "Miner's Oath"
    },
    SAN_TAFE: {
        name: "San Tafe"
    },
    TOMBROCK: {
        name: "Tombrock"
    },
    VIRGINIA_TOWN: {
        name: "Virginia Town"
    },
    YOOMA: {
        name: "Yooma"
    },

    // Legends characters

    LEGEND_BART_CASSIDY: {
        name: "Bart Cassidy",
        description: <>Se vieni ferito, peschi 2 carte.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        description: <>Puoi scoprire carte finché la loro somma non supera 21, poi pescale.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        description: <>Ogni tua carta vale come <i>BANG!</i> o <i>Mancato!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        description: <>Se vieni ferito da un giocatore, peschi una carta dalla sua mano e la carta che ti ha ferito.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        description: <>Guarda le carte in mano a un giocatore, pescane una ,poi pescane un'altra dal mazzo.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        description: <>Se sei bersaglio di una carta marrone, puoi "estrarre!": J, Q, K, A = ignora la carta.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        description: <>Peschi 3 carte. Puoi darne 1 di esse a un altro giocatore.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        description: <>Se una carta fa "estrarre!", scopri tu 2 carte e scegli quella da usare. Se è il tuo turno, pescala.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        description: <>Gli altri ti vedono a distanza +1.<br/>Per giocarti un <i>BANG!</i> contro, occorre scartare una carta aggiuntiva dalla mano.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        description: <>Peschi 2 carte più quella in cima agli scarti.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        description: <>Puoi vedere tutti a distanza 1.<br/>Una volta nel tuo turno, puoi scartare una tua carta blu, in mano o in gioco, come <i>Panico!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        description: <>Puoi scartare 2 carte per recuperare un punto vita. Una volta nel tuo turno, se recuperi un punto vita, puoi sparare un <i>BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        description: <>I tuoi <i>BANG!</i> non possono essere annullati.<br/>Se rivendichi un'Impresa puoi rimuovere anche l'ultimo punto vita.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        description: <>Se rimani con meno di 2 carte in mano, peschi fino a tornare a 2.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        description: <>Se un personaggio è eliminato, prendi in mano tutte le sue carte. Se vieni eliminato, resti in gioco con 4 punti vita, ma torni sul lato normale.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        description: <>Puoi giocare quante carte <i>BANG!</i> vuoi.<br/>Invece di rivendicare un'Impresa, puoi sparare un <i>BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },

    // Legends feats cards

    FIFTY_GUNS: {
        name: "Cinquanta Pistole",
        description: <>Prendi o scarta un'arma.</>,
        descriptionClass: "feats-description",
    },
    WOUNDED_PRIDE: {
        name: "Ferito Nell'Orgoglio",
        description: <>Un altro giocatore manca una tua carta <i>BANG!</i></>,
        descriptionClass: "feats-description",
    },
    OLD_WEST_GANG: {
        name: "Gang Del Vecchio West",
        description: <>Ferisci 2 o più giocatori nello stesso turno.</>,
        descriptionClass: "feats-description",
    },
    BOTTLENECK: {
        name: "Il Collo Di Bottiglia",
        description: <>Scarta una <i>Birra</i>.</>,
        descriptionClass: "feats-description",
    },
    THE_CHUCK_A_LUCK: {
        name: "Il Mulino D'Oro",
        description: <>Scarta una carta <i>BANG!</i></>,
        descriptionClass: "feats-description",
    },
    "3_15_TO_YOOMA": {
        name: "Il Treno Per Yooma",
        description: <>Attiva o fai attivare un "estrarre!" (anche a inizio turno).</>,
        descriptionClass: "feats-description",
    },
    GOOD_COMPANY: {
        name: "In Buona Compagnia",
        description: <>Scarta una carta, poi gioca una carta con lo stesso nome (o viceversa).</>,
        descriptionClass: "feats-description",
    },
    THE_LAST_HERO: {
        name: "L'Ultimo Eroe",
        description: <>Scarta una carta blu in gioco.</>,
        descriptionClass: "feats-description",
    },
    THE_MAN_WITH_NO_NAME: {
        name: "L'Uomo Senza Nome",
        description: <>Perdi un punto vita (non l'ultimo).</>,
        descriptionClass: "feats-description",
    },
    WILHELM_SCREAM: {
        name: "L'Urlo Di Wilhelm",
        description: <>Gioca una carta <i>BANG!</i> a distanza 2 o più.</>,
        descriptionClass: "feats-description",
    },
    SCRUGS_BALLAD: {
        name: "La Ballata Di Scrugs",
        description: <>Perdi un <i>Duello</i>.</>,
        descriptionClass: "feats-description",
    },
    BORDERLANDS: {
        name: "La Frontiera",
        description: <>Scarta la tua mano (anche se è di zero carte).</>,
        descriptionClass: "feats-description",
    },
    THE_OREGON_TRAIL: {
        name: "La Pista Dell'Oregon",
        description: <>Durante la fase di pesca, rinuncia alla prima carta che dovresti pescare.</>,
        descriptionClass: "feats-description",
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Mille Modi Per Morire",
        description: <>Mostra dalla mano un <i>Mancato!</i> e una carta dello stesso seme.</>,
        descriptionClass: "feats-description",
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "Per Qualche Carta In Più",
        description: <>Scarta almeno una carta in eccesso a fine turno.</>,
        descriptionClass: "feats-description",
    },
    A_QUICK_DEATH: {
        name: "Una Morte Veloce",
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

};