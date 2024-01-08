import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from 'sr-careplanner/models/session';
import User from 'sr-careplanner/models/user';

// ===================================================================
// UTILITIES

function getQueryStringParameters() {
	const queryString = window.location.search;
	const query = {};
	const pairs = (queryString[0] === '?'
		? queryString.substr(1)
		: queryString
	).split('&');
	for (var i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split('=');
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
	}
	return query;
}

const sortAndStripArray = array => {
	return array
		.map(item => item.trim())
		.filter(item => item.match(/^ihpcToken_/))
		.sort((a, b) => {
			let aNumber = parseInt(a.substring(a.indexOf('_') + 1, a.indexOf('=')));
			let bNumber = parseInt(b.substring(b.indexOf('_') + 1, b.indexOf('=')));

			return aNumber - bNumber;
		})
		.map(item => item.substring(item.indexOf('=') + 1));
};

function getCookie() {
	let decodedCookieString = decodeURIComponent(document.cookie);
	let cookieArray = decodedCookieString.split(';');
	let validCookieArray = sortAndStripArray(cookieArray); //only finds cookies of the form ihcpToken_\d+
	const outString = validCookieArray.join('');
	return outString; //I manually confirmed that the token is assembled correctly and received correctly by the backend.
}

function deleteCookies() {
	// console.log('bypass cookie killing for dev time [login.js]e');
	// return;
	document.cookie.split(';').forEach(function(c) {
		document.cookie = c
			.replace(/^ +/, '')
			.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
	});
}

// ===================================================================
// SESSION FUNCTIONS

function ssoVarsToViewModel(scope, districtId) {
	const ssoToken = getCookie('ihpcToken');
	if (!ssoToken) {
		console.log(
			'Single Sign On Cookie is empty or missing. Error# Q141220233752037520965'
		);
		return;
	}
	scope
		.attr('tmpFormSession')
		.attr('user')
		.attr('districtId', districtId);
	scope
		.attr('tmpFormSession')
		.attr('user')
		.attr('ssoToken', ssoToken);
	return true;
}

function createSession(ev, options) {
	// 	if (ev) {
	// 		ev.preventDefault();
	// 	}
	
	options = options ? options : this;
	
	const isSso = window.location.pathname.match(/SSO\/(.*?)$/); //attribute set by districtIntercept is not set yet
	if (isSso) {
		
		
		//document.getElementById('loginButton').style.display = 'none';

		document.getElementById('loginButton').innerHTML = 'loading...';
		document.getElementById('loginButton').style.opacity = '.5';

		ssoVarsToViewModel(options, isSso[1]); //MUTATES tmpFormSession.user, ssoToken
		deleteCookies(); //avoid nasty cookie buildup
	}

	const tmpFormSession = options.attr('tmpFormSession');

	const successFunc = result => {
		options.attr('tmpFormSession', new Session({ user: new User() })); //comment options to avoid clearing the login inputs

		options.attr('%root').attr('district', result[0].district);

		options.attr('%root').attr('session', result);
		options.attr('%root').attr('confirmEmailMessage', '');
	};
	
	const errorFunc = err => {
		if (!err.responseJSON) {
			return;
		}

		if (err.status == '302') {
			// SSO REDIRECT: For users that have a districtID set, API/sessions.js constructs
			// the URL and puts in errorText (I didn't want to think through a whole new system)
			// in the login process handling code (ie, after enter is pressed here)
			const ssoLoginPage = err.responseJSON.errorText;
			window.location.href = ssoLoginPage;
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
				const parms = getQueryStringParameters();
				console.dir({ 'parms [login.js.createSession]': parms });
				if (parms.source) {
					const parms = getQueryStringParameters();

					window.location.href = parms.source;
				} else {
					window.location.href = window.location.origin;
				}
			}, 5000);
		} else if (err.responseJSON.errorText.match(/AADSTS500133/)) {
			options.attr(
				'message',
				'SSO login has expired. Redirecting to Login Page'
			);
			setTimeout(() => {
				const parms = getQueryStringParameters();
				if (parms.source) {
					const parms = getQueryStringParameters();

					window.location.href = parms.source;
				} else {
					window.location.href = window.location.origin;
				}
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
// ===================================================================
// VIEW MODEL

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
		},
		isSSO: {
			value: false
		},
		ssoLoginStart: {
			value: false
		},
		buttonLabel: {
			value: 'LOGIN'
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
	const scope = options.scope;
	const ssoRedirect = window.location.pathname.match(/SSO\/(.*?)$/); //value set in ssoVarsToViewModel() is not visible yet

	// prettier-ignore
	if (ssoRedirect) {
		setTimeout(()=>{
			scope.attr('isSSO', true);
			scope.attr('buttonLabel', 'ENTER');
			scope.attr('message', "<div style='width:100%;text-align:center;'><span style='font-size:80%;'>District SSO Detected</span><br>Click Enter</div>");
		}, 200);
		return
	}

		
	const isSsoLogin = window.location.pathname.match(
		/d\/(.*?)$/
	);   //value set in ssoVarsToViewModel() is not visible yet
	 if (isSsoLogin) {
		scope.attr('ssoLoginStart', true);

		this.attr('%root').attr('districtName', `IHPC for ${isSsoLogin[1]}`);
	}
});

can.stache.registerHelper('demoOrDev', function(options) {
	

	if (window.location.href.match(/demo/)) {
		return 'demo';
	}
	if (window.location.href.match(/local/)) {
		return 'dev';
	}
	if (window.location.href.match(/qwork/)) {
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
