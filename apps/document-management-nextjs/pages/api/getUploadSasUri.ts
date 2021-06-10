import type {NextApiRequest, NextApiResponse} from 'next';
import {
  generateBlobSASQueryParameters,
  BlobSASSignatureValues,
  ContainerSASPermissions,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

export default function (req: NextApiRequest, res: NextApiResponse) {
  const sasToken = getContainerSasUri();
  const uploadUrl = `https://virdolsustaincertblob.blob.core.windows.net/test-container?${sasToken}`;
  return res.status(200).json({uploadUrl});
}

function getContainerSasUri() {
  const sasOptions: BlobSASSignatureValues = {
    containerName: 'test-container',
    permissions: ContainerSASPermissions.parse('c'),
    startsOn: new Date(),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000),
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
