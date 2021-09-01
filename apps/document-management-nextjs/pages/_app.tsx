import React from 'react';
import {AppProps} from 'next/app';
import Head from 'next/head';
import AuthProvider from '../contexts/auth.context';
import {
  useMsal,
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
} from '@azure/msal-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import ReactQueryProvider from '../contexts/react-query.context';
import AppShell from '../components/app-shell';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#005677',
    },
  },
});

function CustomApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to document-management-nextjs!</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AuthProvider
          clientId={process.env.NEXT_PUBLIC_APP_CLIENT_ID}
          tenantId={process.env.NEXT_PUBLIC_APP_TENANT_ID}
        >
          <ReactQueryProvider>
            <AuthenticatedTemplate>
              <Component {...pageProps} />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <AppShell>
                <UnauthenticatedApp />
              </AppShell>
            </UnauthenticatedTemplate>
          </ReactQueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo: {
      width: '300px',
    },
    content: {
      '& * + *': {
        marginTop: '20px',
      },
    },
  })
);

function UnauthenticatedApp() {
  const styles = useStyles();
  const msalAuth = useMsal();
  return (
    <Box pt={5}>
      <Grid container justify='center'>
        <Grid item xs={12} md={10} lg={6}>
          {msalAuth.accounts.length > 0 ? (
            <Typography>You are logged in!</Typography>
          ) : msalAuth.inProgress === 'login' ? (
            <Typography>Login in progress</Typography>
          ) : (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              className={styles.content}
              justifyContent='space-between'
            >
              <Typography variant='h3'>Welcome Back!</Typography>
              <img className={styles.logo} alt='logo' src='/static/logo.svg' />
              <Button
                variant='contained'
                color='primary'
                onClick={() => msalAuth.instance.loginRedirect()}
              >
                Login AAD
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomApp;
