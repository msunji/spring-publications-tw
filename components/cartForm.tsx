export default function CartForm() {
  return (
    <form className="max-w-full md:max-w-[50%]">
    <label className="block mb-2">
      <span className="block text-sm font-medium text-slate-700 mb-1">Full Name</span>
      <input type="text" value="Full Name" className="input input-bordered w-full rounded"/>
    </label>
    <label className="block mb-2">
      <span className="block text-sm font-medium text-slate-700 mb-1">Email</span>
      <input type="text" value="Email"  className="input input-bordered w-full rounded mb-2"/>
    </label>
    <button className="btn btn-primary">
      Submit Order
    </button>
  </form>
  )
}