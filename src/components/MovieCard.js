import React from "react";
import { IMG_URL } from "../utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoute } from "../utils/routeSlice";
import { addToRecentlyViewed } from "../utils/userSlice";
import { addToWishlist, removeFromWishlist } from "../utils/wishListSlice";

const MovieCard = ({ id, poster_path, movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInWishlist = useSelector((state) =>
    state.wishlist.items.some((item) => item.id === id)
  );

  const handleRoute = (e) => {
    dispatch(updateRoute(e));
    navigate("/" + e);
    dispatch(addToRecentlyViewed(movie));
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    dispatch(addToWishlist({ id, movie }));
  };

  const handleRemoveFromWishlist = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent div
    dispatch(removeFromWishlist(id));
  };

  if (!poster_path) return null;
  return (
    <div
      onClick={() => handleRoute(`choose/${id}`)}
      className="relative w-72 m-8 rounded-sm border border-red-700 hover:scale-105 2xl:w-44 2xl:m-5"
    >
      <Link to={`/choose/${id}`}>
        <img src={IMG_URL + poster_path} alt="MOVIE_img" />
      </Link>
      {isInWishlist ? (
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute right-0 z-30 -top-3 p-0 bg-red-500 text-white font-semibold text-2xl border border-solid 2xl:text-4xl 2xl:-top-5"
        >
          -
        </button>
      ) : (
        <button
          onClick={handleAddToWishlist}
          className="absolute right-0 z-30 -top-3 p-0 bg-green-500 text-2xl text-white font-semibold 2xl:text-4xl border border-solid 2xl:-top-5  2xl:4xl"
        >
          +
        </button>
      )}
    </div>
  );
};

export default MovieCard;
