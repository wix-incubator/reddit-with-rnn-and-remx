/**
 * Created by levv on 13/10/2017.
 */
import React, { Component} from 'react';
import { StyleSheet, ListView, TouchableOpacity } from 'react-native';
import {
    Text,
    View,
    Button,
    TextInput,
    Image
} from 'react-native';

import * as postsStore from '../stores/posts/store';
import * as postsActions from '../stores/posts/actions';
import {connect} from 'remx/react-native';

class PostsScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        postsActions.fetchPosts(this.props.topic.url);
    }

    render() {
        if (!this.props.posts) {
            return (
                <View></View>
            );
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = ds.cloneWithRows(this.props.posts);

        return (
            <ListView dataSource={data} enableEmptySections
                      renderRow={this._renderRow.bind(this)}>
            </ListView>
        );
    }

    _renderRow(post) {
        return (
        <TouchableOpacity>
            <View style={styles.row}>
                <Image style={styles.thumb} source={{uri: post.thumbnail}} />
                <Text>style={styles.text} {post.title}</Text>
            </View>
            <View style={styles.separator} />
        </TouchableOpacity>
        );
    }

}



function mapStateToProps(ownProps) {
    return {
        posts: postsStore.getters.getPosts()
    };
}

export default connect(mapStateToProps)(PostsScreen);


var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F6F6F6',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
    thumb: {
        width: 100,
        height: 100,
    },
    text: {
        flex: 1,
    },
});