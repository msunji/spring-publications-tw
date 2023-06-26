import Link from 'next/link';

export default function Page() {
  return (
    <section>
      <div className="container text-center">
        <h2>Thank you for ordering!</h2>
        <p className="mb-4">We will get back to you with the payment and delivery details when we can.</p>
        <Link href="/view-products">繼續購物</Link>
      </div>
    </section>
  )
}