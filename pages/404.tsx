import Link from 'next/link'

export default function Custom404() {
  return (
    <section className="text-center">
      <h1>404 錯誤</h1>
      <p>很抱歉，找不到網頁</p>
      <p>請<Link href="/">回到首頁</Link>。</p>
    </section>
  )
}