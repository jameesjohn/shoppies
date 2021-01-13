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
    fetch(url)
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
      })
      .catch((error) => {
        setSearchError(error.message);
      })
      .finally(() => {
        setSearching(false);
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
