import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div className="grid grid-flow-col gap-4">
        <Link className="link link-hover" href="/about">關於我們</Link>
        <Link className="link link-hover" href="/contact">聯絡我們</Link>
      </div>
      <div>
        <p>Copyright © 2023 - All right Reserved by Spring Publications 清泉</p>
      </div>
    </footer>
  )
}