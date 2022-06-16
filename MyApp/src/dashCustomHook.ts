import axios from 'axios';
import _ from 'lodash';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetGifLoading,
  fetchGifsFailure,
  fetchGifsSuccess,
  resetGifsView,
} from './actions';

interface GifState {
  loading: boolean;
  gif: any[];
  error: string;
  currentPages: number;
  totalPages: number;
}

var delayInMilliseconds = 2000;

const APIKEY = 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq';

function dashCustomHook() {
  const loading = useSelector<GifState, boolean>(state => state.loading);
  const gif = useSelector<GifState, any[]>(state => state.gif);
  const currentPages = useSelector<GifState, number>(
    state => state.currentPages,
  );

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const searchString = useRef('');
  const delayedQuery = useCallback(
    _.debounce(async q => {
      let finalSearch = searchString.current.trim();
      if (finalSearch.length > 3) {
        dispatch(resetGifLoading());
        let response = await getQuestionnaireEachById(
          finalSearch,
          currentPages,
        ).catch(error => {
          Keyboard.dismiss();
          dispatch(fetchGifsFailure(error.data));
        });

        Keyboard.dismiss();
        dispatch(
          fetchGifsSuccess({
            gifs: response.data,
            totalCount: response.pagination.totalCount,
          }),
        );
      } else {
        dispatch(resetGifsView());
      }
    }, delayInMilliseconds),
    [],
  );

  const handleNewImages = async () => {
    let finalSearch = searchString.current.trim();
    if (finalSearch.length > 3) {
      let response = await getQuestionnaireEachById(
        finalSearch,
        currentPages,
      ).catch(error => {
        Keyboard.dismiss();
        dispatch(fetchGifsFailure(error.data));
      });

      Keyboard.dismiss();
      dispatch(
        fetchGifsSuccess({
          gifs: response.data,
          totalCount: response.pagination.totalCount,
        }),
      );
    }
  };

  function getQuestionnaireEachById(searchString: string, lastIndex: number) {
    return new Promise<void | any>((resolve, _reject) => {
      axios
        .get(
          'https://api.giphy.com/v1/gifs/search?api_key=' +
            APIKEY +
            '&limit=15&q=' +
            searchString +
            '&offset=' +
            lastIndex,
        )
        .then(function ({data}) {
          resolve(data);
        })
        .catch(function (error) {
          throw error.message;
        });
    });
  }

  useEffect(() => {
    if (search.trim().length == 0) {
      dispatch(resetGifsView());
    }
    searchString.current = search;
  }, [search]);

  const setSearchText = (text: string) => {
    setSearch(text);
  };

  const resetView = () => {
    dispatch(resetGifsView());
  };

  return [
    loading,
    search,
    gif,
    setSearchText,
    handleNewImages,
    delayedQuery,
    resetView,
  ] as const;
}

export default dashCustomHook;
