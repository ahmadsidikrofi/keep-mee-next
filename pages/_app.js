import Layout from '@/component/Layout'
import '@/styles/globals.css'
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return (
    <div className="container">
      <NextNProgress color="#ee3d63" stopDelayMs={800} showOnShallow={true} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  )
}
