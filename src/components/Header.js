import React, { useEffect, useMemo } from "react";
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

  // Signout logic when user clicks on signout button
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(removeUser());
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
          })
        );
        navigate("/" + route);
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [route, dispatch, navigate]);

  const handleGbtToggle = () => dispatch(toggleGbtSearch());

  const handleLanguageChange = (e) => dispatch(languageChange(e.target.value));

  const handleRoute = (e) => {
    dispatch(updateRoute(e));
    navigate("/" + e);
  };

  const activeStyle = useMemo(
    () => ({ isActive }) => ({
      color: isActive ? "red" : "none",
    }),
    []
  )

  return (
    <div className="absolute px-0 w-screen py-2 z-10 md:flex md:px-[3rem] lg:flex  2xl:flex md:py-4  lg:py-2 lg:px-[3rem] 2xl:py-2 2xl:px-60">
      <div className="flex justify-center  md:justify-normal lg:flex-none 2xl:justify-normal">
        <img
          className=" w-28 mx-36 md:w-32 md:m-1 lg:w-36 lg:m-1 2xl:w-44 2xl:m-1"
          src={NETFLIX_LOGO}
          alt="LOGO"
        />
      </div>
      {user && (
        <div className="m-1 my-2 p-1 md:flex md:space-x-1 md:p-1 lg:flex lg:justify-between lg:m-3 lg:p-1 2xl:flex 2xl:justify-between w-full 2xl:m-5 2xl:p-1">
          <ul className="flex justify-center text-white space-x-14  my-2 font-semibold text-sm items-center w-full md:justify-normal md:mx-4 md:text-[1rem] md:w-full md:space-x-8  lg:justify-normal lg:mx-6 lg:text-lg lg:w-1/2 lg:space-x-10 2xl:justify-normal 2xl:mx-10 2xl:space-x-5 2xl:text-lg 2xl:w-[50%]">
            <li className="cursor-pointer w-11 h-8 md:w-16 lg:w-24 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/browse"
                onClick={() => handleRoute("browse")}
              >
                {lang[langType].home}
              </NavLink>
            </li>
            <li className="cursor-pointer w-[67px] h-8 md:w-20 lg:w-24 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/shows"
                onClick={() => handleRoute("shows")}
              >
                {lang[langType].show}
              </NavLink>
            </li>
            <li className="cursor-pointer w-14 h-8 md:w-20 lg:w-24 2xl:w-24">
              <NavLink
                style={activeStyle}
                to="/list"
                onClick={() => handleRoute("list")}
              >
                {lang[langType].mylist}
              </NavLink>
            </li>
          </ul>
          <div className="flex w-full justify-center h-10 md:space-x-4 lg:space-x-8 2xl:space-x-8 items-center md:justify-end  md:mx-1 lg:w-2/5  lg:justify-end lg:mx-5 2xl:w-[30rem]  2xl:justify-end 2xl:mx-5">
            <select
              onChange={handleLanguageChange}
              className="text-white text-sm mx-2 px-1 rounded-md cursor-pointer border border-white hover:bg-gray-50 hover:bg-opacity-15 bg-black bg-opacity-60 md:px-1 lg:mx-2 lg:py-1 lg:px-2 lg:text-md 2xl:mx-2 2xl:py-1 2xl:px-2 2xl:text-md"
            >
              {LANGUAGES.map((language) => (
                <option
                  className="bg-black bg-opacity-60"
                  value={language.identifier}
                  key={language.identifier}
                >
                  {language.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleGbtToggle}
              className="w-16 px-2 mx-6 text-white text-sm rounded-md cursor-pointer flex items-center border border-white hover:bg-gray-50 hover:bg-opacity-15 lg:text-lg lg:w-[20%] lg:justify-center lg:mx-2 lg:px-4 2xl:text-lg 2xl:w-[20%] 2xl:justify-center 2xl:mx-2 2xl:px-3"
            >
              {route === "browse" && showGbtSearch ? (
                lang[langType].home
              ) : (
                <>
                  {lang[langType].ai}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-white cursor-pointer mx-1 text-sm lg:mx-2 lg:text-md 2xl:mx-2 2xl:text-md my-1"
                  />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-16 h-[70%] text-white text-xs ml-6 rounded-md cursor-pointer lg:text-md lg:ml-5 2xl:w-[25%] 2xl:text-md 2xl:ml-5"
              style={{ backgroundColor: "#ff0000" }}
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
