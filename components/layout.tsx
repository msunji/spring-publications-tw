import Navbar from './Navbar';
import Footer from './footer';

type Props = {
  children: JSX.Element
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen container mx-auto my-20">
        <section className="mb-20">
          {children}
        </section>
      </main>
      <Footer />
    </>
  )
}