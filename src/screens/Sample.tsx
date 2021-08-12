import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Spinner } from '../components/Spinner';

import './Sample.css';

export function Sample() {
  return (
    <Card
      className="Sample-container"
      body={<Spinner className="Sample-Spinner" progress={0} width={170} />}
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
        </>
      }
    />
  );
}
