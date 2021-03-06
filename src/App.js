import './App.css';
import Search from './Search';
import SearchResults from './SearchResults';
import Nominations from './Nominations';
import SearchError from './SearchError';
import { useEffect, useState } from 'react';
import { storeNomination, getAllNominations, deleteNomination } from './IDBApi';

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
  const [searching, setSearching] = useState(false);
  const [nominations, setNominations] = useState([]);

  useEffect(() => {
    getAllNominations().then((nominations) => setNominations(nominations));
  }, []);

  useEffect(() => {
    setSearchError('');
    setResults([]);

    if (!searchParam) {
      return;
    }

    const url = new URL('https://www.omdbapi.com/');
    url.searchParams.append('apikey', process.env.REACT_APP_OMDB_API_KEY);
    url.searchParams.append('type', 'movie');
    url.searchParams.append('s', searchParam.trim());
    setSearching(true);

    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error('Unable to complete request.');
      })
      .then((response) => {
        if (response.Response === 'True') {
          setResults(response.Search);
        } else {
          setSearchError(response.Error);
        }
        setSearching(false);
      })
      .catch((error) => {
        if (error instanceof DOMException) {
          // The request got cancelled.
          return;
        } else {
          setSearchError(error.message);
          setSearching(false);
        }
      });

    return () => {
      controller.abort();
    };
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
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/jameesjohn/shoppies"
        >
          Link to Source Code
        </a>
        <Search setSearchParam={debounce(setSearchParam, 100)}></Search>

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
            searching={searching}
            addNomination={(nomination) => {
              nominations.push(nomination);
              setNominations([...nominations]);
              storeNomination(nomination);
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
            deleteNomination(nomination);
          }}
        ></Nominations>
      </main>
    </div>
  );
}

export default App;
