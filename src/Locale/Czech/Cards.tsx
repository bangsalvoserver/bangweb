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
        hideTitle: true,
    },
    BANG: {
        name: "Bang!",
        hideTitle: true,
    },
    BEER: {
        name: "Pivo"
    },
    CAT_BALOU: {
        name: "Cat Balou",
        hideTitle: true,
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
        hideTitle: true,
    },
    WELLS_FARGO: {
        name: "Wells Fargo",
        hideTitle: true,
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
        hideTitle: true,
    },
    BRAWL: {
        name: "Rvačka"
    },
    DODGE: {
        name: "Úhyb"
    },
    SPRINGFIELD: {
        name: "Springfield",
        hideTitle: true,
    },
    TEQUILA: {
        name: "Tequila",
        hideTitle: true,
    },
    WHISKY: {
        name: "Whisky",
        hideTitle: true,
    },
    BIBLE: {
        name: "Bible"
    },
    CANTEEN: {
        name: "Čutora"
    },
    CAN_CAN: {
        name: "Can Can",
        hideTitle: true,
    },
    TEN_GALLON_HAT: {
        name: "Stetson"
    },
    CONESTOGA: {
        name: "Krytý vůz",
    },
    DERRINGER: {
        name: "Derringer",
        hideTitle: true,
    },
    BUFFALO_RIFLE: {
        name: "Puška na bizony"
    },
    HOWITZER: {
        name: "Houfnice"
    },
    PEPPERBOX: {
        name: "Pepperbox",
        hideTitle: true,
    },
    IRON_PLATE: {
        name: "Železný plát"
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true,
    },
    KNIFE: {
        name: "Nůž"
    },
    SOMBRERO: {
        name: "Sombrero",
        hideTitle: true,
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
        hideTitle: true,
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
        description: [
            <>Tuto kartu můžeš zahrát i tehdy, pokud už zbývají pouze 2 hráči, ale nikoli mimo svůj tah.</>,
            <img src='/cards/misc/icon_beer.webp' alt='' />
        ],
        descriptionClass: "draw-description text-smaller bg-white"
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
        hideTitle: true,
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
        hideTitle: true,
        description: <>Karty diamantů zahrané jinými hráči na něj nemají vliv.</>,
        descriptionClass: "character-description"
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true,
        description: <>Během jejího tahu nemají karty zahrané před ostatními hráči žádný vliv.</>,
        descriptionClass: "character-description"
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true,
        description: <>Dobere si 1 kartu a navíc 1 kartu za každé zranění, které má.</>,
        descriptionClass: "character-description"
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true,
        description: <>Během svého tahu se může rozhodnout ztratit 1 život, aby si mohl líznout 2 karty.</>,
        descriptionClass: "character-description"
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true,
        description: <>Během svého tahu může odhodit jednou 2 karty z ruky a vystřelit <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true,
        description: <>Může použít jakoukoli kartu jako <i>Minul!</i>.</>,
        descriptionClass: "character-description"
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true,
        description: <>Pokaždé, když je další hráč vyřazen, získá zpět 2 životy.</>,
        descriptionClass: "character-description"
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true,
        description: <>Pokaždé, když je další hráč vyřazen, si lízne 2 karty navíc.</>,
        descriptionClass: "character-description"
    },
    JOSE_DELGADO: {
        name: "Josè Delgado",
        hideTitle: true,
        description: <>Dvakrát během svého tahu může odhodit modrou kartu z ruky a líznout si tak 2 karty.</>,
        descriptionClass: "character-description"
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true,
        description: <>Pokaždé, když použije kartu z ruky mimo pořadí, si lízne kartu.</>,
        descriptionClass: "character-description"
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true,
        description: <>Před kterýmkoli hráčem může líznout pouze jednu kartu.</>,
        descriptionClass: "character-description"
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true,
        description: <>Dobírá si 3 karty místo 2.</>,
        descriptionClass: "character-description"
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true,
        description: <>V ruce může držet až 10 karet.</>,
        descriptionClass: "character-description"
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true,
        description: <>Pokaždé, když zahraje <i>Pivo</i>, získá zpět 2 životy místo 1.</>,
        descriptionClass: "character-description"
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true,
        description: <>Na celé jedno kolo získá stejnou schopnost jiné postavy ve hře dle vlastního výběru.</>,
        descriptionClass: "character-description"
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        hideTitle: true,
        description: <>Jednou během svého tahu můžete použít libovolnou kartu Clubu jako bonus <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Pokaždé, když zahrajete kartu <i>BANG!</i>, „doberte!“: u piků se tomuto úderu nelze vyhnout.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Pokaždé, když jiný hráč zahraje kartu <i>Missed!</i> na kartu <i>BANG!</i> od <i>Colorado Bill</i>, "remíza!": na Piky karta <i>Missed!</i> nemá žádný účinek a napadený hráč ztrácí 1 život.</>,
        descriptionClass: "character-description"
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        hideTitle: true,
        description: <>Jednou během svého tahu můžete použít kartu <i>BANG!</i> jako <i>Gatlinga</i>.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Ve fázi tažení můžete odmítnout líznout si karty. Za každou vynechanou kartu vystřelte <i>BANG!</i> na jiný cíl v dosažitelné vzdálenosti.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Může si líznout o 1 kartu méně než obvykle, aby mohla zahrát další <i>BANG!</i> na vzdálenost 1.</>,
        descriptionClass: "character-description"
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true,
        description: <>Každý hráč, který si vezme nebo odhodí jednu ze svých karet (z ruky nebo ze hry), se stane terčem <i>BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    LEMONADE_JIM: {
        name: "Limonádový Jim",
        description: <>Pokaždé, když jiný hráč zahraje kartu Pivo, můžete odhodit jakoukoli kartu z ruky a získat tak zpět 1 život.</>,
        titleClass: "card-title character-title",
        descriptionClass: "character-description"
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Pokud jste cílem jiné hnědé karty než <i>BANG!</i>, můžete použít kartu <i>Minul!</i>, abyste se této kartě vyhnuli.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Pokud je jediným cílem karty, může použít kartu <i>Minul!</i>, aby se této kartě vyhnul.</>,
        descriptionClass: "character-description"
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true,
        description: <>Během fáze losování, pokud nemáte ve hře žádné modré karty, losujte si 2 karty navíc.</>,
        descriptionClass: "character-description"
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Začíná s 5 kartami. Nemůže hrát <i>Missed!</i></>,
        descriptionClass: "character-description"
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true,
        description: <>Během svého tahu může vyměnit jednu kartu z ruky se dvěma náhodnými kartami z ruky jiného hráče.</>,
        descriptionClass: "character-description"
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true,
        description: <>Na konci tahu si lízne všechny přebytečné karty, které ostatní hráči odhodili.</>,
        descriptionClass: "character-description"
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true,
        description: <>Na začátku svého tahu si může náhodně vylosovat 2 postavy. Má všechny schopnosti vylosovaných postav.</>,
        descriptionClass: "character-description"
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true,
        description: <>Pokud má v ruce méně než 6 karet, pokaždé, když si kterýkoli hráč „dobere!“, John si přidá právě dotaženou kartu do ruky.</>,
        descriptionClass: "character-description"
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true,
        description: <>Během svého tahu může odhodit kartu <i>BANG!</i>, aby zopakoval efekt právě zahrané karty s hnědým okrajem.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Pokaždé, když by byl vyřazen, „tasírujte!“: pokud to nejsou piky, Teren zůstane na 1 životním bodě a táhne si 1 kartu.</>,
        descriptionClass: "character-description"
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true,
        description: <>Před losováním mu musí hráči, kteří mají v ruce více karet než on, dát jednu kartu dle vlastního výběru.</>,
        descriptionClass: "character-description"
    },

    // Armed & Dangerous cards

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true,
        description: <>Pokud jiný hráč zahraje kartu s modrým nebo oranžovým okrajem, můžete zaplatit 2 📦 a líznout si 1 kartu z balíčku.</>,
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true,
        description: <>Jednou během svého tahu můžete odhodit 1 kartu z ruky a přidat tak 2 📦 k jedné ze svých karet.</>,
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true,
        description: <>Pokaždé, když je vaše karta <i>BANG!</i> zrušena, doberte si 1 kartu z balíčku.</>,
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true,
        description: <>Jednou během svého tahu si můžete vzít 1 📦 z libovolné karty a přesunout ho sem.</>,
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true,
        description: <>Pokaždé, když vás hráč nechá ztratit alespoň 1 život, "remizuj!":<br/>♥♦=stane se terčem <i>BANG!</i></>,
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true,
        description: <>Jednou během svého tahu můžete zaplatit 2 📦 a vystřelit 1 <i>BANG!</i> navíc (karta není potřeba).</>,
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true,
        description: <>Pokud jste jediným cílem, můžete ignorovat účinky karet s hnědým okrajem a hodnotami J, Q, K a A.</>,
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true,
        description: <>Začněte se 4 📦. Jednou během svého tahu se můžete odtud přesunout až o 2 📦 na své karty.</>,
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true,
        description: <>Na konci svého tahu si „lízne!“: na srdcových nebo kárových karetách hraje kolo navíc.</>,
        descriptionClass: "character-description"
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true,
        description: <>Dobere si 2 karty, 1 zahodí a vezme si 1 zlatý nuget.</>,
        descriptionClass: "character-description"
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true,
        description: <>Během svého tahu může zaplatit 2 zlaté nugety, aby vystřelil 1 <i>BANG!</i> navíc.</>,
        descriptionClass: "character-description"
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true,
        description: <>Může si z balíčku vybrat nejvyšší vybavení zaplacením 2 zlatých nugetů.</>,
        descriptionClass: "character-description"
    },
    MADAME_YTO: {
        name: "Madame Yto",
        hideTitle: true,
        description: <>Pokaždé, když je zahrána karta Pivo, dobere si 1 kartu z balíčku.</>,
        descriptionClass: "character-description"
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true,
        description: <>Jednou za kolo si může koupit 1 vybavení za cenu sníženou o 1 zlatý nuget.</>,
        descriptionClass: "character-description"
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true,
        description: <>Během svého tahu může odhodit 1 zlatý nuget a líznout si 1 kartu z balíčku (až 2krát).</>,
        descriptionClass: "character-description"
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true,
        description: <>Pokaždé, když ztratí 1 život, si vezme 1 zlatý nuget.</>,
        descriptionClass: "character-description"
    },

    // High Noon cards

    BLESSING: {
        name: "Požehnání",
        description: <>Barva všech karet je srdcová.</>,
        titleClass: "card-title card-title-lower",
    },
    GHOST_TOWN: {
        name: "Město Duchů",
        description: <>Během svého tahu se vyřazení hráči vracejí do hry jako duchové. Doberou si 3 karty místo 2 a nemohou zemřít. Na konci svého tahu jsou opět vyřazeni.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller",
    },
    INVERT_ROTATION: {
        name: "Zlatá horečka",
        description: <>Hra probíhá jedno kolo proti směru hodinových ručiček, vždy začíná šerifem. Všechny efekty karet probíhají ve směru hodinových ručiček.</>,
        titleClass: "card-title card-title-lower",
    },
    THE_DALTONS: {
        name: "Daltonové",
        description: <>Když se <i>Daltonové</i> dostanou do hry, každý hráč, který má před sebou nějaké modré karty, si jednu z nich vybere a odhodí ji.</>,
        titleClass: "card-title card-title-lower",
    },
    THE_DOCTOR: {
        name: "Doktor",
        description: <>Když vstoupí do hry <i>Doktor</i>, hráč(é) s nejmenším počtem životů, kteří jsou stále ve hře, znovu získají 1 život.</>,
        titleClass: "card-title card-title-lower",
    },
    THE_REVEREND: {
        name: "Reverend",
        description: <>Hráči nemohou hrát žádné karty s pivem.</>,
        titleClass: "card-title card-title-lower",
    },
    TRAIN_ARRIVAL: {
        name: "Příjezd vlaku",
        description: <>Každý hráč si na konci fáze 1 svého tahu dobere jednu kartu navíc.</>,
        titleClass: "card-title card-title-lower",
    },
    CURSE: {
        name: "Prokletí",
        description: <>Barva všech karet je piková.</>,
        titleClass: "card-title card-title-lower",
    },
    HANGOVER: {
        name: "Kocovina",
        description: <>Všechny postavy ztratí své speciální schopnosti.</>,
        titleClass: "card-title card-title-lower",
    },
    SERMON: {
        name: "Kazatel",
        description: <>Žádný hráč nemůže během svého tahu použít karty <i>BANG!</i>.</>,
        titleClass: "card-title card-title-lower",
    },
    THIRST: {
        name: "Žízeň",
        description: <>Každý hráč si během fáze 1 svého tahu lízne pouze svou první kartu, nikoli druhou.</>,
        titleClass: "card-title card-title-lower",
    },
    SHOOTOUT: {
        name: "Přestřelka",
        description: <>Každý hráč může během svého tahu zahrát druhou kartu <i>BANG!</i>.</>,
        titleClass: "card-title card-title-lower",
    },
    HANDCUFFS: {
        name: "Želízka",
        description: <>Poté, co si hráč v první fázi lízne karty, pojmenuje barvu: během svého tahu může hrát pouze karty této barvy.</>,
        titleClass: "card-title card-title-lower",
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
        description: <>Na začátku svého tahu si každý hráč náhodně vybere další postavu. Může přejít na novou identitu pro zbytek hry, počínaje 2 body života.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller",
    },
    HIGH_NOON: {
        name: "Pravé poledne",
        description: <>Každý hráč ztratí na začátku svého tahu 1 život.</>,
        titleClass: "card-title card-title-lower",
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Léčka",
        description: <>Vzdálenost mezi libovolnými dvěma hráči je 1. Tuto vzdálenost ovlivňují pouze karty ve hře.</>,
        titleClass: "card-title card-title-lower",
    },
    SNIPER: {
        name: "Odstřelovač",
        description: <>Během svého tahu může hráč odhodit 2 karty <i>BANG!</i> najednou proti hráči: to se počítá jako <i>BANG!</i>, ale může být zrušeno pouze dvěma <i>Minulo!</i>.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller line-smaller",
    },
    DEAD_MAN: {
        name: "Mrtvý muž",
        description: <>Během svého tahu se hráč, který byl vyřazen jako první, vrací do hry se 2 body života a 2 kartami.</>,
        titleClass: "card-title card-title-lower",
    },
    BLOOD_BROTHERS: {
        name: "Pokrevní bratři",
        description: <>Na začátku svého tahu může každý hráč ztratit jeden život (kromě posledního), aby dal jeden život libovolnému hráči dle vlastního výběru.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller"
    },
    THE_JUDGE: {
        name: "Soudce",
        description: <>Karty nemůžete hrát před sebou ani před jiným hráčem.</>,
        titleClass: "card-title card-title-lower",
    },
    LASSO: {
        name: "Laso",
        description: <>Karty zahrané před hráči nemají žádný účinek.</>,
        titleClass: "card-title card-title-lower",
    },
    LAW_OF_THE_WEST: {
        name: "Právo západu",
        description: <>Během své fáze 1 každý hráč ukáže druhou kartu, kterou si dobere: pokud může, musí ji zahrát během své fáze 2.</>,
        titleClass: "card-title card-title-lower",
    },
    HARD_LIQUOR: {
        name: "Pálenka",
        description: <>Každý hráč může přeskočit svou 1. fázi a získat zpět 1 život.</>,
        titleClass: "card-title card-title-lower",
    },
    ABANDONED_MINE: {
        name: "Opustený důl",
        description: <>Během fáze 1 si každý hráč lízne z odhozených karet (pokud dojdou, tak z balíčku). Ve fázi 3 odhozuje karty lícem dolů na balíček.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller"
    },
    PEYOTE: {
        name: "Peyote",
        description: <>Místo losování ve fázi 1 každý hráč hádá, zda je barva vrchní karty v balíčku červená nebo černá. Poté si losuje kartu a ukáže ji: pokud uhodl správně, kartu si ponechá a může hádat znovu, jinak pokračuje do fáze 2.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest line-smaller"
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
        description: <>Na konci své fáze 1 může každý hráč jednou odhodit libovolný počet karet z ruky, aby si z balíčku lízl stejný počet karet.</>,
        titleClass: "card-title card-title-lower",
    },
    RICOCHET: {
        name: "Odražená střela",
        description: <>Každý hráč může odhodit karty <i>BANG!</i> proti kartám zahraným před jakýmkoli hráčem: každá karta je odhozena, pokud její majitel za každou z nich nezahraje <i>Missed!</i>.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller line-smaller"
    },
    RUSSIAN_ROULETTE: {
        name: "Ruská ruleta",
        description: <>Když se do hry dostane Ruská ruleta, počínaje šerifem každý hráč odhodí kartu Nezměněno!, dokud jeden z hráčů neodhodí kartu Nezměněno!: ztratí 2 životy a ruleta se zastaví.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smaller line-smaller"
    },
    VENDETTA: {
        name: "Vendeta",
        description: <>Na konci svého tahu si každý hráč „lízne!“: na srdci hraje další tah (ale znovu si „nelízne!“).</>,
        titleClass: "card-title card-title-lower",
    },
    A_FISTFUL_OF_CARDS: {
        name: "Fistful",
        description: <>Na začátku svého tahu je hráč terčem tolika <i>BANG!</i>, kolik karet má v ruce.</>,
        titleClass: "card-title card-title-lower",
    },
    
    // Wild West Show cards

    GAG: {
        name: "Roubík",
        description: <>Hráči nesmí mluvit (mohou gestikulovat, sténat, ...). Kdokoli promluví, ztratí 1 život.</>,
        titleClass: "card-title card-title-higher",
    },
    BONE_ORCHARD: {
        name: "Hřbitov",
        description: <>Na začátku svého tahu se všichni vyřazení hráči vracejí do hry s 1 životem. Jejich role se rozdávají náhodně podle rolí vyřazených hráčů.</>,
        titleClass: "card-title card-title-higher",
    },
    DARLING_VALENTINE: {
        name: "Miláček Valentýn",
        description: <>Na začátku svého tahu každý hráč odhodí své karty z ruky a dobere si stejný počet karet z balíčku.</>,
        titleClass: "card-title card-title-higher",
    },
    DOROTHY_RAGE: {
        name: "Zuřivá Dorothy",
        description: <>Během svého tahu může každý hráč donutit jiného hráče, aby zahrál jednu z jeho karet.</>,
        titleClass: "card-title card-title-higher",
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        description: <>Když se do hry dostane Helena, „doberte si!“: na Srdce nebo Diamanty zamíchejte všechny aktivní role kromě Šerifa a náhodně je rozdejte.</>,
        titleClass: "card-title card-title-higher",
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa z Texasu",
        description: <>Během svého tahu si každý hráč může vyměnit místo s hráčem po své pravici, který tak svůj další tah přeskočí.</>,
        titleClass: "card-title card-title-higher",
    },
    MISS_SUSANNA: {
        name: "Slečna Zuzana",
        description: <>Během svého tahu musí každý hráč zahrát alespoň 3 karty. Pokud tak neučiní, ztratí 1 život.</>,
        titleClass: "card-title card-title-higher",
    },
    SHOWDOWN: {
        name: "Zůčtování",
        description: <>Všechny karty lze zahrát tak, jak byly <i>BAMF!</i> Všechny <i>BAMF!</i> lze zahrát pouze tak, jak byly <i>Minuly!</i></>,
        titleClass: "card-title card-title-higher",
    },
    SACAGAWAY: {
        name: "Sacagaway",
        description: <>Všichni hráči hrají s odhalenými rukama (s výjimkou svých rolí!).</>,
        titleClass: "card-title card-title-higher",
    },
    WILD_WEST_SHOW: {
        name: "Divoký západ",
        description: <>Cílem každého hráče se stává: „Být posledním ve hře!“</>,
        titleClass: "card-title card-title-higher",
    },

    // Gold Rush cards

    SHOT: {
        name: "Panák",
        description: <>Hráč dle vašeho výběru (i vy) získá zpět 1 život.</>,
    },
    BOTTLE: {
        name: "Láhev",
        description: <>Lze hrát jako <i>Panika!</i>, <i>Pivo</i> nebo <i>BANG!</i></>,
    },
    BOTTLE_PANIC: {
        name: "Láhev jako Panika!",
        hideTitle: true,
    },
    BOTTLE_BEER: {
        name: "Láhev jako Pivo",
        hideTitle: true,
    },
    BOTTLE_BANG: {
        name: "Láhev jako Bang!",
        hideTitle: true,
    },
    CALUMET: {
        name: "Kalumet",
        description: <>Karty diamantů zahrané ostatními hráči na vás nemají žádný vliv.</>,
    },
    GUN_BELT: {
        name: "Nábojový pás",
        description: <>Limit velikosti vaší ruky na konci vašeho tahu je 8 karet.</>,
    },
    PARDNER: {
        name: "Komplic",
        description: <>Lze hrát jako <i>Obchod se smíšeným zbožím</i>, <i>Souboj</i> nebo <i>Kočka Balou</i>.</>,
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
        hideTitle: true,
    },
    GOLD_RUSH: {
        name: "Zlatá horečka",
        description: <>Tvůj tah končí. Získej zpět všechny své životy a pak hraj další tah.</>,
    },
    HORSESHOE: {
        name: "Podkova",
        description: <>Pokaždé, když si „doberete!“, otočte jednu kartu navíc a vyberte si výsledek.</>,
    },
    PICKAXE: {
        name: "Krumpáč",
        description: <>Během fáze 1 vašeho tahu si doberte 1 kartu navíc.</>,
    },
    WANTED: {
        name: "Wanted",
        description: <>Hrajte proti libovolnému hráči. Kdokoli, kdo tohoto hráče vyřadí, si vezme 2 karty a 1 zlatý nuget.</>,
    },
    RHUM: {
        name: "Rum",
        description: <>Tahání! 4 karty: za každou jinou barvu získáte 1 život.</>,
    },
    GOLD_PAN: {
        name: "Rýžovací mísa",
        description: <>Zaplaťte 1 zlatý nuget a líznete si 1 kartu z balíčku. Tuto schopnost můžete použít až 2krát za kolo.</>,
    },
    BOOTS: {
        name: "Boty",
        description: <>Pokaždé, když ztratíte 1 život, doberte si 1 kartu z balíčku.</>,
    },
    LUCKY_CHARM: {
        name: "Talisman",
        description: <>Pokaždé, když ztratíte 1 život, vezměte si 1 zlatý nuget.</>,
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        description: <>Doberte si 4 karty z balíčku.</>,
    },
    RUCKSACK: {
        name: "Batoh",
        description: <>Zaplaťte 2 zlaté nugety, abyste získali zpět 1 život.</>,
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Kaktus"
    },
    DRAGOON: {
        name: "Dragoon",
        description: <>Během svého tahu můžete zahrát 1 další <i>BANG!</i>.</>,
    },
    EVADED: {
        name: "K zemi!",
        description: <>Doberte si kartu, kterou jste právě <i>minuli!</i></>,
        descriptionClass: "card-description-lower"
    },
    FULL_STEAM: {
        name: "Plnou parou vpřed",
        description: <>Pošlete vlak na konec trati.<br/>Zdvojnásobte nebo zrušte efekt lokomotivy.</>,
    },
    FULL_STEAM_NO_EFFECT: {
        name: "Plnou parou vpřed: Zrušit efekt lokomotivy",
        hideTitle: true,
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "Plnou parou vpřed: Zdvojnásobit efekt lokomotivy",
        hideTitle: true,
    },
    KNIFE_REVOLVER: {
        name: "Revolver s nožem",
        description: <>Počítá se jako 1 <i>BANG!</i> za kolo. "Tasit!": J, Q, K, A = vzít si tuto kartu zpět do ruky.</>,
    },
    MAP: {
        name: "Mapa",
        description: <>Ve svém tahu se před líznutím podívejte na vrchní 2 karty balíčku: 1 můžete odhodit.</>,
    },
    MONEY_BAG: {
        name: "Pytel peněz",
        description: <>Pokud má vrchní karta v odhazovací hromádce hnědý okraj, okopírujte její efekt.</>,
    },
    MOST_WANTED: {
        name: "Nejhledanější",
        description: <>Každý hráč musí „tahat!“:<br/>♠=tento hráč ztratí 1 život.</>,
    },
    NEXT_STOP: {
        name: "Příští stanice",
        description: <>Posuňte vlak o 1 stanici.</>,
        descriptionClass: "card-description-lower"
    },
    REFUND: {
        name: "Odškodnění",
        description: <>Když jiný hráč dobere nebo odhodí jednu z vašich dalších karet, doberte si 1 kartu.</>,
    },
    STRONGBOX: {
        name: "Pokladna",
        description: <>Na konci svého tahu si doberte 1 kartu.</>,
    },
    SWITCH: {
        name: "Výhybka",
        description: <>Vyměňte jednu ze svých karet ve hře s jinou kartou ve hře.</>,
    },
    TRAIN_ROBBERY: {
        name: "Vlaková loupež",
        description: <>Počítá se jako 1 <i>BANG!</i> za kolo.<br/>Za každou ze svých zahraných karet si cíl vybere: odhodit ji, nebo se stát terčem BANG!</>,
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Vlaková loupež: Odhoď kartu",
        hideTitle: true,
    },
    TRAIN_ROBBERY_BANG: {
        name: "Vlaková loupež: Staň se cílem karty Bang!",
        hideTitle: true,
    },
    WATER_TOWER: {
        name: "Vodojem",
        description: <>Vezměte si z vlaku 1 vagón dle vlastního výběru zdarma.</>,
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        hideTitle: true,
        description: <>Během svého tahu si můžete z vlaku vzít libovolný počet železničních karet.</>,
        descriptionClass: "character-description"
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true,
        description: <>Pokud se stanete cílem karty <i>BANG!</i>, můžete z ruky odhodit kartu stejné barvy a přesměrovat ji k jinému hráči ve vzdálenosti 1.</>,
        descriptionClass: "character-description"
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true,
        description: <>Na konci svého tahu si doberte 1 kartu.</>,
        descriptionClass: "character-description"
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true,
        description: <>Pokaždé, když vlak dorazí na konec trati, doberte si 2 karty.</>,
        descriptionClass: "character-description"
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true,
        description: <>Jednou během svého tahu si můžete z vlaku zdarma vzít 1 železniční kartu dle vlastního výběru.</>,
        descriptionClass: "character-description"
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true,
        description: <>Pokud cílíte na více hráčů kartou nebo efektem, můžete jednoho hráče vyjmout.</>,
        descriptionClass: "character-description"
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true,
        description: <>Pokaždé, když vlak pojede vpřed, když na vás nejde, můžete odhodit 1 kartu z ruky a líznout si 1 kartu.</>,
        descriptionClass: "character-description"
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true,
        description: <>Jednou během svého tahu můžete posunout vlakovou stanici o 1.</>,
        descriptionClass: "character-description"
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true,
        description: <>Může se pokusit uhodnout barvu nebo značku každé tažené karty ve své fázi 1: za každou uhodnutou „barvu“ (2 za každou „značku“) si táhne 1 kartu navíc.</>,
        descriptionClass: "character-description"
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
        hideTitle: true,
        description: <>Za každý chybějící životní bod se vzdálenost, o kterou ho ostatní vidí, zvětší o 1.</>,
        descriptionClass: "character-description"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Může si zvýšit počet životů až na maximálně 6.</>,
        descriptionClass: "character-description"
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true,
        description: <>Kdykoli by byl zasažen, může odhodit kartu z ruky, aby se zásahu vyhnul. Zahraná karta + odhozená karta: pokud ≥ 13 = <i>Minul!</i>, ≥ 17 = <i>Uhnout</i>; ≥ 20 = <i>Vymrštit se</i>.</>,
        descriptionClass: "character-description"
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true,
        description: <>Před líznutím si musí hráč s nejvíce kartami v ruce dát jednu dle vlastního výběru.</>,
        descriptionClass: "character-description"
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true,
        description: <>Jakmile je ve svém tahu, může odhodit z ruky kartu s modře ohraničeným okrajem a líznout si 2 karty.</>,
        descriptionClass: "character-description"
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true,
        description: <>Jednou ve svém tahu může odhodit kartu z ruky a líznout si další z balíčku. Pokud je karta diamantová, může si líznout znovu.</>,
        descriptionClass: "character-description"
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true,
        description: <>Po celé jedno kolo může těžit z efektu modře ohraničené karty před jiným hráčem.</>,
        descriptionClass: "character-description"
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true,
        description: <>Kdykoli je karta „tažena!“, může odhodit kartu z ruky, aby získala taženou kartu.</>,
        descriptionClass: "character-description"
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true,
        description: <>Pokaždé, když vloží kartu do hry, všechny ostatní karty ve hře se stejným názvem jsou odhozeny.</>,
        descriptionClass: "character-description"
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true,
        description: <>Pokaždé, když trefí hráče ránu <i>BANG!</i>, lízne si kartu.</>,
        descriptionClass: "character-description"
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true,
        description: <>Jednou ve svém tahu může odhodit kartu <i>BANG!</i>, aby zopakoval efekt právě zahrané karty s hnědým okrajem.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Pokaždé, když by byl vyřazen, „tahá!“: pokud to nejsou piky, zůstává na 1 životním bodě a táhne si 1 kartu.</>,
        descriptionClass: "character-description"
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true,
        description: <>Karty, které mohou ovlivnit více než jednoho hráče, na něj nemají vliv.</>,
        descriptionClass: "character-description"
    },

    // The Great Train Robbery train cards

    BAGGAGE_CAR: {
        name: "Zavazadlový vůz",
        description: <>Zahoďte to za <i>Missed!</i>, <i>Panic!</i>, <i>Cat Balou</i> nebo navíc <i>BANG!</i></>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    BAGGAGE_CAR_MISSED: {
        name: "Zavazadlový vůz jako Vedle!",
        hideTitle: true,
    },
    BAGGAGE_CAR_PANIC: {
        name: "Zavazadlový vůz jako Panika!",
        hideTitle: true,
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Zavazadlový vůz jako Cat Balou",
        hideTitle: true,
    },
    BAGGAGE_CAR_BANG: {
        name: "Zavazadlový vůz jako Bang!",
        hideTitle: true,
    },
    CABOOSE: {
        name: "Sližební vůz",
        description: <>Můžete odhodit jednu ze svých dalších modře ohraničených karet (včetně vagónu) jako <i>Minul!</i></>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    CATTLE_TRUCK: {
        name: "Dobytčák",
        description: <>Odhoďte tuto kartu, podívejte se na vrchní 3 odhozené karty a lízněte si 1.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    CIRCUS_WAGON: {
        name: "Cirkusový vagon",
        description: <>Odhoďte tuto kartu, aby každý další hráč odhodil jednu ze svých karet ve hře.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    COAL_HOPPER: {
        name: "Vagon s uhlím",
        description: <>Zahoďte tuto kartu, abyste si mohli líznout 1 kartu a odhodit 1 vagón ze hry před libovolného hráče dle vlastního výběru.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    DINING_CAR: {
        name: "Jídelní vůz",
        description: <>Na začátku svého tahu „dober si!“:<br/>na srdce si obnov 1 život.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    EXPRESS_CAR: {
        name: "Expresní vůz",
        description: <>Zahoďte tuto kartu: Váš tah okamžitě končí. Zahoďte všechny karty z ruky a poté zahrajte další tah.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    GHOST_CAR: {
        name: "Vagon duchů",
        description: <>Hrajte na kohokoli kromě šerifa.<br/>Pokud jste vyřazeni, zůstáváte ve hře, ale nemůžete získat ani ztratit žádné životy.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    LOUNGE_CAR: {
        name: "Salonní vůz",
        description: <>Odhoďte tuto kartu a vezměte si z balíčku 2 vagóny. Jeden dejte do hry před sebe a druhý před jiného hráče.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    LUMBER_FLATCAR: {
        name: "Plošinový vůz",
        description: <>Hrajte na kohokoli.<br/>Všechny ostatní hráče vidíte na vzdálenost +1.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    MAIL_CAR: {
        name: "Poštovní vůz",
        description: <>Odhoďte tuto kartu, abyste si mohli líznout 3 karty, a 1 z nich dejte hráči dle vlastního výběru.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    OBSERVATION_CAR: {
        name: "Vyhlídkový vůz",
        description: <>Vidíte ostatní ze vzdálenosti -1.<br/>Ostatní vidí vás ze vzdálenosti +1.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PASSENGER_CAR: {
        name: "Osobní vůz",
        description: <>Odhoďte tuto kartu a vezměte si 1 kartu (ze hry nebo z ruky) od libovolného jiného hráče dle vlastního výběru.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PRISONER_CAR: {
        name: "Vězeňský vůz",
        description: <>Karty <i>Indiáni!</i> a <i>Souboj</i> zahrané ostatními hráči na vás nemají vliv.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PRIVATE_CAR: {
        name: "Soukromý vagon",
        description: <>Dokud máte prázdnou ruku, nemůžete se stát terčem karet <i>BANG!</i>.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    SLEEPER_CAR: {
        name: "Spací vůz",
        description: <>Jednou v každém tahu můžete odhodit jednu ze svých dalších modře ohraničených karet (včetně vagónu) jako další <i>BANG!</i></>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        hideTitle: true,
        description: <>Na konci řady je každý hráč terčem výbuchu <i>BANG!</i>.</>,
        descriptionClass: "locomotive-description"
    },
    LELAND: {
        name: "Leland",
        hideTitle: true,
        description: <>Na konci linky tohle funguje jako <i>obchod se smíšeným zbožím</i>.</>,
        descriptionClass: "locomotive-description"
    },

    // The Great Train Robbery station cards

    BOOM_TOWN: {
        name: "Boom Town",
        hideTitle: true,
    },
    CATICO: {
        name: "Catico",
        hideTitle: true,
    },
    CREEPY_CREEK: {
        name: "Creepy Creek",
        hideTitle: true,
    },
    CROWNS_HOLE: {
        name: "Crown's Hole",
        hideTitle: true,
    },
    DEATHWOOD: {
        name: "Deathwood",
        hideTitle: true,
    },
    DODGEVILLE: {
        name: "Dodgeville",
        hideTitle: true,
    },
    FORT_WROTH: {
        name: "Fort Wroth",
        hideTitle: true,
    },
    FRISCO: {
        name: "Frisco",
        hideTitle: true,
    },
    MINERS_OATH: {
        name: "Miner's Oath",
        hideTitle: true,
    },
    SAN_TAFE: {
        name: "San Tafe",
        hideTitle: true,
    },
    TOMBROCK: {
        name: "Tombrock",
        hideTitle: true,
    },
    VIRGINIA_TOWN: {
        name: "Virginia Town",
        hideTitle: true,
    },
    YOOMA: {
        name: "Yooma",
        hideTitle: true,
    },

    // Legends characters

    LEGEND_BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Pokud jste zasaženi, doberte si 2 karty.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Karty můžete otáčet, dokud jejich součet není vyšší než 21. Doberte si všechny tyto karty</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Každá z vašich karet se počítá jako <i>BANG!</i> nebo <i>Minulo!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Pokud vás zasáhne hráč, který vás zasáhl, vezměte si 1 kartu z jeho ruky a kartu, která vás zasáhla.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Podívejte se na ruku libovolného hráče, doberte si odtud 1 kartu a poté si doberte 1 z balíčku.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Pokud jste cílem hnědé karty, můžete si „líznout!“:<br/>J, Q, K, A = kartu ignorovat.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Doberte si 3 karty. 1 z nich můžete dát kterémukoli jinému hráči.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Pokud karta vyžaduje „Tahání!“, otočíte 2 karty a vyberete si 1. Pokud jste na řadě vy, tahnete si vybranou kartu.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Ostatní vás vidí na vzdálenost +1.<br/>Chce-li proti vám zahrát <i>BANG!</i>, musí hráč odhodit z ruky kartu navíc.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Doberte si 2 karty plus vrchní kartu z odhazovacího balíčku</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Všechny hráče můžete vidět ve vzdálenosti 1. Jednou během svého tahu můžete odhodit jednu ze svých modrých karet, ať už z ruky nebo ze hry, jako <i>Paniku!</i>.</>,
        descriptionClass: "legends-description text-smaller line-smaller",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Můžete odhodit 2 karty a získat 1 život. Jednou během svého tahu, pokud získáte 1 život, můžete vystřelit zdarma <i>BANG!</i>.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Váš <i>BANG!</i> nelze zrušit.<br/>Pokud si vyžádáte výkon, můžete odebrat i poslední život hráče.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Pokud máte v ruce méně než 2 karty, dobírejte si, dokud nezůstanete zpět na 2 kartách.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Pokud je hráč vyřazen, vezměte si do ruky všechny jeho karty. Pokud jste vyřazeni vy, zůstaňte ve hře se 4 body života, ale vraťte se na normální stranu.</>,
        descriptionClass: "legends-description text-smaller line-smaller",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Můžete zahrát libovolný počet karet <i>BANG!</i>.<br/>Místo vyzvednutí si Výkonu můžete zahrát <i>BANG!</i> zdarma.</>,
        descriptionClass: "legends-description",
    },
    
    // Legends feats cards

    FIFTY_GUNS: {
        name: "Padesát pistolí",
        description: <>Vezměte si nebo odhoďte zbraň.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Zraněná pýcha",
        description: <>Jiný hráč způsobí, že jedna z vašich karet <i>BANG!</i> mine cíl.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Banda ze starého západu",
        description: <>Zasáhněte 2 nebo více hráčů v jednom tahu.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Hrdlo lahve",
        description: <>Odhoďte kartu s pivem.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "Velký hazard",
        description: <>Zahoďte kartu s nápisem <i>BANG!</i>.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "Vlak do Yoomy",
        description: <>Udělejte nebo donuťte jiného hráče k provedení „Tahání!“ (i na začátku svého tahu).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Dobrá společnost",
        description: <>Odhoďte kartu a poté zahrajte kartu se stejným názvem (nebo naopak).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "Poslední hrdina",
        description: <>Odhoďte modrou kartu ve hře.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "Bezejmenný muž",
        description: <>Ztraťte 1 život (ne poslední).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "Zděšený výkřik",
        description: <>Zahrajte kartu <i>BANG!</i> na vzdálenost 2 nebo více.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Balada o Scrugsovi",
        description: <>Prohrajte souboj.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Pohraničí",
        description: <>Zahoďte celou ruku (i když máte 0 karet).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "Oregonská stezka",
        description: <>Během fáze losování si nelosujte první kartu, kterou máte povolenou.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Tisíc způsobů, jak zemřít",
        description: <>Ukažte z ruky kartu <i>Missed!</i> a další kartu stejné barvy.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "O pár karet navíc",
        description: <>Na konci svého tahu odhoďte alespoň 1 kartu navíc.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "Rychlá smrt",
        description: <>Zasáhněte jiného hráče v plné síle kartou <i>BANG!</i>.</>,
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
        hideTitle: true,
    },
    ROLE_SHERIFF: {
        name: "Šerif",
        description: <>Zabijte všechny psance a Odpadlíka!</>,
    },
    ROLE_DEPUTY: {
        name: "Zástupce šerifa",
        description: <>Ochraňte šerifa! Zabijte všechny psance a Odpadlíka!</>,
    },
    ROLE_OUTLAW: {
        name: "Bandita",
        description: <>Zabijte šerifa!</>,
    },
    ROLE_RENEGADE: {
        name: "Odpadlík",
        description: <>Buďte poslední ve hře!</>,
    },
    ROLE_DEPUTY_3P: {
        name: "Zástupce šerifa",
        description: <>Zabijte Odpadlíka!</>,
    },
    ROLE_OUTLAW_3P: {
        name: "Bandita",
        description: <>Zabijte zástupce!</>,
    },
    ROLE_RENEGADE_3P: {
        name: "Odpadlík",
        description: <>Zabijte psance!</>,
    },
    ROLE_SHADOW_DEPUTY: {
        name: "Stínový zástupce šerifa",
        description: <>Ochraňte šerifa! Zabijte všechny psance!</>,
    },
    ROLE_SHADOW_OUTLAW: {
        name: "Stínový bandita",
        description: <>Zabijte šerifa!</>,
    },
    
};
