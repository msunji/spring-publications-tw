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
  const { cart, totalCost, clearCart } = useCartStore();

  const router = useRouter();

  const orderDetails = {
    cart,
    totalCost
  }

  const handleSubmit = (orderData:{cart: Array<CartItemType>, totalCost: number}) => async (e:React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const data = {
      fullName: form.fullName.value as string,
      email: form.email.value as string,
      orderId: generateOrderId(),
      cartDetails: orderData.cart,
      total: orderData.totalCost
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
        // clearCart();
      }
    }).catch(err => { console.error(err) })
  }

  return (
    <form
      onSubmit={handleSubmit(orderDetails)}
      className="max-w-full md:max-w-[50%]"
    >
    <label className="block mb-2 flex align-" htmlFor="full-name">
      <span className="block text-sm font-medium text-slate-700">Full Name</span>
    </label>
    <input
        id="fullName"
        type="text"
        placeholder="Full Name"
        className="input input-bordered w-full rounded mb-2"
        value={fullName}
        minLength={2}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
        required
      />
    <label className="block mb-2" htmlFor="email">
      <span className="block text-sm font-medium text-slate-700">Email</span>
    </label>
    <input
        id="email"
        type="email"
        placeholder="Email"
        className="input input-bordered w-full rounded mb-4"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        minLength={2}
        required
      />
    <button className="btn btn-primary" type="submit">
      Submit Order
    </button>
  </form>
  )
}