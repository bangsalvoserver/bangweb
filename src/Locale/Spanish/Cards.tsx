import { CardRegistry } from "../Registry";

export const CARDS: CardRegistry = {

    // Base game cards
    
    BARREL: {
        name: "Barril"
    },
    DYNAMITE: {
        name: "Dinamita",
        description: <>Pierde 3 puntos de vida. De lo contrario, pasa la <i>Dinamita</i> al jugador de tu izquierda.</>,
        descriptionClass: "draw-description"
    },
    SCOPE: {
        name: "Mira Telescopica",
        description: <>Ves a los demás jugadores a una distancia de -1.</>
    },
    MUSTANG: {
        name: "Mustang",
        hideTitle: true,
        description: <>Los demás jugadores te ven a una distancia de +1.</>
    },
    JAIL: {
        name: "Cárcel",
        description: <>Coloca esta carta frente a otro jugador. Al inicio de su turno, "¡Desenfunda!" una carta: si es ♥, juega normalmente; si no, pierde el turno.</>,
        descriptionClass: "draw-description text-smaller"
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
        name: "Volcánica",
        hideTitle: true,
        description:  <>Puedes jugar cualquier número de cartas <i>¡BANG!</i> durante tu turno.</>,
        descriptionClass: "weapon-description"
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
        name: "Cerveza"
    },
    CAT_BALOU: {
        name: "Cat Balou",
        hideTitle: true
    },
    STAGECOACH: {
        name: "Diligencia"
    },
    DUEL: {
        name: "Duelo",
        description: <>Elige un jugador objetivo. Él y tú se turnan para descartar una carta de <i>¡BANG!</i>. El primero que no pueda descartar pierde 1 punto de vida.</>
    },
    GENERAL_STORE: {
        name: "Almacen General",
        description: <>Se revelan tantas cartas como jugadores en juego. Cada jugador, empezando por ti, elige y roba una de ellas.</>
    },
    GATLING: {
        name: "Ametralladora",
    },
    INDIANS: {
        name: "Indios!",
        description: <>Todos los jugadores excepto el que juega esta carta deben descartar un <i>¡BANG!</i> o perder 1 punto de vida.</>
    },
    MISSED: {
        name: "Fallaste!"
    },
    PANIC: {
        name: "¡Pánico!"
    },
    SALOON: {
        name: "Salon",
        hideTitle: true
    },
    WELLS_FARGO: {
        name: "Wells Fargo",
        hideTitle: true
    },

    // Dodge City cards

    BINOCULAR: {
        name: "Binoculares",
        description: <>Ves a los demás jugadores a una distancia de -1.</>
    },
    HIDEOUT: {
        name: "Escondite",
        description: <>Los demás jugadores te ven a una distancia de +1.</>
    },
    PUNCH: {
        name: "Puño"
    },
    RAG_TIME: {
        name: "Rag Time",
        hideTitle: true
    },
    BRAWL: {
        name: "Pelea"
    },
    DODGE: {
        name: "Esquivar"
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
        name: "Cantimplora"
    },
    CAN_CAN: {
        name: "Can Can",
        hideTitle: true
    },
    TEN_GALLON_HAT: {
        name: "Sombrero Vaquero"
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
        name: "Rifle de Búfalo"
    },
    HOWITZER: {
        name: "Obús",
    },
    PEPPERBOX: {
        name: "Pimentero",
    },
    IRON_PLATE: {
        name: "Placa de hierro"
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true
    },
    KNIFE: {
        name: "Cuchillo"
    },
    SOMBRERO: {
        name: "Sombrero Mexicano",
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Fantasma",
        description: <>Juega esta carta sobre cualquier jugador eliminado. Ese jugador vuelve a la partida, pero no puede ganar ni perder puntos de vida.</>
    },
    GHOST_2: {
        name: "Fantasma",
        description: <>Juega esta carta sobre cualquier jugador eliminado. Ese jugador vuelve a la vida sin la habilidad de su personaje, no puede ganar ni perder puntos de vida y juega como un jugador normal.</>,
        descriptionClass: "card-description text-smaller line-smaller"
    },
    LEMAT: {
        name: "LeMat",
        hideTitle: true,
        description: <>Durante tu turno, puedes usar cualquier carta de tu mano como si fuera una carta <i>¡Bang!</i>.</>,
        descriptionClass: "weapon-description"
    },
    LEMAT_2: {
        name: "LeMat",
        hideTitle: true,
        description: <>Durante tu turno, puedes usar cualquier carta de tu mano (excepto <i>¡Fallaste!</i>) como si fuera una carta <i>¡Bang!</i>.</>,
        descriptionClass: "weapon-description"
    },
    RATTLESNAKE: {
        name: "Serpiente de Cascabel",
        description: <>Juega esta carta sobre cualquier jugador. Al inicio de su turno, ese jugador "¡Desenfunda!": si sale ♠, pierde 1 punto de vida.</>
    },
    SHOTGUN: {
        name: "Escopeta",
        hideTitle: true,
        description: <>Cada vez que hieres a un jugador, ese jugador debe descartar una carta de su mano a su elección.</>,
        descriptionClass: "weapon-description"
    },
    BOUNTY: {
        name: "Recompensa",
        description: <>Coloca esta carta sobre un jugador. Cada vez que ese jugador reciba daño de un <i>¡BANG!</i>, quien disparó roba 1 carta.</>
    },
    BANDIDOS: {
        name: "Bandidos",
        hideTitle: true,
        description: <>Cada jugador elige una opción: descartar 2 cartas de su mano (1 si solo tiene 1) o perder 1 punto de vida.</>
    },
    BANDIDOS_2: {
        name: "Bandidos",
        hideTitle: true,
        description: <>Todos los demás jugadores descartan una carta <i>¡Bang!</i> o 2 cartas de su mano a su elección.</>
    },
    ESCAPE: {
        name: "Huida",
        description: <>Puede jugarse fuera de tu turno. Evita los efectos de una carta marrón (distinta de <i>¡Bang!</i>) que te tenga como objetivo.</>
    },
    ESCAPE_2: {
        name: "Huida",
        description: <>Si eres el único objetivo de una carta distinta de <i>¡Bang!</i>, descarta esta carta para evitar su efecto.</>
    },
    AIM: {
        name: "Apuntar",
        description: <>Juega esta carta junto con un <i>¡BANG!</i>. Si el disparo es exitoso, el objetivo pierde 2 puntos de vida en lugar de 1.</>
    },
    POKER: {
        name: "Poker",
        hideTitle: true,
        description: <>Cada jugador (excepto tú) descarta 1 carta de su mano simultáneamente. Si nadie descartó un As, puedes robar hasta 2 de las cartas descartadas.</>
    },
    BACKFIRE: {
        name: "Contraataque",
        description: <>Juega esta carta como un <i>¡Fallaste!</i>. El <i>¡BANG!</i> bloqueado se devuelve contra el jugador que lo disparó.</>
    },
    SAVED: {
        name: "¡Salvado!",
        description: <>Puede jugarse fuera de tu turno. Evita que otro jugador pierda 1 punto de vida. Si sobrevive, roba 2 cartas de su mano o del mazo (a tu elección).</>
    },
    SAVED_2: {
        name: "¡Salvado!",
        description: <>Solo puede jugarse fuera de tu turno. Evita que cualquier otro jugador pierda un punto de vida. Si salvas a un jugador de la eliminación, roba 2 cartas de su mano.</>
    },
    FANNING: {
        name: "Tiro en Abanico",
        description: <>Cuenta como tu <i>¡BANG!</i> del turno. Elige un objetivo principal y dispara también a un jugador a distancia 1 de él (excluyéndote a ti).</>,
        descriptionClass: "card-description text-smaller"
    },
    TOMAHAWK: {
        name: "Tomahawk",
        hideTitle: true
    },
    TORNADO: {
        name: "Tornado",
        hideTitle: true,
        description: <>Cada jugador descarta una carta de su mano (si es posible) y luego roba 2 cartas del mazo.</>
    },
    TORNADO_2: {
        name: "Tornado",
        hideTitle: true,
        description: <>Cada jugador debe dar 2 cartas de su mano al jugador de su izquierda.</>
    },
    LAST_CALL: {
        name: "Última ronda"
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Caravana"
    },
    A_LITTLE_NIP: {
        name: "Un Traguito"
    },
    QUICK_SHOT: {
        name: "Disparo rápido",
        description: <>Dispara a un jugador diferente adicional.</>,
        descriptionClass: "cube-description"
    },
    FLINTLOCK: {
        name: "Pedernal",
        hideTitle: true,
        description: <>Si esta carta es anulada, recupérala en tu mano.</>,
        descriptionClass: "cube-description-lower"
    },
    ARROW: {
        name: "Flecha",
        description: [
            <>El jugador objetivo descarta una carta <i>¡Bang!</i> de su mano o pierde 1 punto de vida.</>,
            <>Elige un jugador diferente adicional como objetivo.</>
        ],
        descriptionClass: "cube-description-double"
    },
    DUCK: {
        name: "¡Agáchate!",
        description: <>Recupera esta carta en tu mano.</>,
        descriptionClass: "cube-description-lower"
    },
    RELOAD: {
        name: "Recargar",
        description: <>Añade 3 📦 a tus cartas y/o a tu personaje.</>
    },
    RUST: {
        name: "Óxido",
        description: <>Todos los demás mueven 1 📦 de cada carta peligrosa y de su personaje a tu personaje.</>
    },
    SQUAW: {
        name: "Squaw",
        description: [
            <>Descarta cualquier carta en juego.</>,
            <>Añade la carta descartada a tu mano.</>
        ],
        descriptionClass: "cube-description-double"
    },
    ACE_UP_THE_SLEEVE: {
        name: "As en la Manga"
    },
    BANDOLIER: {
        name: "Bandolera",
        description:  <>Una vez durante tu turno, puedes jugar una carta <i>¡Bang!</i> adicional.</>,
        descriptionClass: "cube-description"
    },
    BIG_FIFTY: {
        name: "Big Fifty",
        hideTitle: true,
        description: <>Cancela la habilidad del personaje y las cartas en juego del jugador objetivo.</>,
        descriptionClass: "cube-description"
    },
    BOMB: {
        name: "Bomba",
        description: <>Juega esta carta sobre cualquier jugador. Al inicio de tu turno, "¡Desenfunda!":<br/>♥♦ = pasa la <i>Bomba</i> a cualquier jugador.<br/>♣♠ = descarta 2 📦; si no puede, pierde 2 puntos de vida.</>,
        descriptionClass: "card-description-higher text-smaller"
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        hideTitle: true,
        description: <>Si la carta <i>¡BANG!</i> es anulada, el jugador objetivo debe descartar una carta de su mano a su elección.</>,
        descriptionClass: "cube-description"
    },
    BELL_TOWER: {
        name: "Campanario",
        description: <>Para la próxima carta que juegues, ves a todos los jugadores a distancia 1.</>,
        descriptionClass: "cube-description"
    },
    CRATE: {
        name: "Caja"
    },
    TUMBLEWEED: {
        name: "Rodadora",
        description: <>Haz que cualquier jugador repita el efecto de "¡Desenfundar!" de una carta.</>,
        descriptionClass: "cube-description"
    },
    DOUBLE_BARREL: {
        name: "Doble cañón",
        description: <>Si juegas una carta <i>¡Bang!</i> de diamantes, no puede ser anulada.</>,
        descriptionClass: "cube-description"
    },
    WHIP: {
        name: "Látigo",
        description: <>Descarta cualquier carta en juego.</>,
        descriptionClass: "cube-description"
    },
    BEER_KEG: {
        name: "Barril de cerveza"
    },
    LOCKPICK: {
        name: "Ganzúa",
        description: <>Roba una carta de la mano de cualquier jugador.</>,
        descriptionClass: "cube-description"
    },
    THUNDERER: {
        name: "Thunderer",
        hideTitle: true,
        description: <>Recupera la carta <i>¡Bang!</i> en tu mano.</>,
        descriptionClass: "cube-description"
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Ladrón de tumbas",
        description: <>Coloca sobre la mesa tantas cartas descartadas como jugadores haya.<br/>Cada jugador roba una.</>
    },
    CARD_SHARPER: {
        name: "Tahúr",
        description: <>Intercambia una carta de borde azul que tengas en juego con otra del mismo tipo frente a otro jugador.</>
    },
    MIRAGE: {
        name: "Espejismo",
        description: <>Cuenta como una carta <i>¡Fallaste!</i>.<br/>Además, el jugador que disparó termina su turno inmediatamente.</>
    },
    BLOOD_PACT: {
        name: "Pacto de sangre"
    },
    SACRIFICE: {
        name: "Sacrificio",
        description: <>Puede jugarse fuera de tu turno. Evita que otro jugador pierda 1 punto de vida recibiendo el daño tú. Luego, si es posible, roba 2 cartas del mazo (3 si el jugador sobrevive).</>,
        descriptionClass: "card-description text-smaller"
    },
    DISARM: {
        name: "Desarmar",
        description: <>Cuenta como una carta <i>¡Fallaste!</i>.<br/>Además, el jugador que disparó debe descartar una carta de su mano.</>
    },
    MOLOTOV: {
        name: "Cóctel Molotov",
        hideTitle: true
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true,
        description: <>Una vez durante tu turno, puedes jugar una carta <i>¡Bang!</i> como si fuera una <i>Ametralladora</i> descartando otra carta adicional.</>,
        descriptionClass: "weapon-description text-smaller line-smaller"
    },
    LAST_WILL: {
        name: "Última voluntad",
        description: <>Juega esta carta sobre cualquier jugador. Si es eliminado, puede entregar hasta 3 cartas (de la mano o en juego) a otro jugador.</>
    },
    INDIAN_GUIDE: {
        name: "Escudo indio",
        description: <>Juega esta carta sobre ti. Las cartas <i>¡Indios!</i> y <i>Senda de guerra</i> no tienen efecto sobre ti.</>
    },
    TAXMAN: {
        name: "Impuestos",
        description: <>Juega esta carta sobre cualquier jugador. Al inicio de su turno, debe "¡Desenfundar!": si sale ♠ o ♣, roba una carta menos en la fase 1.</>
    },
    BROTHEL: {
        name: "Burdel",
        description: <>Juega esta carta sobre cualquier jugador. En su próximo turno, antes de robar, "¡Desenfunda!": si es ♣️ o ♠️, pierde su habilidad de personaje por ese turno.</>,
        descriptionClass: "draw-description text-smaller"
    },
    BRONCO: {
        name: "Bronco",
        hideTitle: true,
        description: <>Los demás jugadores te ven a una distancia de +1. No puede estar en juego junto con <i>Mustang</i>. También puede descartarse descartando 2 cartas.</>,
        descriptionClass: "card-description text-smaller"
    },
    PACK_MULE: {
        name: "Mula Humilde",
        description: <>Puedes tener una carta más en la mano que tus puntos de vida actuales. No puede estar en juego junto con <i>Mustang</i> o <i>Bronco</i>.</>
    },
    WAR_PATH: {
        name: "Senda de guerra",
        description: <>Todos los demás jugadores descartan una carta <i>¡BANG!</i> o pierden 1 punto de vida.</>
    },
    ARSON: {
        name: "Incendio"
    },
    FLYING_BULLET: {
        name: "Bala perdida",
        description:  <>Cuenta como una carta <i>¡Fallaste!</i>.<br/>Además, un jugador a tu elección a distancia 1 (si existe) es también objetivo del <i>¡BANG!</i>.</>
    },
    ON_THE_HOUSE: {
        name: "Invita la Casa"
    },
    GUITAR: {
        name: "Guitarra",
        description: <>Juega esta carta sobre cualquier jugador. Mientras esté en juego, no puede jugar cartas <i>¡BANG!</i> (ni cartas que dependan del alcance del arma).</>
    },
    SCRAPPER: {
        name: "Chatarrero"
    },
    SHYLOCK: {
        name: "Usurero"
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
    FISHING_HEARTS: {
        name: "Fishing: Declare Hearts",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "card-description text-bigger"
    },
    FISHING_DIAMONDS: {
        name: "Fishing: Declare Diamonds",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    FISHING_CLUBS: {
        name: "Fishing: Declare Clubs",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "card-description text-bigger"
    },
    FISHING_SPADES: {
        name: "Fishing: Declare Spades",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "card-description text-bigger"
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
        description: <>Cada vez que pierde un punto de vida, roba una carta inmediatamente.</>,
        descriptionClass: "character-description"
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Muestra la segunda carta que roba. Si es Corazones o Diamantes, roba una carta adicional.</>,
        descriptionClass: "character-description"
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Puede jugar cartas de <i>¡BANG!</i> como <i>¡Fallaste!</i> y viceversa.</>,
        descriptionClass: "character-description"
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Cada vez que pierde un punto de vida a causa de un jugador, roba una carta de la mano de ese jugador.</>,
        descriptionClass: "character-description"
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Puede robar su primera carta de la mano de un jugador.</>,
        descriptionClass: "character-description"
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Cada vez que es objetivo de un <i>¡BANG!</i>, puede "¡Desenfundar!": si es Corazones, el disparo falla</>,
        descriptionClass: "character-description"
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Mira las tres cartas superiores de la baraja y elige dos para robar.</>,
        descriptionClass: "character-description"
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Cada vez que "¡Desenfunda!", muestra las dos cartas superiores y elige una.</>,
        descriptionClass: "character-description"
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Todos los jugadores lo ven a una distancia aumentada en 1.</>,
        descriptionClass: "character-description"
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Puede robar su primera carta del montón de descartes.</>,
        descriptionClass: "character-description"
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Ve a todos los jugadores a una distancia reducida en 1.</>,
        descriptionClass: "character-description"
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Puede descartar 2 cartas para recuperar un punto de vida.</>,
        descriptionClass: "character-description"
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        // EDIT: fix grammar
        description: <>Los jugadores necesitan 2 cartas de <i>¡Fallaste!</i> para cancelar sus <i>¡BANG!</i></>,
        descriptionClass: "character-description"
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>En cuanto se queda sin cartas en la mano, roba una carta.</>,
        descriptionClass: "character-description"
    },
    VULTURE_SAM: {
        name: "Sam \"El Buitre\"",
        description: <>Cada vez que un jugador es eliminado, roba todas las cartas que tenía ese jugador.</>,
        descriptionClass: "character-description",
        titleClass: "card-title character-title"
    },
    WILLY_THE_KID: {
        name: "Willy el Niño",
        description: <>Puede jugar cualquier cantidad de cartas de <i>¡BANG!</i>.</>,
        descriptionClass: "character-description",
        titleClass: "card-title character-title"
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"El Santo\"",
        description: <>Roba (cantidad jugadores + 1) cartas. Quédate con 2 y regala 1 a cada jugador.</>,
        descriptionClass: "character-description",
        titleClass: "card-title character-title"
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true,
        description: <>Cada vez que pone una carta en juego, todas las demás cartas en juego con el mismo nombre son descartadas.</>,
        descriptionClass: "character-description"
    },
    UNCLE_WILL: {
        name: "Tio Will",
        hideTitle: true,
        description: <>Una vez durante su turno, puede jugar cualquier carta de su mano como si fuera un <i>Almacen General</i>.</>,
        descriptionClass: "character-description"
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true,
        description: <>Puede usar cualquier carta como una carta de <i>¡BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true,
        description: <>Cada vez que tu carta de <i>¡BANG!</i> es bloqueada por un <i>¡Fallaste!</i>, robas esa carta de <i>¡Fallaste!</i>. Cada vez que bloqueas un <i>¡BANG!</i> con <i>¡Fallaste!</i>, robas esa carta de <i>¡BANG!</i>.</>,
        descriptionClass: "character-description"
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        hideTitle: true,
        description: <>Las cartas de Diamantes jugadas por otros jugadores no le afectan.</>,
        descriptionClass: "character-description"
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true,
        description: <>Durante su turno, las cartas en juego frente a otros jugadores no tienen efecto.</>,
        descriptionClass: "character-description"
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true,
        description: <>Roba 1 carta, más 1 carta adicional por cada punto de vida que haya perdido.</>,
        descriptionClass: "character-description"
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true,
        description: <>Durante su turno, puede elegir perder 1 punto de vida para robar 2 cartas.</>,
        descriptionClass: "character-description"
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true,
        description: <>Durante su turno, puede descartar 2 cartas de su mano una vez para disparar un <i>¡BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true,
        description: <>Puede usar cualquier carta como <i>¡Fallaste!</i>.</>,
        descriptionClass: "character-description"
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true,
        description: <>Cada vez que otro jugador es eliminado, recupera 2 puntos de vida.</>,
        descriptionClass: "character-description"
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true,
        description: <>Cada vez que otro jugador es eliminado, roba 2 cartas adicionales</>,
        descriptionClass: "character-description"
    },
    JOSE_DELGADO: {
        name: "José Delgado",
        hideTitle: true,
        description: <>Dos veces durante su turno, puede descartar una carta azul de su mano para robar 2 cartas.</>,
        descriptionClass: "character-description"
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true,
        description: <>Cada vez que usa una carta de su mano fuera de su turno, roba una carta.</>,
        descriptionClass: "character-description"
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true,
        description: <>Puede robar cualquier carta en juego que esté frente a otro jugador.</>,
        descriptionClass: "character-description"
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true,
        description: <>Roba 3 cartas en lugar de 2.</>,
        descriptionClass: "character-description"
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true,
        description: <>Puede tener hasta 10 cartas en su mano.</>,
        descriptionClass: "character-description"
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true,
        description: <>Cada vez que juega una carta de <i>Cerveza</i>, recupera 2 puntos de vida en lugar de 1.</>,
        descriptionClass: "character-description"
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true,
        description: <>Durante una ronda completa, obtiene la misma habilidad de otro personaje en juego a su elección.</>,
        descriptionClass: "character-description"
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        hideTitle: true,
        description: <>Una vez durante su turno, puede usar cualquier carta de Tréboles como un <i>¡BANG!</i> adicional.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Cada vez que juega una carta de <i>¡BANG!</i>, "¡Desenfunda!": si es Picas, este disparo no puede ser evitado.</>,
        descriptionClass: "character-description"
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Cada vez que otro jugador juega una carta de <i>¡Fallaste!</i> contra un <i>¡BANG!</i> de <i>Colorado Bill</i>, "¡Desenfunda!": si es Picas, la carta de <i>¡Fallaste!</i> no tiene efecto y el jugador atacado pierde 1 punto de vida.</>  ,
        descriptionClass: "character-description text-smaller"
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        hideTitle: true,
        description: <>Una vez durante su turno, puede usar una carta de <i>¡BANG!</i> como una <i>Ametralladora</i>.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Puede rechazar robar cartas en su fase de robo. Por cada carta que rechace, dispara un <i>¡BANG!</i> a un objetivo diferente a distancia alcanzable.</>,
        descriptionClass: "character-description"
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>Puede robar 1 carta menos de lo normal para disparar un <i>¡BANG!</i> adicional a distancia 1.</>,
        descriptionClass: "character-description"
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true,
        description: <>Cualquier jugador que robe o descarte una de sus cartas (en su mano o en juego) se convierte en el objetivo de un <i>¡BANG!</i>.</>,
        descriptionClass: "character-description"
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim",
        hideTitle: true,
        description: <>Cada vez que otro jugador juega una carta de <i>Cerveza</i>, puede descartar cualquier carta de su mano para también recuperar 1 punto de vida.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Si es el objetivo de una carta marrón que no sea <i>¡BANG!</i>, puede usar una carta de <i>¡Fallaste!</i> para evitar esa carta.</>,
        descriptionClass: "character-description"
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>Si es el único objetivo de una carta, puede usar una carta de <i>¡Fallaste!</i> para evitar esa carta.</>,
        descriptionClass: "character-description"
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true,
        description: <>Durante su fase de robo, si no tiene cartas azules en juego, roba 2 cartas adicionales.</>,
        descriptionClass: "character-description"
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Comienza con 5 cartas. No puede jugar cartas de <i>¡Fallaste!</i>.</>,
        descriptionClass: "character-description"
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true,
        description: <>Durante su turno, puede intercambiar una carta de su mano por 2 cartas al azar de la mano de otro jugador.</>,
        descriptionClass: "character-description"
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true,
        description: <>Roba todas las cartas sobrantes que descartan otros jugadores al final de su turno.</>,
        descriptionClass: "character-description"
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true,
        description: <>Al comienzo de su turno, puede robar 2 personajes al azar. Posee todas las habilidades de los personajes robados.</>,
        descriptionClass: "character-description"
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true,
        description: <>Si tiene menos de 6 cartas en la mano, cada vez que cualquier jugador "Desenfunda!", John añade la carta recién desenfundada a su mano.</>,
        descriptionClass: "character-description"
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true,
        description: <>Durante su turno, puede descartar un <i>¡BANG!</i> para repetir el efecto de una carta de borde marrón que acaba de jugar.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Cada vez que fuera a ser eliminado, "¡Desenfunda!": si no es Picas, <i>Teren</i> se mantiene con 1 punto de vida y roba 1 carta.</>,
        descriptionClass: "character-description"
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true,
        description: <>Antes de robar, los jugadores con más cartas en la mano que él deben darle una carta a su elección.</>,
        descriptionClass: "character-description"
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true,
        description: <>Si otro jugador juega una carta azul o de borde naranja, puedes pagar 2 📦 para robar 1 carta del mazo.</>,
        descriptionClass: "character-description"
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true,
        description: <>Una vez durante su turno, puede descartar 1 carta de su mano para añadir 2 📦 a una de tus cartas.</>,
        descriptionClass: "character-description"
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true,
        description: <>Cada vez que su carta de <i>¡BANG!</i> sea cancelada, roba 1 carta del mazo.</>,
        descriptionClass: "character-description"
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true,
        description: <>Una vez durante su turno, puede tomar 1 📦 de cualquier carta y moverlo aquí.</>,
        descriptionClass: "character-description"
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true,
        description: <>Cada vez que un jugador le hace perder al menos 1 punto de vida, "¡Desenfunda!":<br/>♥♦ = ese jugador se convierte en el objetivo de un <i>¡BANG!</i></>,
        descriptionClass: "character-description"
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true,
        description: <>Una vez durante tu surno, puede pagar 2 📦 para disparar 1 <i>¡BANG!</i> adicional (sin necesidad de carta).</>,
        descriptionClass: "character-description"
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true,
        description: <>Puede ignorar los efectos de las cartas de borde marrón con valores J, Q, K y A si es el único objetivo.</>,
        descriptionClass: "character-description"
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true,
        description: <>Comienza con 4 📦. Una vez durante su turno, puede mover hasta 2 📦 de aquí a sus cartas.</>,
        descriptionClass: "character-description"
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true,
        description: <>Al final de su turno, "¡Desenfunda!": si es Corazones o Diamantes, juega un turno adicional.</>,
        descriptionClass: "character-description"
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true,
        description: <>Roba 2 cartas, descarta 1 y toma 1 pepita de oro.</>,
        descriptionClass: "character-description"
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true,
        description: <>Durante su turno, puede pagar 2 pepitas de oro para disparar 1 <i>¡BANG!</i> adicional.</>,
        descriptionClass: "character-description"
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true,
        description: <>Puede robar el equipo superior del mazo pagando 2 pepitas de oro.</>,
        descriptionClass: "character-description"
    },
    MADAME_YTO: {
        name: "Madam Yto",
        hideTitle: true,
        description: <>Cada vez que se juega una carta de Cerveza, roba 1 carta del mazo.</>,
        descriptionClass: "character-description"
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true,
        description: <>Una vez por turno, puede comprar 1 equipo con un costo reducido en 1 pepita de oro.</>,
        descriptionClass: "character-description"
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true,
        description: <>Durante su turno, puede descartar 1 pepita de oro para robar 1 carta del mazo (hasta 2 veces).</>,
        descriptionClass: "character-description"
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true,
        description: <>Cada vez que pierde 1 punto de vida, toma 1 pepita de oro.</>,
        descriptionClass: "character-description"
    },

    // High Noon cards

    BLESSING: {
        name: "Bendición",
        description: <>El palo de todas las cartas es Corazones.</>,
        titleClass: "card-title card-title-lower"
    },
    GHOST_TOWN: {
        name: "Pueblo Fantasma",
        description: <>Durante su turno, los jugadores eliminados regresan al juego como fantasmas. Roban 3 cartas en lugar de 2, y no pueden morir. Al final de su turno, son eliminados nuevamente.</>,
        descriptionClass: "card-description text-smallest",
        titleClass: "card-title card-title-lower"
    },
    INVERT_ROTATION: {
        name: "Gold Rush",
        description: <>El juego procede en sentido contrario a las agujas del reloj durante una ronda, comenzando siempre con el Sheriff. Todos los efectos de cartas proceden en sentido horario.</>,
        descriptionClass: "card-description text-smallest",
        titleClass: "card-title card-title-lower"
    },
    THE_DALTONS: {
        name: "Los Daltons",
        description: <>Cuando <i>Los Dalton</i> entran en juego, cada jugador que tenga cartas azules frente a él, elige una de ellas y la descarta.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_DOCTOR: {
        name: "El Doctor",
        description: <>Cuando <i>El Doctor</i> entra en juego, el/los jugador(es) aún en el juego con menos puntos de vida actuales recupera(n) 1 punto de vida.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_REVEREND: {
        name: "El Reverendo",
        description: <>Los jugadores no pueden jugar cartas de <i>Cerveza</i>.</>,
        titleClass: "card-title card-title-lower"
    },
    TRAIN_ARRIVAL: {
        name: "Llegada del Tren",
        description:  <>Cada jugador roba una carta adicional al final de la fase 1 de su turno.</>,
        titleClass: "card-title card-title-lower"
    },
    CURSE: {
        name: "Maldición",
        description: <>El palo de todas las cartas es Picas.</>,
        titleClass: "card-title card-title-lower"
    },
    HANGOVER: {
        name: "Resaca",
        description: <>Todos los personajes pierden sus habilidades especiales.</>,
        titleClass: "card-title card-title-lower"
    },
    SERMON: {
        name: "Sermón",
        description: <>Cada jugador no puede usar cartas de <i>¡BANG!</i> durante su turno.</>,
        titleClass: "card-title card-title-lower"
    },
    THIRST: {
        name: "Sed",
        description: <>Cada jugador solo roba su primera carta, no la segunda, durante la fase 1 de su turno.</>,
        titleClass: "card-title card-title-lower"
    },
    SHOOTOUT: {
        name: "Tiroteo",
        description: <>Cada jugador puede jugar una segunda carta de <i>¡BANG!</i> durante su turno.</>,
        titleClass: "card-title card-title-lower"
    },
    HANDCUFFS: {
        name: "Esposas",
        description: <>Después de robar sus cartas en la fase 1, el jugador en ese turno escoge un palo: solo puede jugar cartas de ese palo durante su turno.</>,
        titleClass: "card-title card-title-lower"
    },
    HANDCUFFS_HEARTS: {
        name: "Esposas: Declarar Corazones",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Esposas: Declarar Diamantes",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_CLUBS: {
        name: "Esposas: Declarar Tréboles",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "card-description text-bigger"
    },
    HANDCUFFS_SPADES: {
        name: "Esposas: Declarar Picas",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    NEW_IDENTITY: {
        name: "Nueva Identidad",
        description: <>Al comienzo de su turno, cada jugador elige otro personaje al azar. Puede cambiar a la nueva identidad por el resto del juego, comenzando con 2 puntos de vida.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    HIGH_NOON: {
        name: "Mediodía",
        description: <>Cada jugador pierde 1 punto de vida al comienzo de su turno.</>,
        titleClass: "card-title card-title-lower"
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Emboscada",
        description: <>La distancia entre cualquier par de jugadores es 1. Esto solo se modifica por cartas en juego.</>,
        titleClass: "card-title card-title-lower"
    },
    SNIPER: {
        name: "Francotirador",
        description:  <>Durante su turno, el jugador puede descartar 2 cartas de <i>¡BANG!</i> juntas contra un jugador: esto cuenta como un <i>¡BANG!</i> pero solo puede ser cancelado con 2 cartas de <i>¡Fallaste!</i>.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    DEAD_MAN: {
        name: "Hombre Muerto",
        description: <>Durante su turno, el jugador que fue eliminado primero regresa al juego con 2 puntos de vida y 2 cartas.</>,
        titleClass: "card-title card-title-lower"
    },
    BLOOD_BROTHERS: {
        name: "Hermanos de Sangre",
        description: <>Al comienzo de su turno, cada jugador puede perder un punto de vida (excepto el último) para dar un punto de vida a cualquier jugador de su elección.</>,
        titleClass: "card-title card-title-lower"
    },
    THE_JUDGE: {
        name: "El Juez",
        description: <>No puedes jugar cartas frente a ti ni frente a ningún otro jugador.</>,
        titleClass: "card-title card-title-lower"
    },
    LASSO: {
        name: "Lazo",
        description: <>Las cartas en juego frente a los jugadores no tienen efecto.</>,
        titleClass: "card-title card-title-lower"
    },
    LAW_OF_THE_WEST: {
        name: "Law Of The West",
        description: <>Durante su fase 1, cada jugador muestra la segunda carta que roba: si puede, debe jugarla durante su fase 2.</>,
        titleClass: "card-title card-title-lower"
    },
    HARD_LIQUOR: {
        name: "Licor Fuerte",
        description: <>Cada jugador puede saltarse su fase 1 para recuperar 1 punto de vida.</>,
        titleClass: "card-title card-title-lower"
    },
    ABANDONED_MINE: {
        name: "Mina Abandonada",
        description: <>Durante su fase 1, cada jugador roba del descarte (si se acaban, roba del mazo). En su fase 3, descarta boca abajo sobre el mazo.</>,
        titleClass: "card-title card-title-lower"
    },
    PEYOTE: {
        name: "Peyote",
        hideTitle: false,
        description: <>En lugar de robar en su fase 1, cada jugador adivina si el palo de la carta superior del mazo es rojo o negro. Luego roba y la muestra: si acertó, la conserva y puede adivinar otra vez; de lo contrario, procede a la fase 2.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest line-smaller"
    },
    PEYOTE_RED: {
        name: "Peyote: Declarar Rojo",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "card-description text-bigger"
    },
    PEYOTE_BLACK: {
        name: "Peyote: Declarar Negro",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "card-description text-bigger"
    },
    RANCH: {
        name: "Rancho",
        hideTitle: false,
        description: <>Al final de su fase 1, cada jugador puede descartar una vez cualquier número de cartas de su mano para robar la misma cantidad de cartas del mazo.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    RICOCHET: {
        name: "Ricochet",
        description: <>Cada jugador puede descartar cartas de <i>¡BANG!</i> contra cartas en juego frente a cualquier jugador. El dueño debe jugar 1 <i>¡Fallaste!</i> por cada <i>¡BANG!</i> para proteger su carta, de lo contrario es descartada.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    RUSSIAN_ROULETTE: {
        name: "Ruleta Rusa",
        description: <>Cuando <i>Ruleta Rusa</i> entra en juego, comenzando por el Sheriff cada jugador descarta un <i>¡Fallaste!</i>, hasta que un jugador no pueda: pierde 2 puntos de vida y la Ruleta se detiene.</>,
        titleClass: "card-title card-title-lower",
        descriptionClass: "card-description text-smallest"
    },
    VENDETTA: {
        name: "Vendetta",
        hideTitle: false,
        description: <>Al final de su turno, cada jugador "¡Desenfunda!": si es Corazón, juega otro turno (pero no "¡Desenfunda!" de nuevo).</>,
        titleClass: "card-title card-title-lower"
    },
    A_FISTFUL_OF_CARDS: {
        name: "Un Puñado de Cartas",
        description: <>Al comienzo de su turno, el jugador es el objetivo de tantos <i>¡BANG!</i> como cartas tenga en su mano.</>,
        titleClass: "card-title card-title-lower"
    },

    // Wild West Show cards

    GAG: {
        name: "Mordaza",
        description: <>Los jugadores no pueden hablar (pueden gesticular, gemir, ...). Quien hable pierde 1 punto de vida.</>,
        titleClass: "card-title card-title-higher"
    },
    BONE_ORCHARD: {
        name: "Cementerio",
        description: <>Al comienzo de su turno, todos los jugadores eliminados regresan al juego con 1 punto de vida. Reparte sus roles al azar entre los de los jugadores eliminados.</>,
        titleClass: "card-title card-title-higher"
    },
    DARLING_VALENTINE: {
        name: "San Valentin",
        hideTitle: false,
        description:  <>Al comienzo de su turno, cada jugador descarta su mano y roba la misma cantidad de cartas del mazo.</>,
        titleClass: "card-title card-title-higher"
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage",
        hideTitle: false,
        description: <>Durante su turno, cada jugador puede forzar a otro jugador a jugar una de sus cartas.</>,
        titleClass: "card-title card-title-higher"
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        hideTitle: false,
        description: <>Cuando <i>Helena</i> entra en juego, "¡Desenfunda!": si es Corazones o Diamantes, baraja todos los roles activos, excepto el Sheriff, y repártelos al azar.</>,
        titleClass: "card-title card-title-higher"
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa de Texas",
        description: <>Durante su turno, cada jugador puede intercambiar posiciones con el jugador a su derecha, quien saltará su siguiente turno.</>,
        titleClass: "card-title card-title-higher"
    },
    MISS_SUSANNA: {
        name: "Miss Susanna",
        hideTitle: false,
        description: <>Durante su turno, cada jugador debe jugar al menos 3 cartas. Si no lo hace, pierde 1 punto de vida.</>,
        titleClass: "card-title card-title-higher"
    },
    SHOWDOWN: {
        name: "Enfrentamiento",
        description: <>Todas las cartas pueden jugarse como si fueran <i>¡BANG!</i> Todas las cartas de <i>¡BANG!</i> solo pueden jugarse como si fueran <i>¡Fallaste!</i></>,
        titleClass: "card-title card-title-higher"
    },
    SACAGAWAY: {
        name: "Sacagaway",
        hideTitle: false,
        description: <>Todos los jugadores juegan con sus manos reveladas (¡excluyendo sus roles!).</>,
        titleClass: "card-title card-title-higher"
    },
    WILD_WEST_SHOW: {
        name: "Espectáculo del Viejo Oeste",
        hideTitle: false,
        description: <>El objetivo de cada jugador se convierte en: "¡Ser el último en juego!"</>,
        titleClass: "card-title card-title-higher"
    },

    // Gold Rush cards

    SHOT: {
        name: "Trago",
        description: <>Un jugador de tu elección (incluso tú) recupera 1 punto de vida.</>
    },
    BOTTLE: {
        name: "Botella",
        description:  <>Puede jugarse como <i>¡Pánico!</i>, <i>Cerveza</i> o <i>¡BANG!</i></>
    },
    BOTTLE_PANIC: {
        name: "Botella como ¡Pánico!",
        hideTitle: true
    },
    BOTTLE_BEER: {
        name: "Botella como Cerveza",
        hideTitle: true
    },
    BOTTLE_BANG: {
        name: "Botella como ¡BANG!",
        hideTitle: true
    },
    CALUMET: {
        name: "Calumet",
        hideTitle: false,
        description: <>Las cartas de Diamantes jugadas por otros jugadores no te afectan.</>
    },
    GUN_BELT: {
        name: "Cinturon",
        description: <>Tu límite de cartas en mano al final de tu turno es de 8 cartas.</>
    },
    PARDNER: {
        name: "Compañero",
        description: <>Puede jugarse como <i>Almacén General</i>, <i>Duelo</i> o <i>Cat Balou</i>.</>
    },
    PARDNER_GENERAL_STORE: {
        name: "Compañero como Almacén General",
        hideTitle: true,
        description: <>Revela tantas cartas como jugadores. Cada jugador roba una.</>
    },
    PARDNER_DUEL: {
        name: "Compañero como Duelo",
        hideTitle: true,
        description: <>Un jugador objetivo descarta un <i>¡BANG!</i>, luego tú, etc. El primer jugador que falle en descartar un <i>¡BANG!</i> pierde 1 punto de vida.</>
    },
    PARDNER_CAT_BALOU: {
        name: "Compañero como Cat Balou",
        hideTitle: true
    },
    GOLD_RUSH: {
        name: "Fiebre del Oro",
        description: <>Tu turno termina. Recupera todos tus puntos de vida y luego juega otro turno.</>
    },
    HORSESHOE: {
        name: "Herradura",
        description: <>Cada vez que "¡Desenfundas!", voltea una carta adicional y elige el resultado.</>
    },
    PICKAXE: {
        name: "Pico",
        description: <>Durante la fase 1 de tu turno, roba 1 carta adicional.</>
    },
    WANTED: {
        name: "Se Busca",
        description: <>Juega sobre cualquier jugador. Quien elimine a ese jugador roba 2 cartas y toma 1 pepita de oro.</>
    },
    RHUM: {
        name: "Ron",
        description: <>"¡Desenfunda!" 4 cartas: recuperas 1 punto de vida por cada palo diferente.</>
    },
    GOLD_PAN: {
        name: "Charola de Oro",
        description: <>Paga 1 pepita de oro para robar 1 carta del mazo. Puedes usar esta habilidad hasta 2 veces por turno.</>
    },
    BOOTS: {
        name: "Botas",
        description: <>Cada vez que pierdes 1 punto de vida, roba 1 carta del mazo.</>
    },
    LUCKY_CHARM: {
        name: "Amuleto de la Suerte",
        description: <>Cada vez que pierdes 1 punto de vida, toma 1 pepita de oro.</>
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        hideTitle: true,
        description: <>Roba 4 cartas del mazo.</>
    },
    RUCKSACK: {
        name: "Mochila",
        description: <>Paga 2 pepitas de oro para recuperar 1 punto de vida.</>
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Cactus",
        hideTitle: true
    },
    DRAGOON: {
        name: "Dragón",
        hideTitle: true,
        description: <>Puedes jugar 1 <i>¡BANG!</i> adicional durante tu turno.</>
    },
    EVADED: {
        name: "¡Evadido!",
        description: <>Roba la carta que acabas de <i>¡Fallar!</i></>,
        descriptionClass: "card-description-lower"
    },
    FULL_STEAM: {
        name: "A Todo Vapor",
        description: <>Envía el tren al Final de la Línea.<br/>Duplica o cancela el efecto de la Locomotora.</>
    },
    FULL_STEAM_NO_EFFECT: {
        name: "A Todo Vapor: Cancelar efecto de la Locomotora",
        hideTitle: true
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "A Todo Vapor: Duplicar efecto de la Locomotora",
        hideTitle: true
    },
    KNIFE_REVOLVER: {
        name: "Revólver Cuchillo",
        hideTitle: true,
        description: <>Cuenta como tu unico <i>¡BANG!</i> por turno. "¡Desenfunda!": J, Q, K, A = recupera esta carta en tu mano.</>
    },
    MAP: {
        name: "Mapa",
        description: <>En tu turno, antes de robar, mira las 2 cartas superiores del mazo: puedes descartar 1.</>
    },
    MONEY_BAG: {
        name: "Bolsa de Dinero",
        description: <>Si la carta superior en la pila de descarte tiene borde marrón, copia su efecto.</>
    },
    MOST_WANTED: {
       name: "Más Buscado",
        hideTitle: true,
        description: <>Cada jugador debe "¡Desenfundar!":<br/>♠ = ese jugador pierde 1 punto de vida.</>
    },
    NEXT_STOP: {
        name: "Próxima Parada",
        description: <>Avanza el tren una Estación.</>,
        descriptionClass: "card-description-lower"
    },
    REFUND: {
        name: "Reembolso",
        description: <>Cuando otro jugador roba o descarta 1 de tus otras cartas, roba 1 carta.</>
    },
    STRONGBOX: {
        name: "Caja Fuerte",
        description: <>Al final de tu turno, roba 1 carta.</>
    },
    SWITCH: {
        name: "Cambio",
        description: <>Intercambia 1 de tus cartas en juego con otra carta en juego.</>
    },
    TRAIN_ROBBERY: {
        name: "Robo al Tren",
        description: <>Cuenta como tu <i>¡BANG!</i> por turno.<br/>Por cada una de sus cartas en juego, el objetivo elige: descartarla o ser objetivo de un ¡BANG!</>,
        descriptionClass: "card-description text-smaller"
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Robo al Tren: Descartar una carta",
        hideTitle: true
    },
    TRAIN_ROBBERY_BANG: {
        name: "Robo al Tren: Recibir un Bang",
        hideTitle: true
    },
    WATER_TOWER: {
        name: "Torre de Agua",
        description: <>Toma 1 Vagón de tu elección del tren gratis.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler",
        hideTitle: true,
        description: <>Durante su turno, puede tomar cualquier cantidad de Vagones del tren.</>,
        descriptionClass: "character-description"
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true,
        description: <>Si es el objetivo de una carta de <i>¡BANG!</i>, puede descartar una carta del mismo palo de su mano para desviarla a otro jugador a distancia 1.</>,
        descriptionClass: "character-description"
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true,
        description: <>Al final de su turno, roba 1 carta.</>,
        descriptionClass: "character-description"
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true,
        description: <>Cada vez que el tren llega al Final de la Línea, roba 2 cartas.</>,
        descriptionClass: "character-description"
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true,
        description: <>Una vez durante su turno, puede tomar 1 Vagón de su elección del tren gratis.</>,
        descriptionClass: "character-description"
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true,
        description: <>Cuando apunta a múltiples jugadores con una carta o efecto, puede eximir a 1 jugador.</>,
        descriptionClass: "character-description"
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true,
        description: <>Cada vez que el tren avanza cuando no es su turno, puede descartar 1 carta de su mano para robar 1 carta.</>,
        descriptionClass: "character-description"
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true,
        description: <>Una vez durante su turno, puedes avanzar el tren 1 Estación.</>,
        descriptionClass: "character-description"
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true,
        description: <>Puede intentar adivinar el color o el palo de cada carta robada en su fase 1: roba 1 carta extra por cada "color" acertado (2, por cada "palo").</>,
        descriptionClass: "character-description"
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Declarar Rojo",
        hideTitle: true,
        description: <>♥️♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Declarar Corazones",
        hideTitle: true,
        description: <>♥️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Declarar Diamantes",
        hideTitle: true,
        description: <>♦️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Declarar Negro",
        hideTitle: true,
        description: <>♣️♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Declarar Tréboles",
        hideTitle: true,
        description: <>♣️</>,
        descriptionClass: "character-description text-bigger"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Declarar Picas",
        hideTitle: true,
        description: <>♠️</>,
        descriptionClass: "character-description text-bigger"
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        hideTitle: true,
        description: <>Por cada punto de vida que le falte, la distancia a la que es visto por otros aumenta en 1.</>,
        descriptionClass: "character-description"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>Puede aumentar sus puntos de vida hasta un máximo de 6.</>,
        descriptionClass: "character-description"
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true,
         description: <>Cada vez que fuera a ser golpeado, puede descartar una carta de su mano para evitar el golpe. Carta jugada + carta descartada: si ≥ 13 = <i>¡Fallaste!</i>, ≥ 17 = <i>Esquivar</i>; ≥ 20 = <i>Contragolpe</i>.</>,
        descriptionClass: "character-description"
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true,
        description: <>Antes de robar, el jugador con más cartas en mano debe darle una a su elección.</>,
        descriptionClass: "character-description"
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true,
        description: <>Una vez en su turno, puede descartar una carta de borde azul de su mano para robar 2 cartas.</>,
        descriptionClass: "character-description"
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true,
        description: <>Una vez en su turno puede descartar una carta de su mano para robar otra del mazo. Si es Diamante, puede robar otra vez.</>,
        descriptionClass: "character-description"
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true,
        description: <>Durante una ronda completa, puede beneficiarse del efecto de una carta de borde azul frente a otro jugador.</>,
        descriptionClass: "character-description"
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true,
        description: <>Cada vez que una carta es "¡Desenfundada!", puede descartar una carta de mano para obtener la carta desenfundada.</>,
        descriptionClass: "character-description"
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true,
        description: <>Cada vez que pone una carta en juego, todas las demás cartas en juego con el mismo nombre son descartadas.</>,
        descriptionClass: "character-description"
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true,
        description: <>Cada vez que golpea a un jugador con un <i>¡BANG!</i>, roba una carta.</>,
        descriptionClass: "character-description"
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true,
        description: <>Una vez en su turno, puede descartar una carta de <i>¡BANG!</i> para repetir el efecto de una carta de borde marrón que acaba de jugar.</>,
        descriptionClass: "character-description"
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Cada vez que fuera a ser eliminado, "¡Desenfunda!": si no es Picas, se mantiene con 1 punto de vida y roba 1 carta.</>,
        descriptionClass: "character-description"
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true,
        description: <>Las cartas que pueden afectar a más de un jugador no tienen efecto sobre él.</>,
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

   // Cartas de Vagones The Great Train Robbery

    BAGGAGE_CAR: {
        name: "Vagón de Equipaje",
        hideTitle: true,
        description: <>Descarta esto por un <i>¡Fallaste!</i>, <i>¡Pánico!</i>, <i>Cat Balou</i>, o un <i>¡BANG!</i> adicional.</>,
        descriptionClass: "train-description"
    },
    BAGGAGE_CAR_MISSED: {
        name: "Vagón de Equipaje como ¡Fallaste!",
        hideTitle: true
    },
    BAGGAGE_CAR_PANIC: {
        name: "Vagón de Equipaje como ¡Pánico!",
        hideTitle: true
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Vagón de Equipaje como Cat Balou",
        hideTitle: true
    },
    BAGGAGE_CAR_BANG: {
        name: "Vagón de Equipaje como ¡BANG!",
        hideTitle: true
    },
    CABOOSE: {
        name: "Furgón de Cola",
        hideTitle: true,
        description: <>Puedes descartar una de tus otras cartas de borde azul (incluyendo un Vagón) como un <i>¡Fallaste!</i></>,
        descriptionClass: "train-description"
    },
    CATTLE_TRUCK: {
        name: "Vagón Ganadero",
        hideTitle: true,
        description: <>Descarta esto para mirar las 3 cartas superiores descartadas y robar 1.</>,
        descriptionClass: "train-description"
    },
    CIRCUS_WAGON: {
        name: "Vagón de Circo",
        hideTitle: true,
        description: <>Descarta esto para hacer que cada otro jugador descarte una de sus cartas en juego.</>,
        descriptionClass: "train-description"
    },
    COAL_HOPPER: {
        name: "Vagón de Carbón",
        hideTitle: true,
        description: <>Descarta esto para robar 1 carta y descartar 1 Vagón en juego frente a cualquier jugador de tu elección.</>,
        descriptionClass: "train-description"
    },
    DINING_CAR: {
        name: "Vagón Comedor",
        hideTitle: true,
        description: <>Al comienzo de tu turno, "¡Desenfunda!":<br/>si es Corazones, recupera 1 punto de vida.</>,
        descriptionClass: "train-description"
    },
    EXPRESS_CAR: {
        name: "Vagón Expreso",
        hideTitle: true,
        description: <>Descarta esta carta: Tu turno termina inmediatamente. Descarta todas las cartas de tu mano, luego juega otro turno.</>,
        descriptionClass: "train-description"
    },
    GHOST_CAR: {
        name: "Vagón Fantasma",
        hideTitle: true,
        description: <>Juega sobre cualquier jugador excepto el Sheriff.<br/>Si eres eliminado, permaneces en juego en su lugar, pero no puedes ganar ni perder puntos de vida.</>,
        descriptionClass: "train-description"
    },
    LOUNGE_CAR: {
        name: "Vagón Salón",
        hideTitle: true,
        description: <>Descarta esto para robar 2 Vagones del mazo, pon 1 en juego frente a ti y pon el otro frente a otro jugador.</>,
        descriptionClass: "train-description"
    },
    LUMBER_FLATCAR: {
        name: "Vagón Plataforma de Madera",
        hideTitle: true,
        description: <>Juega sobre cualquier jugador.<br/>Ves a todos los otros jugadores a distancia +1.</>,
        descriptionClass: "train-description"
    },
    MAIL_CAR: {
        name: "Vagón de Correo",
        hideTitle: true,
        description: <>Descarta esto para robar 3 cartas y dar 1 de ellas a un jugador de tu elección.</>,
        descriptionClass: "train-description"
    },
    OBSERVATION_CAR: {
        name: "Vagón Mirador",
        hideTitle: true,
        description: <>Ves a otros a distancia -1.<br/>Otros te ven a distancia +1.</>,
        descriptionClass: "train-description"
    },
    PASSENGER_CAR: {
        name: "Vagón de Pasajeros",
        hideTitle: true,
        description: <>Descarta esto para robar 1 carta (en juego o en mano) de cualquier otro jugador de tu elección.</>,
        descriptionClass: "train-description"
    },
    PRISONER_CAR: {
        name: "Vagón de Prisioneros",
        hideTitle: true,
        description: <>No eres afectado por cartas de <i>¡Indios!</i> o <i>Duelo</i> jugadas por otros jugadores.</>,
        descriptionClass: "train-description"
    },
    PRIVATE_CAR: {
        name: "Vagón Privado",
        hideTitle: true,
        description: <>Mientras tu mano esté vacía, no puedes ser objetivo de cartas de <i>¡BANG!</i></>,
        descriptionClass: "train-description"
    },
    SLEEPER_CAR: {
        name: "Vagón Dormitorio",
        hideTitle: true,
        description: <>Una vez por turno, puedes descartar una de tus otras cartas de borde azul (incluyendo un Vagón) como un <i>¡BANG!</i> adicional.</>,
        descriptionClass: "train-description"
    },
    // Cartas de Locomotoras The Great Train Robbery

    IRONHORSE: {
        name: "Caballo de Hierro",
        hideTitle: true,
        description: <>En el Final de la Línea, cada jugador es el objetivo de un <i>¡BANG!</i></>,
        descriptionClass: "locomotive-description"
    },
    LELAND: {
        name: "Leland",
        hideTitle: true,
        description: <>En el Final de la Línea, esto actúa como un <i>Almacén General</i>.</>,
        descriptionClass: "locomotive-description"
    },
    // Cartas de Estaciones The Great Train Robbery

    BOOM_TOWN: {
        name: "Boom Town",
        hideTitle: true
    },
    CATICO: {
        name: "Catico",
        hideTitle: true
    },
    CREEPY_CREEK: {
        name: "Arroyo Espeluznante",
        hideTitle: true
    },
    CROWNS_HOLE: {
        name: "Agujero de la Corona",
        hideTitle: true
    },
    DEATHWOOD: {
        name: "Bosque de la Muerte",
        hideTitle: true
    },
    DODGEVILLE: {
        name: "Dodgeville",
        hideTitle: true
    },
    FORT_WROTH: {
        name: "Fuerte Wroth",
        hideTitle: true
    },
    FRISCO: {
        name: "Frisco",
        hideTitle: true
    },
    MINERS_OATH: {
        name: "Juramento del Minero",
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
        name: "Pueblo Virginia",
        hideTitle: true
    },
    YOOMA: {
        name: "Yooma",
        hideTitle: true
    },

   // Personajes Legends

    LEGEND_BART_CASSIDY: {
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Si pierde un punto de vida, roba 2 cartas.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>Puede voltear cartas hasta que su suma sea mayor que 21. Roba todas esas cartas.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Cada una de sus cartas cuenta como <i>¡BANG!</i> o <i>¡Fallaste!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Si un jugador le golpea, roba 1 carta de su mano y la carta que le golpeó.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Mira la mano de cualquier jugador, roba 1 carta de allí, luego roba 1 del mazo.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Si es el objetivo de una carta marrón, puede "¡Desenfundar!":<br/>J, Q, K, A = ignora la carta.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Roba 3 cartas. Puede dar 1 de ellas a cualquier otro jugador.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Si una carta requiere "¡Desenfundar!", voltea 2 cartas y elige 1 para usar. Si es su turno, entonces roba la carta elegida.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Otros le ven a distancia +1.<br/>Para jugar un <i>¡BANG!</i> contra el, un jugador debe descartar una carta adicional de su mano.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Roba 2 cartas más la carta superior de la pila de descarte.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>Puede ver a todos los jugadores a distancia 1. Una vez durante su turno, puede descartar una de sus cartas azules, en mano o en juego, como <i>¡Pánico!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>Puede descartar 2 cartas para ganar 1 punto de vida. Una vez durante su turno, si gana 1 punto de vida, puede disparar un <i>¡BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Su <i>¡BANG!</i> no puede ser cancelado.<br/>Si reclama una Proeza, puede eliminar incluso el último punto de vida de un jugador.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>Si tiene menos de 2 cartas en mano, roba hasta tener 2 cartas.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Si un jugador es eliminado, toma en mano todas sus cartas. Si es eliminado, permanece en juego con 4 puntos de vida, pero vuelve a ser un personaje normal</>,
        descriptionClass: "legends-description",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>Puede jugar cualquier cantidad de cartas de <i>¡BANG!</i><br/>En lugar de reclamar una Proeza, puede disparar un <i>¡BANG!</i> gratis.</>,
        descriptionClass: "legends-description",
    },

   // Cartas de Proezas Legends

    FIFTY_GUNS: {
        name: "Cincuenta Revólveres",
        description: <>Toma o descarta un arma.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Orgullo Herido",
        description: <>Otro jugador hace que una de tus cartas de <i>¡BANG!</i> falle.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Pandilla del Viejo Oeste",
        description: <>Golpea a 2 o más jugadores en el mismo turno.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Cuello de Botella",
        description: <>Descarta una carta de <i>Cerveza</i>.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "El Chuck-A-Luck",
        description: <>Descarta una carta de <i>¡BANG!</i>.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "3-15 Hacia Yooma",
        description: <>Haz u obliga a otro jugador a hacer un "¡Desenfundar!" (incluso al comienzo de tu turno).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Buena Compañía",
        description: <>Descarta una carta, luego juega una carta con el mismo nombre (o viceversa).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "El Último Héroe",
        description: <>Descarta una carta azul en juego.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "El Hombre Sin Nombre",
        description: <>Pierde 1 punto de vida (no el último).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "Grito de Wilhelm",
        description: <>Juega una carta de <i>¡BANG!</i> a distancia 2 o más.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Balada de Scrugs",
        description: <>Pierde un <i>Duelo</i>.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Tierras Fronterizas",
        description: <>Descarta toda tu mano (incluso si tienes 0 cartas).</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "El Sendero de Oregón",
        description: <>Durante tu fase de robo, no robes la primera carta que puedes robar.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "Mil Maneras de Morir",
        description: <>Muestra de tu mano una carta de <i>¡Fallaste!</i> y otra carta del mismo palo.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "Por Unas Cartas Más",
        description: <>Descarta al menos 1 carta sobrante al final de tu turno.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "Una Muerte Rápida",
        description: <>Golpea a otro jugador con vida completa usando una carta de <i>¡BANG!</i>.</>,
        titleClass: "feats-title",
        descriptionClass: "feats-description"
    },
    /// Cartas virtuales de fila de botones

    ESCAPE_JAIL: {
        name: "Escapar de la Cárcel"
    },
    BECOME_LEGEND: {
        name: "Convertirse en Leyenda"
    },
    CLAIM_FEAT: {
        name: "Reclamar una Proeza"
    },
    GAME_PASS: {
        name: "Pasar turno"
    },
    GAME_CONFIRM: {
        name: "Confirmar"
    },
    GAME_DISMISS: {
        name: "Continuar"
    },
    GAME_SELL_BEER: {
        name: "Vender cerveza"
    },
    GAME_DISCARD_BLACK: {
        name: "Descartar equipo"
    },
    GAME_DISCARD_BRONCO: {
        name: "Descartar Bronco"
    },

    // Roles de jugador

    ROLE_UNKNOWN: {
        name: "(Rol desconocido)",
        hideTitle: true
    },
    ROLE_SHERIFF: {
        name: "Sheriff",
        hideTitle: true,
        description: <>¡Mata a todos los Forajidos y al Renegado!</>
    },
    ROLE_DEPUTY: {
        name: "Alguacil",
        description: <>¡Protege al Sheriff! ¡Mata a todos los Forajidos y al Renegado!</>
    },
    ROLE_OUTLAW: {
        name: "Forajido",
        description: <>¡Mata al Sheriff!</>
    },
    ROLE_RENEGADE: {
        name: "Renegado",
        description: <>¡Sé el último en juego!</>
    },
    ROLE_DEPUTY_3P: {
        name: "Alguacil",
        description: <>¡Mata al Renegado!</>
    },
    ROLE_OUTLAW_3P: {
        name: "Forajido",
        description: <>¡Mata al Alguacil!</>
    },
    ROLE_RENEGADE_3P: {
        name: "Renegado",
        description: <>¡Mata al Forajido!</>
    },
    ROLE_SHADOW_DEPUTY: {
        name: "Alguacil Sombrío",
        description: <>¡Protege al Sheriff! ¡Mata a todos los Forajidos!</>
    },
    ROLE_SHADOW_OUTLAW: {
        name: "Forajido Sombrío",
        description: <>¡Mata al Sheriff!</>
    },

};