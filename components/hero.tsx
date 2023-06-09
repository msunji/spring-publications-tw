export default function Hero() {
  return (
    <div className="hero min-h-full bg-[url('/images/TestHero.jpg')] bg-cover">
      <div className="hero-overlay bg-opacity-65"></div>
      <div className="py-20 md:py-40 hero-content text-center text-white">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Spring Publications</h1>
          <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary">See Books</button>
        </div>
      </div>
    </div>
  )
}