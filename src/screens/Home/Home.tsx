import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import UsersList from './components/UsersList';
import {store} from '../../app/store';

const Home = () => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UsersList />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;
