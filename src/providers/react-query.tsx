import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ReactQueryProviderProps = {
  children: React.ReactNode;
  dehydratedState: unknown;
};

export const ReactQueryProvider = ({ dehydratedState, children }: ReactQueryProviderProps) => {
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
