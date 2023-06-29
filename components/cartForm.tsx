import { useForm } from "react-hook-form";
import { useCartStore } from '@/store/store';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormData = {
  fullName: string;
  email: string;
  mobile: string;
  pickup: string;
}

const schema = yup
  .object({
    fullName: yup.string().required("Please input your full name"),
    email: yup.string().email().required("Please input a valid email address"),
    mobile: yup
      .string()
      .matches(/^09\d{8}$/, { message: "Please input a valid Taiwan mobile number."})
      .min(9)
      .required("Please input a valid Taiwan mobile number (e.g. 0912345678)"),
    pickup: yup.string().required("Please input a valid address for pickup")
  })
  .required()

const generateOrderId = () => {
  return nanoid(10)
}

export default function CartForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { cart, total, clearCart } = useCartStore();

  const router = useRouter();

  const onSubmit = (formData:FormData) => {
    const data = {
      ...formData,
      orderId: generateOrderId(),
      cartDetails: cart,
      total
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
    return false;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-full md:max-w-[50%]"
    >
    <div>
      <label htmlFor="fullName" className="block my-2">
        <span className="block text-sm font-medium text-slate-700">姓名</span>
      </label>
      <input
        id="fullName"
        className="input input-bordered w-full rounded form-input"
        placeholder="姓名 (required)"
        aria-invalid={errors.fullName ? "true" : "false"}
        {...register("fullName", { required: true })} />
      <span className="text-sm text-error input-error-msg">{errors.fullName?.message}</span>

      <label htmlFor="email" className="block my-2">
        <span className="block text-sm font-medium text-slate-700">電子郵件</span>
      </label>
      <input
        id="email"
        className="input input-bordered w-full rounded form-input"
        placeholder="電子郵件 (required)"
        aria-invalid={errors.email ? "true" : "false"}
        {...register("email", { required: true })} />
      <span className="text-sm text-error input-error-msg">{errors.email?.message}</span>

      <label htmlFor="mobile" className="block my-2">
        <span className="block text-sm font-medium text-slate-700">手機號碼 (e.g. 0912345678)</span>
      </label>
      <input
        id="mobile"
        className="input input-bordered w-full rounded form-input"
        placeholder="手機號碼 (required)"
        aria-invalid={errors.mobile ? "true" : "false"}
        {...register("mobile", { required: true })} />
      <span className="text-sm text-error input-error-msg">{errors.mobile?.message}</span>

      <label htmlFor="pickup" className="block my-2">
        <span className="block text-sm font-medium text-slate-700">距離您家最近的便利商店 （7-11，、全家、OK Mart、萊爾富)</span>
      </label>
      <input
        id="pickup"
        className="input input-bordered w-full rounded form-input"
        placeholder="地址 (required)"
        aria-invalid={errors.pickup ? "true" : "false"}
        {...register("pickup", { required: true })} />
      <span className="text-sm text-error input-error-msg">{errors.pickup?.message}</span>
    </div>
    <button className="btn btn-primary mt-4" type="submit" disabled={cart.length ? false : true}>
      Submit Order
    </button>
  </form>
  )
}