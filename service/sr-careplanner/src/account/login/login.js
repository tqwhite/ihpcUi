import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from 'sr-careplanner/models/session';
import User from 'sr-careplanner/models/user';

export const ViewModel = Map.extend({
	define: {
		tmpFormSession: {
			value: function() {
				//placeholder for two-way binding to the form in login.stache
				return new Session({ user: new User() });
			}
		},
		message: {
			value: ''
		}
	},

	createSession: function(ev, options) {
		if (ev) {
			ev.preventDefault();
		}

		const tmpFormSession = this.attr('tmpFormSession');

		const successFunc = result => {
			this.attr('tmpFormSession', new Session({ user: new User() })); //comment this to avoid clearing the login inputs
			this.attr('%root').attr('session', result);
			this.attr('%root').attr('confirmEmailMessage', '');
		};
		const errorFunc = err => {
			if (err.responseJSON.errorText.match(/reloadBase/)) {
				this.attr(
					'message',
					err.responseJSON.errorText.replace(
						/reloadBase/,
						"<div style='font-size:70%;font-style:italic'>Restarting IHP Creator<br/>in five seconds"
					)
				);
				setTimeout(() => {
					window.location.href = window.location.origin;
				}, 5000);
			} else {
				this.attr('message', err.responseJSON.errorText);
			}
		};

		const updateSubscriptionToken = this.attr('%root').attr(
			'updateSubscriptionToken'
		);
		if (updateSubscriptionToken) {
			this.attr('tmpFormSession').attr(
				'updateSubscriptionToken',
				updateSubscriptionToken
			);
		}

		var sessionPromise = this.attr('tmpFormSession')
			.save()
			.then(
				successFunc /*, errorFunc here prevents stache from getting {{#if sessionPromise.isRejected}}*/
			)
			.fail(errorFunc);

		//this.attr("sessionPromise", sessionPromise); //can't figure out why this was in the example
	}
});

export default Component.extend({
	tag: 'account-login',
	viewModel: ViewModel,
	template,
	events: {
		keypress: function(el, event) {
			if (event.which == 13) {
				this.viewModel.createSession(event);
			}
		}
	}
});
