'use strict';
import fetch from 'isomorphic-fetch';

export const SEND_REQUEST = 'SEND_REQUEST';
export const sendRequest = () => ({
	type: SEND_REQUEST
});


export const ASYNC_ACTION = 'ASYNC_ACTION';
export const asyncAction = (url, text, cb) => (dispatch, getState) => {
	function status(response) {
		if (response.status >= 200 && response.status < 300) {
			return Promise.resolve(response)
		} else {
			return Promise.reject(new Error(response.statusText))
		}
	}

	function json(response) {
		return response.json()
	}

	fetch(url,
		{
			method: 'post',
			body: text
		}
		)
		.then(status)
		.then(json)
		.then(function(data) {
			console.log(text)
			dispatch({
					type: 'ASYNC_ACTION',
					dataTmp: data
				});
		}).catch(function(error) {
			console.log('Request failed', error);
	});
};

