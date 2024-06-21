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
      className="relative w-44 m-3 rounded-sm border border-red-700 hover:scale-105"
    >
      <Link to={`/choose/${id}`}>
        <img src={IMG_URL + poster_path} alt="MOVIE_img" />
      </Link>
      {isInWishlist ? (
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute right-0 z-30 -top-5 p-0 bg-red-500 text-white font-semibold text-4xl border border-solid"
        >
          -
        </button>
      ) : (
        <button
          onClick={handleAddToWishlist}
          className="absolute right-0 z-30 -top-5 p-0 bg-green-500 text-white font-semibold text-4xl border border-solid"
        >
          +
        </button>
      )}
    </div>
  );
};

export default MovieCard;
