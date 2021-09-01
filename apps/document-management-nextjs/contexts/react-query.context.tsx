import React from 'react';
import {QueryClient, QueryFunction, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import qs from 'qs';

type QueryProviderProps = {
  baseUrl?: string;
  children: React.ReactNode;
};
export default function ReactQueryProvider({
  baseUrl,
  children,
}: QueryProviderProps) {
  // if (baseUrl === undefined) {
  //   throw new Error('react query api base url is not defined');
  // }
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // queryFn: createQueryFn(baseUrl),
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
            retry: process.env.NODE_ENV === 'production' ? 3 : false,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

function createQueryFn(baseUrl: string): QueryFunction {
  return async ({queryKey}) => {
    const path =
      typeof queryKey === 'string'
        ? queryKey
        : queryKey[0] + qs.stringify(queryKey[1]);
    const res = await fetch(baseUrl + path, {credentials: 'include'});

    if (!res.ok) throw new Error(await res.json());

    return res.json();
  };
}
