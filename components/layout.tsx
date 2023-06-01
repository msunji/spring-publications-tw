import Head from 'next/head';
import Navbar from './navigation';
import Footer from './footer';

type Props = {
  children: JSX.Element
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>清泉 - Spring Publications</title>
      </Head>
      <Navbar />
      <main className="min-h-screen container mx-auto my-20 ">
        <section className="mb-20">
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}