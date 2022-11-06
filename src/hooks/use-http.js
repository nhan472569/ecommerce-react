import { useState, useCallback } from 'react';
import axios from 'axios';
import environment from '../environment';

const useHttp = aplyData => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async requestConfig => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios[`${requestConfig.method || 'get'}`](
          `${environment.DOMAIN}/api/${environment.VERSION}/${requestConfig.url}`,
          requestConfig?.body
        );
        if (response.statusText === 'OK') {
          const data = response.data.data.data;
          console.log(data);
          aplyData(data);
        } else {
          throw new Error('Fail to send request.');
        }
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [aplyData]
  );

  console.log({
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  });

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
