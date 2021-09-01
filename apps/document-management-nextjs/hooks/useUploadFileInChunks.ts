import React from 'react';

const chunkSize = 1024 * 1024;

type UploadFileState = {
  uploadedSize: number;
};

type UploadFileAction = {type: 'startUpload'};

export default function useUploadFileInChunks(selectedFile: File) {
  const [state, dispatch] = React.useReducer(reducer, {uploadedSize: 0});

  React.useEffect(() => {
    function uploadFile(file: File) {
      const fileReader = new FileReader();
      const fileSize = file.size;
      fileReader.onload = () => {
        const xhr = new XMLHttpRequest();
        // xhr.upload.addEventListener('load', () => {
        //   if () {

        //   }
        // });
      };
    }
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  }, [selectedFile]);

  return state;
}

function reducer(state: UploadFileState, action: UploadFileAction) {
  switch (action.type) {
    case 'startUpload':
      break;

    default:
      return state;
  }
}
