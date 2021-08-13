import { useEffect, useRef, useState } from 'react';

import './index.css';
import { getSvgPath } from './helpers';

interface Props {
  className?: string;
  dimensions: number;
  progress: number;
}

const STROKE_WIDTH = 10;

export function Spinner({ className, dimensions, progress }: Props) {
  const radius = dimensions - STROKE_WIDTH;
  const [svgPath, setSvgPath] = useState(getSvgPath(radius, progress));

  const progressRef = useRef(progress);

  useEffect(() => {
    const steps = (progress - progressRef.current) / 25;
    const timeoutId = setInterval(() => {
      if (progressRef.current + steps > progress) {
        clearInterval(timeoutId);
      }

      progressRef.current += steps;
      setSvgPath(getSvgPath(radius, Math.min(100, progressRef.current)));
    }, 20);

    return () => clearInterval(timeoutId);
  }, [progress, radius]);

  return (
    <div
      className={`Spinner-container ${className}`}
      style={{
        width: `${dimensions}px`,
        height: `${dimensions}px`,
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

      <span className="Spinner-progress">
        {Math.min(100, Math.round(progress))}
        <span className="Spinner-percentage">%</span>
      </span>
    </div>
  );
}
