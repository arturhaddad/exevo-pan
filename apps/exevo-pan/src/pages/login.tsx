import Head from 'next/head'
import { Main } from 'templates'
import { GetStaticProps } from 'next'
import { useTranslations } from 'contexts/useTranslation'
import { useRouter } from 'next/router'
import { useSession, getProviders, signIn } from 'next-auth/react'
import { buildUrl, buildPageTitle } from 'utils'
import { Button } from 'components/Atoms'
import { GoogleIcon } from 'assets/svgs'
import { routes, jsonld } from 'Constants'
import { common } from 'locales'

const pageUrl = buildUrl(routes.LOGIN)

type LoginStaticProps = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

// @ ToDo: add meta tags content
// @ ToDo: build page title from translations

export default function Login({ providers }: LoginStaticProps) {
  const { translations } = useTranslations()
  const { locale } = useRouter()

  /* const pageTitle = buildPageTitle(translations.homepage.Meta.title) */
  const pageTitle = buildPageTitle('Login')

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        <meta property="twitter:title" content={pageTitle} />

        <meta
          name="description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="twitter:description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta
          property="og:description"
          /* content={translations.homepage.Meta.description} */
        />
        <meta property="og:type" content="website" />

        <link rel="canonical" href={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="twitter:url" content={pageUrl} />

        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link
          rel="alternate"
          hrefLang="pt"
          href={buildUrl(routes.LOGIN, 'pt')}
        />
        <link
          rel="alternate"
          hrefLang="es"
          href={buildUrl(routes.LOGIN, 'es')}
        />
        <link
          rel="alternate"
          hrefLang="pl"
          href={buildUrl(routes.LOGIN, 'pl')}
        />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: jsonld.standard,
          }}
        />
      </Head>

      <Main>
        <main className="inner-container grid place-items-center">
          {!session && (
            <div className="card grid gap-4">
              <h3 className="text-tsm text-center font-normal tracking-wider">
                Sign in with
              </h3>

              <ul>
                {providers?.google && (
                  <li>
                    <Button
                      type="button"
                      onClick={() => signIn(providers.google.id)}
                      className="flex items-center gap-4"
                    >
                      <GoogleIcon className="h-5 w-5" />
                      Google
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          )}
        </main>
      </Main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const providers = await getProviders()

  return {
    props: {
      translations: {
        common: common[locale as RegisteredLocale],
      },
      providers,
    },
  }
}
