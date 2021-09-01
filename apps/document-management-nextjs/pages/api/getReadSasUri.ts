import type {NextApiRequest, NextApiResponse} from 'next';
import {
  generateBlobSASQueryParameters,
  BlobSASSignatureValues,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

export default function (req: NextApiRequest, res: NextApiResponse) {
  const sasToken = getReadSasUri();
  const readUrl = `https://virdolsustaincertblob.blob.core.windows.net?${sasToken}`;
  return res.status(200).json({readUrl});
}

function getReadSasUri() {
  const sasOptions: BlobSASSignatureValues = {
    containerName: 'test-container',
    permissions: ContainerSASPermissions.parse('l'),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000 + 1 * 60 * 1000),
  };
  const sharedKeyCredential = new StorageSharedKeyCredential(
    'virdolsustaincertblob',
    'YWWxvE97USHSNSgO0A5n1VuIavr9WmvVXrolpc31WUY72Ky9Gg23FVxdwNDXSrDdKnPzhtDOUTerOfUOj28bfA=='
  );
  const sasToken = generateBlobSASQueryParameters(
    sasOptions,
    sharedKeyCredential
  ).toString();

  return sasToken;
}
