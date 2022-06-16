export const START_FETCH_GIFS_REQUESTED = 'START_FETCH_GIFS_REQUESTED';
export const FETCH_GIFS_REQUESTED = 'FETCH_GIFS_REQUESTED';
export const RESET_GIFS_REQUESTED = 'RESET_GIFS_REQUESTED';
export const FETCH_GIFS_SUCCEEDED = 'FETCH_GIFS_SUCCEEDED';
export const FETCH_GIFS_FAILED = 'FETCH_GIFS_FAILED';

export const resetGifsView = () => {
  return {
    type: RESET_GIFS_REQUESTED,
  };
};

export const resetGifLoading = () => {
  return {
    type: FETCH_GIFS_REQUESTED,
  };
};

export const startFetchGifsRequest = (searchText: string) => {
  return {
    type: START_FETCH_GIFS_REQUESTED,
    payload: searchText,
  };
};

export const fetchGifsSuccess = (gif: any) => {
  return {
    type: FETCH_GIFS_SUCCEEDED,
    payload: gif,
  };
};

export const fetchGifsFailure = (error: any) => {
  return {
    type: FETCH_GIFS_FAILED,
    payload: error,
  };
};
