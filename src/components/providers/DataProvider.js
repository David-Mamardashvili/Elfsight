import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DataContext = createContext({});

export function DataProvider({ children }) {
  const API_BASE_URL = 'https://rickandmortyapi.com/api/character';
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [species, setSpecies] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [apiURL, setApiURL] = useState();
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: null,
    status: null,
    species: null,
    type: null,
    gender: null
  });
  const location = useLocation();
  const locationSearch = new URLSearchParams(location.search);

  const prevHandle = () => {
    if (info?.prev) {
      setApiURL(info.prev);
      setActivePage(activePage - 1);
      const prevUrl = info.prev.split('?');
      window.history.pushState({}, '', '?' + prevUrl[1]);
    }
  };

  const nextHandle = () => {
    if (info?.next) {
      setApiURL(info.next);
      setActivePage(activePage + 1);
      const nextUrl = info.next.split('?');
      window.history.pushState({}, '', '?' + nextUrl[1]);
    }
  };

  useEffect(() => {
    if (
      locationSearch.get('page') &&
      !isNaN(locationSearch.get('page')) &&
      +locationSearch.get('page') !== 0
    ) {
      setApiURL(API_BASE_URL + '/?' + locationSearch.toString());
      window.history.pushState({}, '', '?' + locationSearch.toString());
      setActivePage(+locationSearch.get('page'));
    } else {
      locationSearch.set('page', 1);
      window.history.pushState({}, '', '?' + locationSearch.toString());
      setApiURL(API_BASE_URL + '/?' + locationSearch.toString());
      setActivePage(1);
    }
  }, []);

  useEffect(() => {
    setName(locationSearch.get('name') || '');
    setStatus(locationSearch.get('status') || '');
    setSpecies(locationSearch.get('species') || '');
    setType(locationSearch.get('type') || '');
    setGender(locationSearch.get('gender') || '');
  }, [location.search]);

  useEffect(() => {
    if (apiURL) {
      fetchData(apiURL);
    }
  }, [apiURL]);

  const fetchData = async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
      setIsFetching(false);
    } catch (e) {
      setIsError(true);
      setIsFetching(false);
      console.error(e);
    }
  };

  const dataValue = useMemo(
    () => ({
      API_BASE_URL,
      name,
      setName,
      status,
      setStatus,
      species,
      setSpecies,
      type,
      setType,
      gender,
      setGender,
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info,
      filters,
      setFilters,
      locationSearch,
      prevHandle,
      nextHandle
    }),
    [activePage, apiURL, characters, isFetching, isError, info]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
