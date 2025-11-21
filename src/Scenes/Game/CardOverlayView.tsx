import { CSSProperties } from "react";
import { clampPoint, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import CardSignView from "./CardSignView";
import { CardDescriptionView, getCardUrl } from "./CardView";
import { OverlayState } from "./Model/UseCardOverlay";
import "./Style/CardOverlayView.css";
import { useLanguage } from "../../Locale/Registry";
import { getCardRegistryEntry } from "./GameStringComponent";

const WINDOW_PADDING_X = 150;
const WINDOW_PADDING_Y = 200;

function CardOverlayInner({ cardRef, cardImage }: OverlayState) {
  const language = useLanguage();

  const rect = useUpdateEveryFrame(cardRef.getRect);
  if (!rect) return null;

  const rectCenter = clampPoint(getRectCenter(rect), shrinkRect(getWindowRect(), WINDOW_PADDING_X, WINDOW_PADDING_Y));
  const cardOverlayStyle = {
      '--card-overlay-x': rectCenter.x + 'px',
      '--card-overlay-y': rectCenter.y + 'px'
  } as CSSProperties;

  const entry = cardImage.name ? getCardRegistryEntry(language, cardImage.name) : undefined;

  return <div className="card-overlay" style={cardOverlayStyle}>
    <div className="card-overlay-inner">
      <img className="card-overlay-img" src={getCardUrl(cardImage.image)} alt={entry?.name} />
      {entry && <CardDescriptionView entry={entry} />}
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
  if (overlayState) return <CardOverlayInner { ...overlayState } />;
  return null;
}
