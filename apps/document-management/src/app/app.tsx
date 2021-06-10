import {BrowserRouter} from 'react-router-dom';
import {
  UnauthenticatedTemplate,
  AuthenticatedTemplate,
} from '@azure/msal-react';
import ReactQueryProvider from '../contexts/react-query.context';
import AuthProvider from '../contexts/auth.context';
import AuthenticatedApp from './authenticated-app';
import UnauthenticatedApp from './unauthenticated-app';

export function App() {
  return (
    <BrowserRouter basename={process.env.NX_DOCS_BASE_URL}>
      <AuthProvider
        clientId={process.env.NX_APP_CLIENT_ID}
        tenantId={process.env.NX_APP_TENANT_ID}
      >
        <ReactQueryProvider baseUrl={process.env.NX_DOCS_API_URL}>
          <AuthenticatedTemplate>
            <AuthenticatedApp />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <UnauthenticatedApp />
          </UnauthenticatedTemplate>
        </ReactQueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
