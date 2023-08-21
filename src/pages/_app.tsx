import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { Toaster } from "react-hot-toast"
import { Layout } from "@/components/Layout/Layout"
import '@/styles/globals.css'

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const isDev = process.env.NODE_ENV === 'development';
const isReactQueryDevToolEnabled: boolean = isDev && true;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      {isReactQueryDevToolEnabled && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <SessionProvider session={session}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      
      <Toaster position="bottom-right" gutter={8} />
    </QueryClientProvider>
    </>
  )
}

