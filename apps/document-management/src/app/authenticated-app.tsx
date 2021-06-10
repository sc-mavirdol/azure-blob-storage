import {Switch, Route} from 'react-router-dom';
import {AzureBlobStorageProvider} from '../contexts/azure-blob-storage.context';
import ListDocuments from '../pages/list-documents';

export default function AuthenticatedApp() {
  return (
    <AzureBlobStorageProvider>
      <Switch>
        <Route path='/'>
          <ListDocuments />
        </Route>
      </Switch>
    </AzureBlobStorageProvider>
  );
}
