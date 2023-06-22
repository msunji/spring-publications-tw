import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-offWhite">
      <div className="container-lg footer p-10 text-base-content">
        <div>
          <Image src="/images/SpringLogo.png" width="130" height="140" alt="Spring Publications logo" />
          <p>清泉 Spring Publications<br/>Literature for human and spiritual growth</p>
        </div>
        <div className="text-lg place-items-end w-full">
          <span className="footer-title">公司</span>
          <Link className="link link-hover" href="/about">關於我們</Link>
          <Link className="link link-hover" href="/contact">聯絡我們</Link>
        </div>
        <div className="text-lg place-items-end w-full">
          <span className="footer-title">商品</span>
          <Link className="link link-hover" href="/about">全部商品</Link>
        </div>
      </div>
  </footer>
  )
}