import React from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {BlobItem, BlobServiceClient} from '@azure/storage-blob';

function getUploadSaSUri() {
  return window.fetch('/api/getUploadSasUri').then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw res.json();
  });
}

function getReadSaSUri() {
  return window.fetch('/api/getReadSasUri').then((res) => {
    if (res.ok) {
      return res.json();
    }

    throw res.json();
  });
}

function useUploadWithSasUri() {
  const queryClient = useQueryClient();
  return useMutation(
    async (file: File) => {
      const {uploadUrl} = await getUploadSaSUri();
      const blobServiceClient = new BlobServiceClient(uploadUrl);
      const containerClient = blobServiceClient.getContainerClient(
        'test-container'
      );
      const blockBlobClient = containerClient.getBlockBlobClient(file.name);
      return blockBlobClient.uploadData(file);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['blobs']);
      },
    }
  );
}

function useUploadedFiles() {
  return useQuery<BlobItem[], Error>(['blobs'], async () => {
    const {readUrl} = await getReadSaSUri();
    const blobServiceClient = new BlobServiceClient(readUrl);
    const containerClient = blobServiceClient.getContainerClient(
      'test-container'
    );
    const result = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      result.push(blob);
    }

    return result;
  });
}

export {useUploadWithSasUri, useUploadedFiles};
