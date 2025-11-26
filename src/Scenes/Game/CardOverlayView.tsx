import { CSSProperties } from "react";
import { clampPoint, getRectCenter, getWindowRect, shrinkRect } from "../../Utils/Rect";
import useUpdateEveryFrame from "../../Utils/UseUpdateEveryFrame";
import { CardImageView } from "./CardView";
import { OverlayState } from "./Model/UseCardOverlay";
import "./Style/CardOverlayView.css";

const WINDOW_PADDING_X = 150;
const WINDOW_PADDING_Y = 200;

function CardOverlayInner({ cardRef, cardImage }: OverlayState) {
  const rect = useUpdateEveryFrame(cardRef.getRect);
  if (!rect) return null;

  const rectCenter = clampPoint(getRectCenter(rect), shrinkRect(getWindowRect(), WINDOW_PADDING_X, WINDOW_PADDING_Y));
  const cardOverlayStyle = {
      '--card-overlay-x': rectCenter.x + 'px',
      '--card-overlay-y': rectCenter.y + 'px'
  } as CSSProperties;

  return <div className="card-overlay" style={cardOverlayStyle}>
    <CardImageView className="card-overlay-inner" cardImage={cardImage} />
  </div>;
}

export interface CardOverlayProps {
  overlayState?: OverlayState;
}

export default function CardOverlayView({ overlayState }: CardOverlayProps) {
  if (overlayState) return <CardOverlayInner { ...overlayState } />;
  return null;
}
