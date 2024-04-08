import { UpdateFunction } from "../../../Model/SceneState";
import { PocketType } from "./CardEnums";
import { Player, PocketId, TablePockets, editById } from "./GameTable";
import { CardId } from "./GameUpdate";

export type CardMapper = UpdateFunction<CardId[]>;

export function editPocketMap(
    pockets: TablePockets, players: Player[], pocket: PocketId,
    cardMapper: CardMapper): [TablePockets, Player[]]
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
export function addToPocket(pockets: TablePockets, players: Player[], pocket: PocketId, cardsToAdd: CardId[], front: boolean = false) {
    return editPocketMap(pockets, players, pocket, cards => front ? cardsToAdd.concat(cards) : cards.concat(cardsToAdd));
}

/// Removes a list of cards from a pocket
export function removeFromPocket(pockets: TablePockets, players: Player[], pocket: PocketId, cardsToRemove: CardId[]) {
    return editPocketMap(pockets, players, pocket, cards => cards.filter(id => !cardsToRemove.includes(id)));
}