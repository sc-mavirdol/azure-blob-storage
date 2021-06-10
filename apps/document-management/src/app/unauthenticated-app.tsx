import {useMsal} from '@azure/msal-react';

export default function UnauthenticatedApp() {
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
