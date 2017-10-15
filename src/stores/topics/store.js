/**
 * Created by levv on 12/10/2017.
 */
import * as remx from 'remx';

const initialState = {
    loading: true,
    topics: {},
    selectedTopic: null
};

const state = remx.state(initialState);


export const getters = remx.getters({

    isLoading() {
        return state.loading;
    },

    getTopicsByIndex(index) {
        return state.topics[index];
    },

    getTopics() {
        return remx.toJS(state.topics);
    },

    getSelectedTopic(){
        return remx.toJS(state.selectedTopic);
    }
});

export const setters = remx.setters({

    setLoading(isLoading) {
        state.loading = isLoading;
    },

    setTopics(topics){
        state.topics = topics;
    },

    addPost(topic) {
        state.topics.push(topic);
    },

    setSelectedTopic(topic) {
        state.selectedTopic = topic;
    }

});
