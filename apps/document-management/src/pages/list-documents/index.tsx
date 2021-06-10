import {useListDocuments} from '../../hooks/useListDocuments';

export default function ListDocuments() {
  const documentsQuery = useListDocuments();

  if (documentsQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (documentsQuery.isError) {
    return <span>Error: {JSON.stringify(documentsQuery.error)}</span>;
  }

  return (
    <>
      <h3>List Of Documents</h3>
      <ul>
        {documentsQuery.data?.map((blob) => {
          return <li key={blob.name}>{blob.name}</li>;
        })}
      </ul>
    </>
  );
}
