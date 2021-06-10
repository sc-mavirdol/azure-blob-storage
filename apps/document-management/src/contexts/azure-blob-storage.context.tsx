import React from 'react';
import {InteractiveBrowserCredential} from '@azure/identity';
import {BlobServiceClient, BlobItem} from '@azure/storage-blob';

const AzureBlobStorageContext = React.createContext<
  BlobServiceClient | undefined
>(undefined);

type AzureBlobStorageProviderProps = {
  children: React.ReactNode;
};
function AzureBlobStorageProvider({children}: AzureBlobStorageProviderProps) {
  const [blobClient, setBlobClient] = React.useState<BlobServiceClient | null>(
    null
  );

  React.useEffect(() => {
    setBlobClient(
      new BlobServiceClient(
        `https://${process.env.NX_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/`,
        new InteractiveBrowserCredential({
          clientId: process.env.NX_APP_CLIENT_ID,
          tenantId: process.env.NX_APP_TENANT_ID,
          loginStyle: 'redirect',
        })
      )
    );
  }, []);

  if (blobClient) {
    return (
      <AzureBlobStorageContext.Provider value={blobClient}>
        {children}
      </AzureBlobStorageContext.Provider>
    );
  }

  return null;
}

function useAzureBlobStorage() {
  const context = React.useContext(AzureBlobStorageContext);

  if (context === undefined) {
    throw new Error(
      'useAzureBlobStorage must be used within the AzureBlobStorageProvider'
    );
  }

  return context;
}

export {AzureBlobStorageProvider, useAzureBlobStorage};
