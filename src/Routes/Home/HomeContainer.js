import React, { useEffect, useState } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

const HomeContainer = () => {
  const [state, setState] = useState({
    nowPlaying: null,
    upcoming: null,
    popular: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setState((preState) => ({
          nowPlaying,
          upcoming,
          popular,
        }));
      } catch (error) {
        setError("Can't find movie information.");
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, []);

  return <HomePresenter {...state} error={error} loading={loading} />;
};

export default HomeContainer;
