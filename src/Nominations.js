function Nominations({ nominations, removeNomination }) {
  let emptyNomination;
  if (nominations.length === 0) {
    emptyNomination = <p>You are yet to make any nomination.</p>;
  }
  return (
    <div className="box">
      <h4>Nominations</h4>
      {emptyNomination}
      <ul className="movieList">
        {nominations.map((nomination) => (
          <li key={nomination.imdbID}>
            <span className="title">
              <strong>Title</strong>: {nomination.Title}
            </span>
            <span>
              <strong>Year Released</strong>: {nomination.Year}
            </span>
            <button
              className="nominate"
              onClick={(e) => removeNomination(nomination)}
            >
              Remove Nomination
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Nominations;
