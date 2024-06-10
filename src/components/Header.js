import React, { useEffect } from "react";
import { NETFLIX_LOGO } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  //Signout logic when user clicks on signout button
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribing 
    return () => unsubscribe();
    
  }, []);

  return (
    <div className="absolute py-2 px-60 flex w-full z-40">
      <img className="w-44" src={NETFLIX_LOGO} alt="LOGO" />
      {user && (
        <div className="flex justify-between w-full m-5 p-1">
          <ul className="flex text-white space-x-8 font-semibold text-lg mx-10 items-center">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">TV Shows</li>
            <li className="cursor-pointer">Movies</li>
            <li className="cursor-pointer">Latest</li>
            <li className="cursor-pointer">My List</li>
          </ul>
          <div className="flex justify-evenly h-10 items-center">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-white cursor-pointer mx-4 text-xl"
            />
            <FontAwesomeIcon
              icon={faBell}
              className="text-white cursor-pointer mx-4 text-xl"
            />
            <button
              type="submit"
              onClick={handleSignOut}
              style={{ backgroundColor: "#ff0000" }}
              className="w-full text-white text-sm h-9 p-1 ml-5 rounded-md cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
