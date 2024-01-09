"use client";
import React, { useEffect, useState } from "react";
import useFormValidation from "@/hooks/validation";
import Loading from "@/components/loading";
import axios from "axios";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()
  const { errors, setPassword, password, confirmPassword, setConfirmPassword } =
    useFormValidation();
    const[error, setError] = useState("")
  const [step, setStep] = useState(0);
  const [load, setLoad] = useState("");
  const [err, setErr] = useState("");
  const [otp, setOtp] = useState("");
  const user = useAppSelector((state) => state.auth.value);
  const email = user.email;
  const handleChangePassword = async(e: React.FormEvent, email: string) => {
    e.preventDefault();
    const sendData ={
      email: email,
      password: password,
      otp: otp
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/submitpassword",
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 200){
        router.push('/userhome')
      }
  
      console.log(response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }

  };
  const sendOtpFun = async (email: string) => {
  
    setStep(1);
    const sendEmail = {
      email: email,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/sendotp",
        sendEmail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log(response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  
  const submitOtp = async(e: React.FormEvent, email: string) => {
    e.preventDefault()
    
    try {
      const sendOtp = {
        otp: otp,
        email: email
      }
      const response = await axios.post(
        "http://localhost:8000/submitotp",
        sendOtp,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(response.status === 200){
        setStep(2);
      }else{
        setStep(1)
        setError('OTP entered was wrong !!')
      }
  
      console.log(response.data);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }

  };

  return (
    <section className="bg-white-50 dark:bg-white-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
              Change Password
            </h1>
            {step === 1 && (
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                Enter the OTP recieved on {email}
              </h1>
            )}
            {step === 0 && (
              <div>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                  An OTP will be sent to your email {email}
                </h1>
                <button
                  type="button"
                  onClick={() => sendOtpFun(email)}
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Get otp
                </button>
              </div>
            )}
            {step === 1 && (
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="otp"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="Enter the OTP received"
                    required
                  />
                </div>
                {error && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{error}</p>}
                <button
                  type="submit"
                  onClick={(e)=>submitOtp(e, email)}
                  className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit
                </button>
              </form>
            )}
            {step === 2 && (
              <form
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {err && (
                  <p className="block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center">
                    {err}
                  </p>
                )}
                {load ? (
                  <Loading />
                ) : (
                  <button
                    type="submit"
                    onClick={(e)=>handleChangePassword(e, email)}
                    className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Submit
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
