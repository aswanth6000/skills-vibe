'use client'
import axios from "../../../config/axios";
import useFormValidation from "@/hooks/validation";
import GoogleButton from 'react-google-button'
import { useDispatch } from "react-redux";
import { logIn,  } from "@/redux/features/authSlice";
import React,{ useState } from "react";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
interface FormValues {
  email: string;
  password: string;
}
interface AuthState {
  isAuth: boolean;
  username: string;
  uid: string;
  isAdmin: boolean;
  token: string;
  
}

interface userDataType{
  email: string | null;
  password: string | null,
}

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [err, setErr] = useState('')
  const {email, setEmail, errors, password, setPassword} = useFormValidation()



  const handleLogin = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const userData :userDataType ={
      email: email,
      password: password
    }
    sendUserData(userData)
  }

  const sendUserData = async (userData: userDataType) => {
    try {
      const response = await axios.post('/login', userData, {
        headers: {
          "Content-Type": 'application/json'
        }
      });
      console.log('User data sent to server:', response.data);
      console.log(response.data.message);
      
      const token = response.data.token
      const user = response.data.user
      console.log(response.status);
      if(response.status === 200){
        dispatch(logIn({
          isAuth: true,
          token: token,
          ...user
        }))
        localStorage.setItem('user', JSON.stringify(user));
        console.log('kkkkkkkkkkkkkkkk',localStorage);
        
        router.push('/')
      }else if(response.status === 203){
        setErr(response.data.message)
      }
    } catch (error) {
      console.error('Error sending user data to server:', error);
    }
  };
  const username = useAppSelector((state)=> state.auth.value)
  console.log(username);
  
      
  
  return (
      <section className="bg-white-50 dark:bg-white-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail( e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                {errors.email && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.email}</p>}
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
                    onChange={(e)=> setPassword(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                {errors.password && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.password}</p>}
                {err && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{err}</p>}
                <button
                  type="submit"
                  className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Sign in
                </button>
                <p className="ml-44">Or</p>
                <div className="ml-20">
                <GoogleButton 
                label='Continue with Google'
                  onClick={() => { console.log('Google button clicked') }}
                />
                </div>

                <p className="text-sm font-light text-white-500 dark:text-white-400">
                  Dont have an account yet?{' '}
                  <a href="/signup" className="font-medium text-green-600 hover:underline dark:text-green-500">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
