import Map from 'can/map/';
import Session from 'sr-careplanner/models/session';
import qtools from 'lib/qtools-minus/'; //I do not understand why I have to put node_modules here but not on can/map

import User from 'sr-careplanner/models/user';
import ConfirmEmail from 'sr-careplanner/models/confirm-email';
import ResendEmail from 'sr-careplanner/models/resend-email';
import FeedBackSupport from 'sr-careplanner/models/feedback-support';
import KeepAlive from 'sr-careplanner/models/sessionKeepAlive';

//NOTE: CSS override (!important) in styles.less for input elements

const AppViewModel = Map.extend({
	define: {
		loginUser: {
			get: function() {
				const session = this.attr('session');

				const loginUser = User.get({
					_id: session.attr('0')._id
				});

				loginUser.then(item => {
					const userExpanded = item.attr();
					/*
						I added transfers years later. Originally, I thought of the 
						session and the user as synonyms. That was shortsighted.
						Now I have to consider the transfer elements to be part
						of the user or I have to rewrite a lot more than I want to.
						A consequence of this is that model/session.js has to
						add these transfer things to the inbound user data. That
						would screw up donejs auto cache stuff but I don't use it.
						Sorry, tqii, 1/2019
						
						ps, to be clear, transfersRecipient means loginUser receives students,
						sender means that he or she initiated the offer of students
					*/
					userExpanded['transfersRecipient'] = session.attr('0').attr('transfersRecipient');
					userExpanded['transfersSender'] = session.attr('0').attr('transfersSender');
					userExpanded['transfersRecipient']=userExpanded['transfersRecipient']?userExpanded['transfersRecipient']:[];
					userExpanded['transfersSender']=userExpanded['transfersSender']?userExpanded['transfersSender']:[];
					
					this.attr('loginUserWorkingData', userExpanded);
					this.attr('transfersRecipientCount', userExpanded['transfersRecipient'].length);
					
					const dictionary = item.attr('dictionary');
					let newItemsFlag = false;

					['writtenby', 'district', 'infoPhone'].map((item, inx, all) => {
						if (!qtools.getByProperty(dictionary, 'pattern', item)) {
							dictionary.push({
								pattern: item,
								replacement: '',
								mandatory: true
							});
							newItemsFlag = true;
						}
					});
					if (newItemsFlag) {
						item.save();
					}
				});

				return loginUser;
			}
		},
		session: {
			value: function() {
				//placeholder for two-way binding to the form in login.stache
				return new Session({});
			},
			set: function(value) {
				if (value.attr(0)) {
					if (!value.attr(0).emailConfirmationDate) {
						this.attr('unconfirmedEmailAddress', value.attr(0).emailAddress);
					}
					if (!value.attr(0).lastLogin) {
						this.attr('firstLogin', true);
					}
				}
				return value;
			},
			serialize: false //or, function(val, type){ return f(val); }
		},
		firstLogin: {
			value: '',
			serialize: false
		},
		metaData: {
			value: '',
			serialize: false
		},
		unconfirmedEmailAddress: {
			value: '',
			serialize: false
		},
		configuration: {
			value: {},
			serialize: false,
			type: '*'
		},
		token: {
			value: {},
			serialize: false,
			type: '*',
			set: function(value) {
				if (false && value && value.claims && value.claims.expiration) {
					const expirationTime = value.claims.expiration;
					const interval = value.claims.expiration - new Date();
					this.attr('sessionInterval', interval);
					if (this.previousSessionTimeoutId) {
						clearTimeout(this.previousSessionTimeoutId);
					}
					this.previousSessionTimeoutId = setTimeout(() => {
						this.logout(
							'?welcomeMessage=Session%20Cancelled%20Due%20to%20Inactivity'
						);
					}, interval);
				}
				return value;
			}
		},
		sessionInterval: {
			serialize: false
		},
		welcomeMessage: {
			get: function(value = 'WELCOME') {
				if (window && window.location && window.location.search && window.location.search) {
					// Feb 23 06:30:10 IHPC startProdServer[745]: TypeError: Cannot read properties of null (reading '1')
					// Feb 23 06:30:10 IHPC startProdServer[745]:     at a.get (file:/home/ui/prod/system/code/service/sr-careplanner/dist/bundles/sr-careplanner/index.js:247:1890)
					const tmp = window.location.search.match(/^\?welcomeMessage=(.*)\&*$/);
					value = tmp?window.location.search.match(/^\?welcomeMessage=(.*)\&*$/)[1]:'';
					value = value.replace(/\%20/g, ' ');
				}
				value = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
				if (window.location.href.match(/demo/)) {
					value += "<div style='color:pink;font-size:50%;'>DEMO SITE</div>";
				}
				if (window.location.href.match(/local/)) {
					value += "<div style='color:green;font-size:50%;'>DEV SITE</div>";
				}
				return value;
			},
			set: function(value) {
				return value;
			}
		},
		systemCompanyName: {
			value: 'Sunrise River Press',
			serialize: false
		},
		systemProdName: {
			value: 'IHP Creator',
			serialize: false
		},
		message: {
			value: 'Hello World!',
			serialize: false
		},
		title: {
			value: 'IHP Creator',
			serialize: false
		},
		page: {
			value: '',
			serialize: false
		},
		slug: {
			value: '',
			serialize: false
		},
		subsection: {
			value: '',
			serialize: false
		},
		expiration: {
			value: '',
			serialize: false
		},
		lastDayInSubscription: {
			value: '',
			serialize: false
		},
		subscriptionActive: {
			value: '',
			serialize: false
		},
		expiredSubscriptionNotification: {
			value: '',
			serialize: false
		},
		browserLoaded: {
			get: function() {
				return window.location.href.match(/\w/);
			},
			serialize: false
		},
		productionSystem: {
			get: function() {
				const value = window.location.href.match(/(demo|local)/);
				return value ? false : true;
			},
			serialize: false
		},
		nonProductionSiteName: {
			get: function() {
				const value = window.location.href.match(/(demo|local)/) || [];
				return value[0] == 'local' ? 'development' : value[0];
			},
			serialize: false
		},
		databaseName: {
			get: function() {
				const token = this.attr('token');
				if (token.claims && token.claims.databaseName) {
					return token.claims.databaseName;
				} else {
					return 'none';
				}
			},
			serialize: false
		},
		pdfmakePresent: {
			get: function() {
				return typeof pdfMake != 'undefined';
			},
			serialize: false
		},
		newlyRegisteredUserName: {
			value: '',
			serialize: false
		},
		loginUserWorkingData: {
			value: {},
			serialize: false
		},
		confirmEmailMessage: {
			value: '',
			serialize: false
		},
		confirmEmailStatus: {
			value: '',
			serialize: false
		},
		updateSubscriptionMessage: {
			value: '',
			serialize: false
		},
		updateSubscriptionStatus: {
			value: '',
			serialize: false
		},
		updateSubscriptionToken: {
			value: '',
			serialize: false
		},
		showResendNotification: {
			serialize: false
		},
		changePasswordKey: {
			serialize: false
		},
		showSendFeedback: {
			value: '',
			serialize: false
		},
		feedbackMessage: {
			value: '',
			serialize: false
		},
		feedbackResult: {
			value: '',
			serialize: false
		},
		hideFeedbackText: {
			value: 'false',
			serialize: false
		},
		supportEmail: {
			value: 'tqwhite@erdc.k12.mn.us',
			serialize: false
		},

		planRefIdStudentMapList: {
			value: {},
			serialize: false
		},
		closingBox: {
			value: "<div class='closingX'><div>X</div></div>",
			serialize: false
		},
		showResendNotification: {
			value: '',
			serialize: false
		},

		showStudentManager: {
			value: '',
			serialize: false
		},
		filterFragment: {
			value: '',
			serialize: false
		},
		studentSearchField: {
			value: 'last',
			serialize: false
		},
		showReceiveTransferTool: {
			value: false,
			serialize: false
		},
		transferResultStatus:{
			value: '',
			serialize: false
		},
		transfersRecipientCount:{
			value: 0,
			serialize: false
		},
		transferHistoryStatus: {
			value: '',
			serialize: false
		}
	},
	
	setNewPage: function(page, slug, subsection) {
		this.attr('welcomeMessage', '');
		this.attr('page', page);
		this.attr('slug', slug);
		this.attr('subsection', subsection);
		$(window).trigger('app.setNewPage');
	},
	logout: function(queryString = '') {
		window.location.href = '/' + queryString;
	},
	clearConsole: function() {
		console.clear();
	},
	
	activateModal: function(callback) {
		const clearModal = () => {
			$('.modalBackground').hide();
		};
		callback = typeof callback == 'function' ? callback : clearModal;
		$('body').one('click', callback);
	},

	resendConfirmation: function() {
		const resend = new ResendEmail({
			username: this.session.attr(0).username
		});

		this.attr('showResendNotification', true);

		resend.save(
			result => {
				setTimeout(() => {
					$('.showResendNotificationContainer').fadeOut(1000, () => {
						this.attr('showResendNotification', '');
						$('.unconfirmedEmailAddressNotification').animate({
							opacity: 0.4
						});
					});
				}, 3000);
			},
			err => {
				console.dir({
					err: err
				});
			}
		);
	},

	cancelSendFeedback: function() {
		this.attr('showSendFeedback', '');
	},

	findErrorsSpecial: function(saveObj, domObj) {
		let errorList = saveObj.validate();
		if (errorList.length) {
			setTimeout(() => {
				domObj.addClass('error');
				domObj.focus();
			}, 100);
			this.attr('feedbackResult', errorList[0].errorText);
			return true;
		}
		return false;
	},

	sendFeedbackMessage: function() {
		var userData = this.attr('loginUserWorkingData');
		var saveObj = new FeedBackSupport({
			feedbackMessage: this.attr('feedbackMessage'),
			user: userData
		});

		if (this.findErrorsSpecial(saveObj)) {
			return;
		}

		this.attr('feedbackResult', 'Sending...');

		var promise = saveObj.save().then(
			item => {
				this.attr('feedbackResult', 'It worked! Thank you for your feedback');
				this.attr('hideFeedbackText', 'hide');
				setTimeout(() => {
					this.attr('feedbackMessage', '');
					this.attr('showSendFeedback', '');
					this.attr('feedbackResult', '');
				}, 4000);
			},
			err => {
				const errorObj = JSON.parse(err.responseText);

				this.attr('errorList', {
					user: [errorObj],
					domObj: {}
				});

				this.attr(
					'feedbackResult',
					'Mighty Sorry. Something has gone wrong. Please Cancel and try again some other time. Or, send email to ' +
						this.attr('supportEmail') +
						"<div style='font-size:80%;width:80%;margin-top:10px;'>It would be cool if you pasted this into the email, too: " +
						err.responseText +
						'</div>'
				);

				//	this.attr('saveError', JSON.stringify(err))
				console.dir({
					err: err
				});
			}
		);
		return false;
	},

	activateSendFeedback: function() {
		this.attr('showSendFeedback', true);
		this.attr('hideFeedbackText', '');

		setTimeout(() => {
			$('#feedbackEntry').focus();
		}, 10);
	},

	messageOfTheDay: function() {
		if (!this.attr('browserLoaded')) {
			return;
		}
		let outString = '';
		let subClass = 'accountMessage';
		const config = this.attr('configuration');

		if (!this.attr('subscriptionActive')) {
			let expiredAccountMessage = config.expiredAccount.message;
			const classInfo = expiredAccountMessage.match(/<!style:(.*?)!>/);
			if (classInfo) {
				subClass = classInfo[1];
			}

			expiredAccountMessage = expiredAccountMessage
				.replace(
					/<!lastDayInSubscription!>/,
					new Date(this.attr('lastDayInSubscription'))
						.toLocaleDateString('en-US')
						.toString()
						.replace(/^.*?, (\w+) (\d+), (\d+)$/, '$2_$1_$3')
				)
				.replace(
					/<!renewButton!>/,
					"<div class='c-button c-button--primary c-button--small' ($click)='clearConsole()' style='display:inline-block;' id='renew'>RENEW</div>"
				);

			outString += `<div class='accountNotification ${subClass}'>${expiredAccountMessage}</div>`;
		} else {
			const lastDayInSubscription = this.attr('lastDayInSubscription');
			const expirationWarnings = config.expirationWarning;

			const breakpoints = [];
			for (var i = 0, len = expirationWarnings.length; i < len; i++) {
				var element = expirationWarnings[i];
				if (element) {
					breakpoints.push(i);
				}
			}

			const subscriptionDate = new Date(lastDayInSubscription);
			const today = new Date();
			const exactDaysLeft = (subscriptionDate - today) / 1000 / 3600 / 24;
			const daysLeft = Math.floor(exactDaysLeft);
			//someday this should get switched to the more recent user property 'daysLeftInSubscription'

			const messageIndex = breakpoints
				.filter(item => daysLeft <= item) //get rid of this when you have time to test it
				.filter(item => daysLeft <= item)
				.reduce((result, item) => (result = Math.min(result, item)), 1000);

			let message = expirationWarnings[messageIndex];

			if (message) {
				const classInfo = message.match(/<!style:(.*?)!>/);
				if (classInfo) {
					subClass = classInfo[1];
				}

				message = message
					.replace(
						/<!lastDayInSubscription!>/,
						new Date(this.attr('lastDayInSubscription'))
							.toLocaleDateString('en-US')
							.toString()
							.replace(/^.*?, (\w+) (\d+), (\d+)$/, '$2_$1_$3')
					)
					.replace(/<!daysLeft!>/, daysLeft)
					.replace(
						/<!renewButton!>/,
						"<div class='c-button c-button--primary c-button--small' ($click)='clearConsole()' style='display:inline-block;' id='renew'>RENEW</div>"
					);
				outString += `<div class='accountNotification ${subClass}'>${message}</div>`;
			}
		}

		const metaData = this.attr('metaData');
		let accountParameters;
		if (metaData) {
			accountParameters = metaData.attr('updateSubscriptionResult'); //so far, this is only subscription update notification
		}
		if (accountParameters) {
			const months = accountParameters.attr('months');

			let accountMessage = config.updateSubscriptionNotification;

			subClass = 'motd';
			accountMessage = accountMessage
				.replace(
					/<!lastDayInSubscription!>/,
					new Date(this.attr('lastDayInSubscription'))
						.toLocaleDateString('en-US')
						.toString()
						.replace(/^.*?, (\w+) (\d+), (\d+)$/, '$2_$1_$3')
				)
				.replace(/<!months!>/, months)
				.replace(
					/<!renewButton!>/,
					`<div class='c-button c-button--primary c-button--small' style='display:inline-block;' id='renew'>RENEW</div>`
				); //this button's click event is set at the end of this function

			outString += `<div class='accountNotification ${subClass}'>${accountMessage}</div>`;
		}

		const messageOfTheDay = config.messageOfTheDay;
		if (messageOfTheDay) {
			subClass = 'motd';
			outString += `<div class='accountNotification ${subClass}'>${messageOfTheDay}</div>`;
		}


		if (this.attr('transfersRecipientCount')) {
			const button = `<div class='c-button c-button--primary c-button--small' style='display:inline-block;' id='receivetransfers'>REVIEW TRANSFERS</div>`;
			//this button's click event is set at the end of this function in setTimeout()

			outString += `<div class='accountNotification ${subClass}'>You have ${
				this.attr('transfersRecipientCount')
			} pending transfer requests. Click ${button} to act on them.</div>`;
		}

		if (outString) {
			outString = `<div class='messagesContainer'>${outString}</div>`;
		}

		setTimeout(() => {
			$('#renew').on('click', event => {
				event.stopPropagation();
				this.setNewPage('setup', '', 'store');
			});
			$('#receivetransfers').on('click', event => {
				event.stopPropagation();
				this.setNewPage('nurse', '', '');
				this.receiveTransfer(event);
			});
		}, 10); //needs to be in a timeout function so that the elements can be drawn first
		return outString;
	},

	receiveTransfer: function(event) {
		this.attr('showReceiveTransferTool', true);
		this.activateModal(() => {
			this.attr('showReceiveTransferTool', false);
		});
		
	},

	renewSession: function() {
		KeepAlive.getList();
	},
	
	browserIsInternetExplorer: function(){
		return window.navigator.userAgent.match(/Trident/i);
	},

	testElement: function() {
		window['AppViewModel'] = this;
		console.log('added: window[' + "'" + 'AppViewModel' + "'" + ']');
		console.dir({
			AppViewModel: this.attr()
		});
	}
});

can.stache.registerHelper('simpleRoute', function(options) {
	if (!process.browser) {
		return;
	}
	const routingBits = window.location.pathname.match(
		/^\/(\w+)\/*(\w*)\/*#*!*$/
	);

	if (!routingBits || typeof routingBits[1] == 'undefined') {
		return;
	}
	if (this.attr('browserLoaded') && this.attr('loginUserWorkingData').isActive) {
		switch (routingBits[1]) {
			case 'renew':
				this.setNewPage('setup', '', 'store');
				break;
		}
	}
	
	switch (routingBits[1]) {
		case 'forgotPassword':
			this.setNewPage('', 'forgot-password');
			break;
		case 'changePassword':
			this.attr('changePasswordKey', routingBits[2]);
			this.setNewPage('', 'change-password');
			break;
	}
});

let alreadyConfirmedEmail = false;
can.stache.registerHelper('confirmEmail', function(options) {
	if (!process.browser || alreadyConfirmedEmail) {
		return;
	}

	alreadyConfirmedEmail = true;

	if (window && window.location && window.location.pathname) {
		const confirmInfo = window.location.pathname.match(/\/confirmEmail\/(\w+)/);

		if (confirmInfo) {
			options.scope.attr(
				'confirmEmailMessage',
				'Attempting to confirm email address'
			);
			options.scope.attr('confirmEmailStatus', 'incomplete');
			const confirmEmail = new ConfirmEmail({
				data: {
					confirmationKey: confirmInfo[1]
				}
			});

			confirmEmail.save(
				result => {
					if (result.attr('0').attr('message')) {
						options.scope.attr(
							'confirmEmailMessage',
							result.attr('0').attr('message')
						);
						options.scope.attr('confirmEmailStatus', 'success');
					}
				},
				err => {
					options.scope.attr('confirmEmailMessage', err.responseJSON.errorText);
					options.scope.attr('confirmEmailStatus', 'error');
				}
			);
		}
	}
});

let alreadyUpdatedSubscription = false;
can.stache.registerHelper('updateSubscription', function(options) {
	if (!process.browser || alreadyUpdatedSubscription) {
		return;
	}

	if (window && window.location && window.location.pathname) {
		const updateSubscriptionToken = window.location.pathname.match(
			/\/updateSubscription\/(\w+)/
		);
		if (updateSubscriptionToken) {
			if (options.scope.attr('updateSubscriptionStatus') == 'complete') {
				options.scope.attr('updateSubscriptionMessage', '');
			} else {
				alreadyUpdatedSubscription = true;
				options.scope.attr(
					'updateSubscriptionMessage',
					'Found subscription update info. Please log in or register.'
				);
				options.scope.attr('updateSubscriptionStatus', 'incomplete');
				options.scope.attr(
					'updateSubscriptionToken',
					updateSubscriptionToken[1]
				);
			}
		}
	}
});

export default AppViewModel;
