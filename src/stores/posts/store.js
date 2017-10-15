/**
 * Created by levv on 12/10/2017.
 */
import * as remx from 'remx';

const initialState = {
    loading: true,
    posts: {}
};

const state = remx.state(initialState);

export const getters = remx.getters({

    isLoading() {
        return state.loading;
    },

    getPostByIndex(index) {
        return state.posts[index];
    },

    getPosts() {
        return remx.toJS(state.posts);
    }
});

export const setters = remx.setters({

    setLoading(isLoading) {
        state.loading = isLoading;
    },

    setPosts(posts){
        state.posts = posts;
    },
});
