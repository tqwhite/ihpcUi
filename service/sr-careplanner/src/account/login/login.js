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

const printArray=inArray=>inArray.forEach(item=>console.log(`\n\n${item}\n`))

function getCookie() {
	let decodedCookieString = decodeURIComponent(document.cookie);
console.log(`\n=-=============   decodedCookieString  ========================= [login.js.getCookie]\n`);


console.log(`decodedCookieString=${decodedCookieString}`);

console.log(`\n=-=============   decodedCookieString  ========================= [login.js.getCookie]\n`);


	let cookieArray = decodedCookieString.split(';');
	printArray(cookieArray);
	let validCookieArray = sortAndStripArray(cookieArray); //only finds cookies of the form ihcpToken_\d+
	const outString = validCookieArray.join('');
	return outString; //I manually confirmed that the token is assembled correctly and received correctly by the backend.
}

// ===================================================================
// SESSION FUNCTIONS

function ssoProcess(scope) {
	
	const isSSO = window.location.pathname.match(/SSO\/(.*?)$/);
	let districtId;
	
	// prettier-ignore
	if (isSSO) {
		districtId=isSSO[1];
		scope.attr('isSSO', true);
		scope.attr('message', "Accessing District SSO System");
		
		const ssoToken = getCookie('ihpcToken');

console.log(`ssoToken=${ssoToken}`);

		if (!ssoToken){
		scope.attr('message', 'Single Sign On Cookie is empty or missing');
		return;
		}

 		scope .attr('tmpFormSession').attr('user') .attr('districtId', districtId);
		scope.attr('tmpFormSession').attr('user').attr('ssoToken', ssoToken);

	}

	return isSSO;
}


function createSession(ev, options) {
	// 	if (ev) {
	// 		ev.preventDefault();
	// 	}
	
	options = options ? options : this;
	
	const isSso = ssoProcess(options); //MUTATES tmpFormSession.user, ssoToken

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

		if (err.status == '302') {
			window.location.href = err.responseJSON.errorText;
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
				console.dir({ 'parms [login.js.createSession]': parms });
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
	const isSSO = window.location.pathname.match(/SSO\/(.*?)$/);

	// prettier-ignore
	if (isSSO) {
		console.log('Click Enter to see createSession() Stuff');
		setTimeout(()=>{
			scope.attr('isSSO', true);
			scope.attr('buttonLabel', 'ENTER');
			scope.attr('message', "<div style='width:100%;text-align:center;'><span style='font-size:80%;'>District SSO Detected</span><br>Click Enter</div>");
		}, 200);

// 		if(!process.platform){
// 			setTimeout(()=>{
// 			createSession('', scope)
// 			}, 1); //this appears to work perfectlyg correctly except that it doesn't switch to the working view
// 		}
// 		else{
// 			console.log('in SSR');
// 		}
	}
	//return createSession('', options.scope);
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
