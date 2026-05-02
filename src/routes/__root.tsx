import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'
import Layout from '@/components/layout'

const DEFAULT_TITLE = 'd4'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: DEFAULT_TITLE,
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
        <link rel='manifest' href='/manifest.json' />
        <link rel='icon' type='image/x-icon' href='/favicon.png' />
        <link rel='shortcut icon' type='image/x-icon' href='/favicon.png' />
        <link rel='apple-touch-icon' href='/icon.png' />
      </head>
      <body>
        <Layout>{children}</Layout>
        <Scripts />
      </body>
    </html>
  )
}
