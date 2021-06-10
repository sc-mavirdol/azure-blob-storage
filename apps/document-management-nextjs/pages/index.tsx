import React from 'react';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Container from '@material-ui/core/Container';
import AppShell from '../components/app-shell';
import {UploadArea} from '../components/upload-area';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: '240px',
      height: '50px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
);

export function Index() {
  const styles = useStyles();

  return (
    <AppShell>
      <AppBar position='relative' color='transparent' elevation={0}>
        <Toolbar className={styles.toolbar} disableGutters>
          <Typography variant='h4'>List of Documents</Typography>
        </Toolbar>

        <Container maxWidth='md'>
          <UploadArea>
            <CloudUploadIcon />
          </UploadArea>
        </Container>
      </AppBar>
    </AppShell>
  );
}

export default Index;
