import React, { useMemo } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);

  const initialForm = {
    searchText: q,
  };
  const [formValues, handleInputChange] = useForm(initialForm);
  const { searchText } = formValues;
  const heroesFilter = useMemo(() => getHeroesByName(q), [q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`?q=${searchText}`);
  };

  return (
    <div className="container">
      <h1>SearchScreen</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Search Form</h4>
          <hr />

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="searchText"
              placeholder="find your hero"
              className="form-control"
              value={searchText}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="btn m-1 btn-block btn-outline-primary"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col">
          <h4>Results</h4>
          <hr />

          {q === "" && <div id="divBuscaAlgo" className="alert alert-info">Search a hero</div>}

          {q !== "" && heroesFilter.length === 0 && (
            <div id="divNoExiste" className="alert alert-danger">
              There is no a hero with {q}
            </div>
          )}

          {heroesFilter.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </div>
  );
};
