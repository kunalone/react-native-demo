import _ from 'lodash';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import WebView from 'react-native-webview';
import dashCustomHook from './dashCustomHook';

function Dashboard() {
  const [
    loading,
    search,
    gif,
    setSearchText,
    handleNewImages,
    delayedQuery,
    resetView,
  ] = dashCustomHook();

  return (
    <SafeAreaView style={styles.baseColumncontainer}>
      <View style={styles.titleRow}>
        <Text style={[styles.sectionTitle]}> Demo</Text>
        {loading ? <ActivityIndicator size="large" color="#131413" /> : null}
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={text => {
          setSearchText(text);
          delayedQuery(text);
        }}
        onTouchCancel={() => {
          resetView();
        }}
        value={search}
      />
      {gif != undefined && gif.length > 2 ? (
        <FlatList
          style={styles.listView}
          data={gif}
          onEndReached={handleNewImages}
          renderItem={({item}) => (
            <WebView style={styles.image} source={{uri: item.embed_url}} />
          )}
          keyExtractor={item => item.id}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-between',
  },
  listView: {
    flexGrow: 1,
  },
  image: {
    height: 180,
  },
  baseColumncontainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 10,
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
