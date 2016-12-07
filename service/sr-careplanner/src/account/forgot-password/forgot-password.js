import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './forgot-password.less!';
import template from './forgot-password.stache!';
import ForgotPassword from "sr-careplanner/models/forgot-password";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the account-forgot-password component'
		},
		forgotPasswordInfo: {
			value: 'tqwhite',
			serialize: false
		}
	},
	findErrors: function(saveObj, domObj) {
		let errorList = saveObj.validate();
		if (errorList.length) {
			setTimeout(() => {
				domObj.addClass('error');
				domObj.focus();
			}, 100);
			this.attr('errorList', {
				user: errorList,
				domObj: domObj
			});
			return true;
		}
		return false;
	},
	sendResetEmail: function(domObj) {

		var saveObj = new ForgotPassword({
			forgotPasswordInfo: this.attr('forgotPasswordInfo')
		});

		if (this.findErrors(saveObj, domObj)) {
			return;
		}

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		var promise = saveObj
			.save()
			.then(
				(item) => {
					this.attr('saveNotification', true);
					this.attr('saveMessage', "It worked! We found an email address resembling <span style='color:black;'>"+item.obscureEmail+"</span><br/>1) We sent an email message containing a link that will help you change your password to something you know. Please remember to check spam if it does not show up soon.<br/>2) The link it contains only lasts fifteen minutes (for security reasons) so don't dawdle.");
					setTimeout(() => {
						this.attr('%root').attr('newlyRegisteredUserName', item.username);
						this.attr('%root').setNewPage('', 'login');
					}, 6000);

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
});

export default Component.extend({
	tag: 'account-forgot-password',
	viewModel: ViewModel,
	template
});