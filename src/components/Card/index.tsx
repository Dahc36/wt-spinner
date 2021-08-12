import './index.css';

interface Props {
  body: JSX.Element | JSX.Element[];
  className?: string;
  footer: JSX.Element | JSX.Element[];
}

export function Card({ body, className, footer }: Props) {
  return (
    <div className={`Card-container ${className}`}>
      <div className="Card-body">{body}</div>

      <div className="Card-footer">{footer}</div>
    </div>
  );
}
