import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateEmail, validatePassword } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const [more, setMore] = useState(false);
  const [isSignedIn, setSignedIn] = useState(true);
  const [emailError, setemailError] = useState('');
  const [authError, setAuthError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);


  const toggleForm = () => {
    setSignedIn(!isSignedIn);
  };

  const handleMore = () => {
    setMore(true);
  };

  const handleEmailError = () => {
    const emailValue = email.current ? email.current.value : '';
    if (!validateEmail(emailValue)) {
      setemailError('Please enter a valid Email');
    } else {
      setemailError('');
    }
  };

  const handlePasswordError = () => {
    const passwordValue = password.current ? password.current.value : '';
    if(!validatePassword(passwordValue)){
      setPasswordError('Your Password must be at least 6 characters, contain at least 1 uppercase & 1 lowercase letter, and 1 digit');
    }
    else{
      setPasswordError('');
    }
  };

  const handleName = () => {
    const nameValue = name.current? name.current.value : '';
    if (nameValue.trim() === '') {
      setNameError('Please enter your name');
    } else {
      setNameError('');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButton = () => {
    handleName();
    handleEmailError();
    handlePasswordError();

    // if (!isSignedIn && !nameError && !emailError && !passwordError) {
    //   console.log("Sign up form submitted", name.current.value, email.current.value, password.current.value);
    // } else if (isSignedIn && !emailError && !passwordError) {
    //   console.log("Sign-in successfully", email.current.value, password.current.value);
    // } else {
    //   console.log('Cannot Sign in or login in');
    // }
    if(nameError || emailError || passwordError) return

    if(!isSignedIn){
     //Signup logic
     createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential)=>{
      //signed up
      const user = userCredential.user;
      console.log(user);
     })
     .catch((error)=>{
      setAuthError('Sorry failed to create a account. Please try again');
     });
     
    }
    else{
     //sign in logic
     signInWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user);
     })
     .catch((error)=>{
      
      setAuthError(`Incorrect password for ${email.current.value} Or User doesn't exist. You can reset your password or try again.`);
     })

    }
  }

  return (
    <section className=" absolute w-full h-screen bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-center bg-cover">
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)]">
        <Header />
        <form
          onSubmit={handleSubmit}
          className="absolute bg-black m-32 mx-auto py-10 pr-16 pl-10 right-0 left-0 w-3/12  rounded-lg opacity-75 "
        >
          <h1 className="text-3xl font-bold text-white mb-7 mx-4">
            {isSignedIn ? "Sign-in" : "Signup"}
          </h1>
          {authError && <p style={{ color: '#ffff00' }} className="px-4 mb-4">{authError}</p>}
          {!isSignedIn && (
            <>
              <input
              type="text"
              id="name"
              ref={name}
              placeholder="Enter your Name"
              onBlur={handleName}
              className={`bg-black w-full py-3 px-3 mx-4 mb-3 border rounded-md opacity-90 text-white ${nameError ? 'border-red-500' : 'border-gray-300'}`}
              style={nameError ? { borderColor: '#ff0000' } : { borderColor: 'gray' }}
              required
          />
          {nameError && <p style={{ color: '#ff0000' }} className="px-4 mb-2">{nameError}</p>}
            </>
          )}
          <input
            type="email"
            ref={email}
            id="email"
            placeholder="Enter your Email"
            onBlur={handleEmailError}
            className={`bg-black w-full py-3 px-3 mx-4 mb-3 border rounded-md opacity-90 text-white ${emailError ? 'border-red-500' : 'border-gray-300'}`}
            style={emailError ? { borderColor: '#ff0000' } : { borderColor: 'gray' }}
            required
          />
          {emailError && <p style={{ color: '#ff0000' }} className="px-4 mb-2">{emailError}</p>}
          <input
            type="password"
            ref={password}
            id="password"
            placeholder="Enter your password"
            onBlur={handlePasswordError}
            className={`bg-black w-full py-3 px-3 mx-4 mb-3 border rounded-md opacity-90 text-white `}
            style={passwordError ? { borderColor: '#ff0000' } : { borderColor: 'gray' }}
            required
          />
          {passwordError && <p style={{ color: '#ff0000' }} className="px-4 mb-2">{passwordError}</p>}
          <button
            type="submit"
            onClick={handleButton}
            style={{ backgroundColor: '#ff0000' }}
            className="w-full text-white py-2 px-3 mb-5 mx-4 rounded-md cursor-pointer"
          >
            {isSignedIn ? "Sign-in" : "Signup"}
          </button>
          <input
            type="checkbox"
            id="remember-me"
            className="py-3 mb-3 px-5 bg-black text-white mx-4 border-1 border-gray-200 hover:border-white"
          />
          <label htmlFor="remember-me" className="text-white px-1">
            Remember me
          </label>
          <p className="text-gray-400 px-5 py-3 mb-2 ">
            {isSignedIn ? "New to Netflix?" : "Already Registered?"}
            <span
              className="text-white mx-5 cursor-pointer hover:underline"
              onClick={toggleForm}
            >
              {isSignedIn ? "Sign up now" : "Sign-in now"}
            </span>{" "}
          </p>
          <p className="text-gray-400 px-5 py-3 mb-3 text-xs">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span
              className="text-blue-700 hover:underline"
              onClick={handleMore}
            >
              Learn more.
            </span>
          </p>
          {more && (
            <p className="text-gray-400 px-5 py-3 mb-3 text-xs">
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining, and improving the reCAPTCHA service and
              for general security purposes (it is not used for personalised
              advertising by Google).
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
