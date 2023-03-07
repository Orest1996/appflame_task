/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import Home from './src/screens/Home';

Navigation.registerComponent('Home', () => Home);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: 'Home',
            },
        },
    });
});
