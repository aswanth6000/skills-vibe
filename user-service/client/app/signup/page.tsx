'use client'
import GoogleButton from 'react-google-button'
import React,{ useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup, UserCredential, OAuthCredential } from "firebase/auth";
import {app} from '../../config/firebase'
import axios from '../../config/axios'
const provider = new GoogleAuthProvider();
const auth = getAuth(app);


interface userDataType{
  uid: string;
  displayName: string | null;
  email: string | null;
  google: boolean
}

const handleLogin = () =>{
  console.log("button clicked");
  
  signInWithPopup(auth, provider)
  .then((result: UserCredential) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken || '';
    // The signed-in user info.
    const user = result.user;
    const userData: userDataType = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      google: true
      // Add other relevant user data
    };
    console.log(userData);
    
    sendUserData(userData)
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  const sendUserData = async (userData: userDataType) => {
    try {
      const response = await axios.post('/signup', userData, {
        headers: {
          "Content-Type": 'application/json'
        }
      });
      console.log('User data sent to server:', response.data);
    } catch (error) {
      console.error('Error sending user data to server:', error);
    }
  };
}



interface FormValues {
  email: string;
  password: string;
}

export default function Signup() {
  const [value, setValue] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginp = () =>{
    
  }
      
  
  return (
    <div>
      <section className="bg-white-50 dark:bg-white-900 mt-11 mb-11">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-800 dark:border-white-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-black">
                Sign up to Skill Vibe
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleLoginp}>
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
                    value={value.email}
                    onChange={handleChange}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="name@company.com"
                    required
                  />
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
                    value={value.password}
                    onChange={handleChange}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="password"
                    value={value.password}
                    onChange={handleChange}
                    className="bg-white-50 border border-white-300 text-white-900 sm:text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-white-700 dark:border-white-600 dark:placeholder-white-400 dark:text-black dark:focus:ring-green-500 dark:focus:border-green-500 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <p className='block mb-2 text-sm font-medium text-red-600 dark:text-red-600 text-center' >{error? error : 'dddddddd'}</p>
                <button
                  type="submit"
                  className="w-full text-black bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Sign up
                </button>
                <p className="ml-44">Or</p>
                <div className="ml-20">
                <GoogleButton 
                label='Continue with Google'
                  onClick={handleLogin}
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
    </div>
  )
}
