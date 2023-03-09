import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationFunctionComponent} from 'react-native-navigation';
import {Provider} from 'react-redux';

import UsersList from './components/UsersList';
import {store} from '../../app/store';

const Home: NavigationFunctionComponent = ({componentId}) => (
    <Provider store={store}>
        <SafeAreaView style={styles.root}>
            <UsersList componentId={componentId} />
        </SafeAreaView>
    </Provider>
);

const styles = StyleSheet.create({root: {flex: 1}});

export default Home;
