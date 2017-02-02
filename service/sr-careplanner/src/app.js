import Map from "can/map/";
import Session from "sr-careplanner/models/session";
import qtools from "node_modules/qtools-minus/"; //I do not understand why I have to put node_modules here but not on can/map

import User from "sr-careplanner/models/user";
import ConfirmEmail from "sr-careplanner/models/confirm-email";
import ResendEmail from "sr-careplanner/models/resend-email";
import FeedBackSupport from "sr-careplanner/models/feedback-support";

const AppViewModel = Map.extend({
	define: {
		loginUser: {
			get: function() {
				const session = this.attr('session');
				const loginUser = User.get({
					_id: session.attr('0')._id
				})

				loginUser.then((item) => {
					this.attr('loginUserDataOnly', item.attr());

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
			},
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
		unconfirmedEmailAddress: {
			value: '',
			serialize: false
		},
		token: {
			value: {},
			serialize: false,
			type: '*',
			set: function(value) {
			if (value && value.claims && value.claims.expiration){
				const expirationTime=value.claims.expiration;
				const interval=value.claims.expiration-(new Date());
				if (this.previousSessionTimeoutId){
					clearTimeout(this.previousSessionTimeoutId);
				}
				this.previousSessionTimeoutId=setTimeout(()=>{
					this.logout('?welcomeMessage=Session%20Cancelled%20Due%20to%20Inactivity')
				}, interval);
		}
				return value;
			}
		},
		welcomeMessage:{
			get:function(value='Welcome'){
				if (window && window.location && window.location.search){
					value=window.location.search.match(/^\?welcomeMessage=(.*)\&*$/)[1];
					value=value.replace(/\%20/g, ' ');
				}
				return value;
			},
			set:function(value){
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
			serialize: false,
		},
		slug: {
			value: '',
			serialize: false,
		},
		subsection: {
			value: '',
			serialize: false,
		},
		expiration: {
			value: '',
			serialize: false
		},
		browserLoaded: {
			get: function() {
				return window.location.href.match(/\w/);
			},
			serialize: false
		},
		nonProductionSiteName: {
			get: function() {
				const value = window.location.href.match(/(demo|local)/) || [];
				return (value[0] == 'local') ? 'development' : value[0];
			},
			serialize: false
		},
		pdfmakePresent: {
			value: true,
			serialize: false
		},
		newlyRegisteredUserName: {
			value: '',
			serialize: false,
		},
		loginUserDataOnly: {
			value: {},
			serialize: false
		},
		confirmEmailMessage: {
			value: '',
			serialize: false,
		},
		confirmEmailStatus: {
			value: '',
			serialize: false,
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
		}
	},
	setNewPage: function(page, slug, subsection) {
		this.attr('welcomeMessage', '');
		this.attr('page', page);
		this.attr('slug', slug);
		this.attr('subsection', subsection);
	},
	logout: function(queryString='') {
		window.location.href = '/'+queryString;
	},
	clearConsole: function() {
		console.clear();
	},
	activateModal: function(callback) {
		const clearModal = () => {
			$('.modalBackground').hide();
		}
		callback = (typeof (callback) == 'function') ? callback : clearModal
		$('body').one('click', callback);
	},
	reinitializeDb: function(database) {
		const currPage = this.attr('page');
		const initializers = {
			student: () => {
				$.ajax({
					url: '/api/student/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			boilerplate: () => {
				$.ajax({
					url: '/api/boilerplate/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			plan: () => {
				$.ajax({
					url: '/api/plan/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
			user: () => {
				$.ajax({
					url: '/api/user/reinitialize/'
				}).done((err, result) => {
					this.setNewPage('xxx');
					this.setNewPage(currPage); //trigger reload

				});
			},
		}

		initializers[database]();

	},

	resendConfirmation: function() {

		const resend = new ResendEmail({
			username: this.session.attr(0).username
		});

		this.attr('showResendNotification', true);

		resend.save((result) => {

			setTimeout(() => {
				$('.showResendNotificationContainer').fadeOut(1000, () => {
					this.attr('showResendNotification', '');
					$('.unconfirmedEmailAddressNotification').animate({
						opacity: 0.4
					});
				});
			}, 3000);
		},
			(err) => {
				console.dir({
					"err": err
				});
			})

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
		var userData = this.attr('loginUserDataOnly');
		var saveObj = new FeedBackSupport({
			feedbackMessage: this.attr('feedbackMessage'),
			user: userData
		});

		if (this.findErrorsSpecial(saveObj)) {
			return;
		}


		this.attr('feedbackResult', "Sending...");

		var promise = saveObj
			.save()
			.then(
				(item) => {


					this.attr('feedbackResult', "It worked! Thank you for your feedback");
					this.attr('hideFeedbackText', 'hide');
					setTimeout(() => {
						this.attr('feedbackMessage', '');
						this.attr('showSendFeedback', '');
						this.attr('feedbackResult', '');
					}, 4000);

				},
				(err) => {
					const errorObj = JSON.parse(err.responseText);

					this.attr('errorList', {
						user: [errorObj],
						domObj: {}
					});

					this.attr('feedbackResult', "Mighty Sorry. Something has gone wrong. Please Cancel and try again some other time. Or, send email to " + this.attr('supportEmail') + "<div style='font-size:80%;width:80%;margin-top:10px;'>It would be cool if you pasted this into the email, too: " + err.responseText + "</div>");

					//	this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
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
	testElement: function() {
		window['AppViewModel'] = this;
		console.log('added: window[' + "'" + 'AppViewModel' + "'" + ']');
		console.dir({
			"AppViewModel": this.attr()
		});
	},
});

can.stache.registerHelper('simpleRoute', function(options) {

	if (!process.browser) {
		return;
	}
	const routingBits = window.location.pathname.match(/^\/(\w+)\/*(\w*)\/*#*!*$/);

	if (!routingBits || typeof (routingBits[1]) == 'undefined') {
		return;
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

let alreadyBeenHere = false;
can.stache.registerHelper('confirmEmail', function(options) {
	if (!process.browser || alreadyBeenHere) {
		return;
	}

	alreadyBeenHere = true;

	if (window && window.location && window.location.pathname) {
		const confirmInfo = window.location.pathname.match(/\/confirmEmail\/(\w+)/);


		if (confirmInfo) {
			options.scope.attr('confirmEmailMessage', "Attempting to confirm email address");
			options.scope.attr('confirmEmailStatus', "incomplete");
			const confirmEmail = new ConfirmEmail({
				data: {
					confirmationKey: confirmInfo[1]
				}
			});

			confirmEmail.save((result) => {
				if (result.attr('0').attr('message')) {
					options.scope.attr('confirmEmailMessage', result.attr('0').attr('message'));
					options.scope.attr('confirmEmailStatus', "success");
				}
			}, (err) => {
				options.scope.attr('confirmEmailMessage', err.responseJSON.errorText);
				options.scope.attr('confirmEmailStatus', "error");

			});
		}
	}

});
export default AppViewModel;
