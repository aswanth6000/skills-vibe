'use client'
import GoogleButton from 'react-google-button'
import React,{ useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, UserCredential, OAuthCredential } from "firebase/auth";
import {app} from '../../../config/firebase'
import axios from '../../../config/axios'
import useFormValidation from '@/hooks/validation';
import { useRouter } from 'next/navigation';
import { userDataTypeSignup } from '@/types/authTypes';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);





export default function Signup() {
  const [err, setErr] = useState('')
  const router = useRouter()
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    phone, 
    setPhone
  } = useFormValidation();

  const  handleSubmit  = (e: React.FormEvent<HTMLFormElement>) =>{
    localStorage.setItem('phoneNumberForVerification', phone);
    
    e.preventDefault()
      const userData: userDataTypeSignup = {
        username: name,
        email: email,
        google: false,
        phone: phone,
        password: password
      }
      sendUserData(userData)
      router.push('/login')

    
  }

  const handleLogin = () =>{
    console.log("button clicked");

    
    signInWithPopup(auth, provider)
    .then((result: UserCredential) => {
      const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken || '';
      const user = result.user;
      const userData: userDataTypeSignup = {
        username: user.displayName,
        email: user.email,
        phone: '',
        password: '',
        google: true
      };
      
      
      sendUserData(userData)
      
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  const sendUserData = async (userData: userDataTypeSignup) => {
    try {
      const response = await axios.post('/user/signup', userData, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        }
      });
      if(response.status === 200){
        router.push('/login')
      }else if(response.status === 201){
        setErr(response.data.message)
      }
    } catch (error) {
      console.error('Error sending user data to server:', error);
    }
  };
  
      
  
  return (
      <section className="bg-white-50 dark:bg-white-900 mt-11 mb-11">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-lg mt-12 dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                Sign up to Skill Vibe
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Your Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.name}</p>}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Your Phone Number
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="Your Phone Number"
                    required
                  />
                  {errors.phone && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.phone}</p>}
                </div>
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
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="name@company.com"
                    required
                  />
                  {errors.email && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.email}</p>}

                </div>
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
                  {errors.password && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.password}</p>}

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
                  {errors.confirmPassword && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{errors.confirmPassword}</p>}

                </div>
                  {err && <p className='block mb-2 mt-2 text-sm font-medium text-red-600 dark:text-red-600 text-center'>{err}</p> }
                <button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Sign up
                </button>
                <p className="flex justify-center">Or</p>
                <div className="flex justify-center">
                <GoogleButton 
                label='Continue with Google'
                  onClick={handleLogin}
                />
                </div>

                <p className="text-sm font-light flex justify-center text-white-500 dark:text-white-400">
                  Already have an account?{' '}
                  <a href="/login" className="font-medium text-green-600 hover:underline dark:text-green-500">
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}
