import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from 'components/ErrorBoundary'
import { ThemeProvider } from 'contexts/useTheme'
import { TranslationsProvider } from 'contexts/useTranslation'
import { LockBodyProvider } from 'hooks/useLockBody'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Roboto } from '@next/font/google'
import 'styles/globals.css'
import 'styles/reset.css'

const roboto = Roboto({
  adjustFontFallback: true,
  subsets: ['latin'],
  weight: ['300', '400', '700'],
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const PageComponent = Component as any
  const { translations } = pageProps

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <meta property="og:site_name" content="Exevo Pan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          key="preview-1"
          property="og:image"
          content="https://i.imgur.com/obDJJOI.png"
        />
        <meta
          key="preview-2"
          property="twitter:image"
          content="https://i.imgur.com/obDJJOI.png"
        />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <TranslationsProvider value={{ translations }}>
        <ErrorBoundary>
          <ThemeProvider>
            <LockBodyProvider>
              <Analytics />
              <SessionProvider session={session}>
                <PageComponent {...pageProps} />
              </SessionProvider>
            </LockBodyProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </TranslationsProvider>
    </>
  )
}
export default MyApp
