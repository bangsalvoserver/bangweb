import { CardRegistry } from "../Registry";

export const CARDS_CZECH: CardRegistry = {

    // Base game cards

    BARREL: {
        name: "Barel",
    },
    DYNAMITE: {
        name: "Dynamit",
        description: <>Ztrácíš 3 životy. Jinak pošli <i>Dynamite</i> hráči po své levici.</>,
        descriptionClass: "draw-description",
    },
    SCOPE: {
        name: "Hledí",
        description: <>Všichni ostatní hráči se pro tebe nachází ve vzdálenosti o 1 menší.</>
    },
    MUSTANG: {
        name: "Mustang",
        hideTitle: true,
        description: <>Pro všechny ostatní hráče se nacházíš ve vzdálenosti o 1 větší.</>
    },
    JAIL: {
        name: "Vězení",
        hideTitle: true,
        description: <>Odhoď <i>Vězení</i> a pokračuj normálně ve svém tahu. Jinak odhoď <i>Vězení</i> a vynechej svůj tah.</>,
        descriptionClass: "draw-description",
    },
    REMINGTON: {
        name: "Remington",
        hideTitle: true,
    },
    REV_CARABINE: {
        name: "Rev. Carabine",
        hideTitle: true,
    },
    SCHOFIELD: {
        name: "Schofield",
        hideTitle: true,
    },
    VOLCANIC: {
        name: "Volcanic",
        hideTitle: true,
        description: <>Ve svém tahu můžeš zahrát libovolný počet karet <i>BANG!</i></>,
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
        name: "Pivo"
    },
    CAT_BALOU: {
        name: "Cat Balou"
    },
    STAGECOACH: {
        name: "Dostavník"
    },
    DUEL: {
        name: "Duel",
        description: <>Vyzvaný hráč může odhodit 1 kartu <i>BANG!</i>, potom vyzývající, a takto se střídají. Ten, kdo jako první <i>BANG!</i> neodhodí, ztrácí 1 život.</>
    },
    GENERAL_STORE: {
        name: "Hokynářsví",
        description: <>Otoč tolik vrchních karet z balíčku, kolik je nevyřazených hráčů. Každý hráč si vezme jednu kartu.</>
    },
    GATLING: {
        name: "Kulomet"
    },
    INDIANS: {
        name: "Indiáni!",
        hideTitle: true,
        description: <>Všichni ostatní hráči mohou odhodit kartu <i>BANG!</i> jinak ztrácí 1 život.</>
    },
    MISSED: {
        name: "Vedle!"
    },
    PANIC: {
        name: "Panika!"
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
        name: "Dalekohled",
        description: <>Všichni ostatní hráči se pro tebe nachází ve vzdálenosti o 1 menší.</>
    },
    HIDEOUT: {
        name: "Skrýš",
        description: <>Pro všechny ostatní hráče se nacházíš ve vzdálenosti o 1 větší.</>
    },
    PUNCH: {
        name: "Úder"
    },
    RAG_TIME: {
        name: "Rag Time",
        hideTitle: true
    },
    BRAWL: {
        name: "Rvačka"
    },
    DODGE: {
        name: "Úhyb"
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
        name: "Bible"
    },
    CANTEEN: {
        name: "Čutora"
    },
    CAN_CAN: {
        name: "Can Can",
        hideTitle: true
    },
    TEN_GALLON_HAT: {
        name: "Stetson"
    },
    CONESTOGA: {
        name: "Krytý vůz",
    },
    DERRINGER: {
        name: "Derringer",
        hideTitle: true
    },
    BUFFALO_RIFLE: {
        name: "Puška na bizony"
    },
    HOWITZER: {
        name: "Houfnice"
    },
    PEPPERBOX: {
        name: "Pepperbox",
        hideTitle: true
    },
    IRON_PLATE: {
        name: "Železný plát"
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true
    },
    KNIFE: {
        name: "Nůž"
    },
    SOMBRERO: {
        name: "Sombrero",
        hideTitle: true
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Duch",
        description: <>Zahraj tuto kartu na vyřazeného hráče. Tento hráč se vrací zpět do hry se svou původní postavou a rolí. Nemůže však získat či ztratit žádné životy.</>
    },
    GHOST_2: {
        name: "Duch",
        description: <>Zahraj tuto kartu na vyřazeného hráče. Tento hráč se vrací zpět do hry se svou původní rolí bez schopností. Nemůže však získat či ztratit žádné životy.</>
    },
    LEMAT: {
        name: "Lemat",
        hideTitle: true,
        description: <>Během svého tahu můžeš zahrát libovolné karty jako karty <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    LEMAT_2: {
        name: "Lemat",
        hideTitle: true,
        description: <>Během svého tahu můžeš zahrát libovolné karty (kromě Vedle!) jako karty <i>BANG!</i>.</>,
        descriptionClass: "weapon-description",
    },
    RATTLESNAKE: {
        name: "Chřestýš",
        description: <>Na začátku svého tahu sejmi. Pokud je sejmutá karta piková ♠️, ztrácíš 1 život.</>
    },
    SHOTGUN: {
        name: "Brokovnice",
        description: <>Zasáhneš-li některého hráče kartou <i>BANG!</i>, musí tento hráč odhodit 1 kartu dle svého výběru z ruky (pokud nějakou má).</>,
        descriptionClass: "weapon-description",
    },
    BOUNTY: {
        name: "Odměna",
        description: <>Jestliže tě někdo zasáhne kartou <i>BANG!</i>, dobere si 1 kartu.</>
    },
    BANDIDOS: {
        name: "Divoká banda",
        description: <>Každý hráč si vypere: odhoď 2 karty z ruky (1 pokud máš 1) nebo si uber 1 život.</>
    },
    BANDIDOS_2: {
        name: "Divoká banda",
        description: <>Všichni ostatní hráči musí odhodit z ruky 1 kartu <i>BANG!</i> nebo 2 libovolné karty.</>
    },
    ESCAPE: {
        name: "Útěk",
        description: <>Může být hráno mimo tah. Vyhni se efektu hnědé karty (kromě karty <i>BANG!</i>) pokud si jejím jediným cílem.</>
    },
    ESCAPE_2: {
        name: "Útěk",
        description: <>Pokud jsi jediným cílem nějaké karty (kromě <i>BANG!</i>), můžeš ji zrušit.</>
    },
    AIM: {
        name: "Dvojitá rána",
        description: <>Zahraj tuto kartu současně s kartou <i>BANG!</i> Pokud není tento <i>BANG!</i> zrušen, ztrácí zasažený hráč 2 životy. Ke zrušení stačí 1 efekt Vedle!</>
    },
    POKER: {
        name: "Poker",
        hideTitle: true,
        description: <>Všichni ostatní hráči vyloží po 1 kartě z ruky lícem dolů a poté všechny naráz otočí. Pokud mezi nimi nené žádné A, vezmi si 2 z těchto karet do ruky a zbylé odhoď.</>
    },
    BACKFIRE: {
        name: "Opětovná palba",
        description: <>Považuje se za kartu <i>Missed!</i> Hráč, který na tebe střílel, je nyní cílem efektu <i>BANG!</i>.</>
    },
    SAVED: {
        name: "Obětavý skok",
        description: <>Může být hráno mimo tah. Zabraň tomu že jiný hráč ztratí 1 život. Pokud přežije, lízni si 2 karty z jeho ruky nebo z balíčku (tvá volba).</>
    },
    SAVED_2: {
        name: "Obětavý skok",
        description: <>Zabráníš jakémukoli jinému hráči ztratit 1 život. Pokud takto zamezíš vyřazení, vezmi si 2 karty z ruky zachráněného hráče nebo z balíčku.</>
    },
    FANNING: {
        name: "Rozstříštěná kulka",
        description: <>Počítá se do limitu 1 karty <i>BANG!</i> za tah. Prvním cílem efektu BANG! se stává nejprve 1 hráč podle běžných pravidel a poté 1 další hráč, který je od prvního ve vzdálenosti 1 (kromě tebe), je-li to možné.</>
    },
    TOMAHAWK: {
        name: "Tomahawk",
        hideTitle: true
    },
    TORNADO: {
        name: "Tornádo",
        description: <>Každý hráč odhodí kartu z ruky (pokud je to možné), potom si lízne 2 karty z balíčku.</>
    },
    TORNADO_2: {
        name: "Tornádo",
        description: <>Každý hráč musí dát 2 karty z ruky hráči po levici. <strong>Karty předejte všichni najednou.</strong></>
    },
    LAST_CALL: {
        name: "Poslední pivo",
        description: <>Tuto kartu můžeš zahrát i tehdy, pokud už zbývají pouze 2 hráči, ale nikoli mimo svůj tah.</>
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Kolona"
    },
    A_LITTLE_NIP: {
        name: "Malý doušek"
    },
    QUICK_SHOT: {
        name: "Rychlopalba",
        description: <>Použij efekt BANG! na jiného hráče.</>,
        descriptionClass: "cube-description"
    },
    FLINTLOCK: {
        name: "Křesadlovka",
        description: <>Pokud je tato karta zrušena, cezmi si ji zpět do ruky.</>,
        descriptionClass: "cube-description"
    },
    ARROW: {
        name: "Šíp",
        description: [
            <>Cílový hráč musí odhodit z ruky kartu <i>BANG!</i>, nebo ztratí 1 život.</>,
            <>Použij <i>Šíp</i> znovu na jiného hráče.</>
        ],
        descriptionClass: "cube-description-double"
    },
    DUCK: {
        name: "Skrč se!",
        description: <>Vezmi si tuto kartu zpět do ruky.</>,
        descriptionClass: "cube-description"
    },
    RELOAD: {
        name: "Nabíjení",
        description: <>Přidej 3 📦 na své Nebezpečné karty a/nebo postavu.</>
    },
    RUST: {
        name: "Rez",
        description: <>Všichni ostatní hráči přemístí 1 📦 z každé své Nebezpečné karty a postavy na tvou postavu.</>
    },
    SQUAW: {
        name: "Squaw",
        hideTitle: true,
        description: [
            <>Odhoď libovolnou kartu ve hře.</>,
            <>Vezmi si odhozenou kartu do ruky.</>
        ],
        descriptionClass: "cube-description-double"
    },
    ACE_UP_THE_SLEEVE: {
        name: "Eso v rukávu"
    },
    BANDOLIER: {
        name: "Bandalír",
        description: <>Během svého tahu můžeš zahrát 1 kartu <i>BANG!</i> navíc.</>,
        descriptionClass: "cube-description"
    },
    BIG_FIFTY: {
        name: "Big Fifty",
        hideTitle: true,
        description: <>Cílovému hráči zruš schopnosti postavy a karet ve hře.</>,
        descriptionClass: "cube-description"
    },
    BOMB: {
        name: "Bomba",
        description: <>Na začátku svého tahu sejmi:<br/>♥ ♦ = pošli <i>Bombu</i> jinému hráči.<br/>♣ ♠=odhoď z této karty 2 📦: pokud to nemůžeš udělat, ztrácíš 2 životy.</>,
        descriptionClass: "card-description-higher text-smaller"
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        hideTitle: true,
        description: <>Pokud je tvá karta <i>BANG!</i> zrušena, cílový hráč musí odhodit libovolnou kartu z ruky.</>,
        descriptionClass: "cube-description"
    },
    BELL_TOWER: {
        name: "Zvonice",
        description: <>Při vyhodnocování tvé následující zahrané karty se pro tebe všichni hráči nachází ve vzdálenosti 1.</>,
        descriptionClass: "cube-description"
    },
    CRATE: {
        name: "Bedna"
    },
    TUMBLEWEED: {
        name: "Stepní běžec",
        description: <>Libovolný hráč musí opakovat sejmutí.</>,
        descriptionClass: "cube-description"
    },
    DOUBLE_BARREL: {
        name: "Dvouhlavňovka",
        description: <>Pokud zahraješ károvou kartu <i>BANG!</i>, nemůže být zrušena.</>,
        descriptionClass: "cube-description"
    },
    WHIP: {
        name: "Bič",
        description: <>Odhoď libovolnou kartu ve hře.</>,
        descriptionClass: "cube-description"
    },
    BEER_KEG: {
        name: "Bečka piva"
    },
    LOCKPICK: {
        name: "Paklíč",
        description: <>Vezmi si 1 kartu z ruky libovolného hráče.</>,
        descriptionClass: "cube-description"
    },
    THUNDERER: {
        name: "Thunderer",
        hideTitle: true,
        description: <>Vezmi si zahranou kartu <i>BANG!</i> zpět do ruky.</>,
        descriptionClass: "cube-description"
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Vykradač hrobů",
        description: <>Otoč tolik vrchních karet z odhazovacího balíčku, kolik je nevyřazených hráčů. Každý hráč si vezme jednu kartu.</>
    },
    CARD_SHARPER: {
        name: "Švindlíř",
        description: <>Vyměň si modrou kartu kterou máš ve hře s kartou stejné barvy kterou má před sebou jiný hráč.</>
    },
    MIRAGE: {
        name: "Fatamorgána",
        description: <>Počítá se jako <i>Vedle!</i> Hráč který vystřelil ihned ukončuje svůj tah.</>
    },
    BLOOD_PACT: {
        name: "Krevní přísaha"
    },
    SACRIFICE: {
        name: "Oběť"
    },
    DISARM: {
        name: "Vyzbrojit"
    },
    MOLOTOV: {
        name: "Molotov"
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true
    },
    LAST_WILL: {
        name: "Poslední vůle"
    },
    INDIAN_GUIDE: {
        name: "Indiánský vůdce"
    },
    TAXMAN: {
        name: "Vyzvedávač daní"
    },
    BROTHEL: {
        name: "Nevěstinec"
    },
    BRONCO: {
        name: "Bronco",
        hideTitle: true
    },
    PACK_MULE: {
        name: "Tovární Mulo"
    },
    WAR_PATH: {
        name: "Cesta války"
    },
    ARSON: {
        name: "Podpaľování"
    },
    FLYING_BULLET: {
        name: "Létající projektil"
    },
    ON_THE_HOUSE: {
        name: "Na účet podniku"
    },
    GUITAR: {
        name: "Kytara"
    },
    SCRAPPER: {
        name: "Rvač"
    },
    SHYLOCK: {
        name: "Židovský lichvář"
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\"",
        hideTitle: true
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true
    },
    UNCLE_WILL: {
        name: "Uncle Will",
        hideTitle: true
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        hideTitle: true
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true
    },
    JOSE_DELGADO: {
        name: "Josè Delgado",
        hideTitle: true
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        hideTitle: true
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        hideTitle: true
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true
    },
    LEMONADE_JIM: {
        name: "Limonádový Jim"
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true
    },

    // Armed & Dangerous cards

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true
    },
    MADAME_YTO: {
        name: "Madame Yto",
        hideTitle: true
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true
    },

    // High Noon cards

    BLESSING: {
        name: "Požehnání"
    },
    GHOST_TOWN: {
        name: "Město Duchů"
    },
    INVERT_ROTATION: {
        name: "Zlatá horečka"
    },
    THE_DALTONS: {
        name: "Daltonové"
    },
    THE_DOCTOR: {
        name: "Doktor"
    },
    THE_REVEREND: {
        name: "Reverend"
    },
    TRAIN_ARRIVAL: {
        name: "Příjezd vlaku"
    },
    CURSE: {
        name: "Prokletí"
    },
    HANGOVER: {
        name: "Kocovina"
    },
    SERMON: {
        name: "Kazatel"
    },
    THIRST: {
        name: "Žízeň"
    },
    SHOOTOUT: {
        name: "Přestřelka"
    },
    HANDCUFFS: {
        name: "Želízka"
    },
    HANDCUFFS_HEARTS: {
        name: "Želízka: Prohlašuju srdce",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Želízka: Prohlašuju káry",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_CLUBS: {
        name: "Želízka: Prohlašuju kříže",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_SPADES: {
        name: "Želízka: Prohlašuju piky",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    NEW_IDENTITY: {
        name: "Nová identita"
    },
    HIGH_NOON: {
        name: "Pravé poledne"
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Léčka"
    },
    SNIPER: {
        name: "Odstřelovač"
    },
    DEAD_MAN: {
        name: "Mrtvý muž"
    },
    BLOOD_BROTHERS: {
        name: "Pokrevní bratři"
    },
    THE_JUDGE: {
        name: "Soudce"
    },
    LASSO: {
        name: "Laso"
    },
    LAW_OF_THE_WEST: {
        name: "Právo západu"
    },
    HARD_LIQUOR: {
        name: "Pálenka"
    },
    ABANDONED_MINE: {
        name: "Opustený důl"
    },
    PEYOTE: {
        name: "Peyote"
    },
    PEYOTE_RED: {
        name: "Peyote: Prohlašuju červenou",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    PEYOTE_BLACK: {
        name: "Peyote: Prohlašuju černou",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    RANCH: {
        name: "Ranč"
    },
    RICOCHET: {
        name: "Odražená střela"
    },
    RUSSIAN_ROULETTE: {
        name: "Ruská ruleta"
    },
    VENDETTA: {
        name: "Vendeta"
    },
    A_FISTFUL_OF_CARDS: {
        name: "Fistful"
    },
    
    // Wild West Show cards

    GAG: {
        name: "Roubík"
    },
    BONE_ORCHARD: {
        name: "Hřbitov"
    },
    DARLING_VALENTINE: {
        name: "Miláček Valentýn"
    },
    DOROTHY_RAGE: {
        name: "Zuřivá Dorothy"
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero"
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa z Texasu"
    },
    MISS_SUSANNA: {
        name: "Slečna Zuzana"
    },
    SHOWDOWN: {
        name: "Zůčtování"
    },
    SACAGAWAY: {
        name: "Sacagaway"
    },
    WILD_WEST_SHOW: {
        name: "Divoký západ"
    },

    // Gold Rush cards

    SHOT: {
        name: "Panák"
    },
    BOTTLE: {
        name: "Láhev"
    },
    BOTTLE_PANIC: {
        name: "Láhev jako Panika!",
        hideTitle: true
    },
    BOTTLE_BEER: {
        name: "Láhev jako Pivo",
        hideTitle: true
    },
    BOTTLE_BANG: {
        name: "Láhev jako Bang!",
        hideTitle: true
    },
    CALUMET: {
        name: "Kalumet"
    },
    GUN_BELT: {
        name: "Nábojový pás"
    },
    PARDNER: {
        name: "Komplic"
    },
    PARDNER_GENERAL_STORE: {
        name: "Komplic jako Hokynářství",
        hideTitle: true,
        description: <>Otoč tolik vrchních karet z balíčku, kolik je nevyřazených hráčů. Každý hráč si vezme jednu kartu.</>
    },
    PARDNER_DUEL: {
        name: "Komplic jako Duel",
        hideTitle: true,
        description: <>Vyzvaný hráč může odhodit 1 kartu <i>BANG!</i>, potom vyzývající, a takto se střídají. Ten, kdo jako první <i>BANG!</i> neodhodí, ztrácí 1 život.</>
    },
    PARDNER_CAT_BALOU: {
        name: "Komplic jako Cat Balou",
        hideTitle: true
    },
    GOLD_RUSH: {
        name: "Zlatá horečka"
    },
    HORSESHOE: {
        name: "Podkova"
    },
    PICKAXE: {
        name: "Krumpáč"
    },
    WANTED: {
        name: "Wanted"
    },
    RHUM: {
        name: "Rum"
    },
    GOLD_PAN: {
        name: "Rýžovací mísa"
    },
    BOOTS: {
        name: "Boty"
    },
    LUCKY_CHARM: {
        name: "Talisman"
    },
    UNION_PACIFIC: {
        name: "Union Pacific"
    },
    RUCKSACK: {
        name: "Batoh"
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Kaktus"
    },
    DRAGOON: {
        name: "Dragoon"
    },
    EVADED: {
        name: "K zemi!"
    },
    FULL_STEAM: {
        name: "Plnou parou vpřed"
    },
    FULL_STEAM_NO_EFFECT: {
        name: "Plnou parou vpřed: Zrušit efekt lokomotivy",
        hideTitle: true
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "Plnou parou vpřed: Zdvojnásobit efekt lokomotivy",
        hideTitle: true
    },
    KNIFE_REVOLVER: {
        name: "Revolver s nožem"
    },
    MAP: {
        name: "Mapa"
    },
    MONEY_BAG: {
        name: "Pytel peněz"
    },
    MOST_WANTED: {
        name: "Nejhledanější"
    },
    NEXT_STOP: {
        name: "Příští stanice"
    },
    REFUND: {
        name: "Odškodnění"
    },
    STRONGBOX: {
        name: "Pokladna"
    },
    SWITCH: {
        name: "Výhybka"
    },
    TRAIN_ROBBERY: {
        name: "Vlaková loupež"
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Vlaková loupež: Odhoď kartu",
        hideTitle: true
    },
    TRAIN_ROBBERY_BANG: {
        name: "Vlaková loupež: Staň se cílem karty Bang!",
        hideTitle: true
    },
    WATER_TOWER: {
        name: "Vodojem"
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        hideTitle: true
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Prohlašuju červenou",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Prohlašuju srdce",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Prohlašuju káry",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Prohlašuju černou",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Prohlašuju kříže",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Prohlašuju piky",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        hideTitle: true
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true
    },

    // The Great Train Robbery train cards

    BAGGAGE_CAR: {
        name: "Zavazadlový vůz"
    },
    BAGGAGE_CAR_MISSED: {
        name: "Zavazadlový vůz jako Vedle!",
        hideTitle: true
    },
    BAGGAGE_CAR_PANIC: {
        name: "Zavazadlový vůz jako Panika!",
        hideTitle: true
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Zavazadlový vůz jako Cat Balou",
        hideTitle: true
    },
    BAGGAGE_CAR_BANG: {
        name: "Zavazadlový vůz jako Bang!",
        hideTitle: true
    },
    CABOOSE: {
        name: "Sližební vůz"
    },
    CATTLE_TRUCK: {
        name: "Dobytčák"
    },
    CIRCUS_WAGON: {
        name: "Cirkusový vagon"
    },
    COAL_HOPPER: {
        name: "Vagon s uhlím"
    },
    DINING_CAR: {
        name: "Jídelní vůz"
    },
    EXPRESS_CAR: {
        name: "Expresní vůz"
    },
    GHOST_CAR: {
        name: "Vagon duchů"
    },
    LOUNGE_CAR: {
        name: "Salonní vůz"
    },
    LUMBER_FLATCAR: {
        name: "Plošinový vůz"
    },
    MAIL_CAR: {
        name: "Poštovní vůz"
    },
    OBSERVATION_CAR: {
        name: "Vyhlídkový vůz"
    },
    PASSENGER_CAR: {
        name: "Osobní vůz"
    },
    PRISONER_CAR: {
        name: "Vězeňský vůz"
    },
    PRIVATE_CAR: {
        name: "Soukromý vagon"
    },
    SLEEPER_CAR: {
        name: "Spací vůz"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        hideTitle: true
    },
    LELAND: {
        name: "Leland",
        hideTitle: true
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
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        descriptionClass: "legends-description",
    },
    
    // Legends feats cards

    FIFTY_GUNS: {
        name: "Padesát pistolí",
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Zraněná pýcha",
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Banda ze starého západu",
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Hrdlo lahve",
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "Velký hazard",
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "Vlak do Yoomy",
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Dobrá společnost",
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "Poslední hrdina",
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "Bezejmenný muž",
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "Zděšený výkřik",
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Balada o Scrugsovi",
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Pohraničí",
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "Oregonská stezka",
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Tisíc způsobů, jak zemřít",
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "O pár karet navíc",
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "Rychlá smrt",
        descriptionClass: "feats-description"
    },

    // Button Row virtual cards

    ESCAPE_JAIL: {
        name: "Útěk z vězení"
    },
    BECOME_LEGEND: {
        name: "Staň se legendou"
    },
    CLAIM_FEAT: {
        name: "Ukaž svůj kousek"
    },
    GAME_PASS: {
        name: "Konec tahu"
    },
    GAME_CONFIRM: {
        name: "Potvrdit"
    },
    GAME_DISMISS: {
        name: "Pokračovat"
    },
    GAME_SELL_BEER: {
        name: "Prodat pivo"
    },
    GAME_DISCARD_BLACK: {
        name: "Odhodit vybavení"
    },
    GAME_DISCARD_BRONCO: {
        name: "Odhodit Bronco"
    },

    // Player roles

    ROLE_UNKNOWN: {
        name: "(Neznámá role)"
    },
    ROLE_SHERIFF: {
        name: "Šerif"
    },
    ROLE_DEPUTY: {
        name: "Zástupce šerifa"
    },
    ROLE_OUTLAW: {
        name: "Bandita"
    },
    ROLE_RENEGADE: {
        name: "Odpadlík"
    },
    ROLE_DEPUTY_3P: {
        name: "Zástupce šerifa"
    },
    ROLE_OUTLAW_3P: {
        name: "Bandita"
    },
    ROLE_RENEGADE_3P: {
        name: "Odpadlík"
    },
    ROLE_SHADOW_DEPUTY: {
        name: "Stínový zástupce šerifa"
    },
    ROLE_SHADOW_OUTLAW: {
        name: "Stínový bandita"
    },
    
};
