import {useEffect, useState} from 'react';
import apiClient from '../services/apiClient';

// custom hook for handling the api requests.
const useRequestHook = (url: string) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient('GET', url)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, isLoading, error];
};

export default useRequestHook;
