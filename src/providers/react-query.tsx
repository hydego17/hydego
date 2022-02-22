import React from 'react';
import { Hydrate, HydrateProps, QueryClient, QueryClientProvider } from 'react-query';

type ReactQueryProviderProps = {
  dehydratedState: HydrateProps['state'];
};

export const ReactQueryProvider: React.FC<ReactQueryProviderProps> = ({ dehydratedState, children }) => {
  // Initialized queryClient
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
    </QueryClientProvider>
  );
};
