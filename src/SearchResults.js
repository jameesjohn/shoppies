import './SearchResults.css';

function SearchResults({ searchParam, results, nominations, addNomination }) {
  return (
    <div className="SearchResult box">
      {searchParam ? (
        <h4>Showing results for "{searchParam}"</h4>
      ) : (
        <p>Start typing to search for movies...</p>
      )}

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
