import React from 'react';
import {PublicClientApplication} from '@azure/msal-browser';
import {MsalProvider} from '@azure/msal-react';

type AuthProviderProps = {
  clientId?: string;
  tenantId?: string;
  children: React.ReactNode;
};
export default function AuthProvider({
  clientId,
  tenantId,
  children,
}: AuthProviderProps) {
  if (clientId === undefined) {
    throw new Error('azure app client id is not defined');
  }

  if (tenantId === undefined) {
    throw new Error('azure app tentant id is not defined');
  }

  const msalInstance = React.useMemo(
    () =>
      new PublicClientApplication({
        auth: {
          clientId,
          authority: `https://login.microsoftonline.com/${tenantId}`,
        },
        cache: {
          cacheLocation: 'sessionStorage',
        },
      }),
    [clientId, tenantId]
  );
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
