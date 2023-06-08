import { maybeIndexOf, rotate } from "../../../Utils/ArrayUtils";
import { PocketType } from "./CardEnums";
import { Player, PocketRef, TablePockets, editById } from "./GameTable";
import { CardId, PlayerId } from "./GameUpdate";

export function editPocketMap(
    pockets: TablePockets, players: Player[], pocket: PocketRef,
    cardMapper: (cards: CardId[]) => CardId[]): [TablePockets, Player[]]
{
    const mapper = <Key extends PocketType, T extends Record<Key, CardId[]>>(pocketMap: T, pocketName: Key): T => {
        return { ...pocketMap, [pocketName]: cardMapper(pocketMap[pocketName]) };
    };
    if (pocket) {
        if ('player' in pocket) {
            players = editById(players, pocket.player, player => ({ ...player, pockets: mapper(player.pockets, pocket.name)}));
        } else {
            pockets = mapper(pockets, pocket.name);
        }
    }
    return [pockets, players];
}

/// Adds a list of cards to a pocket
export function addToPocket(pockets: TablePockets, players: Player[], pocket: PocketRef, cardsToAdd: CardId[]) {
    return editPocketMap(pockets, players, pocket, cards => cards.concat(cardsToAdd));
}

/// Removes a list of cards from a pocket
export function removeFromPocket(pockets: TablePockets, players: Player[], pocket: PocketRef, cardsToRemove: CardId[]) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => !cardsToRemove.includes(id)));
}

// Moves the player which the user is controlling to the first element of the array
export function rotatePlayers(players: PlayerId[], selfPlayer?: PlayerId, firstPlayer?: PlayerId) {
    return rotate(players, maybeIndexOf(players, selfPlayer) ?? maybeIndexOf(players, firstPlayer) ?? 0);
}