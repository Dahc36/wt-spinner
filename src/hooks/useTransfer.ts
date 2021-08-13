import { useEffect, useRef, useState } from 'react';

const UPLOADS_PER_SECOND = 2;

export function useTransfer(
  fileSize: string,
  uploadSpeed: string,
  onCancel: () => void
) {
  const [isTransfering, setIsTransfering] = useState(false);
  const [totalTransfered, setTotalTransfered] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  function cancel() {
    intervalRef.current && clearInterval(intervalRef.current);
    setIsTransfering(false);
    onCancel();
  }

  function transfer() {
    setIsTransfering(true);
    setTotalTransfered(0);
    let total = 0;

    intervalRef.current = setInterval(() => {
      if (total > parseFloat(fileSize) * 1000) {
        cancel();
      }

      total += parseFloat(uploadSpeed) / UPLOADS_PER_SECOND;
      setTotalTransfered(total);
    }, 1000 / UPLOADS_PER_SECOND);
  }

  return {
    cancel,
    isTransfering,
    progress: (100 * totalTransfered) / (parseFloat(fileSize) * 1000),
    totalTransfered,
    transfer,
  };
}
