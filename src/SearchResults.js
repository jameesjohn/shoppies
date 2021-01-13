import Loader from './Loader';
import MovieList from './MovieList';
import './SearchResults.css';

function SearchResults({
  searchParam,
  results,
  nominations,
  searching,
  addNomination,
}) {
  let heading = <p>Start typing to search for movies...</p>;
  let loader = '';
  if (searching) {
    heading = <h4>Fetching results for "{searchParam}"...</h4>;
    loader = <Loader></Loader>;
  } else if (searchParam) {
    heading = <h4>Showing results for "{searchParam}"</h4>;
  }

  return (
    <div className="SearchResult box">
      {heading}
      {loader}
      <MovieList
        movies={results}
        btnAction={addNomination}
        btnText="Nominate"
        btnClass="nominate"
        btnDisabled={(movie) =>
          nominations.length > 4 ||
          nominations.some((nomination) => nomination.imdbID === movie.imdbID)
        }
      />
    </div>
  );
}

export default SearchResults;
