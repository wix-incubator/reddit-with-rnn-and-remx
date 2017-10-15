/**
 * Created by levv on 12/10/2017.
 */
// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import * as http from './http';

const REDDIT_ENDPOINT = 'https://www.reddit.com';
const OAUTH_REDDIT_ENDPOINT = 'https://oauth.reddit.com';
const DEFAULT_SUBREDDITS_ENDPOINT = `${REDDIT_ENDPOINT}/subreddits/default.json`;
const CLIENT_ID = 'RDr_DCpf4uvfig';

export async function getUserInfo(accessToken) {
    const userInfo = await _fetchMe(accessToken);
    return userInfo;
}

export async function getDefaultTopics() {
    const subredditsData = await http.get(DEFAULT_SUBREDDITS_ENDPOINT);
    const subreddits = _extractTopics(subredditsData);
    return _parseTopics(subreddits);
}

function _extractTopics(data) {
    return _.get(data, 'data.children');
}

function _parseTopics(subreddits) {
    return _.map(subreddits, (subreddit) => {
        return {
            name: subreddit.data.display_name,
            url: subreddit.data.url
        }
    });
}



export async function getPosts(topicUrl) {
    const posts = await _fetchPosts(topicUrl);
    return _parsePosts(posts, topicUrl);
}

async function _fetchPosts(subredditUrl) {
    const url = `${REDDIT_ENDPOINT}${subredditUrl}hot.json`;
    console.log(url);
    const data = await http.get(url);
    const children = _.get(data, 'data.children');
    if (!children) {
        throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
    }
    return children;
}


function _parsePosts(posts, topicUrl) {
    return _.map(posts, (post) => {
        const body = _.get(post, 'data.selftext');
        return {
            id: _.get(post, 'data.id'),
            title: _.get(post, 'data.title'),
            topicUrl: topicUrl,
            body: body,
            thumbnail: _validateUrl(_.get(post, 'data.thumbnail'))
            //   url: !body ? _validateUrl(_.get(post, 'data.url'), '') : undefined
        }
    });
}

function _validateUrl(url){
    if(_.isEmpty(url) || url=="nsfw" || url=="self"){
        return "https://www.nasa.gov/centers/goddard/images/content/638831main_globe_east_2048.jpg"
    }
    return url;
}

export async function grantAccessToken(code) {

    const url = _createAuthorizationUrl(code, "loyalty://response");

    const authorizationHash = new Buffer(`${CLIENT_ID}:`).toString('base64');
    const response = await http.post(url, {
        'Authorization': `Basic ${authorizationHash}`
    });

    if (response.access_token) {
        return response.access_token;
    } else {
        return new Error(`RedditService grantAccessToken failed`);;
    }
}



export async function getCommentsForPost(post) {
    const comments = await _fetchCommentsForPost(post);
    return _parseComments(comments);
}




async function _fetchMe(accessToken) {
    const url = `${OAUTH_REDDIT_ENDPOINT}/api/v1/me`;
    const userData = await http.get(url, _getAuthHeaders(accessToken));
    if (!userData) {
        throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
    }
    return userData;

}
async function _fetchCommentsForPost(post) {
    const url = `${REDDIT_ENDPOINT}${post.topicUrl}comments/${post.id}/hot.json`;
    console.log(url);
    const data = await http.get(url);
    const children = _.get(data[1], 'data.children');
    if (!children) {
        throw new Error(`RedditService getPostsFromSubreddit failed, children not returned`);
    }
    return children;
}



function _createAuthorizationUrl(code, redirect_uri) {
    const url = `${REDDIT_ENDPOINT}/api/v1/access_token` +
        `?grant_type=authorization_code` +
        `&code=${code}` +
        `&client_id=${CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirect_uri)}`;

    return url;
}

function _getAuthHeaders(accessToken) {
    return {
        'Authorization': `bearer ${accessToken}`
    };
}

function _parseComments(comments) {
    return _.map(comments, (comment) => {
        const commentBody = _.get(comment, 'data.body');
        console.log(commentBody);
        return {
            id: _.get(comment, 'data.id'),
            body: _.get(comment, 'data.body')
        }
    });
}