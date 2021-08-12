import './index.css';

interface Props {
  className?: string;
  isSmall?: boolean;
  onClick(): void;
  text: string;
  type?: 'Primary' | 'Secondary';
}

export function Button({
  className,
  isSmall = false,
  onClick,
  text,
  type = 'Primary',
}: Props) {
  return (
    <button
      className={`Button ${type} ${isSmall && 'small'} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
