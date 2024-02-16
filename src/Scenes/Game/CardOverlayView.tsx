import { CSSProperties, RefObject } from "react";
import { clampPoint, getDivRect, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardSignView from "./CardSignView";
import { getCardUrl } from "./CardView";
import { CardImage } from "./Model/GameTable";
import { OverlayState } from "./Model/UseCardOverlay";
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
  overlayState?: OverlayState;
}

export default function CardOverlayView({ overlayState }: CardOverlayProps) {
  if (!overlayState) return null;
  return <CardOverlayInner divRef={overlayState.divRef} cardImage={overlayState.cardImage} cardAlt={overlayState.cardAlt} />;
}
