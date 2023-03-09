/**
 * @format
 */
import React from 'react';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';

import {store} from './src/app/store';
import Home from './src/screens/Home';
import User from './src/screens/User';

Navigation.registerComponent(
    'Home',
    () => props =>
        (
            <Provider store={store}>
                <Home {...props} />
            </Provider>
        ),
    () => Home,
);
Navigation.registerComponent(
    'User',
    () => props =>
        (
            <Provider store={store}>
                <User {...props} />
            </Provider>
        ),
    () => User,
);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'Home',
                        },
                    },
                ],
            },
        },
    });
});
