import React, { useState } from "react";
import Header from "./Header";

const Login = () => { 

  const [more, setMore] = useState(false);
  const [isSignedIn, setSignedIn] = useState(true);

  const handleSignin = () => {
    setSignedIn(!isSignedIn);
  }

  const handleMore = () => {
    setMore(true);
  }

  return (
    <section className=" absolute w-full h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-center bg-cover">
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)]">
        <Header />
       <form className="absolute bg-black m-32 mx-auto py-10 pr-16 pl-10 right-0 left-0 w-3/12  rounded-lg opacity-75 ">
          <h1 className="text-3xl font-bold text-white mb-10 mx-4">{isSignedIn? 'Sign-in' : 'Signup'}</h1>
         {!isSignedIn && <input type="text" id="name" placeholder="Enter your Name" className="bg-black w-full py-3 px-3 mx-4 mb-6 border rounded-md opacity-90 text-white" required /> }
          <input type="email" id="email" placeholder="Enter your Email" className="bg-black w-full py-3 px-3 mx-4 mb-6 border rounded-md opacity-90 text-white" required />
          <input type="password" id="password" placeholder="Enter your password" className="bg-black w-full py-3 px-3 mx-4 mb-6 border rounded-md opacity-90 text-white" required />
          <button type="submit" className="w-full bg-red-600 text-white py-3 px-3 mb-5 mx-4 rounded-md cursor-pointer">{isSignedIn? 'Sign-in' : 'Signup'}</button>
          <input type="checkbox" id="remember-me" className="py-3 mb-3 px-5 bg-black text-white mx-4 border-1 border-gray-200 hover:border-white" />
          <label htmlFor="remember-me" className="text-white px-1">Remember me</label>
          <p className="text-gray-400 px-5 py-3 mb-2 ">{isSignedIn? 'New to Netflix?' : 'Already Registered?'}<span className="text-white mx-5 cursor-pointer hover:underline" onClick={handleSignin}>{isSignedIn? 'Sign up now' : 'Sign-in now'}</span> </p>
          <p className="text-gray-400 px-5 py-3 mb-3 text-xs">This page is protected by Google reCAPTCHA to ensure you're not a bot.<span className="text-blue-700 hover:underline" onClick={handleMore}>Learn more.</span></p>
          {more && <p className="text-gray-400 px-5 py-3 mb-3 text-xs">The information collected by Google reCAPTCHA is subject to the Google Privacy Policy and Terms of Service, and is used for providing, maintaining, and improving the reCAPTCHA service and for general security purposes (it is not used for personalised advertising by Google).</p>}
         </form>
      </div>
    </section>
  );
};

export default Login;
