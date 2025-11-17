import { CSSProperties } from "react";
import { useLanguage } from "../../Locale/Registry";
import { clampPoint, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardSignView from "./CardSignView";
import { getCardUrl } from "./CardView";
import { OverlayState } from "./Model/UseCardOverlay";
import "./Style/CardOverlayView.css";
import { getLocalizedCardName } from "./GameStringComponent";

const WINDOW_PADDING_X = 150;
const WINDOW_PADDING_Y = 200;

function CardOverlayInner({ cardRef, cardImage, cardName }: OverlayState) {
  const language = useLanguage();

  const rect = useUpdateEveryFrame(cardRef.getRect);
  if (!rect) return null;

  const rectCenter = clampPoint(getRectCenter(rect), shrinkRect(getWindowRect(), WINDOW_PADDING_X, WINDOW_PADDING_Y));
  const cardOverlayStyle = {
      '--card-overlay-x': rectCenter.x + 'px',
      '--card-overlay-y': rectCenter.y + 'px'
  } as CSSProperties;

  const image = typeof cardImage === 'string' ? cardImage : cardImage.image;
  const sign = typeof cardImage === 'string' ? undefined : cardImage.sign;
  const cardAlt = cardName ? getLocalizedCardName(language, cardName) : undefined;

  return <div className="card-overlay" style={cardOverlayStyle}>
    <div className="card-overlay-inner">
      <img className="card-overlay-img" src={getCardUrl(image)} alt={cardAlt} />
      {sign && <div className="card-overlay-sign">
        <CardSignView sign={sign} />
      </div> }
    </div>
  </div>;
}

export interface CardOverlayProps {
  overlayState?: OverlayState;
}

export default function CardOverlayView({ overlayState }: CardOverlayProps) {
  if (overlayState) return <CardOverlayInner { ...overlayState } />;
  return null;
}
