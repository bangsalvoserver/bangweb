import { CardRegistry } from "../Registry";

export const CARDS_ENGLISH: CardRegistry = {

    // Base game cards
    
    BARREL: {
        name: "Barrel"
    },
    DYNAMITE: {
        name: "Dynamite",
        description: <>Lose 3 life points. Else pass the <i>Dynamite</i> on your left.</>,
        descriptionClass: "draw-description"
    },
    SCOPE: {
        name: "Scope",
        description: <>You view others at distance -1.</>
    },
    MUSTANG: {
        name: "Mustang",
        hideTitle: true,
        description: <>Others view you at distance +1.</>
    },
    JAIL: {
        name: "Jail",
        description: <>Discard the <i>Jail</i>, play normally. Else discard the <i>Jail</i> and skip your turn.</>,
        descriptionClass: "draw-description"
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
        description: <>You can play any number of <i>BANG!</i></>,
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
        name: "Beer"
    },
    CAT_BALOU: {
        name: "Cat Balou",
        hideTitle: true
    },
    STAGECOACH: {
        name: "Stagecoach"
    },
    DUEL: {
        name: "Duel",
        description: <>A target player discards a <i>BANG!</i>, then you, etc. First player failing to discard a <i>BANG!</i> loses 1 life point.</>
    },
    GENERAL_STORE: {
        name: "General Store",
        description: <>Reveal as many cards as players. Each player draws one.</>
    },
    GATLING: {
        name: "Gatling"
    },
    INDIANS: {
        name: "Indians!",
        description: <>All other players discard a <i>BANG!</i> or lose 1 life point.</>
    },
    MISSED: {
        name: "Missed!"
    },
    PANIC: {
        name: "Panic!"
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
        name: "Binocular",
        description: <>You view others at distance -1.</>
    },
    HIDEOUT: {
        name: "Hideout",
        description: <>Others view you at distance +1.</>
    },
    PUNCH: {
        name: "Punch"
    },
    RAG_TIME: {
        name: "Rag Time",
        hideTitle: true
    },
    BRAWL: {
        name: "Brawl"
    },
    DODGE: {
        name: "Dodge"
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
        name: "Canteen"
    },
    CAN_CAN: {
        name: "Can Can",
        hideTitle: true
    },
    TEN_GALLON_HAT: {
        name: "Ten Gallon Hat"
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
        name: "Buffalo Rifle"
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
        name: "Iron Plate"
    },
    PONY_EXPRESS: {
        name: "Pony Express",
        hideTitle: true
    },
    KNIFE: {
        name: "Knife"
    },
    SOMBRERO: {
        name: "Sombrero",
        hideTitle: true
    },

    // Valley of Shadows cards

    GHOST: {
        name: "Ghost",
        description: <>Play on any eliminated player. That player is back in the game, but cannot gain nor lose life points.</>
    },
    GHOST_2: {
        name: "Ghost",
        description: <>Play on any eliminated player. That player is alive again without his character's ability, cannot gain nor lose life points and plays as a normal player.</>
    },
    LEMAT: {
        name: "Lemat",
        hideTitle: true,
        description: <>During your turn, you may use any card in your hand as a <i>BANG!</i> card.</>,
        descriptionClass: "weapon-description"
    },
    LEMAT_2: {
        name: "Lemat",
        hideTitle: true,
        description: <>In your turn, you may use any card (except <i>Missed!</i>) in your hand as a <i>BANG!</i> card.</>,
        descriptionClass: "weapon-description"
    },
    RATTLESNAKE: {
        name: "Rattlesnake",
        description: <>Play on any player. At the beginning of his turn, that player "draws!": on Spades, he loses 1 life point.</>
    },
    SHOTGUN: {
        name: "Shotgun",
        hideTitle: true,
        description: <>Each time you hit a player, he must discard a card of his choice from his hand.</>,
        descriptionClass: "weapon-description"
    },
    BOUNTY: {
        name: "Bounty",
        description: <>Play on any player. If that player is hit by a <i>BANG!</i> card, the player who shot him draws a card from the deck.</>
    },
    BANDIDOS: {
        name: "Bandidos",
        hideTitle: true,
        description: <>Each player chooses one: discard 2 cards from his hand (1 if he only has 1) or lose 1 life point.</>
    },
    BANDIDOS_2: {
        name: "Bandidos",
        hideTitle: true,
        description: <>All other players discard either a <i>BANG!</i> card or 2 cards of their choice from their hand.</>
    },
    ESCAPE: {
        name: "Escape",
        description: <>May be played out of turn. Avoid the effects of a brown card (other than <i>BANG!</i>) that includes you as a target.</>
    },
    ESCAPE_2: {
        name: "Escape",
        description: <>If you are the only target of a card other than <i>BANG!</i>, discard this card to avoid that effect.</>
    },
    AIM: {
        name: "Aim",
        description: <>Play this card together with a <i>BANG!</i> card. If the target is hit, he loses 2 life points.</>
    },
    POKER: {
        name: "Poker",
        hideTitle: true,
        description: <>All other players discard 1 card from their hand at the same time. If no Ace was discarded, you draw up to 2 of those cards.</>
    },
    BACKFIRE: {
        name: "Backfire",
        description: <>Counts as a <i>Missed!</i> card.<br/>The player who shot is the target of a <i>BANG!</i>.</>
    },
    SAVED: {
        name: "Saved!",
        description: <>May be played out of turn. Prevent another player from losing 1 life. If he survives, draw 2 cards from his hand or from the deck (your choice).</>
    },
    SAVED_2: {
        name: "Saved!",
        description: <>Play out of your turn only. Prevent any other player to lose a life point. If you save any player from elimination, draw 2 cards from that player's hand.</>
    },
    FANNING: {
        name: "Fanning",
        description: <>Counts as your normal one <i>BANG!</i> per turn. Also targets the player of your choice at distance 1 from the first target (if any, excluding you) with a <i>BANG!</i>.</>
    },
    TOMAHAWK: {
        name: "Tomahawk",
        hideTitle: true
    },
    TORNADO: {
        name: "Tornado",
        hideTitle: true,
        description: <>Each player discards a card from their hand (if possible), then draws 2 cards from the deck.</>
    },
    TORNADO_2: {
        name: "Tornado",
        hideTitle: true,
        description: <>Each player must give 2 cards from his hand to the player on his left.</>
    },
    LAST_CALL: {
        name: "Last Call"
    },

    // Armed & Dangerous cards

    CARAVAN: {
        name: "Caravan"
    },
    A_LITTLE_NIP: {
        name: "A Little Nip"
    },
    QUICK_SHOT: {
        name: "Quick Shot",
        description: <>Shoot an additional different player.</>,
        descriptionClass: "cube-description"
    },
    FLINTLOCK: {
        name: "Flintlock",
        hideTitle: true,
        description: <>If canceled, take this card back in hand.</>,
        descriptionClass: "cube-description"
    },
    ARROW: {
        name: "Arrow",
        description: <><p>A target player discards a <i>BANG!</i> card from hand or loses 1 life point.</p><p>Target one additional different player.</p></>,
        descriptionClass: "cube-description-double"
    },
    DUCK: {
        name: "Duck!",
        description: <>Take this card back in hand.</>,
        descriptionClass: "cube-description"
    },
    RELOAD: {
        name: "Reloading",
        description: <>Add 3 📦 to your cards and/or your character.</>
    },
    RUST: {
        name: "Rust",
        description: <>All others move 1 📦 from each Dangerous card and their character to your character.</>
    },
    SQUAW: {
        name: "Squaw",
        description: <><p>Discard any card from play.</p><p>Add the discarded card to your hand.</p></>,
        descriptionClass: "cube-description-double"
    },
    ACE_UP_THE_SLEEVE: {
        name: "Ace Up The Sleeve"
    },
    BANDOLIER: {
        name: "Bandolier",
        description: <>Once during your turn, you may play one extra <i>BANG!</i> card.</>,
        descriptionClass: "cube-description"
    },
    BIG_FIFTY: {
        name: "Big Fifty",
        hideTitle: true,
        description: <>Cancel the target player's character ability and cards in play.</>,
        descriptionClass: "cube-description"
    },
    BOMB: {
        name: "Bomb",
        description: <>Play on any player. At the start of your turn, "draw!":<br/>♥♦=pass <i>Bomb</i> to any player.<br/>♣♠=discard 2 📦: if they run out, lose 2 life points.</>
    },
    BUNTLINE_SPECIAL: {
        name: "Buntline Special",
        hideTitle: true,
        description: <>If the <i>BANG!</i> is canceled the target player must discard a card of his choice from hand.</>,
        descriptionClass: "cube-description"
    },
    BELL_TOWER: {
        name: "Bell Tower",
        description: <>You see all players at distance 1 for the next card you play.</>,
        descriptionClass: "cube-description"
    },
    CRATE: {
        name: "Crate"
    },
    TUMBLEWEED: {
        name: "Tumbleweed",
        description: <>Make any player repeat a "draw!"</>,
        descriptionClass: "cube-description"
    },
    DOUBLE_BARREL: {
        name: "Double Barrel",
        description: <>If you play a Diamond-suited <i>BANG!</i>, it can't be canceled.</>,
        descriptionClass: "cube-description"
    },
    WHIP: {
        name: "Whip",
        description: <>Discard any card from play.</>,
        descriptionClass: "cube-description"
    },
    BEER_KEG: {
        name: "Beer Keg"
    },
    LOCKPICK: {
        name: "Lockpick",
        description: <>Draw 1 card from the hand of any player.</>,
        descriptionClass: "cube-description"
    },
    THUNDERER: {
        name: "Thunderer",
        hideTitle: true,
        description: <>Take the <i>BANG!</i> card back in hand.</>,
        descriptionClass: "cube-description"
    },

    // Canyon Diablo cards

    GRAVE_ROBBER: {
        name: "Graverobber",
        description: <>Put on the table as many discarded cards as players.<br/>Each player draws one.</>
    },
    CARD_SHARPER: {
        name: "Card Sharper",
        description: <>Switch a blue-bordered card you have in play with one of the same colour in front of another player.</>
    },
    MIRAGE: {
        name: "Mirage",
        description: <>Count as a <i>Missed!</i> card.<br/>Also the player who shot ends his turn immediately.</>
    },
    BLOOD_PACT: {
        name: "Blood Pact"
    },
    SACRIFICE: {
        name: "Sacrifice",
        description: <>May be played out of turn. Prevent another player from losing 1 life point by taking the hit yourself. Then, if possible, draw 2 cards from the deck (3, if he survives).</>
    },
    DISARM: {
        name: "Disarm",
        description: <>Counts as a <i>Missed!</i> card.<br/>Also the player who shot must discard an hand card.</>
    },
    MOLOTOV: {
        name: "Molotov",
        hideTitle: true
    },
    BULLDOG: {
        name: "Bulldog",
        hideTitle: true,
        description: <>Once in your turn, you may play a <i>BANG!</i> card as <i>Gatling</i> by discarding another card with it.</>,
        descriptionClass: "weapon-description"
    },
    LAST_WILL: {
        name: "Last Will",
        description: <>Play on any player. If he is eliminated, he may give up to 3cards (in hand or in play) to another player.</>
    },
    INDIAN_GUIDE: {
        name: "Indian Guide",
        description: <>Play on yourself. <i>Indians!</i> and <i>War Path</i> have no effect on you.</>
    },
    TAXMAN: {
        name: "Taxman",
        description: <>Play on any player. At the beginnning of his turn, he must "draw!": on Spades or Clubs, he draws one card less in phase 1.</>
    },
    BROTHEL: {
        name: "Brothel",
        description: <>Discard and play, but lose your ability 'til your next turn. Else, discard and play normally.</>,
        descriptionClass: "draw-description"
    },
    BRONCO: {
        name: "Bronco",
        hideTitle: true,
        description: <>Others view you at distance +1. It can't be in play with <i>Mustang</i>. It can be removed by discarding 2 cards too.</>
    },
    PACK_MULE: {
        name: "Pack Mule",
        description: <>You may hold one card more than your current life points. It can't be in play with <i>Mustang</i> or <i>Bronco</i>.</>
    },
    WAR_PATH: {
        name: "War Path",
        description: <>All other players discard a <i>BANG!</i> card or lose 1 life point.</>
    },
    ARSON: {
        name: "Arson"
    },
    FLYING_BULLET: {
        name: "Flying Bullet",
        description: <>Count as a <i>Missed!</i> card.<br/>Also a player of your choice at distance 1 from you (if any) is the target of the <i>BANG!</i>.</>
    },
    ON_THE_HOUSE: {
        name: "On The House"
    },
    GUITAR: {
        name: "Guitar",
        description: <>Play on any player. 'til it is removed, he cannot play <i>BANG!</i> cards (or cards which depend on gun's reachable distance).</>
    },
    SCRAPPER: {
        name: "Scrapper"
    },
    SHYLOCK: {
        name: "Shylock"
    },

    // Base game characters

    BART_CASSIDY: {
        name: "Bart Cassidy"
    },
    BLACK_JACK: {
        name: "Black Jack"
    },
    CALAMITY_JANET: {
        name: "Calamity Janet"
    },
    EL_GRINGO: {
        name: "El Gringo"
    },
    JESSE_JONES: {
        name: "Jesse Jones"
    },
    JOURDONNAIS: {
        name: "Jourdonnais"
    },
    KIT_CARLSON: {
        name: "Kit Carlson"
    },
    LUCKY_DUKE: {
        name: "Lucky Duke"
    },
    PAUL_REGRET: {
        name: "Paul Regret"
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez"
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan"
    },
    SID_KETCHUM: {
        name: "Sid Ketchum"
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer"
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette"
    },
    VULTURE_SAM: {
        name: "Vulture Sam"
    },
    WILLY_THE_KID: {
        name: "Willy the Kid"
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\""
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch"
    },
    UNCLE_WILL: {
        name: "Uncle Will"
    },
    ANNIE_VERSARY: {
        name: "Annie Versary"
    },
    EMILIANO: {
        name: "Emiliano"
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid"
    },
    BELLE_STAR: {
        name: "Belle Star"
    },
    BILL_NOFACE: {
        name: "Bill Noface"
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam"
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday"
    },
    ELENA_FUENTE: {
        name: "Elena Fuente"
    },
    GREG_DIGGER: {
        name: "Greg Digger"
    },
    HERB_HUNTER: {
        name: "Herb Hunter"
    },
    JOSE_DELGADO: {
        name: "Josè Delgado"
    },
    MOLLY_STARK: {
        name: "Molly Stark"
    },
    PAT_BRENNAN: {
        name: "Pat Brennan"
    },
    PIXIE_PETE: {
        name: "Pixie Pete"
    },
    SEAN_MALLORY: {
        name: "Sean Mallory"
    },
    TEQUILA_JOE: {
        name: "Tequila Joe"
    },
    VERA_CUSTER: {
        name: "Vera Custer"
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower"
    },
    COLORADO_BILL: {
        name: "Colorado Bill"
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer"
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang"
    },
    HENRY_BLOCK: {
        name: "Henry Block"
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim"
    },
    MICK_DEFENDER: {
        name: "Mick Defender"
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner"
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer"
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood"
    },
    GARY_LOOTER: {
        name: "Gary Looter"
    },
    GREYGORY_DECK: {
        name: "Greygory Deck"
    },
    JOHN_PAIN: {
        name: "John Pain"
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff"
    },
    TEREN_KILL: {
        name: "Teren Kill"
    },
    YOUL_GRINNER: {
        name: "Youl Grinner"
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher"
    },
    BASS_GREEVES: {
        name: "Bass Greeves"
    },
    BLOODY_MARY: {
        name: "Bloody Mary"
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton"
    },
    JULIE_CUTTER: {
        name: "Julie Cutter"
    },
    MEXICALI_KID: {
        name: "Mexicali Kid"
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail"
    },
    RED_RINGO: {
        name: "Red Ringo"
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell"
    },
    DUTCH_WILL: {
        name: "Dutch Will"
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta"
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud"
    },
    MADAME_YTO: {
        name: "Madame Yto"
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena"
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake"
    },
    SIMEON_PICOS: {
        name: "Simeon Picos"
    },

    // High Noon cards

    BLESSING: {
        name: "Blessing"
    },
    GHOST_TOWN: {
        name: "Ghost Town"
    },
    INVERT_ROTATION: {
        name: "Gold Rush"
    },
    THE_DALTONS: {
        name: "The Daltons"
    },
    THE_DOCTOR: {
        name: "The Doctor"
    },
    THE_REVEREND: {
        name: "The Reverend"
    },
    TRAIN_ARRIVAL: {
        name: "Train Arrival"
    },
    CURSE: {
        name: "Curse"
    },
    HANGOVER: {
        name: "Hangover"
    },
    SERMON: {
        name: "Sermon"
    },
    THIRST: {
        name: "Thirst"
    },
    SHOOTOUT: {
        name: "Shootout"
    },
    HANDCUFFS: {
        name: "Handcuffs"
    },
    HANDCUFFS_HEARTS: {
        name: "Handcuffs: Declare Hearts"
    },
    HANDCUFFS_DIAMONDS: {
        name: "Handcuffs: Declare Diamonds"
    },
    HANDCUFFS_CLUBS: {
        name: "Handcuffs: Declare Clubs"
    },
    HANDCUFFS_SPADES: {
        name: "Handcuffs: Declare Spades"
    },
    NEW_IDENTITY: {
        name: "New Identity"
    },
    HIGH_NOON: {
        name: "High Noon"
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Ambush"
    },
    SNIPER: {
        name: "Sniper"
    },
    DEAD_MAN: {
        name: "Dead Man"
    },
    BLOOD_BROTHERS: {
        name: "Blood Brothers"
    },
    THE_JUDGE: {
        name: "The Judge"
    },
    LASSO: {
        name: "Lasso"
    },
    LAW_OF_THE_WEST: {
        name: "Law Of The West"
    },
    HARD_LIQUOR: {
        name: "Hard Liquor"
    },
    ABANDONED_MINE: {
        name: "Abandoned Mine"
    },
    PEYOTE: {
        name: "Peyote"
    },
    PEYOTE_RED: {
        name: "Peyote: Declare Red"
    },
    PEYOTE_BLACK: {
        name: "Peyote: Declare Black"
    },
    RANCH: {
        name: "Ranch"
    },
    RICOCHET: {
        name: "Ricochet"
    },
    RUSSIAN_ROULETTE: {
        name: "Russian Roulette"
    },
    VENDETTA: {
        name: "Vendetta"
    },
    A_FISTFUL_OF_CARDS: {
        name: "A Fistful Of Cards"
    },

    // Wild West Show cards

    GAG: {
        name: "Gag"
    },
    BONE_ORCHARD: {
        name: "Bone Orchard"
    },
    DARLING_VALENTINE: {
        name: "Darling Valentine"
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage"
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero"
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa Of Texas"
    },
    MISS_SUSANNA: {
        name: "Miss Susanna"
    },
    SHOWDOWN: {
        name: "Showdown"
    },
    SACAGAWAY: {
        name: "Sacagaway"
    },
    WILD_WEST_SHOW: {
        name: "Wild West Show"
    },

    // Gold Rush cards

    SHOT: {
        name: "Shot"
    },
    BOTTLE: {
        name: "Bottle"
    },
    BOTTLE_PANIC: {
        name: "Bottle as Panic!",
        hideTitle: true
    },
    BOTTLE_BEER: {
        name: "Bottle as Beer",
        hideTitle: true
    },
    BOTTLE_BANG: {
        name: "Bottle as Bang!",
        hideTitle: true
    },
    CALUMET: {
        name: "Calumet"
    },
    GUN_BELT: {
        name: "Gun Belt"
    },
    PARDNER: {
        name: "Pardner"
    },
    PARDNER_GENERAL_STORE: {
        name: "Pardner as General Store",
        hideTitle: true,
        description: <>Reveal as many cards as players. Each player draws one.</>
    },
    PARDNER_DUEL: {
        name: "Pardner as Duel",
        hideTitle: true,
        description: <>A target player discards a <i>BANG!</i>, then you, etc. First player failing to discard a <i>BANG!</i> loses 1 life point.</>
    },
    PARDNER_CAT_BALOU: {
        name: "Pardner as Cat Balou",
        hideTitle: true
    },
    GOLD_RUSH: {
        name: "Gold Rush"
    },
    HORSESHOE: {
        name: "Horseshoe"
    },
    PICKAXE: {
        name: "Pickaxe"
    },
    WANTED: {
        name: "Wanted"
    },
    RHUM: {
        name: "Rhum"
    },
    GOLD_PAN: {
        name: "Gold Pan"
    },
    BOOTS: {
        name: "Boots"
    },
    LUCKY_CHARM: {
        name: "Lucky Charm"
    },
    UNION_PACIFIC: {
        name: "Union Pacific"
    },
    RUCKSACK: {
        name: "Rucksack"
    },

    // The Great Train Robbery cards

    CACTUS: {
        name: "Cactus",
        hideTitle: true
    },
    DRAGOON: {
        name: "Dragoon",
        hideTitle: true,
        description: <>You may play 1 additional <i>BANG!</i> during your turn.</>
    },
    EVADED: {
        name: "Evaded!",
        description: <>Draw the card you just <i>Missed!</i></>
    },
    FULL_STEAM: {
        name: "Full Steam",
        description: <>Send the train to the End of the Line.<br/>Double or cancel the Locomotive effect.</>
    },
    FULL_STEAM_NO_EFFECT: {
        name: "Full Steam: Cancel Locomotive effect",
        hideTitle: true
    },
    FULL_STEAM_DOUBLE_EFFECT: {
        name: "Full Steam: Double Locomotive effect",
        hideTitle: true
    },
    KNIFE_REVOLVER: {
        name: "Knife Revolver",
        hideTitle: true,
        description: <>Counts as your 1 <i>BANG!</i> per turn. "Draw!": J, Q, K, A = take this card back into your hand.</>
    },
    MAP: {
        name: "Map",
        description: <>On your turn, before drawing, look at the top 2 cards of the deck: you may discard 1.</>
    },
    MONEY_BAG: {
        name: "Money Bag",
        description: <>If the top card in the discard pile has a brown border, copy its effect.</>
    },
    MOST_WANTED: {
        name: "Most Wanted",
        hideTitle: true,
        description: <>Each player must "draw!":<br/>♠=that player loses 1 life point.</>,
        descriptionClass: "description-low"
    },
    NEXT_STOP: {
        name: "Next Stop",
        description: <>Advance the train 1 Station.</>,
        descriptionClass: "description-low"
    },
    REFUND: {
        name: "Refund",
        description: <>When another player draws or discards 1 of your other cards, draw 1 card.</>
    },
    STRONGBOX: {
        name: "Strongbox",
        description: <>At the end of your turn, draw 1 card.</>
    },
    SWITCH: {
        name: "Switch",
        description: <>Switch 1 of your cards in play with another card in play.</>
    },
    TRAIN_ROBBERY: {
        name: "Train Robbery",
        description: <>Counts as your 1 <i>BANG!</i> per turn.<br/>For each of their cards in play, the target chooses: discard it or be the target of a BANG!</>
    },
    TRAIN_ROBBERY_DISCARD: {
        name: "Train Robbery: Discard a card",
        hideTitle: true
    },
    TRAIN_ROBBERY_BANG: {
        name: "Train Robbery: Receive a Bang",
        hideTitle: true
    },
    WATER_TOWER: {
        name: "Water Tower",
        description: <>Take 1 Railcar of your choice from the train for free.</>
    },

    // The Great Train Robbery characters

    BENNY_BRAWLER: {
        name: "Benny Brawler"
    },
    EVAN_BABBIT: {
        name: "Evan Babbit"
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas"
    },
    MANUELITA: {
        name: "Manuelita"
    },
    SANCHO: {
        name: "Sancho"
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze"
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor"
    },
    ZIPPY_ROY: {
        name: "Zippy Roy"
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey"
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Declare Red"
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Declare Hearts"
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Declare Diamonds"
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Declare Black"
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Declare Clubs"
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Declare Spades"
    },
    PAT_BARRETT: {
        name: "Pat Barrett"
    },
    BIG_SPENCER_2: {
        name: "Big Spencer"
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell"
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede"
    },
    CRAZY_HOG: {
        name: "Crazy Hog"
    },
    EVA_PLACE: {
        name: "Eva Place"
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett"
    },
    LAURA_BILLION: {
        name: "Laura Billion"
    },
    SID_CURRY: {
        name: "Sid Curry"
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel"
    },
    TEREN_KILL_2: {
        name: "Teren Kill"
    },
    WYATT_EARL: {
        name: "Wyatt Earl"
    },

    // The Great Train Robbery wagon cards

    BAGGAGE_CAR: {
        name: "Baggage Car"
    },
    BAGGAGE_CAR_MISSED: {
        name: "Baggage Car as Missed!",
        hideTitle: true
    },
    BAGGAGE_CAR_PANIC: {
        name: "Baggage Car as Panic!",
        hideTitle: true
    },
    BAGGAGE_CAR_CAT_BALOU: {
        name: "Baggage Car as Cat Balou",
        hideTitle: true
    },
    BAGGAGE_CAR_BANG: {
        name: "Baggage Car as Bang!",
        hideTitle: true
    },
    CABOOSE: {
        name: "Caboose"
    },
    CATTLE_TRUCK: {
        name: "Cattle Truck"
    },
    CIRCUS_WAGON: {
        name: "Circus Wagon"
    },
    COAL_HOPPER: {
        name: "Coal Hopper"
    },
    DINING_CAR: {
        name: "Dining Car"
    },
    EXPRESS_CAR: {
        name: "Express Car"
    },
    GHOST_CAR: {
        name: "Ghost Car"
    },
    LOUNGE_CAR: {
        name: "Lounge Car"
    },
    LUMBER_FLATCAR: {
        name: "Lumber Flatcar"
    },
    MAIL_CAR: {
        name: "Mail Car"
    },
    OBSERVATION_CAR: {
        name: "Observation Car"
    },
    PASSENGER_CAR: {
        name: "Passenger Car"
    },
    PRISONER_CAR: {
        name: "Prisoner Car"
    },
    PRIVATE_CAR: {
        name: "Private Car"
    },
    SLEEPER_CAR: {
        name: "Sleeper Car"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse"
    },
    LELAND: {
        name: "Leland"
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

    // Legends feats cards

    FIFTY_GUNS: {
        name: "Fifty Guns"
    },
    WOUNDED_PRIDE: {
        name: "Wounded Pride"
    },
    OLD_WEST_GANG: {
        name: "Old West Gang"
    },
    BOTTLENECK: {
        name: "Bottleneck"
    },
    THE_CHUCK_A_LUCK: {
        name: "The Chuck-A-Luck"
    },
    '3_15_TO_YOOMA': {
        name: "3-15 To Yooma"
    },
    GOOD_COMPANY: {
        name: "Good Company"
    },
    THE_LAST_HERO: {
        name: "The Last Hero"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "The Man With No Name"
    },
    WILHELM_SCREAM: {
        name: "Wilhelm Scream"
    },
    SCRUGS_BALLAD: {
        name: "Scrugs Ballad"
    },
    BORDERLANDS: {
        name: "Borderlands"
    },
    THE_OREGON_TRAIL: {
        name: "The Oregon Trail"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "A Thousand Ways To Die"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "For A Few Cards More"
    },
    A_QUICK_DEATH: {
        name: "A Quick Death"
    },

    // Button row virtual cards

    ESCAPE_JAIL: {
        name: "Escape Jail"
    },
    BECOME_LEGEND: {
        name: "Become a Legend"
    },
    CLAIM_FEAT: {
        name: "Claim a Feat"
    },
    GAME_PASS: {
        name: "End turn"
    },
    GAME_CONFIRM: {
        name: "Confirm"
    },
    GAME_DISMISS: {
        name: "Continue"
    },
    GAME_SELL_BEER: {
        name: "Sell beer"
    },
    GAME_DISCARD_BLACK: {
        name: "Discard equip"
    },
    GAME_DISCARD_BRONCO: {
        name: "Discard Bronco"
    },

};