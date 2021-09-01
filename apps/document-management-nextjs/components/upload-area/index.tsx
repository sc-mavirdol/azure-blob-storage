import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import {useDropzone} from 'react-dropzone';
import {useUploadWithSasUri} from '../../hooks/useUploadFile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropzone: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(3),
      textAlign: 'center',
      border: `2px dashed ${theme.palette.grey[400]}`,
      borderRadius: '5px',
      background: theme.palette.grey[100],
    },
    dropzoneIsDragActive: {
      background: theme.palette.grey[300],
      borderColor: theme.palette.primary.main,
    },
    dropzoneIsDragAccept: {
      borderColor: theme.palette.success.main,
    },
    dropzoneIsDragReject: {
      borderColor: theme.palette.error.main,
    },
  })
);

export type UploadAreaProps = {
  children: React.ReactNode;
};
function UploadArea({children}: UploadAreaProps) {
  const styles = useStyles();
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const [selectedFiles, setSelectedFiles] = React.useState([]);

  React.useEffect(() => {
    setSelectedFiles((files) => [...files, ...acceptedFiles]);
  }, [acceptedFiles]);

  const handleFileUploaded = (file: File) => {
    setSelectedFiles((files) => files.filter((f) => f.name !== file.name));
  };

  const canDragAndDrop =
    window.File && window.FileReader && window.FileList && window.Blob;

  return (
    <Box>
      <Box
        {...getRootProps({
          className: clsx(styles.dropzone, {
            [styles.dropzoneIsDragActive]: isDragActive,
            [styles.dropzoneIsDragAccept]: isDragAccept,
            [styles.dropzoneIsDragReject]: isDragReject,
          }),
        })}
      >
        {children}
        <input {...getInputProps()} />
      </Box>
      {acceptedFiles.length ? (
        <SelectedFilesList
          files={selectedFiles}
          onUploadFinish={handleFileUploaded}
        />
      ) : null}
    </Box>
  );
}

type SelectedFilesListProps = {
  files: File[];
  onUploadFinish: (file) => void;
};
function SelectedFilesList({files, onUploadFinish}: SelectedFilesListProps) {
  return (
    <Box py={3}>
      {files.map((file) => {
        return (
          <SelectedFile
            key={file.name}
            file={file}
            onUploadFinish={onUploadFinish}
          />
        );
      })}
    </Box>
  );
}

type SelectedFileProps = {
  file: File;
  onUploadFinish: (file) => void;
};
function SelectedFile({file, onUploadFinish}: SelectedFileProps) {
  const uploadFileMutation = useUploadWithSasUri();

  const handleUpload = async () => {
    try {
      uploadFileMutation.mutateAsync(file);
      onUploadFinish(file);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      mt={1}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
    >
      <Box display='flex'>
        <AttachFileIcon />
        <Box ml={1}>{file.name}</Box>
      </Box>

      <Box>
        <Button
          variant='outlined'
          color='primary'
          size='small'
          onClick={handleUpload}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}

function UploadInput() {
  return (
    <>
      <input id='contained-button-file' multiple type='file' />
      <label htmlFor='contained-button-file'>
        <Button variant='contained' color='primary' component='span'>
          Upload
        </Button>
      </label>
    </>
  );
}

export {UploadArea};
