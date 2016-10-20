'use strict';


import { ASYNC_ACTION } from 'actions';


const defaultFieldState = {
	status: {"Auth":"unknown"}
}

export default (state = defaultFieldState, action) => {
	switch (action.type) {
		case 'ASYNC_ACTION':
			return {
				...state,
				...({ status: action.dataTmp })
			}

		default:
			return state;
	}
};