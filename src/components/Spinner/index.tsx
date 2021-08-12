import './index.css';
import { getSvgPath } from './helpers';

interface Props {
  className?: string;
  progress: number;
  width: number;
}

const STROKE_WIDTH = 10;

export function Spinner({ className, progress, width }: Props) {
  const radius = width - STROKE_WIDTH;
  const svgPath = getSvgPath(radius, progress);

  return (
    <div
      className={`Spinner-container ${className}`}
      style={{
        width: `${width}px`,
        height: `${width}px`,
      }}
    >
      <svg
        className="Spinner-svg"
        style={{
          width: `${radius}px`,
          height: `${radius}px`,
        }}
      >
        <circle cx="50%" cy="50%" r="50%" strokeWidth={STROKE_WIDTH} />
        <path d={svgPath} strokeWidth={STROKE_WIDTH} />
      </svg>

      <span
        style={{
          position: 'absolute',
        }}
      >
        {progress}
        <span>%</span>
      </span>
    </div>
  );
}
