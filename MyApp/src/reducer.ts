import {
  FETCH_GIFS_FAILED,
  FETCH_GIFS_REQUESTED,
  FETCH_GIFS_SUCCEEDED,
  RESET_GIFS_REQUESTED,
} from './actions';

const initialState = {
  loading: false,
  gif: [],
  error: '',
  currentPages: 0,
  totalPages: 0,
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

export default reducer;
