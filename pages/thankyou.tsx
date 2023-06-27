import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <section>
      <div className="container flex text-center flex-col items-center">
        <Image
          src="images/order-confirmed.svg"
          height={200}
          width={200}
          alt="Person celebrating successful purchase"
          className="mb-8"
        />
        <h2>Thank you for ordering!</h2>
        <p className="mb-4">We will get back to you with the payment and delivery details when we can.</p>
        <Link href="/view-products">繼續購物</Link>
      </div>
    </section>
  )
}