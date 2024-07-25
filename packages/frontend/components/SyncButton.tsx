import { Button } from '@shopify/polaris';
import { useState } from 'react';

const SyncButton = ({ onSync }: { onSync: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleSync = async () => {
    setLoading(true);
    await onSync();
    setLoading(false);
  };

  return <Button onClick={handleSync} loading={loading}>Sync</Button>;
};

export default SyncButton;
