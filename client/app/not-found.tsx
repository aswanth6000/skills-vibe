import Link from 'next/link'
import React from 'react'

function NotFoundPage() {
  return (
    <div>
    
<main className="h-screen w-full flex flex-col justify-center items-center bg-bodywhite">
	<h1 className="text-9xl font-extrabold text-green-600 tracking-widest">404</h1>
	<div className="bg-black px-2 text-sm rounded rotate-12 absolute text-white">
		Page Not Found
	</div>
	<button className="mt-5">
      <a
        className="relative inline-block text-sm font-medium text-green-600 group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-green-600 group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span className="relative block px-8 py-3 bg-bodywhite border border-current">
          <Link href="/userhome">Go Home</Link>
        </span>
      </a>
    </button>
</main>
    </div>
  )
}

export default NotFoundPage