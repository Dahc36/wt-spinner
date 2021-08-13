import { useState } from 'react';

import './index.css';

interface Props {
  id?: string;
  label: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
}

export function Input({ id, label, onChange, value }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  function handleBlur() {
    setIsFocused(false);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  return (
    <div className="Input-container">
      <label
        className={`Input-label ${(isFocused || value !== '') && 'focused'}`}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        className="Input-input"
        id={id}
        type="text"
        onBlur={handleBlur}
        onChange={onChange}
        onFocus={handleFocus}
        value={value}
      />
    </div>
  );
}
