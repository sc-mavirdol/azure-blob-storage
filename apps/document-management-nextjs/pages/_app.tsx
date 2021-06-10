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
      <CssBaseline />
      <AuthProvider
        clientId={process.env.NEXT_PUBLIC_APP_CLIENT_ID}
        tenantId={process.env.NEXT_PUBLIC_APP_TENANT_ID}
      >
        <AuthenticatedTemplate>
          <Component {...pageProps} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <UnauthenticatedApp />
        </UnauthenticatedTemplate>
      </AuthProvider>
    </>
  );
}

function UnauthenticatedApp() {
  const msalAuth = useMsal();
  return msalAuth.accounts.length > 0 ? (
    <span>You are logged in!</span>
  ) : msalAuth.inProgress === 'login' ? (
    <span>Login in progress</span>
  ) : (
    <>
      <span>You are not logged in!</span>
      <button onClick={() => msalAuth.instance.loginRedirect()}>Login</button>
    </>
  );
}

export default CustomApp;
