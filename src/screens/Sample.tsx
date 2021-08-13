import { useState } from 'react';

import { formatFloat } from '../common/formatters';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Spinner } from '../components/Spinner';
import { useTransfer } from '../hooks/useTransfer';

import './Sample.css';

export function Sample() {
  const [fileSize, setFileSize] = useState('2.125');
  const [uploadSpeed, setUploadSpeed] = useState('12.63');

  const [isCanceling, setIsCanceling] = useState(false);

  const isTransferDisabled =
    isNaN(parseFloat(fileSize)) ||
    isNaN(parseFloat(uploadSpeed)) ||
    parseFloat(fileSize) <= 0 ||
    parseFloat(uploadSpeed) <= 0;

  const { cancel, isTransfering, progress, totalTransfered, transfer } =
    useTransfer(fileSize, uploadSpeed, handleCancelOptionNo);

  function handleCancel() {
    setIsCanceling(true);
  }

  function handleCancelOptionYes() {
    cancel();
  }

  function handleCancelOptionNo() {
    setIsCanceling(false);
  }

  const handleInputChange =
    (setter: (value: string) => void) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
      setter(value);

  function handleTransfer() {
    transfer();
  }

  function renderBody() {
    if (isTransfering) {
      const message = isCanceling ? (
        <h2 className="Sample-h2">Cancel this transfer?</h2>
      ) : (
        <>
          <h2 className="Sample-h2">Transferring...</h2>
          <p className="Sample-p">
            {formatFloat(totalTransfered)} MB of{' '}
            {formatFloat(parseFloat(fileSize) * 1000)} MB uploaded
          </p>
        </>
      );
      return (
        <div className="Sample-Spinner-container">
          <Spinner
            className="Sample-Spinner"
            dimensions={170}
            progress={progress}
          />
          {message}
        </div>
      );
    }

    return (
      <div className="Sample-input-container">
        <Input
          id="file-size"
          label="File Size (GB)"
          onChange={handleInputChange(setFileSize)}
          type="number"
          value={fileSize}
        />
        <Input
          id="upload-speed"
          label="Upload Speed (Mbps)"
          onChange={handleInputChange(setUploadSpeed)}
          type="number"
          value={uploadSpeed}
        />
      </div>
    );
  }

  function renderFooter() {
    if (isTransfering) {
      if (isCanceling) {
        return (
          <div className="Sample-buttons-container">
            <Button
              className="Sample-button-no"
              isSmall
              onClick={handleCancelOptionNo}
              text="No"
              type="Secondary"
            />
            <Button isSmall onClick={handleCancelOptionYes} text="Yes" />
          </div>
        );
      }

      return (
        <div className="Sample-buttons-container">
          <Button onClick={handleCancel} text="Cancel" type="Secondary" />
        </div>
      );
    }

    return (
      <div className="Sample-buttons-container">
        <Button
          isDisabled={isTransferDisabled}
          onClick={handleTransfer}
          text="Transfer"
        />
      </div>
    );
  }

  return (
    <Card
      className="Sample-container"
      body={renderBody()}
      footer={renderFooter()}
    />
  );
}
