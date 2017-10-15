/**
 * Created by levv on 13/10/2017.
 */
import _ from 'lodash';

export async function get(url, extraHeaders) {
    const headers = {
        Accept: 'application/json'
    };

    const response = await fetch(url, {
        method: 'GET',
        headers: _.merge(headers, extraHeaders)
    });
    if (!response.ok) {
        throw new Error(`failed for ${url}, status ${response.status}`);
    }
    return await response.json();
}

export async function post(url, extraHeaders) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const mergedHeaders = _.merge(headers, extraHeaders);
    const response = await fetch(url, {
        method: 'POST',
        headers: mergedHeaders
    });
    if (!response.ok) {
        throw new Error(`failed for ${url}, status ${response.status}`);
    }
    return await response.json();
}
