import React from 'react';
import AppShell from '../components/app-shell';
import Button from '@material-ui/core/Button';
export function Index() {
  return (
    <AppShell>
      <Button color='primary' variant='contained'>
        Hello world
      </Button>
    </AppShell>
  );
}

export default Index;
