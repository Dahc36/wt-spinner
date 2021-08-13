import { useState } from 'react';

import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Spinner } from '../components/Spinner';

import './Sample.css';

export function Sample() {
  const [value, setValue] = useState('');
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    setValue(value);
  }

  return (
    <Card
      className="Sample-container"
      body={
        <>
          <Spinner className="Sample-Spinner" progress={0} width={170} />

          <div
            style={{
              padding: '0 .625em',
            }}
          >
            <Input
              id="label"
              label="Text"
              onChange={handleChange}
              value={value}
            />
          </div>
        </>
      }
      footer={
        <>
          <Button
            isSmall
            onClick={() => console.log('Hello')}
            text="Say hello"
          />
          <Button
            isSmall
            onClick={() => console.log('Hello')}
            text="Say hello"
            type="Secondary"
          />
          <Button
            isDisabled
            isSmall
            onClick={() => console.log('Hello')}
            text="Say hello"
            type="Secondary"
          />
        </>
      }
    />
  );
}
