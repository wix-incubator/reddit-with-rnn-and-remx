/**
 * Created by levv on 13/10/2017.
 */

import * as store from './store';
import * as redditService from '../../services/reddit';


export async function fetchTopics() {
    const topics = await redditService.getDefaultTopics();
    store.setters.setTopics(topics);
}

export function setSelectedTopic(topic) {
    store.setters.setSelectedTopic(topic.url);
}