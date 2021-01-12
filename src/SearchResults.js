import Loader from './Loader';
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
      <ul className="movieList">
        {results.map((result) => (
          <li key={result.imdbID}>
            <span className="title">
              <strong>Title</strong>: {result.Title}
            </span>
            <span>
              <strong>Year Released</strong>: {result.Year}
            </span>
            <button
              className="nominate"
              disabled={nominations.find(
                (nomination) => nomination.imdbID === result.imdbID
              )}
              onClick={(e) => addNomination(result)}
            >
              Nominate
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
