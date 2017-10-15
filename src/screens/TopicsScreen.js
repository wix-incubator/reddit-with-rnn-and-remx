/**
 * Created by levv on 12/10/2017.
 */
import React, { Component } from 'react';
import {connect} from 'remx/react-native';
import * as store from '../stores/topics/store';
import * as topicsActions from '../stores/topics/actions';
import ReactNative, {
    Text,
    StyleSheet,
    ListView,
    Image,
    TouchableOpacity
} from 'react-native';

class TopicsScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        topicsActions.fetchTopics();
    }


    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const data = ds.cloneWithRows(this.props.topics);
        return (
            <ListView dataSource={data} enableEmptySections
                      renderRow={this._renderRow.bind(this)}>
            </ListView>
        );
    }

    _renderRow(topic) {
        return (
            <TouchableOpacity style={{backgroundColor: 'lightgray', height: 50, justifyContent: 'center', alignItems: 'center', margin: 5}}
                              onPress={this._showTopic.bind(this, topic)}>
                <Text>{topic.name}</Text>

            </TouchableOpacity>
        );
    }


    _showTopic(topic){
        topicsActions.setSelectedTopic(topic);
        this.props.navigator.push({
            screen: 'example.PostsScreen',
            passProps: {topic}
        });
    }
}

// which props do we want to inject, given the global store state?
function mapStateToProps(ownProps) {
    return {
        topics: store.getters.getTopics(),
        isLoading: store.getters.isLoading()
};
}

export default connect(mapStateToProps)(TopicsScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green'
    }
});
