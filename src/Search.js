import './Search.css';

function Search({ setSearchParam }) {
  return (
    <div className="Search box">
      <label htmlFor="searchInput">Movie Title</label>
      <input
        id="searchInput"
        type="search"
        onInput={(e) => {
          setSearchParam(e.target.value);
        }}
        autoFocus
      />
    </div>
  );
}

export default Search;
