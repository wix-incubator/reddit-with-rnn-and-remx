/**
 * Created by levv on 12/10/2017.
 */
import * as store from './store';
import * as redditService from '../../services/reddit';

export async function fetchPosts(topicUrl) {
    const posts = await redditService.getPosts(topicUrl);
    store.setters.setPosts(posts);
}

export function setSelectedPost(post) {
   // store.setters.setSelectedTopic(subreddit.url);
}