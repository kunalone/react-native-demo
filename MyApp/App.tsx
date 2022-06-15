/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import _ from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Searchbar} from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

var delayInMilliseconds = 4000;

const Section: React.FC<{
  title: string;
  children: JSX.Element | JSX.Element[] | string | string[];
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const delayedQuery = useCallback(
    _.debounce(q => console.log('working now at all'), 3000),
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
};

const styles = StyleSheet.create({
  baseColumncontainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    flex: 1,
    margin: 2,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
