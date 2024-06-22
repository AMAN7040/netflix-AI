import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateEmail, validatePassword } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE_URL } from "../utils/constant";

const Login = () => {
  const [more, setMore] = useState(false);
  const [isSignedIn, setSignedIn] = useState(true);
  const [emailError, setemailError] = useState("");
  const [authError, setAuthError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  const dispatch = useDispatch();

  const toggleForm = () => {
    setSignedIn(!isSignedIn);
  };

  const handleMore = () => {
    setMore(true);
  };

  const handleEmailError = () => {
    const emailValue = email.current ? email.current.value : "";
    if (!validateEmail(emailValue)) {
      setemailError("Please enter a valid Email");
    } else {
      setemailError("");
    }
  };

  const handlePasswordError = () => {
    const passwordValue = password.current ? password.current.value : "";
    if (!validatePassword(passwordValue)) {
      setPasswordError(
        "Your Password must be at least 6 characters, contain at least 1 uppercase & 1 lowercase letter, and 1 digit"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleName = () => {
    const nameValue = name.current ? name.current.value : "";
    if (nameValue.trim() === "") {
      setNameError("Please enter your name");
    } else {
      setNameError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButton = () => {
    handleName();
    handleEmailError();
    handlePasswordError();
    
    if (nameError || emailError || passwordError) return;

    if (!isSignedIn) {
      //Signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          //signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              setAuthError(error.message);
            });
        })
        .catch((error) => {
          setAuthError("Sorry failed to create a account. Please try again");
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
        })
        .catch((error) => {
          setAuthError(
            `Incorrect password for ${email.current.value} Or User doesn't exist. You can reset your password or try again.`
          );
        });
    }
  };

  return (
    <section className=" w-full h-screen bg-center bg-cover" style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}>
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)]">
        <Header />
        <form
          onSubmit={handleSubmit}
          className="absolute w-10/12 py-8 px-10 bg-black m-48 lg:m-32 lg:w-4/12 lg:mx-auto lg:py-10 lg:pr-16 lg:pl-10 2xl:m-32 2xl:mx-auto 2xl:py-10 2xl:pr-16 2xl:pl-10 right-0 mx-auto left-0 2xl:w-3/12  rounded-lg opacity-75 "
        >
          <h1 className="text-xl font-bold text-white mb-4 mx-3 lg:text-2xl lg:mb-7 lg:mx-5 2xl:text-3xl 2xl:mb-7 2xl:mx-4">
            {isSignedIn ? "Sign-in" : "Signup"}
          </h1>
          {authError && (
            <p style={{ color: "#ffff00" }} className="text-sm px-2 mb-2 lg:px-4 lg:mb-4 lg:text-md 2xl:px-4 2xl:mb-4 2xl:text-md">
              {authError}
            </p>
          )}
          {!isSignedIn && (
            <>
              <input
                type="text"
                id="name"
                ref={name}
                placeholder="Enter your Name"
                onBlur={handleName}
                className={`bg-black w-full py-1 px-2 mb-4 border rounded-md opacity-90 text-white lg:py-3 lg:px-3 lg:mx-4 lg:mb-3  2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3  ${
                  nameError ? "border-red-500" : "border-gray-300"
                }`}
                style={
                  nameError
                    ? { borderColor: "#ff0000" }
                    : { borderColor: "gray" }
                }
                required
              />
              {nameError && (
                <p style={{ color: "#ff0000" }} className="px-1 mb-1 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2">
                  {nameError}
                </p>
              )}
            </>
          )}
          <input
            type="email"
            ref={email}
            id="email"
            placeholder="Enter your Email"
            onBlur={handleEmailError}
            className={`bg-black w-full py-1 px-1  mb-4 border rounded-md opacity-90 text-white lg:py-3 lg:px-3 lg:mx-4 lg:mb-3 2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3 ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            style={
              emailError ? { borderColor: "#ff0000" } : { borderColor: "gray" }
            }
            required
          />
          {emailError && (
            <p style={{ color: "#ff0000" }} className="px-1 mb-1 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2">
              {emailError}
            </p>
          )}
          <input
            type="password"
            ref={password}
            id="password"
            placeholder="Enter your password"
            onBlur={handlePasswordError}
            className={`bg-black w-full py-1 px-1  mb-4 border rounded-md opacity-90 text-white lg:py-3 lg:px-3 lg:mx-4 lg:mb-3 2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3 `}
            style={
              passwordError
                ? { borderColor: "#ff0000" }
                : { borderColor: "gray" }
            }
            required
          />
          {passwordError && (
            <p style={{ color: "#ff0000" }} className="px-1 mb-1 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2">
              {passwordError}
            </p>
          )}
          <button
            type="submit"
            onClick={handleButton}
            style={{ backgroundColor: "#ff0000" }}
            className="w-full text-white py-1 px-1 mb-4 rounded-md cursor-pointer lg:py-2 lg:px-3 lg:mb-5 lg:mx-4 2xl:py-2 2xl:px-3 2xl:mb-5 2xl:mx-4"
          >
            {isSignedIn ? "Sign-in" : "Signup"}
          </button>
          <input
            type="checkbox"
            id="remember-me"
            className="py-1 mb-3 px-1 bg-black text-white mx-1 border-1 border-gray-200 hover:border-white lg:py-3 lg:mb-3 lg:px-5 lg:mx-4  2xl:py-3 2xl:mb-3 2xl:px-5 2xl:mx-4 "
          />
          <label htmlFor="remember-me" className="text-white px-1">
            Remember me
          </label>
          <p className="text-gray-400 px-1 py-1 mb-1 lg:px-5 lg:py-3 lg:mb-2 2xl:px-5 2xl:py-3 2xl:mb-2 ">
            {isSignedIn ? "New to Netflix?" : "Already Registered?"}
            <span
              className="text-white mx-1 cursor-pointer hover:underline lg:mx-5 2xl:mx-5"
              onClick={toggleForm}
            >
              {isSignedIn ? "Sign up now" : "Sign-in now"}
            </span>{" "}
          </p>
          <p className="text-gray-400 px-2 py-1 mb-2 text-[11px] lg:px-5 lg:py-3 ;g:mb-3 lg:text-xs 2xl:px-5 2xl:py-3 2xl:mb-3 2xl:text-xs">
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
            <p className="text-gray-400 px-2 py-1 mb-2 text-[11px] lg:px-5 lg:py-3 ;g:mb-3 lg:text-xs 2xl:px-5 2xl:py-3 2xl:mb-3 2xl:text-xs">
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
