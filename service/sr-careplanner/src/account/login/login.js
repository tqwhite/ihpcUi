import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from 'sr-careplanner/models/session';
import User from 'sr-careplanner/models/user';

function createSession(ev, options) {
	if (ev) {
		ev.preventDefault();
	}
	options = options ? options : this;

	const tmpFormSession = options.attr('tmpFormSession');

	const successFunc = result => {
		options.attr('tmpFormSession', new Session({ user: new User() })); //comment options to avoid clearing the login inputs
		options.attr('%root').attr('session', result);
		options.attr('%root').attr('confirmEmailMessage', '');
	};
	const errorFunc = err => {
		if (!err.responseJSON) {
			return;
		}

		if (err.responseJSON.errorText.match(/reloadBase/)) {
			options.attr(
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
			options.attr('message', err.responseJSON.errorText);
		}
	};

	const updateSubscriptionToken = options
		.attr('%root')
		.attr('updateSubscriptionToken');
		
	if (updateSubscriptionToken) {
		options
			.attr('tmpFormSession')
			.attr('updateSubscriptionToken', updateSubscriptionToken);
	}

	var sessionPromise = options
		.attr('tmpFormSession')
		.save()
		.then(
			successFunc /*, errorFunc here prevents stache from getting {{#if sessionPromise.isRejected}}*/
		)
		.fail(errorFunc);

	//options.attr("sessionPromise", sessionPromise); //can't figure out why options was in the example
} 
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
	
	
	isLocal: function() {
		return window.location.href.match(/local/);
	},
	
	createSession
});
// ----------------------------------------------------------------------
// DISTRICT INTERCEPT

can.stache.registerHelper('districtIntercept', function(options) {
	
	function getCookie(cookieName) {
		let cookieIdentifier = cookieName + '=';
		let decodedCookieString = decodeURIComponent(document.cookie);
		let cookieArray = decodedCookieString.split(';');

		for (let i = 0; i < cookieArray.length; i++) {
			let singleCookie = cookieArray[i];
			while (singleCookie.charAt(0) == ' ') {
				singleCookie = singleCookie.substring(1);
			}
			if (singleCookie.indexOf(cookieIdentifier) == 0) {
				return singleCookie.substring(cookieIdentifier.length);
			}
		}
		return '';
	}
	
	const isSSO = window.location.pathname.match(/SSO\/(.*?)$/);
	const ssoToken = getCookie('ihpcToken');
	
console.dir({['isSSO']:isSSO}, { showHidden: false, depth: 4, colors: true });


	if (!ssoToken){
	options.scope.attr('message', 'Single Sign On Cookie is empty or missing');
	return;
	}

	// prettier-ignore
	if (isSSO) {

 		options.scope .attr('tmpFormSession') .attr('districtId', isSSO[1]);
		options.scope.attr('tmpFormSession').attr('ssoToken', ssoToken);

		createSession('', options.scope);
		return options.scope.attr('message');
	} else {
		return 'found routing bits';
	}

	return false;
});

can.stache.registerHelper('demoOrDev', function(options) {
	

	if (window.location.href.match(/demo/)) {
		return 'demo';
	}
	if (window.location.href.match(/local/)) {
		return 'dev';
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
