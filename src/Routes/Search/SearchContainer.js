import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

const SearchContainer = () => {
  const [state, setState] = useState({
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    loading: false,
    error: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = state;
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    setState({
      searchTerm: value,
    });
  };

  const searchByTerm = async () => {
    const { searchTerm } = state;
    setState({ loading: true });
    try {
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      setState({
        movieResults,
        tvResults,
      });
    } catch {
      setState({ error: "Can't find results." });
    } finally {
      setState({ loading: false });
    }
  };

  return (
    <SearchPresenter
      {...state}
      handleSubmit={this.handleSubmit}
      updateTerm={this.updateTerm}
    />
  );
};

export default SearchContainer;
