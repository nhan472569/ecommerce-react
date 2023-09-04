import { useState, useCallback } from 'react';
import axios from 'axios';
import environment from '../environment';

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + getCookie('jwt'),
  }
});

const useHttp = applyData => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async requestConfig => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance[
          `${requestConfig.method || 'get'}`
        ](
          `${environment.SERVICE_URL }${environment.VERSION}/${requestConfig.url}`,
          requestConfig?.body
        );
        if (
          response.status.toString().startsWith('2') ||
          response.status.toString().startsWith('3')
        ) {
          const data = response.data;
          // console.log(data);
          applyData(data);
        } else {
          setError(response?.data?.message || 'Fail to send request!');
        }
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || 'Something went wrong!'
        );
      }
      setIsLoading(false);
    },
    [applyData]
  );

  // console.log({
  //   isLoading: isLoading,
  //   error: error,
  //   sendRequest: sendRequest,
  // });

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
