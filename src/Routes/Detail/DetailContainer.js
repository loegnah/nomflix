import React, { useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi, tvSeasonApi } from "../../api";

const DetailContainer = (props) => {
  const [result, setResult] = useState(null);
  const [seasonData, setSeasonData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetailData = async () => {
      const isMovie = props.location.pathname.includes("/movie/");
      const {
        match: {
          params: { id },
        },
        history: { push },
      } = props;

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return push("/");
      }

      let resultData = null;
      try {
        if (isMovie) {
          ({ data: resultData } = await moviesApi.movieDetail(parsedId));
        } else {
          ({ data: resultData } = await tvApi.showDetail(parsedId));
          if (resultData.seasons && resultData.seasons.length > 0) {
            setSeasonData(
              await Promise.all(
                resultData.seasons.map((s) =>
                  tvSeasonApi.getDetail(parsedId, s.season_number)
                )
              )
            );
          }
        }
      } catch {
        setError("Can't find anything.");
      } finally {
        setResult(resultData);
        setLoading(false);
      }
    };

    getDetailData();
  }, [props]);

  return (
    <DetailPresenter
      result={result}
      error={error}
      loading={loading}
      seasonData={seasonData}
    />
  );
};

export default DetailContainer;
