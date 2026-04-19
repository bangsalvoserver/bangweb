import { CardRegistry } from "../Registry";

export const CARDS: CardRegistry = {

    // Base game cards
    
    BARREL: {
        name: "Hordó"
    },
    DYNAMITE: {
        name: "Dinamit",
        description: <>Veszítesz 3 életpontot. Ha mást húztál, add tovább a dinamitot a tőled balra ülőnek!</>,
        descriptionClass: "draw-description"
    },
    SCOPE: {
        name: "Távcső",
        description: <>1-gyel közelebbről látod a többieket.</>
    },
    MUSTANG: {
        name: "Musztáng",
        description: <>A többiek 1-gyel messzebről látnak téged.</>
    },
    JAIL: {
        name: "Börtön",
        description: <>Dobd el ezt a lapot, és folytasd a játékot! Ha mást "húztál", dobd el ezt a lapot, és egy körből kimaradsz.</>,
        descriptionClass: "draw-description"
    },
    REMINGTON: {
        name: "Remington",
        hideTitle: true
    },
    REV_CARABINE: {
        name: "Karabély",
    },
    SCHOFIELD: {
        name: "Schofield",
        hideTitle: true
    },
    VOLCANIC: {
        name: "Gyorstüzelő",
        description: <>Akárhány <i>BANG!</i> kártyát kijátszhatsz, de csak 1 távolságra</>,
        descriptionClass: "weapon-description text-smallest"
    },
    WINCHESTER: {
        name: "Winchester",
        hideTitle: true
    },
    BANG: {
        name: "BANG!",
        hideTitle: true
    },
    BEER: {
        name: "Sör"
    },
    CAT_BALOU: {
        name: "Cat Balou",
        hideTitle: true
    },
    STAGECOACH: {
        name: "Postakocsi"
    },
    DUEL: {
        name: "Párbaj",
        description: <>A játékos, akit párbajra hívsz, kijátszik egy <i>BANG!</i> kártyát, majd te is egyet, majd megint ő stb. Akinek előbb elfogy a <i>BANG!</i> kártyája, veszít 1 életpontot.</>,
        descriptionClass: "card-description text-smaller"
    },
    GENERAL_STORE: {
        name: "Szatócsbolt",
        description: <>Fordíts fel annyi lapot, ahány játékos játszik! Mindenki választ egyet.</>
    },
    GATLING: {
        name: "Gatling",
        hideTitle: true
    },
    INDIANS: {
        name: "Indiánok!",
        description: <>A többi játékosnak ki kell játszania egy <i>BANG!</i> kártyát, különben veszít 1 életpontot.</>
    },
    MISSED: {
        name: "Nem talált!"
    },
    PANIC: {
        name: "Pánik!"
    },
    SALOON: {
        name: "Kocsma",
    },
    WELLS_FARGO: {
        name: "Wells Fargo",
        hideTitle: true
    },

    // Dodge City cards

    BINOCULAR: {
        name: "Távcső",
        description: <>1-gyel közelebbről látod a többieket.</>
    },
    HIDEOUT: {
        name: "Fedezék",
        description: <>A töbiek 1-gyel messzebről látnak téged.</>
    },
    PUNCH: {
        name: "Ütés"
    },
    RAG_TIME: {
        name: "Rag Time",
        hideTitle: true
    },
    BRAWL: {
        name: "Verekedés"
    },
    DODGE: {
        name: "Kitérés"
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
        name: "Biblia"
    },
    CANTEEN: {
        name: "Kulacs"
    },
    CAN_CAN: {
        name: "Kánkán",
    },
    TEN_GALLON_HAT: {
        name: "Cowboykalap"
    },
    CONESTOGA: {
        name: "Fedett szekér",
    },
    DERRINGER: {
        name: "Derringer",
        hideTitle: true
    },
    BUFFALO_RIFLE: {
        name: "Bölényvadász puska"
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
        name: "Vaslemez"
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true
    },
    KNIFE: {
        name: "Kés"
    },
    SOMBRERO: {
        name: "Sombrero",
        hideTitle: true
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Szellem",
        description: <>Játszd ki egy kiesett játékos területére. A játékos visszatér a játékba, de nem szerezhet és veszíthet életpontokat.</>
    },
    GHOST_2: {
        name: "Szellem",
        description: <>Játszd ki egy kiesett játékos elé. A játékos visszatér a játékba a karaktere képessége nélkül, de nem szerezhet és veszíthet életpontokat.</>,
        descriptionClass: "card-description text-smaller line-smaller"
    },
    LEMAT: {
        name: "LeMat",
        hideTitle: true,
        description: <>A körödben bármelyik kártyát használhatod <i>BANG!</i> lapként.</>,
        descriptionClass: "weapon-description"
    },
    LEMAT_2: {
        name: "LeMat",
        hideTitle: true,
        description: <>A körödben bármelyik kártyát (kivéve <i>Nem talált!</i>) használhatod <i>BANG!</i> lapként.</>,
        descriptionClass: "weapon-description"
    },
    RATTLESNAKE: {
        name: "Csörgőkígyó",
        description: <>Játszd ki bármelyik játékos elé. A köre elején a játékosnak "húznia" kell, ha pikk, akkor veszít 1 életpontot.</>
    },
    SHOTGUN: {
        name: "Sörétes puska",
        description: <>Ha eltalálsz egy játékost, akkor el kell dobnia 1 általa választott kártyát a kezéből.</>,
        descriptionClass: "weapon-description"
    },
    BOUNTY: {
        name: "Vérdíj",
        description: <>Játszd ki bármelyik játékos elé. Ha ez a játékos életpontot veszít, akkor aki a sérülést okozta, húzhat 1 lapot.</>
    },
    BANDIDOS: {
        name: "Banditák",
        description: <>Minden játékos választ: eldob 2 lapot a kezéből (1-et ha csak 1 lapja van), vagy veszít 1 életpontot.</>
    },
    BANDIDOS_2: {
        name: "Banditák",
        description: <>Minden másik játékos eldob 1 <i>BANG!</i> lapot vagy 2 általa választott lapot a kezéből.</>
    },
    ESCAPE: {
        name: "Szökés",
        description: <>Körön kívül is kijátszható. Elkerülheted egy barna szegélyű lap hatását (ami nem egy <i>BANG!</i>), amelynek célpontja vagy.</>,
        descriptionClass: "card-description text-smaller"
    },
    ESCAPE_2: {
        name: "Szökés",
        description: <>Ha egyedüli célpontja vagy a lapnak (kivéve <i>BANG!</i>), dobd el ezt a lapot, hogy elkerüld a hatását.</>,
        descriptionClass: "card-description text-smaller"
    },
    AIM: {
        name: "Célpont",
        description: <>Egy <i>BANG!</i> lappal együtt játszhatod ki. Ha talál, akkor a célpont 2 életpontot veszít.</>
    },
    POKER: {
        name: "Póker",
        description: <>A többi játékos eldob 1-1 lapot a kezéből. Ha nem dobtak el ászt, akkor felvehetsz ezek közül 2 lapot.</>,
        titleClass: "card-title card-title-lower"
    },
    BACKFIRE: {
        name: "Visszacsapás",
        description: <>Egy <i>Nem talált!</i> lapnak számít.<br/>A játékos, aki meglőtt, egy <i>BANG!</i> célpontja.</>
    },
    SAVED: {
        name: "Megmentve!",
        description: <>Körön kívül is kijátszható. Megakadályozza, hogy egy másik játékos 1 életpontot veszítsen. Ha túléli, húzz 2 lapot a kezéből vagy a pakliból (te döntésed).</>,
        descriptionClass: "card-description text-smaller"
    },
    SAVED_2: {
        name: "Megmentve!",
        description: <>Csak körön kívül játszható ki. Megakadályozza, hogy egy másik játékos 1 életpontot veszítsen. Ha bárkit megmentesz a kieséstől, húzz 2 lapot a kezéből.</>,
        descriptionClass: "card-description text-smaller"
    },
    FANNING: {
        name: "Sortűz",
        description: <><i>BANG!</i> kijátszásának számít. Válassz egy második célpontot az elsőtől 1 távolságra.</>,
        descriptionClass: "card-description"
    },
    TOMAHAWK: {
        name: "Tomahawk",
        hideTitle: true
    },
    TORNADO: {
        name: "Tornádó",
        description: <>Minden játékos eldob (ha tud) a kezéből 1 lapot. Ezután mindenki húz 2 lapot.</>,
        titleClass: "card-title card-title-lower"
    },
    TORNADO_2: {
        name: "Tornádó",
        description: <>Minden játékosnak át kell adnia 2 lapot a kezéből a tőle balra ülőnek.</>,
        titleClass: "card-title card-title-lower"
    },
    LAST_CALL: {
        name: "Végső harc"
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Karaván"
    },
    A_LITTLE_NIP: {
        name: "Egy kis korty"
    },
    QUICK_SHOT: {
        name: "Gyorstüzelés",
        description: <>Lőjj rá egy másik játékosra is.</>,
        descriptionClass: "cube-description"
    },
    FLINTLOCK: {
        name: "Kovás puska",
        description: <>Ha hatástalanították, vedd vissza ezt a kártyát a kezedbe.</>,
        descriptionClass: "cube-description-lower text-smallest"
    },
    ARROW: {
        name: "Nyílvessző",
        description: [
            <>A célpont eldob egy <i>BANG!</i> kártyát a kezéből vagy veszít 1 életpontot.</>,
            <>Még egy játékosra kijátszható.</>
        ],
        descriptionClass: "cube-description-double"
    },
    DUCK: {
        name: "Fedezékbe!",
        description: <>Vedd vissza a kártyát a kezedbe.</>,
        descriptionClass: "cube-description-lower"
    },
    RELOAD: {
        name: "Újratöltés",
        description: <>Tegyél 3 📦 jelölőt a kártyáidra vagy a karakteredre!</>
    },
    RUST: {
        name: "Rozsda",
        description: <>Minden más játékosnak át kell raknia 1 📦 jelölőt minden Gyilkos kaliber kártyájáról és a karakteréről a te karakteredre.</>
    },
    SQUAW: {
        name: "Indián asszony",
        description: [
            <>Dobd el bármelyik játékban lévő kártyát!</>,
            <>Az eldobatott lapot vedd a kezedbe!</>
        ],
        descriptionClass: "cube-description-double"
    },
    ACE_UP_THE_SLEEVE: {
        name: "Ász az ingujjban"
    },
    BANDOLIER: {
        name: "Tölténytartó",
        description: <>A körödben egyszer kijátszhatsz egy extra <i>BANG!</i> lapot.</>,
        descriptionClass: "cube-description"
    },
    BIG_FIFTY: {
        name: "Nagy Ötvenes",
        description: <>Hatástalanítsd a célpont játékos képességét és a játékban lévő kártyáinak hatását!</>,
        descriptionClass: "cube-description text-smallest"
    },
    BOMB: {
        name: "Bomba",
        description: <>Bármelyik játékosra kijátszható. A köröd elején "húzz!":<br/>♥️♦️= tedd a <i>Bomba</i> lapot bármelyik másik játékos elé.<br/>♣️♠️= dobj el 2 📦 jelölőt: ha nem marad rajta több, 2 életpontot veszítesz.</>,
        descriptionClass: "card-description-higher text-smaller"
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        hideTitle: true,
        description: <>Ha a <i>BANG!</i> hatástalan volt, a célpontnak el kell dobnia 1 általa választott kártyát!</>,
        descriptionClass: "cube-description"
    },
    BELL_TOWER: {
        name: "Harangtorony",
        description: <>Minden játékost 1 távolságra látsz a következő kijátszott lapodra.</>,
        descriptionClass: "cube-description"
    },
    CRATE: {
        name: "Láda"
    },
    TUMBLEWEED: {
        name: "Ördögszekér",
        description: <>A játékosnak meg kell ismételnie a "ráhúzást"!</>,
        descriptionClass: "cube-description"
    },
    DOUBLE_BARREL: {
        name: "Duplacsövű",
        description: <>Ha a kijátszott <i>BANG!</i> lapod ♦️ színű, akkor nem hatástalanítható.</>,
        descriptionClass: "cube-description"
    },
    WHIP: {
        name: "Ostor",
        description: <>Dobd el bármelyik játékban lévő lapot!</>,
        descriptionClass: "cube-description"
    },
    BEER_KEG: {
        name: "Sörös hordó"
    },
    LOCKPICK: {
        name: "Zárfeltörés",
        description: <>Húzz 1 lapot bármelyik játékos kezéből!</>,
        descriptionClass: "cube-description"
    },
    THUNDERER: {
        name: "Thunderer",
        hideTitle: true,
        description: <>Vedd vissza a <i>BANG!</i> kártyát a kezedbe!</>,
        descriptionClass: "cube-description"
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Sírrabló",
        description: <>Húzz annyi eldobott kártyát, ahány játékos van.<br/>Mindenki választ egyet.</>
    },
    CARD_SHARPER: {
        name: "Kártya élező",
        description: <>Cseréld ki az egyik kék szegélyű játékban lévő kártyádat egy másik játékos előtt lévő azonos színű kártyára.</>
    },
    MIRAGE: {
        name: "Délibáb",
        description: <>Egy <i>Nem talált!</i> lapnak számít.<br/>A rád lövő játékos köre azonnal véget ér.</>
    },
    BLOOD_PACT: {
        name: "Vérszerződés"
    },
    SACRIFICE: {
        name: "Áldozat",
        description: <>Körön kívül is kijátszható. Egy másik játékos helyett te veszítesz 1 életpontot. Azután, ha lehetséges, húzz 2 lapot a pakliból (3-at, ha túlélte).</>,
        descriptionClass: "card-description text-smaller"
    },
    DISARM: {
        name: "Lefegyverezés",
        description: <>Egy <i>Nem talált!</i> lapnak számít.<br/>A rád lövő játékosnak el kell dobnia 1 lapot a kezéből.</>
    },
    MOLOTOV: {
        name: "Molotov",
        hideTitle: true
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true,
        description: <>A körödben egyszer kijátszhatsz egy <i>BANG!</i> lapot <i>Gatling</i>-ként, ha eldobsz mellé egy másik lapot.</>,
        descriptionClass: "weapon-description"
    },
    LAST_WILL: {
        name: "Végakarat",
        description: <>Bármelyik játékosra kijátszható. Ha kiesik, átadhat legfeljebb 3 kártyát (a kezéből vagy maga elől) egy másik játékosnak.</>
    },
    INDIAN_GUIDE: {
        name: "Indián tolmács",
        description: <>Játszd ki magad elé. Az <i>Indiánok!</i> és a <i>Háborús ösvény</i> lapok nincsenek rád hatással.</>
    },
    TAXMAN: {
        name: "Adóbeszedő",
        description: <>Játszd ki bárki elé. A köre elején "húz!": pikk és treff esetén 1-gyel kevesebb lapot húz az első fázisban.</>
    },
    BROTHEL: {
        name: "Bordélyház",
        description: <>Dobd el a lapot és folytasd a játékot, de a következő körig elveszted a karaktered képességét. Ha mást húztál, dobd el, és folytasd a játékot a megszokott módon.</>,
        descriptionClass: "draw-description text-smallest"
    },
    BRONCO: {
        name: "Vadló",
        description: <>A többi játékos 1-gyel távolabbról lát. Nem lehet előtted <i>Mustang</i> lappal együtt. 2 lap eldobásával eldobatható.</>
    },
    PACK_MULE: {
        name: "Málhás összvér",
        description: <>Több lap maradhat a kezedben, mint ahány életpontod van. Nem használhatod <i>Musztáng</i>-gal vagy <i>Vadló</i>-val.</>
    },
    WAR_PATH: {
        name: "Háborús ösvény",
        description: <>Minden másik játékosnak el kell dobnia 1 lapot, vagy veszít 1 életpontot.</>
    },
    ARSON: {
        name: "Gyújtogatás"
    },
    FLYING_BULLET: {
        name: "Kósza golyó",
        description: <>Egy <i>Nem talált!</i> lapnak számít.<br/> Egy tőled 1 távolságra lévő játékos (ha van ilyen) lesz a <i>BANG!</i> célpontja.</>
    },
    ON_THE_HOUSE: {
        name: "A ház ajándéka"
    },
    GUITAR: {
        name: "Gitár",
        description: <>Játszd ki bárki elé. Amíg el nem távolítják, a játékos nem játszhat ki <i>BANG!</i> lapokat (vagy olyan lapokat, amik lőtávolságtól függenek).</>
    },
    SCRAPPER: {
        name: "Bajkeverő"
    },
    SHYLOCK: {
        name: "Uzsorás"
    },

    // Frontier cards

    BALLAD: {
        name: "Ballad",
        description: <>Force a player to take all cards in front of him into hand. You may then draw a card from his hand.</>
    },
    COFFIN: {
        name: "Coffin",
        description: <>At the end of your turn, you are considered out of the game until the start of your next turn. Then, discard this card.</>
    },
    UNDERTAKER: {
        name: "Undertaker",
        description: <>Track a player.<br/>When he is eliminated, only you can see his role. It cannot be revealed for the rest of the game.</>,
        descriptionClass: "card-description-higher"
    },
    COFFEE: {
        name: "Coffee",
        description: <>At the end of this turn, you do not discard cards.</>
    },
    CHINATOWN: {
        name: "Chinatown",
        description: <>Force a player to discard their entire hand.<br/>They may draw the same amount of cards from the deck.</>,
        hideTitle: true,
        descriptionClass: "card-description text-smaller"
    },
    CHUCK_WAGON: {
        name: "Chuck Wagon",
        description: <>At the end of each of your turns, if you played at least 3 cards, gain 1 life point.</>,
        hideTitle: true,
    },
    CHOLERA: {
        name: "Cholera",
        description: <>Play on any player. That player cannot use their special ability.<br/>At the end of your turn, "draw!": on Spades, add 1 📦.</>
    },
    COMANCHE: {
        name: "Comanche",
        description: <>Track a player.<br/>After drawing, during each of your turns, you have his ability once.</>,
        hideTitle: true
    },
    COMPANION: {
        name: "Companion",
        description: <>Track a player.<br/>During your turn, you may play brown cards as if from his position.</>
    },
    COYOTES: {
        name: "Coyotes",
        description: <>Discard a card or lose 1 life point. Else, pass <i>Coyotes</i> to your left.</>,
        descriptionClass: "draw-description text-smaller"
    },
    FEUD: {
        name: "Feud",
        description: <>You may neither play this card nor discard it at the end of your turn.</>
    },
    FALCON: {
        name: "Falcon",
        description: <>Look at another player's hand.</>,
        descriptionClass: "card-description-lower"
    },
    CAMPFIRE: {
        name: "Campfire",
        description: <>Discard your weapon in play. When you play a weapon, discard this card.<br/>You view others at distance 1.</>
    },
    STAMPEDE: {
        name: "Stampede",
        description: <>Players with more than 4 cards in front of them must discard them all.</>
    },
    GEYSER: {
        name: "Geyser",
        hideTitle: true
    },
    HAWKEN: {
        name: "Hawken",
        description: <>When you hit a player, you may force him to take all his cards in play back into hand.</>,
        hideTitle: true,
        descriptionClass: "weapon-description"
    },
    HEAVY_GRUB: {
        name: "Heavy Grub",
        description: <>If discarded at the end of your turn, gain 3 life points.</>,
        hideTitle: true
    },
    JACKALOPE: {
        name: "Jackalope",
        description: <>If drawn or discarded from your hand by another player, you may draw 2 cards.</>,
        hideTitle: true
    },
    MULE: {
        name: "Mule"
    },
    GRIZZLY: {
        name: "Grizzly"
    },
    PELTS: {
        name: "Pelts",
        description: <>If there are 4 📦 on this card, switch it with another card in play.</>, // TODO fix this?
        descriptionClass: "cube-description"
    },
    FISHING: {
        name: "Fishing",
        description: <>Name a suit and "draw!" as many times as the number of other players. You may take all cards of the named suit drawn into hand.</>
    },
    PIONEERS: {
        name: "Pioneers",
        description: <>Track yourself.<br/>At the start of your turn, pass <i>Pioneers</i> left.<br/>If passed by the tracked player, discard it and he draws as many cards as the number of other players.</>,
        descriptionClass: "card-description-higher text-smallest"
    },
    POSSE: {
        name: "Posse",
        description: <>Track a player.<br/>At the start of your turn, pass <i>Posse</i> left. If passed by the tracked player, discard it and he loses 1 life point.</>,
        hideTitle: true
    },
    SCALP: {
        name: "Scalp!",
        description: <>During your turn, use the ability of another character once.</>,
        hideTitle: true,
        descriptionClass: "cube-description"
    },
    SCORPION: {
        name: "Scorpion",
        description: <>Play on any player. Whenever he plays a card in front of anyone, "draw!": on Spades, he must play <i>Missed!</i> or discard the card.</>
    },
    SLOCUM: {
        name: "Slocum",
        description: <>When you play a <i>BANG!</i> card, draw a card. If you did not play a <i>BANG!</i> card this turn, discard this card.</>,
        hideTitle: true,
        descriptionClass: "weapon-description"
    },
    TARANTULA_JUICE: {
        name: "Tarantula Juice",
        description: <>"Draw!":<br/>♥♦=gain 2 life points.<br/>♣=draw a card.<br/>♠=lose 1 life point.</>,
        hideTitle: true
    },
    CATTLE_DRIVE: {
        name: "Cattle Drive",
        description: <>Draw a card for each card in front of you.</>
    },
    TRAP: {
        name: "Trap",
        description: <>Play on any player. He may not play blue cards.<br/>Once per turn, he may "draw!":<br/>♥=Pass this card to another player.<br/>♠=Discard this card and lose 1 life point.</>,
        descriptionClass: "card-description text-smallest"
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Valahányszor eltalálják, húz 1 lapot.</>,
        descriptionClass: "character-description"
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Ha "húz", mindig megmutatja a második lapot. Ha az kőr vagy káró, húz még 1 lapot.</>,
        descriptionClass: "character-description"
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Kijátszhat <i>BANG!</i> kártyát <i>Nem talált!</i>-ként és fordítva.</>,
        descriptionClass: "character-description"
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Valahányszor eltalálják, húz 1 lapot annak a játékosnak a kezéből, aki eltalálta.</>,
        descriptionClass: "character-description"
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Az első lapot húzhatja egy másik játékos kezéből.</>,
        descriptionClass: "character-description"
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Valahányszor rálőnek egy <i>BANG!</i> kártyávál, "húzhat" egy lapot. Ha kőrt "húz", a lövés nem talált.</>,
        descriptionClass: "character-description"
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Amikor lapot húz, megnézi a legfelső 3 lapot a húzópakliból, és kiválaszt közülük 2-t.</>,
        descriptionClass: "character-description"
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Valahányszor lapot kell "húznia", felfordítja a felső két lapot, és választ egyet.</>,
        descriptionClass: "character-description"
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>A többi játékos 1-gyel messzebbről látja.</>,
        descriptionClass: "character-description"
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Az első lapját a dobópakli tetejéről is húzhatja.</>,
        descriptionClass: "character-description"
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>1-gyel közelebbről látja a többi játékost.</>,
        descriptionClass: "character-description"
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Ha eldob 2 lapot, visszanyer 1 életpontot.</>,
        descriptionClass: "character-description"
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Ha <i>BANG!</i> kártyával rálő egy játékosra, az csak 2 <i>Nem talált!</i> lappal tud kitérni.</>,
        descriptionClass: "character-description"
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Ha nem marad lap a kezében, húz 1-et.</>,
        descriptionClass: "character-description"
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Valahányszor egy játékos kiesik a játékból, megkapja a lelőtt játékos megmaradt lapjait.</>,
        descriptionClass: "character-description"
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Akárhány <i>BANG!</i> kártyát kijátszhat.</>,
        descriptionClass: "character-description"
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Miklós \"A Szent\"",
        hideTitle: true,
        description: <>Eggyel több lapot húz, mint ahány játékos van, 2-t kiválaszt magának, majd minden játékosnak ad 1-et.</>,
        descriptionClass: "character-description"
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true,
        description: <>Valahányszor kijátszik maga elé egy lapot, minden ugyanolyan nevű játékban lévő lapot el kell dobni.</>,
        descriptionClass: "character-description"
    },
    UNCLE_WILL: {
        name: "Will bácsi",
        hideTitle: true,
        description: <>A körében egyszer bármilyen kártyát kijátszhat a kezéből egy <i>Szatócsbolt</i>-ként.</>,
        descriptionClass: "character-description"
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true,
        description: <>Bármilyen kártyát használhat <i>BANG!</i>-ként.</>,
        descriptionClass: "character-description"
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true,
        description: <>Mindig, amikor egy <i>BANG!</i> kártyádat kivédik egy <i>Nem talált!</i> kártyával, húzd fel azt a <i>Nem talált!</i> kártyát. Ha te védesz ki <i>BANG!</i> kártyát <i>Nem talált!</i> kártyával, húzd fel azt a <i>BANG!</i> kártyát.</>,
        descriptionClass: "character-description"
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        hideTitle: true,
        description: <>A mások által kijátszott káró lapok nincsenek rá hatással.</>,
        descriptionClass: "character-description"
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true,
        description: <>Körében a mások előtt lévő lapoknak nincs hatása.</>,
        descriptionClass: "character-description"
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true,
        description: <>Húz 1 lapot, és minden elveszített életpontjáért még 1-et.</>,
        descriptionClass: "character-description"
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true,
        description: <>Köre során 1 életpontért cserébe húzhat 2 lapot.</>,
        descriptionClass: "character-description"
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true,
        description: <>Köre során egyszer eldobhat a kezéből 2 lapot, hogy egy <i>BANG!</i>-ként játssza ki őket.</>,
        descriptionClass: "character-description"
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true,
        description: <>Bármilyen kártyát használhat <i>Nem talált!</i>-ként.</>,
        descriptionClass: "character-description"
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true,
        description: <>Amikor egy másik játékos kiesik, visszakap 2 életpontot.</>,
        descriptionClass: "character-description"
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true,
        description: <>Amikor egy másik játékos kiesik, húz 2 lapot.</>,
        descriptionClass: "character-description"
    },
    JOSE_DELGADO: {
        name: "José Delgado",
        hideTitle: true,
        description: <>Köre során legfeljebb 2 kék szegélyű lapot eldobhat kézből, és mindegyikért húzhat 2 lapot.</>,
        descriptionClass: "character-description"
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true,
        description: <>Minden egyes alkalommal, ha nem a saját körében játszik ki a kezéből egy lapot, húz 1 lapot.</>,
        descriptionClass: "character-description"
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true,
        description: <>Köre elején 2 lap helyett 1 másik játékos előtt lévő lapot húzhat.</>,
        descriptionClass: "character-description"
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true,
        description: <>3 lapot húz 2 helyett.</>,
        descriptionClass: "character-description"
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true,
        description: <>Akár 10 lapot is tarthat a kezében.</>,
        descriptionClass: "character-description"
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true,
        description: <>Minden kijátszott <i>Sör</i> lapért 2 életpontot kap 1 helyett.</>,
        descriptionClass: "character-description"
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true,
        description: <>Egy teljes körre felveheti valamelyik másik játékban lévő karakter képességét.</>,
        descriptionClass: "character-description"
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Fekete Virág",
        hideTitle: true,
        description: <>Körönként egyszer egy treff lapot használhatsz egy extra <i>BANG!</i> lapként.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Ha <i>BANG!</i> lapot játszol ki, "húzz" egy lapot! Ha pikket "húzol", akkor a <i>BANG!</i> nem védhető ki.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Ha a célpont <i>Nem talált!</i> lapot játszik ki a <i>BANG!</i> lapodra, akkor "húzz". Ha pikk, akkor a <i>Nem talált!</i> lapnak nincs hatása, és a célpont 1 életpontot veszít.</>  ,
        descriptionClass: "character-description"
    },
    DER_SPOT_BURST_RINGER: {
        name: "Villámkezű",
        hideTitle: true,
        description: <>Körönként egyszer kijátszhatsz egy <i>BANG!</i> lapot <i>Gatling</i>-ként.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Kihagyhatod a húzást az 1. fázisban. Minden kihagyott lapért lőhetsz egy <i>BANG!</i>-et különböző elérhető távolságú célpontokra.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Eggyel kevesebb lapot húzhat, hogy egy <i>BANG!</i>-et lőjjön 1 távolságra.</>,
        descriptionClass: "character-description"
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true,
        description: <>A játékos, aki elhúzza vagy eldobja egy lapodat (kézből vagy előled), egy <i>BANG!</i> célpontja.</>,
        descriptionClass: "character-description"
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim",
        hideTitle: true,
        description: <>Mindig, amikor egy másik játékos <i>Sör</i> lapot játszik ki, eldobhatsz egy lapot, hogy visszakapj 1 életpontot.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Ha egy barna szegélyű lap célpontja vagy, ami nem <i>BANG!</i>, használhatsz egy <i>Nem talált!</i> lapot a kivédésére.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Ha egy lap egyedüli célpontja, kijátszhat egy <i>Nem talált!</i> lapot a kivédésére.</>,
        descriptionClass: "character-description"
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true,
        description: <>Ha a köröd elején nincs előtted kék szegélyű lap, húzz még 2 lapot.</>,
        descriptionClass: "character-description"
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>5 kártyával kezded a játékot. Nem játszhatsz ki <i>Nem talált!</i> lapot.</>,
        descriptionClass: "character-description"
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true,
        description: <>Körönként egyszer odaadhatod 1 lapodat a kezedből egy másik játékosnak, hogy húzz a kezéből 2 lapot.</>,
        descriptionClass: "character-description"
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true,
        description: <>A többi játékos által, a körük végén eldobott lapokat megkapja.</>,
        descriptionClass: "character-description"
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true,
        description: <>A köröd elején húzhatsz 2 karakterkártyát. Mindkét karakter képességeivel rendelkezel.</>,
        descriptionClass: "character-description"
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true,
        description: <>Ha kevesebb, mint 6 lap van a kezében, és egy játékos "húz", akkor a kezedbe veheted az így felcsapott lapot.</>,
        descriptionClass: "character-description"
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true,
        description: <>Körében eldobhat egy <i>BANG!</i> lapot, hogy megismételje az általa legutóbb kijátszott barna szegélyű lap hatását.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Ha kiesnél, "húzz". Ha nem pikk, akkor 1 életponttal a játékban maradsz, és húzol 1 lapot.</>,
        descriptionClass: "character-description"
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true,
        description: <>Húzása előtt minden játékos, akinek nála több lap van a kezében, ad neki egy tetszőleges lapot.</>,
        descriptionClass: "character-description"
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true,
        description: <>Ha egy másik játékos kék vagy narancs szegélyű lapot játszik ki, 2 📦 jelölőért cserébe húzhatsz 1 lapot a pakliból.</>,
        descriptionClass: "character-description"
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true,
        description: <>A körödben egyszer egy lap eldobásáért rátehetsz 2 📦 jelölőt valamelyik kártyádra.</>,
        descriptionClass: "character-description"
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true,
        description: <>Ha hatástalanítják egy <i>BANG!</i> kártyádat, húzz egy lapot a pakliból!</>,
        descriptionClass: "character-description"
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true,
        description: <>A körödben egyszer 1 📦 jelölőt áttehetsz erre a kártyára bármely másik lapról.</>,
        descriptionClass: "character-description"
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true,
        description: <>Ha másik játékos miatt legalább 1 életpontot veszítenél, "húzz rá":<br/>♥️♦️= <i>BANG!</i> célpontjává válik.</>,
        descriptionClass: "character-description"
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true,
        description: <>A körödben egyszer 2 📦 jelölőért cserébe egy extra <i>BANG!</i>-et játszhatsz ki (kártya nélkül).</>,
        descriptionClass: "character-description"
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true,
        description: <>Figyelmen kívül hagyhatod a J, Q, K, A értékű, barna szegélyű lapok hatását, ha te vagy az egyetlen célpont.</>,
        descriptionClass: "character-description"
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true,
        description: <>4 📦 jelölővel kezded a játékot. A körödben egyszer 2 📦 jelölőt áttehetsz erről a lapról a kártyáidra.</>,
        descriptionClass: "character-description"
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true,
        description: <>A köre végén "húz" egy lapot: ha ez piros, akkor van még egy köre.</>,
        descriptionClass: "character-description"
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true,
        description: <>Húz két lapot, eldob egyet, és elvesz egy aranyrögöt.</>,
        descriptionClass: "character-description"
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true,
        description: <>A köre során fizethet 2 aranyrögöt, hogy kijátsszon egy extra <i>BANG!</i> lapot.</>,
        descriptionClass: "character-description"
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true,
        description: <>Két aranyrögért elveheti a felszereléspakli legfelső lapját.</>,
        descriptionClass: "character-description"
    },
    MADAME_YTO: {
        name: "Madam Yto",
        hideTitle: true,
        description: <>Mindig, ha valaki kijátszik egy Sör kártyát, húz 1 lapot a pakliból.</>,
        descriptionClass: "character-description"
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true,
        description: <>Körönként egyszer 1 aranyröggel olcsóbban vásárolhat egy felszerelést.</>,
        descriptionClass: "character-description"
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true,
        description: <>A köre során eldobhat 1 aranyrögöt, hogy húzhasson 1 lapot a pakliból (legfeljebb kétszer).</>,
        descriptionClass: "character-description"
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true,
        description: <>Mindig, ha elveszít 1 életpontot, kap 1 aranyrögöt.</>,
        descriptionClass: "character-description"
    },

    // High Noon cards

    BLESSING: {
        name: "Áldás",
        description: <>Az összes lap kártyaszíne kőr.</>,
        titleClass: "card-title card-title-lower"
    },
    GHOST_TOWN: {
        name: "Szellemváros",
        description: <>A kiesett játékosok visszatérnek szellemként a körükben. 3 lapot húznak 2 helyett, és nem eshetnek ki. A körük legvégén újra kiesnek.</>,
        descriptionClass: "card-description",
        titleClass: "card-title card-title-lower"
    },
    INVERT_ROTATION: {
        name: "Aranyláz",
        description: <>A játék iránya megfordul, a seriffel kezdve folytatódik. Minden lap hatása továbbra is balra halad.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_DALTONS: {
        name: "A Daltonok",
        description: <>Amikor <i>A Daltonok</i> játékba kerülnek, minden játékosnak el kell dobnia egy kijátszott kék kártyáját.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_DOCTOR: {
        name: "Az orvos",
        description: <>Amikor <i>Az Orvos</i> játékba lép, a legkevesebb életponttal rendelkező játékos(ok) visszakap(nak) 1 életpontot.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_REVEREND: {
        name: "A tiszteletes",
        description: <>A játékosok nem játszhatnak ki <i>Sör</i> lapokat.</>,
        titleClass: "card-title card-title-lower"
    },
    TRAIN_ARRIVAL: {
        name: "Vasúti szállítmány",
        description: <>A játékos az 1. fázisában eggyel több lapot húzhat.</>,
        titleClass: "card-title card-title-lower"
    },
    CURSE: {
        name: "Átok",
        description: <>Minden lap kártyaszíne pikk.</>,
        titleClass: "card-title card-title-lower"
    },
    HANGOVER: {
        name: "Másnaposság",
        description: <>A játékosok nem használhatják a karaktereik képességeit.</>,
        titleClass: "card-title card-title-lower"
    },
    SERMON: {
        name: "Prédikáció",
        description: <>A játékosok nem használhatnak <i>BANG!</i> lapokat a körükben.</>,
        titleClass: "card-title card-title-lower"
    },
    THIRST: {
        name: "Szomjúság",
        description: <>A játékos az 1. fázisában csak 1 lapot húzhat.</>,
        titleClass: "card-title card-title-lower"
    },
    SHOOTOUT: {
        name: "Tűzharc",
        description: <>Minden játékos kijátszhat egy második <i>BANG!</i> lapot a körében.</>,
        titleClass: "card-title card-title-lower"
    },
    HANDCUFFS: {
        name: "Bilincs",
        description: <>A játékos a körének 1. fázisa végén megnevez egy kártyaszínt. A 2. fázisban csak ilyen lapokat játszhat ki.</>,
        titleClass: "card-title card-title-lower"
    },
    HANDCUFFS_HEARTS: {
        name: "Bilincs: Kőr",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Bilincs: Káró",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_CLUBS: {
        name: "Bilincs: Treff",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_SPADES: {
        name: "Bilincs: Pikk ",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    NEW_IDENTITY: {
        name: "Új identitás",
        description: <>A köre elején a játékos húz egy másik karakterkártyát. Átválthat az új karakterre a játék hátralévő részében, 2 életponttal kezdve.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description"
    },
    HIGH_NOON: {
        name: "Délidő",
        description: <>A köre elején a játékos veszít 1 életpontot.</>,
        titleClass: "card-title card-title-lower"
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Rajtaütés",
        description: <>Minden játékos között a távolság 1. Ezt a játékban lévő kártyák módosíthatják.</>,
        titleClass: "card-title card-title-lower"
    },
    SNIPER: {
        name: "Orvlövész",
        description: <>A köre során a játékos eldobhat egyszerre 2 <i>BANG!</i> lapot egy másik játékos ellen. Ez egy <i>BANG!</i>-nek számít, de 2 <i>Nem talált!</i> lappal lehet kivédeni.</>,
        descriptionClass: "card-description text-smaller",
        titleClass: "card-title card-title-lower"
    },
    DEAD_MAN: {
        name: "Tetszhalott",
        description: <>A köre elején az elsőnek kiesett játékos visszakerül a játékba 2 életponttal és 2 lappal.</>,
        titleClass: "card-title card-title-lower"
    },
    BLOOD_BROTHERS: {
        name: "Vértestvérek",
        description: <>A köre elején minden játékos feláldozhatja 1 életpontját (kivéve az utolsót), hogy azt egy általa választott másik játékosnak adja.</>,
        descriptionClass: "card-description text-smaller",
        titleClass: "card-title card-title-lower"
    },
    THE_JUDGE: {
        name: "A bíró",
        description: <>A játékosok nem játszhatnak ki lapokat sem maguk, sem mások elé.</>,
        titleClass: "card-title card-title-lower"
    },
    LASSO: {
        name: "Lasszó",
        description: <>A játékosok előtt lévő lapok hatástalanok.</>,
        titleClass: "card-title card-title-lower"
    },
    LAW_OF_THE_WEST: {
        name: "A nyugat törvénye",
        description: <>Minden játékos, köre 1. fázisában, megmutatja a második húzott lapját. Ha tudja, ki kell játszania azt.</>,
        titleClass: "card-title card-title-lower"
    },
    HARD_LIQUOR: {
        name: "Tüzes víz",
        description: <>Minden játékos kihagyhatja a köre 1. fázisát, hogy visszakapjon 1 életpontot.</>,
        titleClass: "card-title card-title-lower"
    },
    ABANDONED_MINE: {
        name: "Elhagyatott bánya",
        description: <>Minden játékos, köre 1. fázisában, a dobópakliból húz (ha az elfogyott, a húzópakliból). A 3. fázisban pedig a húzópaklira lefordítva dobja el a lapjait.</>,
        descriptionClass: "card-description text-smallest",
        titleClass: "card-title card-title-lower"
    },
    PEYOTE: {
        name: "Meszkalinkaktusz",
        description: <>Minden játékosnak a köre elején meg kell tippelnie, hogy a pakli első lapjának színe piros vagy fekete. Majd húz és megmutatja: ha eltalálja, megkapja a lapot, és újra tippelhet, ellenkező esetben a 2. fázisa következik.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest line-smaller"
    },
    PEYOTE_RED: {
        name: "Meszkalinkaktusz: Piros szín",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    PEYOTE_BLACK: {
        name: "Meszkalinkaktusz: Fekete szín",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    RANCH: {
        name: "Farm",
        description: <>Minden játékos, körének 1. fázisa végén, eldobhat egyszer bármennyi lapot a kezéből, majd húzhat ugyanannyit a pakliból.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description"
    },
    RICOCHET: {
        name: "Lepattanó lövés",
        description: <>A játékos eldobhat <i>BANG!</i> lapokat bármelyik játékos játékban lévő lapjára. Ezeket a lapokat el kell dobni, kivéve, ha a tulajdonosuk megvédi őket <i>Nem talált!</i> lapok eldobásával.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest line-smaller"
    },
    RUSSIAN_ROULETTE: {
        name: "Orosz rulett",
        description: <>Amikor az <i>Orosz rulett</i> játékba lép, a serifftől kezdve minden játékos eldob egy <i>Nem talált!</i> lapot, addig, amíg egy játékos nem tud, ekkor ő veszít 2 életpontot, és a rulett véget ér.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    VENDETTA: {
        name: "Vérbosszú",
        description: <>A köre végén minden játékos "húz": ha kőr, játszik még egy kört (de nem "húz" még egyszer).</>,
        titleClass: "card-title card-title-lower"
    },
    A_FISTFUL_OF_CARDS: {
        name: "Egy maréknyi kártya",
        description: <>A köre elején a játékos annyi <i>BANG!</i> célpontjává válik, ahány lap van a kezében.</>,
        titleClass: "card-title card-title-lower"
    },

    // Wild West Show cards

    GAG: {
        name: "Szájpecek",
        description: <>A játékosok nem beszélhetnek (lehet mutogatni, hümmögni, ...). Aki megszólal, veszít 1 életpontot.</>,
        titleClass: "card-title card-title-higher"
    },
    BONE_ORCHARD: {
        name: "Csontok kertje",
        description: <>A körük elején a kiesett játékosok visszakerülnek a játékba 1 életponttal. A játékos húzzon egy szerepet véletlenszerűen a kiesett játékosok szerepei közül.</>,
        titleClass: "card-title card-title-higher",
        descriptionClass: "card-description text-smaller line-smaller"
    },
    DARLING_VALENTINE: {
        name: "Darling Valentine",
        hideTitle: false,
        description: <>A köre elején minden játékos eldobja a kezében lévő lapokat, majd húz ugyanannyi lapot.</>,
        titleClass: "card-title card-title-higher"
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage",
        hideTitle: false,
        description: <>A játékos a körében egy másik játékost egy lapjának kijátszására kényszerítheti.</>,
        titleClass: "card-title card-title-higher"
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        hideTitle: false,
        description: <>Amikor <i>Helena</i> játékba kerül, "húzz": ha kőr vagy káró, akkor oszd újra a játékban lévő szerepeket, kivéve a seriffet.</>,
        titleClass: "card-title card-title-higher"
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Texas rózsája",
        description: <>A játékos a körében helyet cserélhet a tőle jobbra ülő játékossal, akinek kimarad a következő köre.</>,
        titleClass: "card-title card-title-higher"
    },
    MISS_SUSANNA: {
        name: "Miss Susanna",
        hideTitle: false,
        description: <>Minden játékosnak a körében legalább három lapot ki kell játszania, különben veszít 1 életpontot.</>,
        titleClass: "card-title card-title-higher"
    },
    SHOWDOWN: {
        name: "Leszámolás",
        description: <>Minden lap kijátszható <i>BANG!</i> lapként. Minden <i>BANG!</i> kijátszható <i>Nem talált!</i> lapként.</>,
        titleClass: "card-title card-title-higher"
    },
    SACAGAWAY: {
        name: "Sacagaway",
        hideTitle: false,
        description: <>Mindenki nyílt lapokkal játszik (kivéve a szerepeket).</>,
        titleClass: "card-title card-title-higher"
    },
    WILD_WEST_SHOW: {
        name: "Vadnyugati show",
        description: <>Minden játékos célja, hogy egyedül ő maradjon életben.</>,
        titleClass: "card-title card-title-higher"
    },

    // Gold Rush cards

    SHOT: {
        name: "Feles",
        description: <>Az általad választott játékos (beleértve téged is) visszakap 1 életpontot.</>
    },
    BOTTLE: {
        name: "Palack",
        description: <>Kijátszható <i>Pánik!</i>-ként, <i>Sör</i>-ként vagy <i>BANG!</i>-ként.</>
    },
    BOTTLE_PANIC: {
        name: "Palack Pánik!-ként",
        hideTitle: true
    },
    BOTTLE_BEER: {
        name: "Palack Sör-ként",
        hideTitle: true
    },
    BOTTLE_BANG: {
        name: "Palack Bang!-ként",
        hideTitle: true
    },
    CALUMET: {
        name: "Békepipa",
        description: <>A más játékosok által kijátszott káró lapoknak nincs rád hatása.</>
    },
    GUN_BELT: {
        name: "Fegyveröv",
        description: <>A köröd végén 8 lap lehet a kezedben.</>
    },
    PARDNER: {
        name: "Partner",
        description: <>Kijátszható <i>Szatócsbolt</i>-ként, <i>Párbaj</i>-ként vagy <i>Cat Balou</i>-ként.</>
    },
    PARDNER_GENERAL_STORE: {
        name: "Partner Szatócsbolt-ként",
        hideTitle: true,
        description: <>Fordíts fel annyi lapot, ahány játékos játszik! Mindenki választ egyet.</>
    },
    PARDNER_DUEL: {
        name: "Partner Párbaj-ként",
        hideTitle: true,
        description: <>A játékos, akit párbajra hívsz, eldob egy <i>BANG!</i> lapot, majd te is egyet, majd megint ő stb. Akinek előbb elfogy a <i>BANG!</i> lapja, veszít 1 életpontot.</>
    },
    PARDNER_CAT_BALOU: {
        hideTitle: true,
        name: "Partner Cat Balou-ként",
    },
    GOLD_RUSH: {
        name: "Aranyláz",
        description: <>A köröd véget ér. Visszakapod az összes életpontodat, majd van még egy köröd.</>
    },
    HORSESHOE: {
        name: "Patkó",
        description: <>Mindig, amikor "húznod" kell, fordíts fel még egy lapot, és válassz egyet.</>
    },
    PICKAXE: {
        name: "Csákány",
        description: <>A köröd első fázisában eggyel több lapot húzhatsz.</>
    },
    WANTED: {
        name: "Körözés",
        description: <>Játszd ki bármelyik játékosra. Aki kiejti ezt a játékost, húz 2 lapot és kap 1 aranyrögöt.</>
    },
    RHUM: {
        name: "Rum",
        description: <>Csapj fel 4 lapot: visszakapsz 1 életpontot minden különböző kártyaszínért.</>
    },
    GOLD_PAN: {
        name: "Aranymosó Serpenyő",
        description: <>Egy aranyrögért cserébe húzz 1 lapot a pakliból. Ezt a képességet egy körben kétszer használhatod.</>
    },
    BOOTS: {
        name: "Csizma",
        description: <>Mindig, ha elveszítesz 1 életpontot, húzz 1 lapot a pakliból.</>
    },
    LUCKY_CHARM: {
        name: "Álomfogó",
        description: <>Mindig, ha elveszítesz 1 életpontot, kapsz 1 aranyrögöt.</>
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        hideTitle: false,
        description: <>Húzz 4 lapot a pakliból.</>
    },
    RUCKSACK: {
        name: "Hátizsák",
        description: <>2 aranyrögért cserébe visszakaphatsz 1 életpontot.</>
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Kaktusz",
    },
    DRAGOON: {
        name: "Dragoon",
        hideTitle: true,
        description: <>A körödben kijátszhatsz egy extra <i>BANG!</i>-et.</>
    },
    EVADED: {
        name: "Hajszál híja!",
        description: <>Húzd fel a kártyát, amit kivédtél ezzel a kártyával.</>,
        descriptionClass: "card-description-lower"
    },
    FULL_STEAM: {
        name: "Teljes gőzzel",
        description: <>Küldd a vonatot a végállomásra.<br/>Duplázd meg vagy hagyd ki a mozdony hatását.</>
    },
    FULL_STEAM_NO_EFFECT: {
        name: "Teljes gőzzel: Mozdony hatás kihagyása",
        hideTitle: true
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "Teljes gőzzel: Mozdony hatás megduplázása",
        hideTitle: true
    },
    KNIFE_REVOLVER: {
        name: "Késrevolver",
        description: <>1 <i>BANG!</i>-nek számít a körödben. "Húzz": J, Q, K, A = vedd vissza ezt a lapot a kezedbe.</>
    },
    MAP: {
        name: "Térkép",
        description: <>A körödben, a húzás előtt nézd meg a pakli felső 2 kártyáját: az egyiket eldobhatod.</>
    },
    MONEY_BAG: {
        name: "Pénzes zsák",
        description: <>Ha a dobópakli legfelső lapja barna szegélyű, ismételd meg a hatását.</>
    },
    MOST_WANTED: {
        name: "Körözési plakát",
        description: <>Minden játékos "húzzon":<br/>♠️ = a játékos veszít 1 életpontot.</>
    },
    NEXT_STOP: {
        name: "Következő állomás",
        description: <>Léptesd előre a vonatot 1 állomással.</>,
        descriptionClass: "card-description-lower"
    },
    REFUND: {
        name: "Visszatérítés",
        description: <>Amikor egy másik játékos elhúzza vagy eldobatja egy kártyádat, húzz 1 kártyát.</>
    },
    STRONGBOX: {
        name: "Páncélkazetta",
        description: <>A köröd végén húzz 1 kártyát.</>
    },
    SWITCH: {
        name: "Váltó",
        description: <>Cseréld meg 1 játékban lévő kártyádat 1 másik játékban lévő kártyával.</>
    },
    TRAIN_ROBBERY: {
        name: "Vonatrablás",
        description: <>1 <i>BANG!</i>-nek számít a körödben.<br/>Minden játékban lévő kártyája után a célpont eldöntheti: eldobja azt vagy egy <i>BANG!</i> éri</>,
        descriptionClass: "card-description text-smaller"
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Vonatrablás: Lap eldobása",
        hideTitle: true
    },
    TRAIN_ROBBERY_BANG: {
        name: "Vonatrablás: BANG! ér",
        hideTitle: true
    },
    WATER_TOWER: {
        name: "Víztorony",
        description: <>Vegyél el 1 vonatkocsit a vonatról ingyen.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        hideTitle: true,
        description: <>A körödben bármennyi vonatkocsit elvehetsz a vonatról.</>,
        descriptionClass: "character-description"
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true,
        description: <>Ha egy <i>BANG!</i> célpontja vagy, eldobhatsz egy megegyező kártyaszínű kártyát a kezedből, hogy eltérítsd egy tőled 1 távolságra lévő játékosra.</>,
        descriptionClass: "character-description"
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true,
        description: <>A köröd végén húzz 1 lapot.</>,
        descriptionClass: "character-description"
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true,
        description: <>Minden alkalommal, amikor a vonat eléri a végállomást, húzz 2 kártyát.</>,
        descriptionClass: "character-description"
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true,
        description: <>A körödben egyszer elvehetsz 1 vonatkocsit a vonatról ingyen.</>,
        descriptionClass: "character-description"
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true,
        description: <>Amikor több játékost célzol egy kártyával vagy hatással, kihagyhatsz 1 játékost.</>,
        descriptionClass: "character-description"
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true,
        description: <>Minden alkalommal, amikor a körödön kívül a vonat előrehalad, eldobhatsz a kezedből 1 kártyát, hogy húzz egy másikat a pakliból.</>,
        descriptionClass: "character-description"
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true,
        description: <>Minden körödben egyszer 1 állomással előreléptetheted a vonatot.</>,
        descriptionClass: "character-description"
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true,
        description: <>Kitalálhatja a húzott kártya színét vagy kártyaszínét a köre 1. fázisában: 1 extra lapot húzhat minden eltalált színért (2-t minden kártyaszínért).</>,
        descriptionClass: "character-description"
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Piros",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Kőr",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Káró",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Fekete",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Treff",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Pikk",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        hideTitle: true,
        description: <>A többi játékos annyival távolabbról látja, ahány életpontját elvesztette.</>,
        descriptionClass: "character-description"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Megnövelheti a maximális életpontjait 6-ra.</>,
        descriptionClass: "character-description"
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true,
        description: <>Ha eltalálnák, eldobhat egy lapot, hogy elkerülje azt. Ha a kijátszott + az eldobott kártya összege: ≥ 13 = <i>Nem talált!</i>, ≥ 17 = <i>Kitérés</i>; ≥ 20 = <i>Visszacsapás</i>.</>,
        descriptionClass: "character-description"
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true,
        description: <>Húzás előtt a legtöbb kártyával rendelkező játékos ad neki egy lapot.</>,
        descriptionClass: "character-description"
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true,
        description: <>A körében egyszer eldobhat a kezéből 1 kék szegélyű lapot, hogy húzzon 2 lapot a pakliból.</>,
        descriptionClass: "character-description"
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true,
        description: <>A körében egyszer eldobhat 1 lapot, hogy húzzon helyette egy másikat a pakliból. Ha káró, akkor húzhat még egyszer.</>,
        descriptionClass: "character-description"
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true,
        description: <>Egy teljes körig használhatja egy másik játékos előtt levő kék szegélyű lap hatását.</>,
        descriptionClass: "character-description"
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true,
        description: <>Ha "húzás" történik, eldobhat a kezéből 1 lapot, hogy felhúzza a "húzott" lapot.</>,
        descriptionClass: "character-description"
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true,
        description: <>Amikor kijátszik egy lapot maga elé, akkor az összes többi ugyanolyan nevű lapot el kell dobni.</>,
        descriptionClass: "character-description"
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true,
        description: <>Ha eltalál valakit egy <i>BANG!</i> lappal, húz 1 lapot.</>,
        descriptionClass: "character-description"
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true,
        description: <>A körében egyszer eldobhat egy <i>BANG!</i> lapot, hogy kijátsza a legutóbb általa kijátszott barna szegélyű lap hatását.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Ha kiesne, "húz": ha nem pikk, akkor 1 életpontja marad, és húz 1 lapot.</>,
        descriptionClass: "character-description"
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true,
        description: <>A több játékosra is hatással lévő lapok nem hatnak rá.</>,
        descriptionClass: "character-description"
    },

    // Frontier characters

    ALEXANDER_NOON: {
        name: "Alexander Noon",
        description: <>Before you "draw!", you may draw a card and then choose to discard a card from hand to use as the result of the "draw!".</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    CALEB_BREW: {
        name: "Caleb Brew",
        description: <>When you gain a life point, you may discard a card from hand for a player of your choice to gain 1 life point.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    CAYENNE_CHEE: {
        name: "Cayenne Chee",
        description: <>Once per round, when you use a card, you may discard a Diamond card with it to take it back into hand.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    JOSEY_STRONG: {
        name: "Josey Strong",
        description: <>When you play a <i>BANG!</i> card, you may discard a brown card from hand to make this shot unavoidable.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    JOSIAH_TUNG: {
        name: "Josiah Tung",
        description: <>After drawing, you may discard a random card from hand to draw two cards.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    LT_MICAIAH: {
        name: "Lt. Micaiah",
        description: <>Once during your turn, you may discard a card from hand to switch 1 of your cards in play with another card in play.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    RAY_OWE: {
        name: "Ray Owe",
        description: <>During your turn, you may draw a card from another player. When used or when your turn ends, return it to him.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    SALVO_THE_SHOOTER: {
        name: "Salvo the Shooter",
        description: <>Twice per turn, whenever you play a <i>BANG!</i> card, you may shoot another player within range.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    SHANGO_BROTHERS: {
        name: "Shango Brothers",
        description: <>During your turn, every time you play 3 cards, you may draw 1 from the deck.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },
    STEVE_TENGO: {
        name: "Steve Tengo",
        description: <>At the start of your turn, track a player. Whenever you hit him, draw a card.</>,
        hideTitle: true,
        descriptionClass: "character-description"
    },

    // The Great Train Robbery wagon cards

    BAGGAGE_CAR: {
        name: "Poggyászkocsi",
        description: <>Dobd el egy <i>Nem talált!</i>, <i>Pánik!</i>, <i>Cat Balou</i> vagy extra <i>BANG!</i> kártyaként.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    BAGGAGE_CAR_MISSED: {
        name: "Poggyászkocsi Nem talált!-ként",
        hideTitle: true
    },
    BAGGAGE_CAR_PANIC: {
        name: "Poggyászkocsi Pánik!-ként",
        hideTitle: true
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Poggyászkocsi Cat Balou-ként",
        hideTitle: true
    },
    BAGGAGE_CAR_BANG: {
        name: "Poggyászkocsi Bang!-ként",
        hideTitle: true
    },
    CABOOSE: {
        name: "Fékezőkocsi",
        description: <>Eldobhatod egy másik kék szegélyű kártyádat (akár vonatkocsit is) <i>Nem talált!</i>-ként.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    CATTLE_TRUCK: {
        name: "Marhavagon",
        description: <>Dobd el ezt a kártyát, hogy megnézhesd a dobópakli legfelső 3 lapját, majd válassz közülük 1 lapot.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    CIRCUS_WAGON: {
        name: "Cirkuszi kocsi",
        description: <>Dobd el ezt a kártyát: minden más játékos dobja el az egyik játékban lévő lapját.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    COAL_HOPPER: {
        name: "Szeneskocsi",
        description: <>Dobd el ezt a kártyát, hogy húzz 1 lapot, és dobass el 1 vasúti kocsit egy általad választott játékos elől.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    DINING_CAR: {
        name: "Étkezőkocsi",
        description: <>A köröd elején "húzz":<br/>ha kőr, visszakapsz 1 életpontot.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    EXPRESS_CAR: {
        name: "Első osztály",
        description: <>Dobd el ezt a kártyát: a köröd azonnal véget ér. Dobd el az összes kezedben lévő kártyát, majd játssz még egy kört.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    GHOST_CAR: {
        name: "Szellemkocsi",
        description: <>Játszd ki bárkire kivéve a <i>Seriffet</i>.<br/>Ha kiesnél, ehelyett életben maradsz, azonban nem szerezhetsz vagy veszíthetsz életpontokat.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    LOUNGE_CAR: {
        name: "Szalonkocsi",
        description: <>Dobd el ezt a kártyát, hogy húzz 2 vasúti kocsit a pakliból, majd helyezd az egyiket magad, a másikat egy másik játékos elé.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    LUMBER_FLATCAR: {
        name: "Rönkszállító",
        description: <>Játszd ki bárkire.<br/>Minden játékost 1-gyel távolabbról látsz.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    MAIL_CAR: {
        name: "Postakocsi",
        description: <>Dobd el ezt a kártyát, hogy húzz 3 lapot, és az egyiket add egy másik játékosnak.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    OBSERVATION_CAR: {
        name: "Kilátókocsi",
        description: <>Minden játékost 1-gyel közelebbről látsz.<br/>A többi játékos 1-gyel távolabbról lát.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PASSENGER_CAR: {
        name: "Utazókocsi",
        description: <>Dobd el ezt a kártyát: húzz 1 lapot egy másik játékostól (magad elé vagy a kezedbe).</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PRISONER_CAR: {
        name: "Rabszállító",
        description: <>Nem hat rád a más játékosok által kijátszott <i>Indiánok!</i> és <i>Párbaj</i> kártya.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    PRIVATE_CAR: {
        name: "Privát kocsi",
        description: <>Ha éppen nincs kártya a kezedben, nem lehetsz <i>BANG!</i> kártya célpontja.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },
    SLEEPER_CAR: {
        name: "Hálókocsi",
        description: <>Körönként egyszer eldobhatod egy másik kék szegélyű kártyádat (akár vonatkocsit is) egy további <i>BANG!</i>-ként.</>,
        titleClass: "train-title",
        descriptionClass: "train-description"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Vasparipa",
        description: <>A végállomáson minden játékost egy <i>BANG!</i> ér.</>,
        titleClass: "train-title",
        descriptionClass: "locomotive-description"
    },
    LELAND: {
        name: "Leland",
        // hideTitle: true, // IMO this should be false because ironhorse has a visible title
        description: <>A végállomáson egy <i>Szatócsbolt</i> hatásával bír.</>,
        titleClass: "train-title",
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
        description: <>Amikor eltalálnak, húzz 2 lapot.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Addig húzhatsz kártyákat a pakliból, amíg az összegük nincs legalább 21. Ezután az összes lapot megkapod.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Bármelyik lapodat használhatod <i>BANG!</i> vagy <i>Nem talált!</i> kártyaként.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Amikor eltalál egy játékos, húzz 1 kártyát a kezéből, és húzd fel a kártyát, ami eltalált.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Nézd meg bármelyik játékos kezében lévő lapjait, majd húzz onnan 1 lapot, ezután húzz 1 lapot a pakliból.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Amikor barna szegélyű kártya célpontjává válsz, "húzz". Ha ez a lap J, Q, K vagy A, hagyd figyelmen kívül a kártya hatását, aminek a célpontja vagy.</>,
        descriptionClass: "legends-description text-smallest",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Húzz 3 lapot. Odaadhatsz 1 lapot egy másik játékosnak.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Amikor egy kártya hatására valakinek lapot kell "húznia", csapj fel 2 kártyát, és válaszd ki, melyik számítson. Ha a te köröd van, vedd is a kezedbe a választott lapot.</>,
        descriptionClass: "legends-description text-smallest",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>A többi játékos 1-gyel távolabbról lát.<br/>Ahhoz, hogy egy <i>BANG!</i>-et játszanak ki ellened, a játékosnak el kell dobnia egy lapot a kezéből.</>,
        descriptionClass: "legends-description text-smallest",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Húzz 2 lapot, valamint a dobópakli legfelső lapját.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Minden játékost 1 távolságból látsz. A körödben egyszer eldobhatsz 1 kék szegélyű lapot, a kezedből vagy előled, egy <i>Pánik!</i>-ként.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Eldobhatsz 2 lapot, hogy visszakapj 1 életpontot. A körödben egyszer, ha visszakaptál 1 életpontot, lőhetsz egy ingyen <i>BANG!</i>-et.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>A <i>BANG!</i> kártyáidat nem lehet kivédeni.<br/>Amikor kisajátítasz egy hőstettet, azzal egy játékos utolsó életpontját is elveheted.</>,
        descriptionClass: "legends-description text-smaller",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Ha kevesebb, mint 2 kártya van a kezedben, húzz annyit, hogy 2 legyen.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Valahányszor egy játékos kiesik, megkapod a megmaradt lapjait. Ha te esnél ki, játékban maradsz 4 életponttal, de vissza kell fordítanod ez a kártyát a másik oldalára.</>,
        descriptionClass: "legends-description text-smallest",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Akárhány <i>BANG!</i> kártyát kijátszhatsz.<br/>Hőstett kisajátítása helyett leadhatsz egy lövést úgy, mintha <i>BANG!</i> kártyát játszottál volna ki.</>,
        descriptionClass: "legends-description text-smallest",
    },

    // Legends feats cards

    FIFTY_GUNS: {
        name: "Ötven pisztoly",
        description: <>Húzz el vagy dobj el egy fegyvert.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Megsebzett büszkeség",
        description: <>Egy másik játékos védje ki egy <i>BANG!</i> kártyádat.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Vadnyugati banditák",
        description: <>Lőjj meg (és találj is el) egy körben 2 vagy több játékost.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Lyukas hordó",
        description: <>Dobj el egy <i>Sör</i> lapot.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "Bűntanya",
        description: <>Dobj el egy <i>BANG!</i> kártyát.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "A következő vonat Yumába",
        description: <>"Húzz" vagy érd el, hogy egy másik játékos "húzzon".</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Jó társaság",
        description: <>Dobj el 1 lapot, majd játssz ki egy ugyanolyan nevű lapot (vagy ugyanez fordított sorrendben).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "A legutolsó zsivány",
        description: <>Dobd el egy játékban lévő, kék szegélyű lapodat.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "A névtelen ember",
        description: <>Veszíts el 1 életpontot (ami nem az utolsó).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "A Wilhelm-sikoly",
        description: <>Játssz ki egy <i>BANG!</i> kártyát 2 vagy több távolságra.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Scrugs balladája",
        description: <>Veszíts egy <i>Párbaj</i>-ban.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Határvidék",
        description: <>Dobd el az összes kezedben tartott kártyát (akkor is végrehajthatod, ha nincs lap a kezedben).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "Az Oregon Trail",
        description: <>A köröd 1. fázisában ne húzd fel az első kártyát, amit felhúzhatnál.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Ezer mód a halálra",
        description: <>Mutass meg a kezedből egy <i>Nem talált!</i> kártyát és még egy kártyát, ugyanolyan kártyaszínnel.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "Pár lappal többért",
        description: <>A köröd végén dobj el legalább 1 lapot, ami meghaladja a kézben tartható lapjaid számát.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "Gyors halál",
        description: <>Lőjj egy másik teljes életpontú játékosra egy <i>BANG!</i> kártyával.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },

    // Button row virtual cards

    ESCAPE_JAIL: {
        name: "Szabadulj ki a börtönből"
    },
    BECOME_LEGEND: {
        name: "Válj legendás hőssé"
    },
    CLAIM_FEAT: {
        name: "Hőstett kisajátítása"
    },
    GAME_PASS: {
        name: "Kör befejezése"
    },
    GAME_CONFIRM: {
        name: "Megerősítés"
    },
    GAME_DISMISS: {
        name: "Folytatás"
    },
    GAME_SELL_BEER: {
        name: "Sör eladása"
    },
    GAME_DISCARD_BLACK: {
        name: "Felszereléskártya eldobása"
    },
    GAME_DISCARD_BRONCO: {
        name: "Vadló eldobása"
    },

    // Player roles

    ROLE_UNKNOWN: {
        name: "(Ismeretlen szerep)",
        hideTitle: true
    },
    ROLE_SHERIFF: {
        name: "Seriff",
        description: <>Lődd le az összes banditát és renegátot!</>
    },
    ROLE_DEPUTY: {
        name: "Seriffhelyettes",
        description: <>Védd meg a Seriffet!<br/>Lődd le az összes banditát és renegátot!</>
    },
    ROLE_OUTLAW: {
        name: "Bandita",
        description: <>Lődd le a seriffet!</>
    },
    ROLE_RENEGADE: {
        name: "Renegát",
        description: <>Legyél az utolsó, aki játékban marad!</>
    },
    ROLE_DEPUTY_3P: {
        name: "Seriffhelyettes",
        description: <>Lődd le a renegátot!</>
    },
    ROLE_OUTLAW_3P: {
        name: "Bandita",
        description: <>Lődd le a seriffhelyettest!</>
    },
    ROLE_RENEGADE_3P: {
        name: "Renegát",
        description: <>Lődd le a banditát!</>
    },
    ROLE_SHADOW_DEPUTY: {
        name: "Árnyhelyettes",
        description: <>Védd meg a seriffet! Végezz az összes banditával!</>
    },
    ROLE_SHADOW_OUTLAW: {
        name: "Árnybandita",
        description: <>Lődd le a seriffet!</>
    },

};