const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
import {AnyAction, combineReducers} from 'redux';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

export const fetchUsersSuccess = (users: any) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

export const fetchUsersFailure = (error: any) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

export const fetchGifs = () => {
  return function (dispatch: any) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response: any) => {
        // response.data is the users
        const users = response.data.map((user: {id: any}) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error: {message: any}) => {
        // error.message is the error message
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

const reducer = (state = initialState, action: {type: any; payload: any}) => {
  console.log(action.type);
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const allReducers = combineReducers({reducer: reducer});

export const store = createStore(allReducers, applyMiddleware(thunkMiddleware));

store.dispatch(fetchGifs());
