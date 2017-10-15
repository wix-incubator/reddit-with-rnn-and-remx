/**
 * Created by levv on 12/10/2017.
 */
import {Navigation} from 'react-native-navigation';
import TopicsScreen from './TopicsScreen';
import PostsScreen from './PostsScreen';


export function registerScreens() {
    Navigation.registerComponent('example.TopicsScreen', () => TopicsScreen);
    Navigation.registerComponent('example.PostsScreen', () => PostsScreen);
}


