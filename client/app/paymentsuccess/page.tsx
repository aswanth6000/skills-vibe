import React from 'react'
import Link from 'next/link';
import Head from 'next/head';

export default function Page() {
  return (
    <>
    <Head>
      <title>Payment Success</title>
    </Head>

    <div className="flex items-center justify-center h-screen bg-green-500">
      <main className="text-center text-white">
        <h1 className="text-3xl font-semibold mb-8">Payment Success</h1>

        <p className="mb-4">Your order has been successfully placed!</p>
        {/* <p className="mb-4">Your order ID is:</p> */}

        <button
          className="bg-white text-green-500 px-6 py-2 rounded-full font-semibold hover:bg-green-100 focus:outline-none focus:shadow-outline-green"
          
        >
          Go to My Orders
        </button>

        <p className="mt-8">You will be redirected to the home page shortly...</p>

        <Link href="/">
          <p className="text-white underline mt-2">Return to Home</p>
        </Link>
      </main>
    </div>
  </>
  )
}
