import React from 'react';
import apiStates from './apiStates'

export const useDiscoverMovies = () => {
  const [data, setData] = React.useState({
    state: apiStates.LOADING,
    error: '',
    data: [],
  });
  
  React.useEffect(() => {
    setData({
      state: apiStates.LOADING,
    });
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then((response) => response.json())
      .then((data) => {
        setData({
          state: apiStates.SUCCESS,
          data
        });
      })
      .catch(() => {
        setData({
          state: apiStates.ERROR,
          error: 'fetch failed'
        });
      });
  }, []);

  return data;
};

export default useDiscoverMovies