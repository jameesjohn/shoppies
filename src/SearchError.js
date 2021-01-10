function SearchError({ errorMessage, searchParam }) {
  return (
    <div className="box" style={{ border: 'solid 1px red' }}>
      <p>
        Something went wrong while searching for{' '}
        <strong>"{searchParam}"</strong>: <strong>{errorMessage}</strong>
      </p>
      <p>Try changing the search parameters.</p>
    </div>
  );
}

export default SearchError;
