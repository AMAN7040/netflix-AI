import { useState, useEffect } from 'react';

const useRandomMovie = (movies) => {
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies]);

  return { randomMovie };
};

export default useRandomMovie;
