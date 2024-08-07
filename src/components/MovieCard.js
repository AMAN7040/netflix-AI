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

  const handleRoute = () => {
    dispatch(updateRoute(`choose/${id}`));
    navigate(`/choose/${id}`);
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
      className="relative w-72 mx-auto my-6 rounded-sm border border-red-700 hover:scale-105 md:w-56 md:mx-6 md:my-6 lg:w-62 lg:mx-4 lg:my-4 2xl:w-44 2xl:mx-5 2xl:my-5"
      onClick={handleRoute}
    >
      <Link to={`/choose/${id}`}>
        <img src={IMG_URL + poster_path} alt="MOVIE_img" className="w-full h-auto object-cover" />
      </Link>
      <button
        onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
        className={`absolute right-0 z-30 -top-3 p-0 text-2xl font-semibold border border-solid ${
          isInWishlist ? "bg-red-500 text-white lg:text-2xl lg:-top-4 2xl:text-4xl 2xl:-top-5" : "bg-green-500 text-white lg:text-2xl lg:-top-4 2xl:text-4xl border border-solid 2xl:-top-5"
        }`}
      >
        {isInWishlist ? "-" : "+"}
      </button>
    </div>
  );
};

export default MovieCard;
