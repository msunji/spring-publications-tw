import { useState } from "react";
import { useCartStore } from '@/store/store';
import { CartItemType } from '@/types/types';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

const generateOrderId = () => {
  return nanoid(10)
}


export default function CartForm() {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickup, setPickup] = useState("");
  const { cart, total, clearCart } = useCartStore();

  const router = useRouter();

  const orderDetails = {
    cart,
    total
  }

  const handleSubmit = (orderData:{cart: Array<CartItemType>, total: number}) => async (e:React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const data = {
      fullName: form.fullName.value as string,
      email: form.email.value as string,
      orderId: generateOrderId(),
      cartDetails: orderData.cart,
      total: orderData.total
    }
    let error;
    const { fullName, email } = data;
    if (!fullName || fullName.trim() === "") {
      alert('Please enter name');
      error = "Please enter a valid name";
      return error;
    }
    if (!email || email.trim() === "") {
      alert("Please enter valid email address");
      error = "Please enter a valid email address";
      return error;
    }

    fetch("/api/submit-order", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    }).then(res => {
      if (res.status === 200) {
        router.replace("/thankyou");
        clearCart();
      }
    }).catch(err => { console.error(err) })
  }

  return (
    <form
      onSubmit={handleSubmit(orderDetails)}
      className="max-w-full md:max-w-[50%]"
    >
    <label className="block mb-2 flex align-" htmlFor="full-name">
      <span className="block text-sm font-medium text-slate-700">姓名</span>
    </label>
    <input
        id="fullName"
        type="text"
        placeholder="姓名"
        className="input input-bordered w-full rounded mb-2"
        value={fullName}
        minLength={2}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
        required
      />
    <label className="block mb-2" htmlFor="email">
      <span className="block text-sm font-medium text-slate-700">電子郵件</span>
    </label>
    <input
        id="email"
        type="email"
        placeholder="電子郵件"
        className="input input-bordered w-full rounded mb-4"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        minLength={2}
        required
      />
    <label className="block mb-2" htmlFor="mobile">
      <span className="block text-sm font-medium text-slate-700">手機號碼</span>
    </label>
    <input
        id="mobile"
        type="tel"
        placeholder="手機號碼"
        className="input input-bordered w-full rounded mb-4"
        value={mobile}
        onChange={(e) => {
          setMobile(e.target.value);
        }}
        minLength={2}
        required
    />
    <label className="block mb-2" htmlFor="pickup">
    <span className="block text-sm font-medium text-slate-700">距離您家最近的便利商店 （7-11，、全家、OK Mart、萊爾富)</span>
    <span className="inline-block text-sm">查詢地址、門市店號／店名、縣市、鄉鎮市區、郵郵遞區號</span>
    </label>
    <input
        id="pickup"
        type="text"
        placeholder="距離您家最近的便利商店"
        className="input input-bordered w-full rounded mb-4"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        value={pickup}
        onChange={(e) => {
          setPickup(e.target.value);
        }}
        minLength={2}
        required
    />
    <button className="btn btn-primary" type="submit" disabled={cart.length ? false : true}>
      Submit Order
    </button>
  </form>
  )
}