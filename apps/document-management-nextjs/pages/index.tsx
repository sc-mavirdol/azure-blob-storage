import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AppShell from '../components/app-shell';
import {UploadArea} from '../components/upload-area';
import {useUploadedFiles} from '../hooks/useUploadFile';
import {BlobItem} from '@azure/storage-blob';
import DescriptionIcon from '@material-ui/icons/Description';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export function Index() {
  const styles = useStyles();
  const filesQuery = useUploadedFiles();
  return (
    <AppShell>
      <AppBar position='relative' color='transparent' elevation={0}>
        {/* <Toolbar className={styles.toolbar} disableGutters>
          <Typography variant='h4'>List of Documents</Typography>
        </Toolbar> */}
      </AppBar>
      <Box pt={5}>
        <Grid container justify='center'>
          <Grid item xs={12} md={8} lg={6}>
            <UploadArea>
              <CloudUploadIcon fontSize='large' />
              <Typography variant='h6' color='primary'>
                Click here or drag the files you want to upload to this area
              </Typography>
              <Typography variant='body1'>
                (Maxiumum file size 100MB)
              </Typography>
            </UploadArea>
          </Grid>
        </Grid>
      </Box>
      <Box mt={3}>
        <Grid container justify='center'>
          <Grid item xs={12} md={10} lg={6}>
            {filesQuery.isError ? (
              <Alert severity='error'>
                There was and error fetching your documents
              </Alert>
            ) : null}
            {filesQuery.isFetching ? <LinearProgress /> : null}
            {filesQuery.isSuccess ? (
              filesQuery.data.length === 0 ? (
                <Alert severity='info'>
                  You haven't uploaded any documents yet.
                </Alert>
              ) : (
                <>
                  <Typography variant='h6'>
                    List of uploaded documents
                  </Typography>
                  <List>
                    {filesQuery.data.map((blobItem: BlobItem) => {
                      return (
                        <Box key={blobItem.name}>
                          <ListItem>
                            <ListItemIcon>
                              <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={blobItem.name} />
                            <ListItemSecondaryAction>
                              <IconButton edge='end' aria-label='delete'>
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                          <Divider variant='inset' component='li' />
                        </Box>
                      );
                    })}
                  </List>
                </>
              )
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </AppShell>
  );
}

export default Index;
