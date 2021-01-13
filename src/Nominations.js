import MovieList from './MovieList';

function Nominations({ nominations, removeNomination }) {
  let nominationMessage;
  if (nominations.length === 0) {
    nominationMessage = <p>You are yet to make any nomination.</p>;
  } else {
    nominationMessage = (
      <p>Nominations are stored after you've left the page.</p>
    );
  }
  return (
    <div className="box">
      <h4>Nominations</h4>
      {nominationMessage}
      <MovieList
        movies={nominations}
        btnAction={removeNomination}
        btnClass="remove"
        btnText="Remove Nomination"
        // btnStyle={{ }}
      />
    </div>
  );
}
export default Nominations;
