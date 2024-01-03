import { CSSProperties, useContext } from "react";
import { clampPoint, getRectCenter, getWindowRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import { getCardUrl } from "./CardView";
import { GameTableContext } from "./GameScene";
import { CardTracker } from "./Model/CardTracker";
import { KnownCard, getCard, getCardImage, isCardKnown } from "./Model/GameTable";
import { CardId } from "./Model/GameUpdate";
import "./Style/CardOverlayView.css";

interface CardOverlayInnerProps {
  tracker: CardTracker;
  card: KnownCard;
}

function CardOverlayInner({ tracker, card }: CardOverlayInnerProps) {
  const rect = useUpdateEveryFrame(() => tracker.getTablePocket(card.pocket)?.getCardRect(card.id));
  if (!rect) return null;

  const rectCenter = clampPoint(getRectCenter(rect), getWindowRect(200));
  const cardOverlayStyle = {
      '--card-overlay-x': rectCenter.x + 'px',
      '--card-overlay-y': rectCenter.y + 'px'
  } as CSSProperties;

  const cardImage = getCardImage(card)!;

  return <div className="card-overlay" style={cardOverlayStyle}>
    <div className="card-overlay-inner">
      <img src={getCardUrl(cardImage.image)} alt={card.cardData.name} />
    </div>
  </div>;
}

export interface CardOverlayProps {
  tracker: CardTracker;
  overlayCard?: CardId;
}

export default function CardOverlayView({ tracker, overlayCard }: CardOverlayProps) {
  const table = useContext(GameTableContext);
  if (overlayCard) {
    const card = getCard(table, overlayCard);
    if (isCardKnown(card)) {
      return <CardOverlayInner tracker={tracker} card={card} />;
    }
  }
  return null;
}
