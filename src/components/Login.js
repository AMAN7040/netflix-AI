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
  const [errors, setErrors] = useState({});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const dispatch = useDispatch();

  const toggleForm = () => setSignedIn(!isSignedIn);

  const handleMore = () => setMore(true);

  const validateFields = () => {
    const emailValue = emailRef.current?.value || "";
    const passwordValue = passwordRef.current?.value || "";
    const nameValue = nameRef.current?.value || "";
    let newErrors = {};

    if (!validateEmail(emailValue)) {
      newErrors.email = "Please enter a valid Email";
    }

    if (!validatePassword(passwordValue)) {
      newErrors.password =
        "Your Password must be at least 6 characters, contain at least 1 uppercase & 1 lowercase letter, and 1 digit";
    }

    if (!isSignedIn && nameValue.trim() === "") {
      newErrors.name = "Please enter your name";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    if (!isSignedIn) {
      // Signup logic
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          return updateProfile(user, {
            displayName: nameRef.current.value,
          });
        })
        .then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName }));
        })
        .catch((error) => {
          setErrors({ auth: error.message });
        });
    } else {
      // Sign-in logic
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const { uid, email, displayName } = userCredential.user;
          dispatch(addUser({ uid, email, displayName }));
        })
        .catch(() => {
          setErrors({
            auth: `Incorrect password for ${emailRef.current.value} or user doesn't exist. You can reset your password or try again.`,
          });
        });
    }
  };

  return (
    <section
      className="w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url('${BACKGROUND_IMAGE_URL}')` }}
    >
      <div className="w-full h-full bg-[rgba(0,0,0,0.5)]">
        <Header />
        <form
          onSubmit={handleSubmit}
          className="absolute w-[20rem] py-8 px-10 bg-black m-[12rem] md:m-40 md:w-[25rem] md:mx-auto md:py-10 md:pr-16 md:pl-10 lg:m-32 lg:w-[28rem] lg:mx-auto lg:py-10 lg:pr-16 lg:pl-10 2xl:m-32 2xl:mx-auto 2xl:py-10 2xl:pr-16 2xl:pl-10 right-0 mx-auto left-0 2xl:w-[32rem] rounded-lg opacity-75"
        >
          <h1 className="text-xl font-bold text-white mb-4 mx-3 md:text-xl md:mb-6 md:mx-3 lg:text-2xl lg:mb-7 lg:mx-5 2xl:text-3xl 2xl:mb-7 2xl:mx-4">
            {isSignedIn ? "Sign-in" : "Signup"}
          </h1>

          {errors.auth && (
            <p
              style={{ color: "#ffff00" }}
              className="text-sm px-2 mb-2 md:px-2 md:mb-3 md:text-sm lg:px-4 lg:mb-4 lg:text-md 2xl:px-4 2xl:mb-4 2xl:text-md"
            >
              {errors.auth}
            </p>
          )}

          {!isSignedIn && (
            <>
              <input
                type="text"
                ref={nameRef}
                placeholder="Enter your Name"
                onBlur={() => validateFields()}
                className={`bg-black w-full py-1 px-2 mb-4 border rounded-md opacity-90 text-white md:py-1 md:px-2 md:mx-2 md:mb-2 lg:py-3 lg:px-3 lg:mx-4 lg:mb-3 2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.name && (
                <p
                  style={{ color: "#ff0000" }}
                  className="px-1 mb-1 md:px-2 md:mb-2 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2"
                >
                  {errors.name}
                </p>
              )}
            </>
          )}

          <input
            type="email"
            ref={emailRef}
            placeholder="Enter your Email"
            onBlur={() => validateFields()}
            className={`bg-black w-full py-1 px-2 mb-4 border rounded-md opacity-90 text-white md:py-1 md:px-2 md:mx-2 md:mb-2 lg:py-3 lg:px-3 lg:mx-4 lg:mb-3 2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.email && (
            <p
              style={{ color: "#ff0000" }}
              className="px-1 mb-1 md:px-2 md:mb-2 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2"
            >
              {errors.email}
            </p>
          )}

          <input
            type="password"
            ref={passwordRef}
            placeholder="Enter your password"
            onBlur={() => validateFields()}
            className={`bg-black w-full py-1 px-2 mb-4 border rounded-md opacity-90 text-white md:py-1 md:px-2 md:mx-2 md:mb-2 lg:py-3 lg:px-3 lg:mx-4 lg:mb-3 2xl:py-3 2xl:px-3 2xl:mx-4 2xl:mb-3 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {errors.password && (
            <p
              style={{ color: "#ff0000" }}
              className="px-1 mb-1 md:px-2 md:mb-2 lg:px-4 lg:mb-3 2xl:px-4 2xl:mb-2"
            >
              {errors.password}
            </p>
          )}

          <button
            type="submit"
            style={{ backgroundColor: "#ff0000" }}
            className="w-full text-white py-1 px-1 mb-4 rounded-md cursor-pointer md:py-2 md:px-2 md:mb-3 md:mx-2 lg:py-2 lg:px-3 lg:mb-5 lg:mx-4 2xl:py-2 2xl:px-3 2xl:mb-5 2xl:mx-4"
          >
            {isSignedIn ? "Sign-in" : "Signup"}
          </button>

          <p className="text-[0.9rem] text-gray-400 px-1 py-1 mb-1 md:py-2 md:mb-3 md:px-2 md:text-[1rem] lg:text-[1.1rem] lg:px-5 lg:py-3 lg:mb-2 2xl:text-[1.2rem] 2xl:px-5 2xl:py-3 2xl:mb-2 ">
            {isSignedIn ? "New to Netflix?" : "Already Registered?"}
            <span
              className="text-white mx-1 cursor-pointer hover:underline md:px-1 lg:mx-5 2xl:mx-5"
              onClick={toggleForm}
            >
              {isSignedIn ? "Sign up now" : "Sign-in now"}
            </span>
          </p>

          <p className="text-[0.7rem] text-gray-400 py-1 px-2 md:text-[0.8rem] md:py-2 md:mb-2 md:px-2  lg:text-[0.9rem] lg:px-5 lg:py-3 2xl:lg:text-[1rem] 2xl:px-4 2xl:py-2">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            {!more && (
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={handleMore}
              >
                {" "}
                Learn more.
              </span>
            )}
          </p>

          {more && (
            <p className=" text-[0.7rem] text-gray-400 py-1 px-2 md:py-2 md:text-[0.8rem] md:px-2 lg:text-[0.9rem] lg:px-5 lg:py-3 2xl:text-[1rem] 2xl:px-4 2xl:py-2">
              The information collected by Google reCAPTCHA is subject to the
              Google Privacy Policy and Terms of Service, and is used for
              providing, maintaining, and improving the reCAPTCHA service and
              for general security purposes (it is not used for personalized
              advertising by Google).
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
