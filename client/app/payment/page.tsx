
import Head from 'next/head';

const Payment: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Head>
        <title>Payment Page</title>
      </Head>

      <main className="text-center">
        <h1 className="text-3xl font-semibold mb-8">Secure Payment</h1>

        <div className="w-80 mx-auto bg-white p-8 rounded-lg shadow-md">
          <label htmlFor="cardNumber" className="block text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            placeholder="**** **** **** ****"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />

          <label htmlFor="expiryDate" className="block text-gray-700 mb-2">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            placeholder="MM/YY"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />

          <label htmlFor="cvv" className="block text-gray-700 mb-2">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            placeholder="123"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />

          <label htmlFor="cardHolder" className="block text-gray-700 mb-2">
            Card Holder
          </label>
          <input
            type="text"
            id="cardHolder"
            placeholder="Your Name"
            className="w-full px-3 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
          />

          <button
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            type="button"
          >
            Pay Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default Payment;
