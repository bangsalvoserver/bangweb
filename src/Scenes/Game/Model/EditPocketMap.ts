import { editById, UpdateFunction } from "../../../Utils/RecordUtils";
import { PocketType } from "./CardEnums";
import { PlayerRecord, PocketId, TablePockets } from "./GameTable";
import { CardId, PocketPosition } from "./GameUpdate";

export type CardMapper = UpdateFunction<CardId[]>;

export function editPocketMap(
    pockets: TablePockets, players: PlayerRecord, pocket: PocketId,
    cardMapper: CardMapper): [TablePockets, PlayerRecord]
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
export function addToPocket(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, cardsToAdd: CardId[], position: PocketPosition = 'end') {
    return editPocketMap(pockets, players, pocket, cards => position === 'end' ? cards.concat(cardsToAdd) : cardsToAdd.concat(cards));
}

/// Removes a list of cards from a pocket
export function removeFromPocket(pockets: TablePockets, players: PlayerRecord, pocket: PocketId, cardsToRemove: CardId[]) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => !cardsToRemove.includes(id)));
}