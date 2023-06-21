import { useState, useEffect } from 'react';
import Link from "next/link";
import { useCartStore } from '@/store/store';

export default function Navbar() {
  const totalItems = useCartStore(state => state.totalItems);

  const [cartState, setCartState] = useState<number>();

  useEffect(() => {
    setCartState(totalItems)
  }, [totalItems]);

  return (
    <div className="bg-darkBlue text-white">
      <nav className="navbar container py-2 justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-darkBlue rounded-box w-52">
              <li><Link href="/about">關於我們</Link></li>
              <li><Link href="/view-products">全部商品</Link></li>
              <li><Link href="/contact">聯絡我們</Link></li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost normal-case text-3xl">清泉</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="/about">關於我們</Link></li>
            <li><Link href="/view-products">全部商品</Link></li>
            <li><Link href="/contact">聯絡我們</Link></li>
            </ul>
        </div>
        <div className="navbar-end">
          <Link href="/cart">
            <div>
              購物車<div className="badge badge-accent ml-2">{cartState}</div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
};