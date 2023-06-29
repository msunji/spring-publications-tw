import { useState } from "react";
import { useCartStore } from '@/store/store';
import { CartItemType } from '@/types/types';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';

type InputProps = {
  id: string;
  name: string;
  type: "text" | "number" | "email" | "tel";
  errorMsg: string;
  placeholderText?: string;
  label: string;
  minLen?: number;
  regPattern?: string;
  value: number | string;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

const generateOrderId = () => {
  return nanoid(10)
}

const initialFormData = {
  fullName: "",
  email: "",
  mobile: "",
  pickup: "",
}

const CartFormInput = ({ id, name, type, errorMsg, label, minLen, placeholderText, regPattern, onChange, value } : InputProps) => {
  const [error, setError] = useState("");

  const handleInvalidity = (e:React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.validationMessage) {
      setError(errorMsg);
    }
  }

  const handleBlur = (e:React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.validationMessage) {
      setError(errorMsg);
    }
  }
  return (
    <>
      <label className="block my-2" htmlFor={name}>
        <span className="block text-sm font-medium text-slate-700">{label}</span>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholderText}
        className="input input-bordered w-full rounded form-input"
        onBlur={handleBlur}
        onInvalid={handleInvalidity}
        pattern={regPattern}
        minLength={minLen}
        onChange={onChange}
        value={value}
        required
      />
      <span className="text-sm text-error input-error-msg">{error}</span>
    </>
  )
}

export default function CartForm() {
  const [formData, setFormData] = useState(initialFormData);

  const { cart, total, clearCart } = useCartStore();

  const router = useRouter();

  const orderDetails = {
    cart,
    total
  }

  // Event handlers
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (orderData:{cart: Array<CartItemType>, total: number}) => async (e:React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const isValid = form.checkValidity();

    form.classList.add("submitted");

    if (isValid) {
      const data = {
        fullName: form.fullName.value as string,
        email: form.email.value as string,
        mobile: form.mobile.value as string,
        pickup: form.pickup.value as string,
        orderId: generateOrderId() as string,
        cartDetails: orderData.cart as Array<CartItemType>,
        total: orderData.total as number
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
  }

  return (
    <form
      onSubmit={handleSubmit(orderDetails)}
      className="max-w-full md:max-w-[50%]"
      noValidate
    >
    <div>
      <CartFormInput
        id="fullName"
        label="姓名"
        name="fullName"
        type="text"
        placeholderText="姓名 (required)"
        minLen={1}
        onChange={handleChange}
        value={formData.fullName}
        errorMsg="Please input your full name."
      />
      <CartFormInput
        id="email"
        label="電子郵件"
        name="email"
        type="email"
        placeholderText="電子郵件 (required)"
        regPattern="[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]"
        minLen={4}
        onChange={handleChange}
        value={formData.email}
        errorMsg="Please input a valid email address."
      />
      <CartFormInput
        id="mobile"
        label="手機號碼 (e.g. 0912345678)"
        name="mobile"
        type="tel"
        placeholderText="手機號碼 (required)"
        regPattern="[0-9]{1,13}"
        minLen={9}
        onChange={handleChange}
        value={formData.mobile}
        errorMsg="Please input a valid Taiwan mobile number"
      />
      <CartFormInput
        id="pickup"
        label="距離您家最近的便利商店 （7-11，、全家、OK Mart、萊爾富)"
        name="pickup"
        type="text"
        placeholderText="距離您家最近的便利商店 (required)"
        minLen={1}
        onChange={handleChange}
        value={formData.pickup}
        errorMsg="Please input a valid address."
      />
    </div>
    <button className="btn btn-primary mt-4" type="submit" disabled={cart.length ? false : true}>
      Submit Order
    </button>
  </form>
  )
}