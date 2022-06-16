import axios from 'axios';
import _, {List} from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Searchbar} from 'react-native-paper';
import WebView from 'react-native-webview';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {fetchGifsFailure, fetchGifsSuccess, resetGifsView} from './actions';
import {Keyboard} from 'react-native';

var delayInMilliseconds = 2000;

const APIKEY = 'BvFV6zTeyxB9U8Y4SZsxL0Hn3MmHkuXq';

interface GifState {
  loading: boolean;
  gif: any[];
  error: string;
  currentPages: number;
  totalPages: number;
}

function Dashboard() {
  const loading = useSelector<GifState, boolean>(state => state.loading);
  const gif = useSelector<GifState, any[]>(state => state.gif);
  const error = useSelector<GifState, string>(state => state.error);
  const currentPages = useSelector<GifState, number>(
    state => state.currentPages,
  );
  const totalPages = useSelector<GifState>(state => state.totalPages);

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const searchString = useRef('');

  const delayedQuery = useCallback(
    _.debounce(async q => {
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

  return (
    <SafeAreaView style={styles.baseColumncontainer}>
      <Text style={[styles.sectionTitle]}>Demo</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={text => {
          setSearch(text);
          delayedQuery(text);
        }}
        onTouchCancel={() => {
          dispatch(resetGifsView());
        }}
        value={search}
      />
      {gif != undefined && gif.length > 2 ? (
        <FlatList
          style={styles.listView}
          data={gif}
          onEndReached={handleNewImages}
          renderItem={({item, index, separators}) => (
            <WebView style={styles.image} source={{uri: item.embed_url}} />
          )}
          keyExtractor={item => item.id}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listView: {
    flexGrow: 1,
  },
  image: {
    height: 180,
  },
  baseColumncontainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    margin: 2,
  },
  sectionTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default Dashboard;
