const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
import {combineReducers} from 'redux';

const initialState = {
  loading: false,
  gif: [],
  error: '',
  currentPages: 0,
  totalPages: 0,
};

const START_FETCH_GIFS_REQUESTED = 'START_FETCH_GIFS_REQUESTED';
const FETCH_GIFS_REQUESTED = 'FETCH_GIFS_REQUESTED';
const RESET_GIFS_REQUESTED = 'RESET_GIFS_REQUESTED';
const FETCH_GIFS_SUCCEEDED = 'FETCH_GIFS_SUCCEEDED';
const FETCH_GIFS_FAILED = 'FETCH_GIFS_FAILED';

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

const reducer = (state = initialState, action: {type: any; payload: any}) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_GIFS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_GIFS_SUCCEEDED:
      let gifsArray = state.gif.concat(action.payload.gifs);
      return {
        loading: false,
        gif: gifsArray,
        error: '',
        currentPages: gifsArray.length,
        totalPages: action.payload.totalCount,
      };
    case FETCH_GIFS_FAILED:
      return {
        loading: false,
        gif: [],
        error: action.payload,
        currentPages: 0,
        totalPages: 0,
      };
    case RESET_GIFS_REQUESTED:
      return {
        loading: false,
        gif: [],
        error: '',
        currentPages: 0,
        totalPages: 0,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
