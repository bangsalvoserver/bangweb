import { CSSProperties, useContext } from "react";
import { Rect, clampPoint, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardSignView from "./CardSignView";
import { OverlayId, getCardUrl } from "./CardView";
import { GameTableContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { Card, CardImage, getCard, getCardImage, getPlayer, isCardKnown } from "./Model/GameTable";
import { PlayerId } from "./Model/GameUpdate";
import "./Style/CardOverlayView.css";
import getLabel from "../../Locale/GetLabel";
import { getLocalizedCardName } from "./GameStringComponent";

interface CardOverlayInnerProps {
  getRect: () => Rect | null;
  cardImage: CardImage;
  cardAlt: string;
}

function CardOverlayInner({ getRect, cardImage, cardAlt }: CardOverlayInnerProps) {
  const rect = useUpdateEveryFrame(getRect);
  if (!rect) return null;

  const rectCenter = clampPoint(getRectCenter(rect), shrinkRect(getWindowRect(), 150, 200));
  const cardOverlayStyle = {
      '--card-overlay-x': rectCenter.x + 'px',
      '--card-overlay-y': rectCenter.y + 'px'
  } as CSSProperties;

  return <div className="card-overlay" style={cardOverlayStyle}>
    <div className="card-overlay-inner">
      <img className="card-overlay-img" src={getCardUrl(cardImage.image)} alt={cardAlt} />
      {cardImage.sign && <div className="card-overlay-sign">
        <CardSignView sign={cardImage.sign} />
      </div> }
    </div>
  </div>;
}

export interface CardOverlayProps {
  tracker: CardTracker;
  overlayId?: OverlayId;
}

function getCardRect(tracker: CardTracker, card: Card): Rect | null {
  return tracker.getTablePocket(card.pocket)?.getCardRect(card.id) ?? null;
}

function getRoleRect(tracker: CardTracker, player: PlayerId): Rect | null {
  return tracker.getPlayerPockets(player)?.getRoleRect() ?? null;
}

export default function CardOverlayView({ tracker, overlayId }: CardOverlayProps) {
  const table = useContext(GameTableContext);
  if (overlayId) {
    if (overlayId.type === 'card') {
      const card = getCard(table, overlayId.id);
      if (isCardKnown(card)) {
        const cardImage = getCardImage(card)!;
        return <CardOverlayInner getRect={() => getCardRect(tracker, card)} cardImage={cardImage} cardAlt={getLocalizedCardName(card.cardData.name)} />;
      }
    } else if (overlayId.type === 'player_role') {
      const player = getPlayer(table, overlayId.id);
      const role = player.status.role;
      if (role !== 'unknown') {
        const cardImage: CardImage = { image: 'role/' + role};
        return <CardOverlayInner getRect={() => getRoleRect(tracker, overlayId.id)} cardImage={cardImage} cardAlt={getLabel('role', role)} />;
      }
    }
  }
  return null;
}
