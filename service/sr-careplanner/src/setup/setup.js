import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './setup.less!';
import template from './setup.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the setup component'
		},
		subsection: {
			value: 'dictionary'
		},
		loginUser: {
			note: 'set by userPromise, accessed by various setup editors.'
		},

		userPromise: {
			get: function() {
				const session = this.attr('%root').attr('session');
				const userPromise = User.get({
					_id: session.attr('0')._id
				})
					.then((item) => {
						this.attr('loginUser', item.attr());
					});

				return userPromise;

			},
			set: function(value) {
				return value;
			}

		},
	},
	saveObject: function(domObj) {

		var loginUser = this.attr('loginUser');

		var saveObj = new User(loginUser);

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		var promise = saveObj
			.save()
			.then(
				() => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);

				},
				(err) => {
					this.attr('saveNotification', false);
					const errorObj = JSON.parse(err.responseText);

					this.attr('errorList', {
						user: [errorObj],
						domObj: domObj
					});


					//	this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
		);
	},


	setSubsection: function(subsection) {
		this.attr('subsection', subsection);
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup'] = this;
		console.log('added: window[' + "'" + 'setup' + "'" + ']');
		console.dir({
			"setup": this.attr(),
			'childComponentLists': this.childComponentLists
		});
	}
});

export default Component.extend({
	tag: 'setup',
	viewModel: ViewModel,
	template
});