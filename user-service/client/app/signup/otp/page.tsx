import React from 'react'

export default function Otp() {
  return (
    <div>
      <section className="bg-white-50 dark:bg-white-900 mt-11 mb-11">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                OTP Verification
              </h1>
              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Enter the OTP recieved
                  </label>
                  <input
                    type="number"
                    name="otp"
                    id="otp"
                    // value={value.email}
                    // onChange={handleChange}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="Enter the otp recieved"
                    required
                  />
                </div>
                
                <p className='block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center' >error</p>
                <button
                  type="submit"
                  className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
