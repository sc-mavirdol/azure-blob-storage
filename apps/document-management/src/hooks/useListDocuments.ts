import {useQuery} from 'react-query';
import {BlobItem} from '@azure/storage-blob';
import {useAzureBlobStorage} from '../contexts/azure-blob-storage.context';

export function useListDocuments() {
  const blobStorageClient = useAzureBlobStorage();
  const containerClient = blobStorageClient.getContainerClient('test-blob');

  return useQuery<BlobItem[], Error>('documents', async () => {
    const result = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      result.push(blob);
    }

    return result;
  });
}
