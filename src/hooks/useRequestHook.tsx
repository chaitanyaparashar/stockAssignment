import {useEffect, useState} from 'react';
import apiClient from '../services/apiClient';

// custom hook for handling the api requests.

function useRequestHook<T>(methodType: string, url: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiClient(methodType, url)
      .then(data => {
        setData(data as T);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error];
}

export default useRequestHook;
