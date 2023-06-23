import { useState } from "react";
import { useCartStore } from '@/store/store';
import { CartItemType } from '@/types/types';

const generateOrderId = () => {
  let randomVal = String(window.crypto.getRandomValues(new Uint8Array(1)));
  return randomVal.substring(1,7);
}

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   const form = e.target as HTMLFormElement;
//   const cartDetails = form.dataset.cartData;

//   const data = {
//     fullName: form.fullName.value as string,
//     email: form.email.value as string,
//     orderId: generateOrderId(),
//     cart: cartDetails
//   }
//   let error;
//   const { fullName, email } = data;
//   if (!fullName || fullName.trim() === "") {
//     alert('Please enter name');
//     error = "Please enter a valid name";
//     return error;
//   }
//   if (!email || email.trim() === "") {
//     alert("Please enter valid email address");
//     error = "Please enter a valid email address";
//     return error;
//   }

//   console.log(data);

//   const res = await fetch("/api/form", {
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "POST"
//   })

//   const result = await res.json();
//   console.log("form works", result.data);
// }

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

  console.log(data);

  const res = await fetch("/api/form", {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
  })

  const result = await res.json();
  console.log("form works", result.data);
}

export default function CartForm({ cartItems }: {cartItems: {}}) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const { cart, totalCost} = useCartStore();

  const orderDetails = {
    cart,
    totalCost
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