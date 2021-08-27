import React, { useState, useEffect } from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "../../api";

const TVContainer = () => {
  const [state, setState] = useState({
    topRated: null,
    popular: null,
    airingToday: null,
    loading: true,
    error: null,
  });

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
        setState({
          error: "Can't find TV information.",
        });
      } finally {
        setState({ loading: false });
      }
    };
    getTVData();
  }, []);

  return <TVPresenter {...state} />;
};

export default TVContainer;
