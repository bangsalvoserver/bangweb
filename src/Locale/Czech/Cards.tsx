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
        name: "Cat Balou",
        hideTitle: true
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
        description: <>Zahraj tuto kartu na vyřazeného hráče. Tento hráč se vrací zpět do hry se svou původní postavou a rolí. Nemůže však získat či ztratit žádné životy.</>,
        descriptionClass: "card-description text-smaller"
    },
    GHOST_2: {
        name: "Duch",
        description: <>Zahraj tuto kartu na vyřazeného hráče. Tento hráč se vrací zpět do hry se svou původní rolí bez schopností. Nemůže však získat či ztratit žádné životy.</>,
        descriptionClass: "card-description text-smaller"
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
        description: <>Všichni ostatní hráči vyloží po 1 kartě z ruky lícem dolů a poté všechny naráz otočí. Pokud mezi nimi nené žádné A, vezmi si 2 z těchto karet do ruky a zbylé odhoď.</>,
        descriptionClass: "card-description text-smaller"
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
        description: <>Zabráníš jakémukoli jinému hráči ztratit 1 život. Pokud takto zamezíš vyřazení, vezmi si 2 karty z ruky zachráněného hráče nebo z balíčku.</>,
        descriptionClass: "card-description text-smaller"
    },
    FANNING: {
        name: "Rozstříštěná kulka",
        description: <>Počítá se do limitu 1 karty <i>BANG!</i> za tah. Prvním cílem efektu BANG! se stává nejprve 1 hráč podle běžných pravidel a poté 1 další hráč, který je od prvního ve vzdálenosti 1 (kromě tebe), je-li to možné.</>,
        descriptionClass: "card-description text-smallest line-smaller"
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
        description: <>Tuto kartu můžeš zahrát i tehdy, pokud už zbývají pouze 2 hráči, ale nikoli mimo svůj tah.</>,
        descriptionClass: "card-description bg-white" // this covers the beer symbol, what do we do here?
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
        descriptionClass: "cube-description-lower"
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
        descriptionClass: "cube-description-lower"
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
        descriptionClass: "cube-description text-smaller line-smaller"
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
        descriptionClass: "cube-description-lower text-smaller line-smaller"
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
        name: "Oběť",
        description: <>Může být hráno mimo tah. Zachraň jiného hráče od ztráty 1 života tím že ztratíš život sám. Potom si lízni 2 karty, pokud je to možné (3 pokud přežije).</>,
        descriptionClass: "card-description text-smaller"
    },
    DISARM: {
        name: "Odzbrojit",
        description: <>Počítá se jako <i>Vedle!</i>.<br/>Hráč který střílel musí odhodit kartu z ruky.</>
    },
    MOLOTOV: {
        name: "Molotov",
        hideTitle: true
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true,
        description: <>Jendou za tah mužeš zahrát kartu <i>BANG!</i> jako <i>Kulomet</i> odhozením další karty spolu s ní.</>,
        descriptionClass: "weapon-description"
    },
    LAST_WILL: {
        name: "Poslední vůle",
        description: <>Zahraj na kteréhokoli hráče. Pokud zemře, může dát až 3 karty (z ruky nebo ze hry) jinému hráči.</>
    },
    INDIAN_GUIDE: {
        name: "Indiánský průvodce",
        description: <>Zahraj na sebe. <i>Indiáni!</i> a <i>Válečná stezka</i> na tebe nemají efekt.</>
    },
    TAXMAN: {
        name: "Výběrčí daní",
        description: <>Zahraj na kteréhokoli hráče. Na začátku jeho tahu, si musí líznout, ♠ ♣: ve fázi 1 si líže o kartu míň.</>
    },
    BROTHEL: {
        name: "Nevěstinec",
        description: <>Odhoď a hraj, ale ztrácíš schopnost do příštího tahu. Jinak odhoď a hraj normálně.</>,
        descriptionClass: "draw-description"
    },
    BRONCO: {
        name: "Bronco",
        hideTitle: true,
        description: <>Ostatní tě vidí na vzdálenost +1. Nemůže být zahráno spolu s <i>Mustang</i>. Také může být odstraněno odhozením 2 karet.</>
    },
    PACK_MULE: {
        name: "Nákladní Mula",
        description: <>Můžeš mít v ruce o kartu víc než máš životů. Nemůže být zahráno spolu s <i>Mustang</i> nebo <i>Bronco</i>.</>
    },
    WAR_PATH: {
        name: "Válečná stezka",
        description: <>Všichni ostatní hráči odhodí <i>BANG!</i> nebo ztrácí 1 život.</>
    },
    ARSON: {
        name: "Žhářství",
    },
    FLYING_BULLET: {
        name: "Letící kulka",
        description: <>Počítá se jako <i>Vedle!</i>.<br/>Hráč tvého výběru na vzdálenost 1 od tebe (pokud takový je) je sílem karty <i>BANG!</i>.</>
    },
    ON_THE_HOUSE: {
        name: "Na účet podniku"
    },
    GUITAR: {
        name: "Kytara",
        description: <>Zahraj na kteréhokoli hráče. Dokud není odstraněna nesmí hrát kartu <i>BANG!</i> nebo karty které závisí na dosahu zbraně.</>
    },
    SCRAPPER: {
        name: "Rvač"
    },
    SHYLOCK: {
        name: "Lichvář"
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Kdykoli jsi zraněn, dober si 1 kartu za každý ztracený život.</>,
        descriptionClass: "character-description"
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>V 1. fázi svého tahu ukaž druhou kartu, kterou sis dobral. Pokud je srdcová nebo kárová, dober si ještě 1 kartu.</>,
        descriptionClass: "character-description"
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Můžeš používat kartu <i>BANG!</i> jako kartu <i>Missed!</i> a naopak.</>,
        descriptionClass: "character-description"
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Kdykoli ti některý hráč způsobí zranění, vezmi si z jeho ruky 1 kartu za každý ztracený život.</>,
        descriptionClass: "character-description"
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>V 1. fázi svého tahu si můžeš první kartu vzít náhodně z ruky jiného hráče.</>,
        descriptionClass: "character-description"
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Kdykoli jsi cílem efektu <i>BANG!</i>, můžeš sejmout. Pokud je otočená karta srdcová, efekt <i>BANG!</i> je zrušen.</>,
        descriptionClass: "character-description"
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>V 1. fázi svého tahu se podívej na vrchní 3 karty z dobíracího balíčku. Dvě z nich si dober a třetí vrať zpět na balíček.</>,
        descriptionClass: "character-description"
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Kdykoli máš sejmout, otoč vrchní dvě karty z dobíracího balíčku a vyber si, kterou použiješ.</>,
        descriptionClass: "character-description"
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Pro všechny ostatní hráče se nacházíš ve vzdálenosti o 1 větší.</>,
        descriptionClass: "character-description"
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>V 1. fázi svého tahu si můžeš první kartu vzít z vrškuz odhazovací hromádky.</>,
        descriptionClass: "character-description"
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Všichni ostatní hráči se pro tebe nachází ve vzdálenosti o 1 menší.</>,
        descriptionClass: "character-description"
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Kdykoli můžeš odhosit 2 karty z ruky a vyléčit si tak 1 život.</>,
        descriptionClass: "character-description"
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Aby ostatní hráči zrušili tvou kartu <i>BANG!</i>, musí použít 2 efekty <i>Vedle!</i>.</>,
        descriptionClass: "character-description"
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Jakmile nemáš v ruce žádnou kartu, dober si 1 kartu.</>,
        descriptionClass: "character-description"
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Kdykoli je některý jiný hráč vyřazen ze hry, vezmi si všechny jeho karty.</>,
        descriptionClass: "character-description"
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Ve svém tahu můžeš zahrát libovolný počet karet <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\"",
        hideTitle: true,
        description: <>V 1. fázi svého tahu si dober o 1 kartu více než kolik je nevyřazených hráčů. Z těchto karet si 2 nech a zbylé rozdej po jedné ostatním hráčům.</>,
        descriptionClass: "character-description"
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true,
        description: <>Kdykoli zahraješ kartu, všechny stejné karty, které jsou již ve hře, se odhodí.</>,
        descriptionClass: "character-description"
    },
    UNCLE_WILL: {
        name: "Uncle Will",
        hideTitle: true,
        description: <>Jednou během svého tahu můžeš zahrát jakoukoli kartu jako <i>Hokynářství</i>.</>,
        descriptionClass: "character-description"
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true,
        description: <>Můžeš zahrát jakoukoli kartu jako kartu <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true,
        description: <>Kdykoli je zrušena tvá karta <i>BANG!</i> kartou <i>Vedle!</i>, vezmi si tuto kartu <i>Vedle!</i> do ruky. Kdykoli zrušíš kartu <i>BANG!</i>, kartou <i>Vedle!</i>, vezmi si zrušenou kartu <i>BANG!</i> do ruky.</>,
        descriptionClass: "character-description"
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
        name: "Limonádový Jim",
        titleClass: "card-title character-title"
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
        name: "Požehnání",
        titleClass: "card-title card-title-lower"
    },
    GHOST_TOWN: {
        name: "Město Duchů",
        titleClass: "card-title card-title-lower"
    },
    INVERT_ROTATION: {
        name: "Zlatá horečka",
        titleClass: "card-title card-title-lower"
    },
    THE_DALTONS: {
        name: "Daltonové",
        titleClass: "card-title card-title-lower"
    },
    THE_DOCTOR: {
        name: "Doktor",
        titleClass: "card-title card-title-lower"
    },
    THE_REVEREND: {
        name: "Reverend",
        titleClass: "card-title card-title-lower"
    },
    TRAIN_ARRIVAL: {
        name: "Příjezd vlaku",
        titleClass: "card-title card-title-lower"
    },
    CURSE: {
        name: "Prokletí",
        titleClass: "card-title card-title-lower"
    },
    HANGOVER: {
        name: "Kocovina",
        titleClass: "card-title card-title-lower"
    },
    SERMON: {
        name: "Kazatel",
        titleClass: "card-title card-title-lower"
    },
    THIRST: {
        name: "Žízeň",
        titleClass: "card-title card-title-lower"
    },
    SHOOTOUT: {
        name: "Přestřelka",
        titleClass: "card-title card-title-lower"
    },
    HANDCUFFS: {
        name: "Želízka",
        titleClass: "card-title card-title-lower"
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
        name: "Nová identita",
        titleClass: "card-title card-title-lower"
    },
    HIGH_NOON: {
        name: "Pravé poledne",
        titleClass: "card-title card-title-lower"
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Léčka",
        titleClass: "card-title card-title-lower"
    },
    SNIPER: {
        name: "Odstřelovač",
        titleClass: "card-title card-title-lower"
    },
    DEAD_MAN: {
        name: "Mrtvý muž",
        titleClass: "card-title card-title-lower"
    },
    BLOOD_BROTHERS: {
        name: "Pokrevní bratři",
        titleClass: "card-title card-title-lower"
    },
    THE_JUDGE: {
        name: "Soudce",
        titleClass: "card-title card-title-lower"
    },
    LASSO: {
        name: "Laso",
        titleClass: "card-title card-title-lower"
    },
    LAW_OF_THE_WEST: {
        name: "Právo západu",
        titleClass: "card-title card-title-lower"
    },
    HARD_LIQUOR: {
        name: "Pálenka",
        titleClass: "card-title card-title-lower"
    },
    ABANDONED_MINE: {
        name: "Opustený důl",
        titleClass: "card-title card-title-lower"
    },
    PEYOTE: {
        name: "Peyote",
        titleClass: "card-title card-title-lower"
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
        name: "Ranč",
        titleClass: "card-title card-title-lower"
    },
    RICOCHET: {
        name: "Odražená střela",
        titleClass: "card-title card-title-lower"
    },
    RUSSIAN_ROULETTE: {
        name: "Ruská ruleta",
        titleClass: "card-title card-title-lower"
    },
    VENDETTA: {
        name: "Vendeta",
        titleClass: "card-title card-title-lower"
    },
    A_FISTFUL_OF_CARDS: {
        name: "Fistful",
        titleClass: "card-title card-title-lower"
    },
    
    // Wild West Show cards

    GAG: {
        name: "Roubík",
        titleClass: "card-title card-title-higher"
    },
    BONE_ORCHARD: {
        name: "Hřbitov",
        titleClass: "card-title card-title-higher"
    },
    DARLING_VALENTINE: {
        name: "Miláček Valentýn",
        titleClass: "card-title card-title-higher"
    },
    DOROTHY_RAGE: {
        name: "Zuřivá Dorothy",
        titleClass: "card-title card-title-higher"
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        titleClass: "card-title card-title-higher"
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa z Texasu",
        titleClass: "card-title card-title-higher"
    },
    MISS_SUSANNA: {
        name: "Slečna Zuzana",
        titleClass: "card-title card-title-higher"
    },
    SHOWDOWN: {
        name: "Zůčtování",
        titleClass: "card-title card-title-higher"
    },
    SACAGAWAY: {
        name: "Sacagaway",
        titleClass: "card-title card-title-higher"
    },
    WILD_WEST_SHOW: {
        name: "Divoký západ",
        titleClass: "card-title card-title-higher"
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
        name: "Zavazadlový vůz",
        titleClass: "train-title"
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
        name: "Sližební vůz",
        titleClass: "train-title"
    },
    CATTLE_TRUCK: {
        name: "Dobytčák",
        titleClass: "train-title"
    },
    CIRCUS_WAGON: {
        name: "Cirkusový vagon",
        titleClass: "train-title"
    },
    COAL_HOPPER: {
        name: "Vagon s uhlím",
        titleClass: "train-title"
    },
    DINING_CAR: {
        name: "Jídelní vůz",
        titleClass: "train-title"
    },
    EXPRESS_CAR: {
        name: "Expresní vůz",
        titleClass: "train-title"
    },
    GHOST_CAR: {
        name: "Vagon duchů",
        titleClass: "train-title"
    },
    LOUNGE_CAR: {
        name: "Salonní vůz",
        titleClass: "train-title"
    },
    LUMBER_FLATCAR: {
        name: "Plošinový vůz",
        titleClass: "train-title"
    },
    MAIL_CAR: {
        name: "Poštovní vůz",
        titleClass: "train-title"
    },
    OBSERVATION_CAR: {
        name: "Vyhlídkový vůz",
        titleClass: "train-title"
    },
    PASSENGER_CAR: {
        name: "Osobní vůz",
        titleClass: "train-title"
    },
    PRISONER_CAR: {
        name: "Vězeňský vůz",
        titleClass: "train-title"
    },
    PRIVATE_CAR: {
        name: "Soukromý vagon",
        titleClass: "train-title"
    },
    SLEEPER_CAR: {
        name: "Spací vůz",
        titleClass: "train-title"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        hideTitle: true,
        descriptionClass: "locomotive-description"
    },
    LELAND: {
        name: "Leland",
        hideTitle: true,
        descriptionClass: "locomotive-description"
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
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Zraněná pýcha",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Banda ze starého západu",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Hrdlo lahve",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "Velký hazard",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "Vlak do Yoomy",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Dobrá společnost",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "Poslední hrdina",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "Bezejmenný muž",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "Zděšený výkřik",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Balada o Scrugsovi",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Pohraničí",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "Oregonská stezka",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Tisíc způsobů, jak zemřít",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "O pár karet navíc",
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "Rychlá smrt",
        titleClass: "feats-title",
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
        name: "(Neznámá role)",
        hideTitle: true
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
