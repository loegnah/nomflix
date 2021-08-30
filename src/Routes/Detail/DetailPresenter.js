import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import { noPosterSmall } from "assets";
import Videos from "Components/Videos";
import ScrollContainer from "react-indiana-drag-scroll";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 30px 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  margin: 10px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
  width: 50%;
`;

const Imdb = styled(Link)`
  background-color: #f5c518;
  color: black;
  padding: 2px 2px;
  font-size: 10px;
  font-weight: 700;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 170px;
  width: 100%;
  gap: 40px;
  padding: 10px;
`;

const ContainerTitle = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  font-weight: 600;
  font-size: 20px;
`;

const ScrollContainerBox = styled(ScrollContainer)`
  &:hover {
    background-color: rgba(00, 00, 00, 0.2);
  }
  transition: 0.5s;
`;

const SeasonPosterContainer = styled.div`
  display: flex;
  height: 170px;
  width: 100%;
  padding: 10px;
  gap: 20px;
`;
// prettier-ignore
const SeasonPoster = styled.div`
  width: 120px;
  height: 100%;
  
  background-image: url(https://image.tmdb.org/t/p/w200${(props) => props.bgImage});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 5px;
  flex-shrink: 0;
`;

const DetailPresenter = ({ result, seasonData, loading, error }) =>
  error ? (
    { error }
  ) : loading ? (
    <>
      <Helmet>
        <title>Loading | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Nomflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path &&
          `https://image.tmdb.org/t/p/original${result.backdrop_path}`
        }
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : noPosterSmall
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            {(result.release_date || result.first_air_date) && (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.release_date
                    ? result.release_date.substring(0, 4)
                    : result.first_air_date.substring(0, 4)}
                </Item>
              </>
            )}
            {(result.runtime ||
              (result.episode_run_time &&
                result.episode_run_time.length > 0)) && (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.runtime ? result.runtime : result.episode_run_time[0]}
                  {" min"}
                </Item>
              </>
            )}
            {result.genres && (
              <>
                <Divider>•</Divider>
                <Item>
                  {result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
                </Item>
              </>
            )}
            {result.imdb_id && (
              <>
                <Divider>•</Divider>
                <Imdb
                  to={{
                    pathname: `https://www.imdb.com/title/${result.imdb_id}`,
                  }}
                  target="_blank"
                >
                  IMDb
                </Imdb>
              </>
            )}
          </ItemContainer>
          <ItemContainer>
            {result.production_countries &&
              result.production_countries.length > 0 && (
                <>
                  <Divider>•</Divider>
                  <Item>
                    {result.production_countries.map((country, index) =>
                      index === result.production_countries.length - 1
                        ? country.name
                        : `${country.name} / `
                    )}
                  </Item>
                </>
              )}
            {result.production_companies &&
              result.production_companies.length > 0 && (
                <>
                  <Divider>•</Divider>
                  <Item>{result.production_companies[0].name}</Item>
                </>
              )}
          </ItemContainer>
          {result.overview && <Overview>{result.overview}</Overview>}
          {result.videos.results.length > 0 && (
            <>
              <ContainerTitle>Videos</ContainerTitle>
              <ScrollContainerBox
                vertical="false"
                activationDistance="0.1"
                backgroundColor="rgba(00,00,00,0.5)"
              >
                <VideoContainer>
                  {result.videos.results.map((r) => (
                    <Videos result={r} key={r.id} />
                  ))}
                </VideoContainer>
              </ScrollContainerBox>
            </>
          )}
          {seasonData.length > 0 && (
            <>
              <ContainerTitle>Seasons</ContainerTitle>
              <ScrollContainerBox
                vertical="false"
                activationDistance="0.1"
                backgroundColor="rgba(00,00,00,0.5)"
              >
                <SeasonPosterContainer>
                  {seasonData.map((s) => (
                    <SeasonPoster
                      bgImage={s.data.poster_path}
                      key={s.data._id}
                    />
                  ))}
                </SeasonPosterContainer>
              </ScrollContainerBox>
            </>
          )}
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  seasonData: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default DetailPresenter;
