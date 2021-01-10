import './App.css';
import Search from './Search';
import SearchResults from './SearchResults';
import Nominations from './Nominations';
import SearchError from './SearchError';
import { useEffect, useState } from 'react';

/**
 *
 * @param {Function} cb Function to be run subsequently
 * @param {number} duration Delay
 */
function debounce(cb, duration) {
  let timeout;

  return (...args) => {
    const debounced = () => {
      clearTimeout(timeout);
      cb(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(debounced, duration);
  };
}

function App() {
  const [searchParam, setSearchParam] = useState('');
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    if (!searchParam) {
      return;
    }
    const url = new URL('http://www.omdbapi.com/');
    url.searchParams.append('apikey', '98dfdc18');
    url.searchParams.append('type', 'movie');
    url.searchParams.append('s', searchParam.trim());

    setSearchError('');

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.Response === 'True') {
          setResults(response.Search);
        } else {
          setSearchError(response.Error);
        }
      });
  }, [searchParam]);

  let successBanner;
  if (nominations.length >= 5) {
    successBanner = (
      <p className="banner">
        You have successfully nominated {nominations.length} movies!
      </p>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>The Shoppies</h1>
      </header>
      <main>
        <Search setSearchParam={debounce(setSearchParam, 300)}></Search>

        {successBanner}

        {Boolean(searchError) ? (
          <SearchError
            errorMessage={searchError}
            searchParam={searchParam}
          ></SearchError>
        ) : (
          <SearchResults
            searchParam={searchParam}
            results={results}
            nominations={nominations}
            addNomination={(nomination) => {
              nominations.push(nomination);
              setNominations([...nominations]);
            }}
          ></SearchResults>
        )}

        <Nominations
          nominations={nominations}
          removeNomination={(nomination) => {
            const remainingNominations = nominations.filter(
              (item) => item !== nomination
            );
            setNominations([...remainingNominations]);
          }}
        ></Nominations>
      </main>
    </div>
  );
}

export default App;
