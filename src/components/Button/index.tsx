import './index.css';

interface Props {
  className?: string;
  isDisabled?: boolean;
  isSmall?: boolean;
  onClick(): void;
  text: string;
  type?: 'Primary' | 'Secondary';
}

export function Button({
  className,
  isDisabled = false,
  isSmall = false,
  onClick,
  text,
  type = 'Primary',
}: Props) {
  return (
    <button
      className={`Button ${type} ${isSmall && 'small'} ${
        isDisabled && 'disabled'
      } ${className}`}
      onClick={isDisabled ? undefined : onClick}
    >
      {text}
    </button>
  );
}
