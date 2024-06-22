import React, { useEffect } from "react";
import { LANGUAGES, NETFLIX_LOGO } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGbtSearch } from "../utils/gbtSlice";
import { languageChange } from "../utils/configSlice";
import lang from "../utils/LanguageConstant";
import { updateRoute } from "../utils/routeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user.currentUser);
  const langType = useSelector((store) => store.config.lang);
  const showGbtSearch = useSelector((store) => store.gbt.showGbtSearch);
  const route = useSelector((store) => store.route.currentRoute);

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
        navigate("/" + route);
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
    navigate("/" + e);
  };

  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "red" : "none",
    };
  };

  return (
    <div className="absolute px-15 flex w-screen z-10 bg-black md:bg-purple-500 lg:bg-blue-500 xl:bg-green-500 2xl:bg-yellow-500 2xl:py-2 2xl:px-60">
      <img className="w-28 m-1 2xl:w-44" src={NETFLIX_LOGO} alt="LOGO" />
      {user && (
        <div className="m-1 my-2 p-1 2xl:flex 2xl:justify-between w-full 2xl:m-5 2xl:p-1">
          <ul className="flex text-white space-x-14 mx-1 my-2 font-semibold text-sm items-center w-full 2xl:mx-10 2xl:space-x-5 2xl:text-lg 2xl:w-[50%]">
            <li className="cursor-pointer w-8 h-8 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/browse"
                onClick={() => handleRoute("browse")}
              >
                {lang[langType].home}
              </NavLink>
            </li>
            <li className="cursor-pointer  w-13 h-8 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/shows"
                onClick={() => handleRoute("shows")}
              >
                {lang[langType].show}
              </NavLink>
            </li>
            <li className="cursor-pointer w-13 h-8 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/list"
                onClick={() => handleRoute("list")}
              >
                {lang[langType].mylist}
              </NavLink>
            </li>
          </ul>
          <div className="flex w-full mx-1 h-10 space-x-8 items-center 2xl:w-[40%] 2xl:ml-[20%] 2xl:justify-end 2xl:mx-5 ">
            <select
              onChange={handlelanguageChange}
              className=" text-white text-sm px-1 rounded-md cursor-pointer border border-white hover:bg-gray-50 hover:bg-opacity-15 bg-black bg-opacity-60 2xl:mx-2 2xl:py-1 2xl:px-2 2xl:text-md "
            >
              {LANGUAGES.map((language) => (
                <option
                  className="bg-black bg-opacity-60 w-[15%]"
                  value={language.identifier}
                  key={language.identifier}
                >
                  {language.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleGbtToggle}
              className="w-14 px-2 text-white text-sm rounded-md cursor-pointer flex items-center border border-white hover:bg-gray-50 hover:bg-opacity-15 2xl:text-lg 2xl:w-[20%] 2xl:justify-center 2xl:mx-2 2xl:px-3"
            >
              {route === "browse" && showGbtSearch ? (
                lang[langType].home
              ) : (
                <>
                  {lang[langType].ai}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-white cursor-pointer mx-1 text-sm 2xl:mx-2 2xl:text-md my-1"
                  />
                </>
              )}
            </button>
            <button
              type="submit"
              onClick={handleSignOut}
              style={{ backgroundColor: "#ff0000" }}
              className="w-16 h-[80%] text-white text-sm ml-2 rounded-md cursor-pointer 2xl:w-[25%] 2xl:text-md  2xl:ml-5"
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
