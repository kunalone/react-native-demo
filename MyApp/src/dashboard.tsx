import _ from 'lodash';
import React, {useCallback, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Searchbar} from 'react-native-paper';

var delayInMilliseconds = 4000;

function Dashboard() {
  const [search, setSearch] = useState('');
  const delayedQuery = useCallback(
    _.debounce(q => console.log('working now at all'), delayInMilliseconds),
    [],
  );
  return (
    <SafeAreaView style={styles.baseColumncontainer}>
      <Text style={[styles.sectionTitle]}>Demo</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={text => {
          setSearch(text);
          delayedQuery(text);
        }}
        value={search}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default dashboard;
