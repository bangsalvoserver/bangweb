import { CSSProperties, RefObject } from "react";
import getLabel from "../../Locale/GetLabel";
import { clampPoint, getDivRect, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardSignView from "./CardSignView";
import { getCardUrl } from "./CardView";
import { getLocalizedCardName } from "./GameStringComponent";
import { CardImage, getCardBackface, getCardImage, isCardKnown } from "./Model/GameTable";
import { OverlayId } from "./Model/UseCardOverlay";
import "./Style/CardOverlayView.css";

interface CardOverlayInnerProps {
  divRef: RefObject<HTMLDivElement>;
  cardImage: CardImage;
  cardAlt: string;
}

function CardOverlayInner({ divRef, cardImage, cardAlt }: CardOverlayInnerProps) {
  const rect = useUpdateEveryFrame(() => divRef.current ? getDivRect(divRef.current) : null);
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
  overlayId?: OverlayId;
}

export default function CardOverlayView({ overlayId }: CardOverlayProps) {
  if (overlayId) {
    switch (overlayId.type) {
    case 'card': {
      const card = overlayId.value;
      const cardImage = getCardImage(card) || { image: getCardBackface(card) };
      const cardAlt = isCardKnown(card) ? getLocalizedCardName(card.cardData.name) : getLabel('DeckType', card.cardData.deck);
      return <CardOverlayInner divRef={overlayId.divRef} cardImage={cardImage} cardAlt={cardAlt} />;
    }
    case 'role': {
      const role = overlayId.value;
      const cardImage: CardImage = { image: role === 'unknown' ? 'backface/role' : 'role/' + role };
      const cardAlt = getLabel('PlayerRole', role);
      return <CardOverlayInner divRef={overlayId.divRef} cardImage={cardImage} cardAlt={cardAlt} />;
    }
    }
  }
  return null;
}
