import Map from "can/map/";
import Session from "sr-careplanner/models/session";
import qtools from "node_modules/qtools-minus/"; //I do not understand why I have to put node_modules here but not on can/map

import User from "sr-careplanner/models/user";
import ConfirmEmail from "sr-careplanner/models/confirm-email";
import ResendEmail from "sr-careplanner/models/resend-email";


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
					if (dictionary.length === 0) {
						dictionary.push({
							pattern: 'writtenby',
							replacement: 'Written By'
						});
						dictionary.push({
							pattern: 'district',
							replacement: 'District'
						});
						item.save();
					}

				});

				return loginUser;
			},
		},
		richTextExperiment: {
			value: '',
			note: 'any value turns on the experiment',
			note2: '*everything* associated with this experiment has this attribute, richTextExperiment',
			serialize: false
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
				}
				return value;
			},
			serialize: false //or, function(val, type){ return f(val); }
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
				//someday, reinitialize session activity timeout here
				return value;

			}
		},
		systemCompanyName: {
			value: 'Sunrise River Press',
			serialize: false
		},
		systemProdName: {
			value: 'Care Planner',
			serialize: false
		},
		message: {
			value: 'Hello World!',
			serialize: false
		},
		title: {
			value: 'sr-careplanner',
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
		pdfmakePresent: {
			value: true,
			serialize: false
		},
		newlyRegisteredUserName: {
			value: '',
			serialize: false,
		},
		loginUserDataOnly: {
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
		showResendNotification:{
			serialize:false
			},
		changePasswordKey:{
			serialize:false
			}
	},
	setNewPage: function(page, slug, subsection) {
		this.attr('page', page);
		this.attr('slug', slug);
		this.attr('subsection', subsection);
	},
	logout: function() {
		window.location.href = '/';
	},
	clearConsole: function() {
		console.clear();
	},
	activateModal: function(callback) {
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
	
	resend.save((result)=>{
	
		setTimeout(()=>{
		$('.showResendNotificationContainer').fadeOut(1000, ()=>{
		this.attr('showResendNotification', '');
		$('.unconfirmedEmailAddressNotification').animate({opacity: 0.4});
		});
	}, 3000);
	},
	(err)=>{
		console.dir({"err":err});
	})

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
