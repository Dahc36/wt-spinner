interface Props {
  text: string;
  onClick(): void;
}

export function Button({ onClick, text }: Props) {
  return <button onClick={onClick}>{text}</button>;
}
