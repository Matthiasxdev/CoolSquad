import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { Toaster } from "react-hot-toast"
import { Layout } from "@/components/Layout/Layout"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
      
      <Toaster position="bottom-right" gutter={8} />
    </>
  )
}

