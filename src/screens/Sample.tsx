import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Spinner } from '../components/Spinner';

import './Sample.css';

export function Sample() {
  return (
    <Card
      className="Sample-container"
      body={<Spinner className="Sample-Spinner" progress={75} width={170} />}
      footer={<Button onClick={() => console.log('Hello')} text="Say hello" />}
    />
  );
}
