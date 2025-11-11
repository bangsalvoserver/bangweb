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
        name: "Bart Cassidy",
        hideTitle: true,
        description: <>Each time he is hit, he draws a card.</>
    },
    BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>He shows the second card he draws. On Heart or Diamonds, he draws one more card.</>
    },
    CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>She can play <i>BANG!</i> cards as <i>Missed!</i> cards and vice versa.</>
    },
    EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>Each time he is hit by a player, he draws a card from the hand of that player.</>
    },
    JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>He may draw his first card from the hand of a player.</>
    },
    JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>Whenever he is the target of a <i>BANG!</i>, he may "draw!": on a Heart, he is missed.</>
    },
    KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>He looks at the top three cards of the deck and chooses the 2 to draw.</>
    },
    LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>Each time he "draws!", he flips the top two cards and chooses one.</>
    },
    PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>All players see him at a distance increased by 1.</>
    },
    PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>He may draw his first card from the discard pile.</>
    },
    ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>She sees all players at a distance decreased by 1.</>
    },
    SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>He may discard 2 cards to regain one life point.</>
    },
    SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        // EDIT: fix grammar
        description: <>Players need 2 <i>Missed!</i> cards to cancel his <i>BANG!</i> cards.</>
    },
    SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>As soon as she has no cards in hand, she draws a card.</>
    },
    VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>Whenever a player is eliminated from play, he takes in hand all the cards of that player.</>
    },
    WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>He can play any number of <i>BANG!</i> cards.</>
    },

    // Most Wanted characters

    CLAUS_THE_SAINT: {
        name: "Claus \"The Saint\"",
        hideTitle: true,
        description: <>He draws one card more than the number of players, keeps 2 for himself, then gives 1 to each player.</>
    },
    JOHNNY_KISCH: {
        name: "Johnny Kisch",
        hideTitle: true,
        description: <>Each time he puts a card into play, all other cards in play with the same name are discarded.</>
    },
    UNCLE_WILL: {
        name: "Uncle Will",
        hideTitle: true,
        description: <>Once during his turn, he may play any card from hand as a <i>General Store</i>.</>
    },
    ANNIE_VERSARY: {
        name: "Annie Versary",
        hideTitle: true,
        description: <>She may use any card as a <i>BANG!</i> card.</>
    },
    EMILIANO: {
        name: "Emiliano",
        hideTitle: true,
        description: <>Each time your <i>BANG!</i> is <i>Missed!</i>, draw that <i>Missed!</i> card. When you miss a <i>BANG!</i>, draw that <i>BANG!</i> card.</>
    },

    // Dodge City characters

    APACHE_KID: {
        name: "Apache Kid",
        hideTitle: true,
        description: <>Cards of Diamonds played by other players do not affect him.</>
    },
    BELLE_STAR: {
        name: "Belle Star",
        hideTitle: true,
        description: <>During her turn, cards in play in front of other players have no effect.</>
    },
    BILL_NOFACE: {
        name: "Bill Noface",
        hideTitle: true,
        description: <>He draws 1 card, plus 1 card for each wound he has.</>
    },
    CHUCK_WENGAM: {
        name: "Chuck Wengam",
        hideTitle: true,
        description: <>During his turn, he may choose to lose 1 life point to draw 2 cards.</>
    },
    DOC_HOLYDAY: {
        name: "Doc Holyday",
        hideTitle: true,
        description: <>During his turn, he may discard once 2 cards from the hand to shoot a <i>BANG!</i>.</>
    },
    ELENA_FUENTE: {
        name: "Elena Fuente",
        hideTitle: true,
        description: <>She may use any card as <i>Missed!</i>.</>
    },
    GREG_DIGGER: {
        name: "Greg Digger",
        hideTitle: true,
        description: <>Each time another player is eliminated, he regains 2 life points.</>
    },
    HERB_HUNTER: {
        name: "Herb Hunter",
        hideTitle: true,
        description: <>Each time another player is eliminated, he draws 2 extra cards.</>
    },
    JOSE_DELGADO: {
        name: "Josè Delgado",
        hideTitle: true,
        description: <>Twice in his turn, he may discard a blue card from the hand to draw 2 cards.</>
    },
    MOLLY_STARK: {
        name: "Molly Stark",
        hideTitle: true,
        description: <>Each time she uses a card from her hand out of turn, she draws a card.</>
    },
    PAT_BRENNAN: {
        name: "Pat Brennan",
        hideTitle: true,
        description: <>He may draw only one card in play in front of any one player.</>
    },
    PIXIE_PETE: {
        name: "Pixie Pete",
        hideTitle: true,
        description: <>He draws 3 cards instead of 2.</>
    },
    SEAN_MALLORY: {
        name: "Sean Mallory",
        hideTitle: true,
        description: <>He may hold in his hand up to 10 cards.</>
    },
    TEQUILA_JOE: {
        name: "Tequila Joe",
        hideTitle: true,
        description: <>Each time he plays a <i>Beer</i>, he regains 2 life points instead of 1.</>
    },
    VERA_CUSTER: {
        name: "Vera Custer",
        hideTitle: true,
        description: <>For one whole round, she gains the same ability of another character in play of her choice.</>
    },

    // Valley of Shadows characters

    BLACK_FLOWER: {
        name: "Black Flower",
        hideTitle: true,
        description: <>Once during your turn, you may use any Clubs card as an extra <i>BANG!</i>.</>
    },
    COLORADO_BILL: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Each time you play a <i>BANG!</i> card, "draw!": on Spades, this shot cannot be avoided.</>
    },
    COLORADO_BILL_2: {
        name: "Colorado Bill",
        hideTitle: true,
        description: <>Each time another player plays a <i>Missed!</i> card on a <i>BANG!</i> card from <i>Colorado Bill</i>, "draw!": on Spades the <i>Missed!</i> card has no effect and the attacked player loses 1 life point.</>  
    },
    DER_SPOT_BURST_RINGER: {
        name: "Der Spot - Burst Ringer",
        hideTitle: true,
        description: <>Once during your turn, you may use a <i>BANG!</i> card as a <i>Gatling</i>.</>
    },
    EVELYN_SHEBANG: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>You may refuse to draw cards in your draw phase. For each card skipped, shoot a <i>BANG!</i> at a different target in reachable distance.</>
    },
    EVELYN_SHEBANG_2: {
        name: "Evelyn Shebang",
        hideTitle: true,
        description: <>She may draw 1 card less than normal to shoot an extra <i>BANG!</i> at distance 1.</>
    },
    HENRY_BLOCK: {
        name: "Henry Block",
        hideTitle: true,
        description: <>Any player drawing or discarding one of your cards (in hand or in play) is the target of a <i>BANG!</i>.</>
    },
    LEMONADE_JIM: {
        name: "Lemonade Jim",
        hideTitle: true,
        description: <>Each time another player plays a <i>Beer</i> card, you may discard any card from hand to also regain 1 life point.</>
    },
    MICK_DEFENDER: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>If you are the target of a brown card other than <i>BANG!</i>, you may use a <i>Missed!</i> card to avoid that card.</>
    },
    MICK_DEFENDER_2: {
        name: "Mick Defender",
        hideTitle: true,
        description: <>If he is the only target of a card, he may use a <i>Missed!</i> card to avoid that card.</>
    },
    TUCO_FRANZISKANER: {
        name: "Tuco Franziskaner",
        hideTitle: true,
        description: <>During your draw phase, if you have no blue cards in play, draw 2 extra cards.</>
    },

    // Wild West Show characters

    BIG_SPENCER: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>He starts with 5 cards. He can't play <i>Missed!</i></>
    },
    FLINT_WESTWOOD: {
        name: "Flint Westwood",
        hideTitle: true,
        description: <>During his turn, he may trade one card from hand with 2 cards at random from the hand of another player.</>
    },
    GARY_LOOTER: {
        name: "Gary Looter",
        hideTitle: true,
        description: <>He draws all excess cards discarded by other players at the end of their turn.</>
    },
    GREYGORY_DECK: {
        name: "Greygory Deck",
        hideTitle: true,
        description: <>At the start of his turn, he may draw 2 characters at random. He has all the abilities of the drawn characters.</>
    },
    JOHN_PAIN: {
        name: "John Pain",
        hideTitle: true,
        description: <>If he has less than 6 cards in hand, each time any player "draws!", John adds the card just drawn to his hand.</>
    },
    LEE_VAN_KLIFF: {
        name: "Lee Van Kliff",
        hideTitle: true,
        description: <>During his turn, he may discard a <i>BANG!</i> to repeat the effect of a brown-bordered card he just played.</>
    },
    TEREN_KILL: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Each time he would be eliminated, "draw!": if it is not Spades, <i>Teren</i> stays at 1 life point, and draws 1 card.</>
    },
    YOUL_GRINNER: {
        name: "Youl Grinner",
        hideTitle: true,
        description: <>Before drawing, players with more hand cards than him must give him one card of their choice.</>
    },

    // Armed & Dangerous characters

    AL_PREACHER: {
        name: "Al Preacher",
        hideTitle: true,
        description: <>If another player plays a blue or orange-bordered card, you may pay 2 📦 to draw 1 card from the deck.</>
    },
    BASS_GREEVES: {
        name: "Bass Greeves",
        hideTitle: true,
        description: <>Once during your turn, you may discard 1 card from your hand to add 2 📦 to one of your cards.</>
    },
    BLOODY_MARY: {
        name: "Bloody Mary",
        hideTitle: true,
        description: <>Each time your <i>BANG!</i> card is canceled, draw 1 card from the deck.</>
    },
    FRANKIE_CANTON: {
        name: "Frankie Canton",
        hideTitle: true,
        description: <>Once during your turn, you may take 1 📦 from any card and move it here.</>
    },
    JULIE_CUTTER: {
        name: "Julie Cutter",
        hideTitle: true,
        description: <>Each time a player makes you lose at least 1 life point, "draw!":<br/>♥♦=they are the target of a <i>BANG!</i></>
    },
    MEXICALI_KID: {
        name: "Mexicali Kid",
        hideTitle: true,
        description: <>Once during your turn, you may pay 2 📦 to shoot 1 extra <i>BANG!</i> (no card required).</>
    },
    MS_ABIGAIL: {
        name: "Ms. Abigail",
        hideTitle: true,
        description: <>You may ignore the effects of brown-bordered cards with values J, Q, K, and A if you are the only target.</>
    },
    RED_RINGO: {
        name: "Red Ringo",
        hideTitle: true,
        description: <>Start with 4 📦. Once during your turn, you may move up to 2 📦 from here to your cards.</>
    },

    // Gold Rush characters

    DON_BELL: {
        name: "Don Bell",
        hideTitle: true,
        description: <>At the end of his turn, he "draws!": on Hearts or Diamonds, he plays an extra turn.</>
    },
    DUTCH_WILL: {
        name: "Dutch Will",
        hideTitle: true,
        description: <>He draws 2 cards, discards 1, and takes 1 gold nugget.</>
    },
    JACKY_MURIETA: {
        name: "Jacky Murieta",
        hideTitle: true,
        description: <>During his turn, he may pay 2 gold nuggets to shoot 1 extra <i>BANG!</i></>
    },
    JOSH_MCCLOUD: {
        name: "Josh McCloud",
        hideTitle: true,
        description: <>He may draw the top equipment from the deck by paying 2 gold nuggets.</>
    },
    MADAME_YTO: {
        name: "Madam Yto",
        hideTitle: true,
        description: <>Each time a Beer card is played, she draws 1 card from the deck.</>
    },
    PRETTY_LUZENA: {
        name: "Pretty Luzena",
        hideTitle: true,
        description: <>Once per turn, she may buy 1 equipment at a cost reduced by 1 gold nugget.</>
    },
    RADDIE_SNAKE: {
        name: "Raddie Snake",
        hideTitle: true,
        description: <>During his turn, he may discard 1 gold nugget to draw 1 card from the deck (up to 2 times).</>
    },
    SIMEON_PICOS: {
        name: "Simeon Picos",
        hideTitle: true,
        description: <>Each time he loses 1 life point, he takes 1 gold nugget.</>
    },

    // High Noon cards

    BLESSING: {
        name: "Blessing",
        description: <>The suit of all cards is Hearts.</>
    },
    GHOST_TOWN: {
        name: "Ghost Town",
        description: <>During their turn, eliminated players return to the game as ghosts. They draw 3 cards instead of 2, and they cannot die. At the end of their turn, they are eliminated again.</>
    },
    INVERT_ROTATION: {
        name: "Gold Rush",
        description: <>The game proceeds counter-clockwise for one round, always starting with the Sheriff. All card effects proceed clockwise.</>
    },
    THE_DALTONS: {
        name: "The Daltons",
        description: <>When <i>The Daltons</i> enter play, each player who has any blue cards in fron of him, chooses one of them and discards it.</>
    },
    THE_DOCTOR: {
        name: "The Doctor",
        description: <>When <i>The Doctor</i> enters play, the player(s) still in the game with the fewest current life points regain(s) 1 life point.</>
    },
    THE_REVEREND: {
        name: "The Reverend",
        description: <>Players cannot play any <i>Beer</i> cards.</>
    },
    TRAIN_ARRIVAL: {
        name: "Train Arrival",
        description: <>Each player draws one extra card at te end of phase 1 of his turn.</>
    },
    CURSE: {
        name: "Curse",
        description: <>The suit of all cards is Spades.</>
    },
    HANGOVER: {
        name: "Hangover",
        description: <>All characters lose their special abilities.</>
    },
    SERMON: {
        name: "Sermon",
        description: <>Each player cannot use <i>BANG!</i> cards during his turn.</>
    },
    THIRST: {
        name: "Thirst",
        description: <>Each player only draws his first card, not the second one, during phase 1 of his turn.</>
    },
    SHOOTOUT: {
        name: "Shootout",
        description: <>Each player can play a second <i>BANG!</i> card during his turn.</>
    },
    HANDCUFFS: {
        name: "Handcuffs",
        description: <>After drawing his cards in phase 1, the player whose turn it is names a suit: he can only play cards of that suit during his turn.</>
    },
    HANDCUFFS_HEARTS: {
        name: "Handcuffs: Declare Hearts",
        hideTitle: true
    },
    HANDCUFFS_DIAMONDS: {
        name: "Handcuffs: Declare Diamonds",
        hideTitle: true
    },
    HANDCUFFS_CLUBS: {
        name: "Handcuffs: Declare Clubs",
        hideTitle: true
    },
    HANDCUFFS_SPADES: {
        name: "Handcuffs: Declare Spades",
        hideTitle: true
    },
    NEW_IDENTITY: {
        name: "New Identity",
        description: <>At the beginning of their turn, each player picks up another character at random. He may switch to the new identity for the rest of the game, starting with 2 life points.</>
    },
    HIGH_NOON: {
        name: "High Noon",
        description: <>Each player loses 1 life point at the start of his turn.</>
    },

    // Fistful of Cards cards

    AMBUSH: {
        name: "Ambush",
        description: <>The distance between any two players is 1. This is modified only by cards in play.</>
    },
    SNIPER: {
        name: "Sniper",
        description: <>During his turn, the player may discard 2 <i>BANG!</i> cards together against a player: this counts as a <i>BANG!</i> but it may be cancelled only by 2 <i>Missed!</i>.</>
    },
    DEAD_MAN: {
        name: "Dead Man",
        description: <>During his turn, the player who has been eliminated first comes back in play with 2 life points and 2 cards.</>
    },
    BLOOD_BROTHERS: {
        name: "Blood Brothers",
        description: <>At the beginning of his turn, each player may lose one life point (except the last one) to give one life point to any player of his choice.</>
    },
    THE_JUDGE: {
        name: "The Judge",
        description: <>You cannot play cards in front of you or any other player.</>
    },
    LASSO: {
        name: "Lasso",
        description: <>Cards in play in front of players have no effect.</>
    },
    LAW_OF_THE_WEST: {
        name: "Law Of The West",
        description: <>During his phase 1, each player shows the second card he draws: if he can, he must play it during his phase 2.</>
    },
    HARD_LIQUOR: {
        name: "Hard Liquor",
        description: <>Each player may skip his phase 1 to regain 1 life point.</>
    },
    ABANDONED_MINE: {
        name: "Abandoned Mine",
        description: <>During his phase 1, each player draws from the discards (if they run out, from the deck). In his phase 3, he discards face down on the deck.</>
    },
    PEYOTE: {
        name: "Peyote",
        hideTitle: false,
        description: <>Instead of drawing in his phase 1, each player guesses if the suit of the top card of the deck is red or black. He them draws and shows it: if he guessed right, he keeps it and may guess again, otherwise he proceeds to phase 2.</>
    },
    PEYOTE_RED: {
        name: "Peyote: Declare Red",
        hideTitle: true
    },
    PEYOTE_BLACK: {
        name: "Peyote: Declare Black",
        hideTitle: true
    },
    RANCH: {
        name: "Ranch"
    },
    RICOCHET: {
        name: "Ricochet",
        description: <>Each player may discard <i>BANG!</i> cards against cards in play in front of any player: each card is discarded if its owner does not play a <i>Missed!</i> for each one.</>
    },
    RUSSIAN_ROULETTE: {
        name: "Russian Roulette",
        description: <>When <i>Russian Roulette</i> enters play, starting from the Sheriff each player discards a <i>Missed!</i>, until one player does not: he loses 2 life points and the Roulette stops.</>
    },
    VENDETTA: {
        name: "Vendetta",
        hideTitle: false,
        description: <>At the end of his turn, each player "draws!": on a Heart, he plays another turn (but he does not "draw!" again).</>
    },
    A_FISTFUL_OF_CARDS: {
        name: "A Fistful Of Cards",
        description: <>At the beginning of his turn, the player is the target of as many <i>BANG!</i> as the number of cards in his hand.</>
    },

    // Wild West Show cards

    GAG: {
        name: "Gag",
        description: <>Players may not talk (they can gesture, moan, ...). Whoever talks loses 1 life point.</>
    },
    BONE_ORCHARD: {
        name: "Bone Orchard",
        description: <>At the start of their turn, all eliminated players return to play with 1 life points. Deal their roles at random from those of the eliminated players.</>
    },
    DARLING_VALENTINE: {
        name: "Darling Valentine",
        hideTitle: false,
        description: <>At the start of his turn, each player discards his hand and draws the same number of cards from the deck.</>
    },
    DOROTHY_RAGE: {
        name: "Dorothy Rage",
        hideTitle: false,
        description: <>During his turn, each player can force another player to play one of his cards.</>
    },
    HELENA_ZONTERO: {
        name: "Helena Zontero",
        hideTitle: false,
        description: <>When <i>Helena</i> comes into play, "draw!": on Hearts or Diamonds, shuffle all active roles, except the Sheriff, and deal them at random.</>
    },
    LADY_ROSA_OF_TEXAS: {
        name: "Lady Rosa Of Texas",
        description: <>During his turn, each player can swap places with the player on his right, who will skip his next turn.</>
    },
    MISS_SUSANNA: {
        name: "Miss Susanna",
        hideTitle: false,
        description: <>During his turn, each player must play at least 3 cards. If he does not, he loses 1 life point.</>
    },
    SHOWDOWN: {
        name: "Showdown",
        description: <>All cards may be played as they were <i>BANG!</i> All <i>BANG!</i> may only be played as they were <i>Missed!</i></>
    },
    SACAGAWAY: {
        name: "Sacagaway",
        hideTitle: false,
        description: <>All players play with their hands revealed (excluding their roles!).</>
    },
    WILD_WEST_SHOW: {
        name: "Wild West Show",
        hideTitle: false,
        description: <>The goal of each player becomes: "Be the last one in play!"</>
    },

    // Gold Rush cards

    SHOT: {
        name: "Shot",
        description: <>A player of your choice (even you) regains 1 life point.</>
    },
    BOTTLE: {
        name: "Bottle",
        description: <>May be played as a <i>Panic!</i>, <i>Beer</i>, or <i>BANG!</i></>
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
        name: "Calumet",
        hideTitle: false,
        description: <>Cards of Diamonds played by the other players have no effect on you.</>
    },
    GUN_BELT: {
        name: "Gun Belt",
        description: <>Your hand size limit at the end of your turn is 8 cards.</>
    },
    PARDNER: {
        name: "Pardner",
        description: <>May be played as a <i>General Store</i>, <i>Duel</i>, or <i>Cat Balou</i>.</>
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
        name: "Gold Rush",
        description: <>Your turn ends. Regain all of your life points then play another turn.</>
    },
    HORSESHOE: {
        name: "Horseshoe",
        description: <>Each time you "draw!", flip one additinal card and choose the result.</>
    },
    PICKAXE: {
        name: "Pickaxe",
        description: <>During phase 1 of your turn, draw 1 additional card.</>
    },
    WANTED: {
        name: "Wanted",
        description: <>Play on any player. Whoever eliminates that player draws 2 cards and takes 1 gold nugget.</>
    },
    RHUM: {
        name: "Rhum",
        description: <>"Draw!" 4 cards: you regain 1 life point for each different suit.</>
    },
    GOLD_PAN: {
        name: "Gold Pan",
        description: <>Pay 1 gold nugget to draw 1 card from the deck. You may use this ability up to 2 times per turn.</>
    },
    BOOTS: {
        name: "Boots",
        description: <>Each time you lose 1 life point, draw 1 card from the deck.</>
    },
    LUCKY_CHARM: {
        name: "Lucky Charm",
        description: <>Each time you lose 1 life point, take 1 gold nugget.</>
    },
    UNION_PACIFIC: {
        name: "Union Pacific",
        hideTitle: false,
        description: <>Draw 4 cards from the deck.</>
    },
    RUCKSACK: {
        name: "Rucksack",
        description: <>Pay 2 gold nuggets to regain 1 life point.</>
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
        name: "Benny Brawler",
        hideTitle: true,
        description: <>During your turn, you may take any number of Railcards from the train.</>
    },
    EVAN_BABBIT: {
        name: "Evan Babbit",
        hideTitle: true,
        description: <>If you are the target of a <i>BANG!</i> card, you may discard a card of the same suit from your hand to divert it to another player at distance 1.</>
    },
    JIMMY_TEXAS: {
        name: "Jimmy Texas",
        hideTitle: true,
        description: <>At the end of your turn, draw 1 card.</>
    },
    MANUELITA: {
        name: "Manuelita",
        hideTitle: true,
        description: <>Each time the train reaches the End of the Line, draw 2 cards.</>
    },
    SANCHO: {
        name: "Sancho",
        hideTitle: true,
        description: <>Once during your turn, you may take 1 Railcard of your choice from the train for free.</>
    },
    SGT_BLAZE: {
        name: "Sgt. Blaze",
        hideTitle: true,
        description: <>When targeting multiple players with a card or an effect, you may exempt 1 player.</>
    },
    SHADE_OCONNOR: {
        name: "Shade O'Connor",
        hideTitle: true,
        description: <>Each time the train advances when it is not your turn, you may discard 1 card from your hand to draw 1 card.</>
    },
    ZIPPY_ROY: {
        name: "Zippy Roy",
        hideTitle: true,
        description: <>Once during your turn, you may advance the train 1 Station.</>
    },

    // Canyon Diablo characters

    ANNIE_OAKEY: {
        name: "Annie Oakey",
        hideTitle: true,
        description: <>She may try to guess the color or the suit of each drawn card in her phase 1: she draws 1 extra card for every "color" guessed (2, for every "suit").</>
    },
    ANNIE_OAKEY_RED: {
        name: "Annie Oakey: Declare Red",
        hideTitle: true
    },
    ANNIE_OAKEY_HEARTS: {
        name: "Annie Oakey: Declare Hearts",
        hideTitle: true
    },
    ANNIE_OAKEY_DIAMONDS: {
        name: "Annie Oakey: Declare Diamonds",
        hideTitle: true
    },
    ANNIE_OAKEY_BLACK: {
        name: "Annie Oakey: Declare Black",
        hideTitle: true
    },
    ANNIE_OAKEY_CLUBS: {
        name: "Annie Oakey: Declare Clubs",
        hideTitle: true
    },
    ANNIE_OAKEY_SPADES: {
        name: "Annie Oakey: Declare Spades",
        hideTitle: true
    },
    PAT_BARRETT: {
        name: "Pat Barrett",
        hideTitle: true,
        description: <>For each life point he is missing, the distance by which he is seen by others is increased by 1.</>
    },
    BIG_SPENCER_2: {
        name: "Big Spencer",
        hideTitle: true,
        description: <>He may increase his life points up to a maximum of 6.</>
    },
    BUFFALO_BELL: {
        name: "Buffalo Bell",
        hideTitle: true,
        description: <>Whenever he'd be hit, he may discard an hand card to avoid the hit. Played card + discarded card: if ≥ 13 = <i>Missed!</i>, ≥ 17 = <i>Dodge</i>; ≥ 20 = <i>Backfire</i>.</>
    },
    CLASH_THE_STAMPEDE: {
        name: "Clash The Stampede",
        hideTitle: true,
        description: <>Before drawing, the player with most hand cards must give him one of his choice.</>
    },
    CRAZY_HOG: {
        name: "Crazy Hog",
        hideTitle: true,
        description: <>Once in his turn, he may discard a blue-bordered card from his hand to draw 2 cards.</>
    },
    EVA_PLACE: {
        name: "Eva Place",
        hideTitle: true,
        description: <>Once in her turn she may discard an hand card to draw another one from the deck. On a Diamond, she may draw again.</>
    },
    JOSEY_BASSETT: {
        name: "Josey Bassett",
        hideTitle: true,
        description: <>For one whole round, she may benefit from the effect of a blue-bordered card in front of another player.</>
    },
    LAURA_BILLION: {
        name: "Laura Billion",
        hideTitle: true,
        description: <>Whenever a card is "drawn!", she may discard an hand card to get the drawn card.</>
    },
    SID_CURRY: {
        name: "Sid Curry",
        hideTitle: true,
        description: <>Each time he puts a card into play, all other cards in play with the same name are discarded.</>
    },
    SOUNDANCE_KID: {
        name: "Soundance Kid",
        hideTitle: true,
        description: <>Each time he hits a player with a <i>BANG!</i>, he draws a card.</>
    },
    SPIKE_SPIEZEL: {
        name: "Spike Spiezel",
        hideTitle: true,
        description: <>Once in his turn, he may discard a <i>BANG!</i> card to repeat the effect of a brown-bordered card he just played.</>
    },
    TEREN_KILL_2: {
        name: "Teren Kill",
        hideTitle: true,
        description: <>Each time he would be eliminated, "draws!": if it isn't Spades, stays at 1 life point and draws 1 card.</>
    },
    WYATT_EARL: {
        name: "Wyatt Earl",
        hideTitle: true,
        description: <>Cards that can affect more than one player don't have effect on him.</>
    },

    // The Great Train Robbery wagon cards

    BAGGAGE_CAR: {
        name: "Baggage Car",
        hideTitle: true,
        description: <>Discard this for a <i>Missed!</i>, <i>Panic!</i>, <i>Cat Balou</i>, or an extra <i>BANG!</i></>,
        descriptionClass: "train-description"
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
        name: "Caboose",
        hideTitle: true,
        description: <>You may discard one of your other blue-bordered cards (including a Railcar) as a <i>Missed!</i></>,
        descriptionClass: "train-description"
    },
    CATTLE_TRUCK: {
        name: "Cattle Truck",
        hideTitle: true,
        description: <>Discard this to look at the top 3 discarded cards and draw 1.</>,
        descriptionClass: "train-description"
    },
    CIRCUS_WAGON: {
        name: "Circus Wagon",
        hideTitle: true,
        description: <>Discard this to make each other player discard one of their cards in play.</>,
        descriptionClass: "train-description"
    },
    COAL_HOPPER: {
        name: "Coal Hopper",
        hideTitle: true,
        description: <>Discard this to draw 1 card and discard 1 Railcar in play in front of any player of your choice.</>,
        descriptionClass: "train-description"
    },
    DINING_CAR: {
        name: "Dining Car",
        hideTitle: true,
        description: <>At the start of your turn, "draw!":<br/>on Hearts, regain 1 life point.</>,
        descriptionClass: "train-description"
    },
    EXPRESS_CAR: {
        name: "Express Car",
        hideTitle: true,
        description: <>Discard this card: Your turn ends immediately. Discard all the cards in your hand, then play another turn.</>,
        descriptionClass: "train-description"
    },
    GHOST_CAR: {
        name: "Ghost Car",
        hideTitle: true,
        description: <>Play on anyone except the Sheriff.<br/>If you are eliminated, you stay in play instead, but you cannot gain or lose any life points.</>,
        descriptionClass: "train-description"
    },
    LOUNGE_CAR: {
        name: "Lounge Car",
        hideTitle: true,
        description: <>Discard this to draw 2 Railcars from the deck, put 1 into play in front of you and put the other in front of another player.</>,
        descriptionClass: "train-description"
    },
    LUMBER_FLATCAR: {
        name: "Lumber Flatcar",
        hideTitle: true,
        description: <>Play on anyone.<br/>You see all other players at distance +1.</>,
        descriptionClass: "train-description"
    },
    MAIL_CAR: {
        name: "Mail Car",
        hideTitle: true,
        description: <>Discard this to draw 3 cards and give 1 of them to a player of your choice.</>,
        descriptionClass: "train-description"
    },
    OBSERVATION_CAR: {
        name: "Observation Car",
        hideTitle: true,
        description: <>You view others at distance -1.<br/>Others view you at distance +1.</>,
        descriptionClass: "train-description"
    },
    PASSENGER_CAR: {
        name: "Passenger Car",
        hideTitle: true,
        description: <>Discard this to draw 1 card (in play or in hand) from any other player of your choice.</>,
        descriptionClass: "train-description"
    },
    PRISONER_CAR: {
        name: "Prisoner Car",
        hideTitle: true,
        description: <>You are not affected by <i>Indians!</i> and <i>Duel</i> cards played by other players.</>,
        descriptionClass: "train-description"
    },
    PRIVATE_CAR: {
        name: "Private Car",
        hideTitle: true,
        description: <>While your hand is empty, you cannot be target of <i>BANG!</i> cards.</>,
        descriptionClass: "train-description"
    },
    SLEEPER_CAR: {
        name: "Sleeper Car",
        hideTitle: true,
        description: <>Once each turn, you may discard one of your other blue-bordered cards (including a Railcar) as an additional <i>BANG!</i></>,
        descriptionClass: "train-description"
    },

    // The Great Train Robbery locomotive cards

    IRONHORSE: {
        name: "Ironhorse",
        hideTitle: true,
        description: <>At the End of the Line, each player is the target of a <i>BANG!</i></>,
        descriptionClass: "train-description"
    },
    LELAND: {
        name: "Leland",
        hideTitle: true,
        description: <>At the End of the Line, this acts as a <i>General Store</i>.</>,
        descriptionClass: "train-description"
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
        description: <>If you are hit, draw 2 cards.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_BLACK_JACK: {
        name: "Black Jack",
        hideTitle: true,
        description: <>You may flip cards until their sum is higher than 21. Draw all those cards</>,
        descriptionClass: "legends-description",
    },
    LEGEND_CALAMITY_JANET: {
        name: "Calamity Janet",
        hideTitle: true,
        description: <>Each of your cards counts as a <i>BANG!</i> or <i>Missed!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_EL_GRINGO: {
        name: "El Gringo",
        hideTitle: true,
        description: <>If you are hit by a plyer, draw 1 card from their hand and the card that hit you.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JESSE_JONES: {
        name: "Jesse Jones",
        hideTitle: true,
        description: <>Look at any player's hand, draw 1 card from there, then draw 1 from the deck.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_JOURDONNAIS: {
        name: "Jourdonnais",
        hideTitle: true,
        description: <>If you are the target of a brown card, you may "Draw!":<br/>J, Q, K, A = ignore the card.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_KIT_CARLSON: {
        name: "Kit Carlson",
        hideTitle: true,
        description: <>Draw 3 cards. You may give 1 of them to any other player.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_LUCKY_DUKE: {
        name: "Lucky Duke",
        hideTitle: true,
        description: <>If a card requires a "Draw!", you flip 2 cards and choose 1 to use. If it's your turn, then draw the chosen card.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PAUL_REGRET: {
        name: "Paul Regret",
        hideTitle: true,
        description: <>Others see you at distance +1.<br/>To play a <i>BANG!</i> against you, a player must discard an extra card from their hand.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_PEDRO_RAMIREZ: {
        name: "Pedro Ramirez",
        hideTitle: true,
        description: <>Draw 2 cards plus the top card from the discard pile</>,
        descriptionClass: "legends-description",
    },
    LEGEND_ROSE_DOOLAN: {
        name: "Rose Doolan",
        hideTitle: true,
        description: <>You may see all players at distance 1. Once during your turn, you may discard one of your blue cards, in hand or inplay, as a <i>Panic!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_SID_KETCHUM: {
        name: "Sid Ketchum",
        hideTitle: true,
        description: <>You may discard 2 cards to gain 1 life point. Once during your turn, if you gain 1 life point, you may shoot a free <i>BANG!</i></>,
        descriptionClass: "legends-description",
    },
    LEGEND_SLAB_THE_KILLER: {
        name: "Slab the Killer",
        hideTitle: true,
        description: <>Your <i>BANG!</i> cannot be canceled.<br/>If you claim a Feat, you may remove even a player's last life point.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_SUZY_LAFAYETTE: {
        name: "Suzy Lafayette",
        hideTitle: true,
        description: <>If you have less than 2 cards in hand, draw until you are back to 2 cards.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_VULTURE_SAM: {
        name: "Vulture Sam",
        hideTitle: true,
        description: <>If a player is eliminated, take in hand all of their cards. If you are eliminated, stay in play with 4 life points, but return to the normal side.</>,
        descriptionClass: "legends-description",
    },
    LEGEND_WILLY_THE_KID: {
        name: "Willy the Kid",
        hideTitle: true,
        description: <>You may play any number of <i>BANG!</i> cards.<br/>Instead of claiming a Feat, you may shoot a free <i>BANG!</i></>,
        descriptionClass: "legends-description",
    },

    // Legends feats cards

    FIFTY_GUNS: {
        name: "Fifty Guns",
        description: <>Take or discard a weapon.</>,
        descriptionClass: "feats-description"
    },
    WOUNDED_PRIDE: {
        name: "Wounded Pride",
        description: <>Another player causes one of your <i>BANG!</i> cards to miss.</>,
        descriptionClass: "feats-description"
    },
    OLD_WEST_GANG: {
        name: "Old West Gang",
        description: <>Hit 2 or more players in the same turn.</>,
        descriptionClass: "feats-description"
    },
    BOTTLENECK: {
        name: "Bottleneck",
        description: <>Discard a <i>Beer</i> card.</>,
        descriptionClass: "feats-description"
    },
    THE_CHUCK_A_LUCK: {
        name: "The Chuck-A-Luck",
        description: <>Discard a <i>BANG!</i> card.</>,
        descriptionClass: "feats-description"
    },
    "3_15_TO_YOOMA": {
        name: "3-15 To Yooma",
        description: <>Do or make another player do a "Draw!" (even at the start of your turn).</>,
        descriptionClass: "feats-description"
    },
    GOOD_COMPANY: {
        name: "Good Company",
        description: <>Discard a card, then play a card with the same name (or vice versa).</>,
        descriptionClass: "feats-description"
    },
    THE_LAST_HERO: {
        name: "The Last Hero",
        description: <>Discard a blue card in play.</>,
        descriptionClass: "feats-description"
    },
    THE_MAN_WITH_NO_NAME: {
        name: "The Man With No Name",
        description: <>Lose 1 life point (not your last one).</>,
        descriptionClass: "feats-description"
    },
    WILHELM_SCREAM: {
        name: "Wilhelm Scream",
        description: <>Play a <i>BANG!</i> card at distance 2 or more.</>,
        descriptionClass: "feats-description"
    },
    SCRUGS_BALLAD: {
        name: "Scrugs Ballad",
        description: <>Lose a <i>Duel</i>.</>,
        descriptionClass: "feats-description"
    },
    BORDERLANDS: {
        name: "Borderlands",
        description: <>Discard your entire hand (even if you have 0 cards).</>,
        descriptionClass: "feats-description"
    },
    THE_OREGON_TRAIL: {
        name: "The Oregon Trail",
        description: <>During your draw phase, do not draw the first card you are allowed to draw.</>,
        descriptionClass: "feats-description"
    },
    A_THOUSAND_WAYS_TO_DIE: {
        name: "A Thousand Ways To Die",
        description: <>Show from your hand a <i>Missed!</i> card and another card of the same suit.</>,
        descriptionClass: "feats-description"
    },
    FOR_A_FEW_CARDS_MORE: {
        name: "For A Few Cards More",
        description: <>Discard at least 1 excess card at the end of your turn.</>,
        descriptionClass: "feats-description"
    },
    A_QUICK_DEATH: {
        name: "A Quick Death",
        description: <>Hit another player at full life using a <i>BANG!</i> card.</>,
        descriptionClass: "feats-description"
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