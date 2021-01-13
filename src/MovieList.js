function getPoster(movie) {
  const defaultPoster =
    'https://img.icons8.com/carbon-copy/200/000000/no-image.png';

  if (movie.Poster === 'N/A') {
    return `url(${defaultPoster})`;
  }
  return `url(${movie.Poster})`;
}

function MovieList({
  movies,
  btnText,
  btnAction,
  btnDisabled = () => false,
  btnClass,
}) {
  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <div
            className="image"
            style={{ backgroundImage: getPoster(movie) }}
          ></div>

          <div className="details">
            <span>{movie.Title}</span>
            <span className="year">{movie.Year}</span>
            <button
              onClick={(e) => btnAction(movie)}
              disabled={btnDisabled(movie)}
              className={btnClass}
            >
              {btnText}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
