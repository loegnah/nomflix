import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

const TVContainer = () => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTVData = async () => {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setState({ topRated, popular, airingToday });
      } catch {
        setError("Can't find TV information.");
      } finally {
        setLoading(false);
      }
    };
    getTVData();
  }, []);

  return <TVPresenter {...state} error={error} loading={loading} />;
};

export default TVContainer;
