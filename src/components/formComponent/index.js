'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
var serialize = require('form-serialize');

import { sendRequest, asyncAction } from 'actions';


const dispatchToProps = (dispatch) => {
	return {
		sendRequest(e) {
			e.preventDefault();
			let text = serialize(e.target);
			let url = 'http://localhost:8090/denied';
			// in real server we got only one url
			// this is just mock imitation, so we can just replace response JSON
			if (text === 'firstName=User&password=Password') {
				url = 'http://localhost:8090/success';
			}
			dispatch(asyncAction(url, text, () => {
					dispatch(sendRequest())
				})
			)
		}
	};
};

const stateToProps = ({ simpleReducer }) => {
	return {
		simpleReducer
	};
};

const Myform = ({simpleReducer, sendRequest , asyncAction}) => {
	return (
		<div>
			<form action="" className="form" onSubmit={sendRequest}>
				<div className="form-group">
					<input 
						style={{
							borderColor: simpleReducer.status.Auth === 'Denied' ? 'red' : 'initial'
						}}
						type='text'
						placeholder='name'
						name="firstName"
					/>
				</div>
				<div className="form-group">
					<input 
						type='password'
						placeholder='password'
						name="password"
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<h1
				style={{
					display: simpleReducer.status.Auth === 'unknown' ? 'none' : 'block'
				}}
			>
				Status: {simpleReducer.status.Auth}
			</h1>
			<h1
				style={{
					display: simpleReducer.status.Auth === 'Success' ? 'block' : 'none'
				}}
			>
				Succesful logged
			</h1>
		</div>
	)
};

export default connect(stateToProps, dispatchToProps)(Myform);