'use client'
import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import {app} from '../../../../config/firebase'
import {multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,RecaptchaVerifier, getAuth} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


interface OtpProps {}

const Otp: React.FC<OtpProps> = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(true);
  const otpSendToast = () => {
    toast.success('OTP send successfully!!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const auth = getAuth(app);
  auth.tenantId = "myTenantId1";
  

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };
 
  const handleResendClick = () => {
    setResendDisabled(true);
    restart(expiryTime)
    otpSendToast()
  };
  const durationInMilliseconds = 5 * 1000;
  const currentTime = new Date().getTime();
  const expiryTime = new Date(currentTime + durationInMilliseconds);

  const { seconds, restart } = useTimer({
    expiryTimestamp: expiryTime, // 60 minutes in milliseconds
    onExpire: () => {
      setResendDisabled(false);
    },
  });


  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: Implement OTP verification logic
    // For demo purposes, let's just simulate a successful verification
    if (otp === '123456') {
      console.log('OTP Verified Successfully!');
      setError('');
    } else {
      setError('Incorrect OTP. Please try again.');
    }
  };

  return (
    <section className="bg-white-50 dark:bg-white-900 mt-11 mb-11">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
              OTP Verification
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="otp"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Enter the OTP received
                </label>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                  placeholder="Enter the OTP received"
                  required
                />
              </div>

              <p className="block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center">
                {error}
              </p>
              <button
                type="submit"
                className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Submit OTP
              </button>

              {resendDisabled ? (
                ""
              ) : (
                <button
                  type="button"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                  onClick={handleResendClick}
                >
                  Resend
                </button>
              )}
              <div className="flex justify-center mt-4">
                {resendDisabled ? <p>Resend OTP ({seconds}s)</p> : ""}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
};

export default Otp;
