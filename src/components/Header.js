import React, { useEffect } from "react";
import { LANGUAGES, NETFLIX_LOGO } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBell } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGbtSearch } from "../utils/gbtSlice";
import { languageChange } from "../utils/configSlice";
import lang from "../utils/LanguageConstant";
import { updateRoute } from "../utils/routeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const langType = useSelector((store) => store.config.lang);
  const showGbtSearch = useSelector((store) => store.gbt.showGbtSearch);
  const route = useSelector((store)=> store.route.currentRoute);

  //Signout logic when user clicks on signout button
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
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
        navigate("/"+route);
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribing
    return () => unsubscribe();
  }, [route, dispatch, navigate]);


  const handleGbtToggle = () => {
    dispatch(toggleGbtSearch());
  };

  const handlelanguageChange = (e) => {
    dispatch(languageChange(e.target.value));
  };

  const handleRoute = (e) => {
    dispatch(updateRoute(e));
    navigate('/'+e);
  } 

  return (
    <div className="absolute py-2 px-60 flex w-screen z-10">
      <img className="w-44" src={NETFLIX_LOGO} alt="LOGO" />
      {user && (
        <div className="flex justify-between w-full m-5 p-1">
          <ul className="flex text-white space-x-7 font-semibold text-md mx-10 items-center w-[45%]">
            <li onClick={() => handleRoute('browse')}  className="cursor-pointer w-20 h-8">
              {lang[langType].home}
            </li>
            <li onClick={() => handleRoute('shows')} className="cursor-pointer w-20 h-8">
               {lang[langType].show}
             </li>
            <li className="cursor-pointer w-20 h-8">{lang[langType].mylist}</li>
          </ul>
          <div className="flex justify-end  h-10 items-center w-[40%] ml-[20%]">
            <select
              onChange={handlelanguageChange}
              className="mx-2 py-1 px-2 text-white text-md rounded-md cursor-pointer border border-white hover:bg-gray-50 hover:bg-opacity-15 bg-black bg-opacity-60 "
            >
              {LANGUAGES.map((language) => (
                <option
                  className="bg-black bg-opacity-60 w-[20%]"
                  value={language.identifier}
                  key={language.identifier}
                >
                  {language.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleGbtToggle}
              className="w-[20%]  text-white text-lg rounded-md cursor-pointer flex  justify-center items-center border mx-2 px-3 border-white hover:bg-gray-50 hover:bg-opacity-15"
            >
              {route=== 'browse' && showGbtSearch ? (
                lang[langType].home
              ) : (
                <>
                  {lang[langType].ai}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-white cursor-pointer mx-2 text-md my-1"
                  />
                </>
              )}
            </button>
            <FontAwesomeIcon
              icon={faBell}
              className="text-white cursor-pointer mx-4 text-xl"
            />
            <button
              type="submit"
              onClick={handleSignOut}
              style={{ backgroundColor: "#ff0000" }}
              className="w-[25%] h-[80%] text-white text-md  ml-5 rounded-md cursor-pointer"
            >
              {lang[langType].signout}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
