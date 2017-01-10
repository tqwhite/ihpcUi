import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './change-password.less!';
import template from './change-password.stache!';
import ChangePassword from "sr-careplanner/models/change-password";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the account-change-password component'
    },
		newPassword: {
			value: 'test22',
			serialize: false
		},
		newConfirmPassword: {
			value: 'test22',
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
	changePassword: function(domObj) {

		var saveObj = new ChangePassword({
			newPassword: this.attr('newPassword'),
			newConfirmPassword: this.attr('newConfirmPassword'),
			changePasswordKey:this.attr('%root').attr('changePasswordKey')
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
					this.attr('saveMessage', "It worked! The password for login username <span style='color:#999;font-weight:bold;'>'"+item.username+"'</span> has been changed. You can use it for login immediately.");
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
					setTimeout(()=>{
						this.attr('%root').setNewPage("account", "forgot-password");
					}, 5000);
				}
		);
		return false;
	},
});

export default Component.extend({
  leakScope: true,
  tag: 'account-change-password',
  viewModel: ViewModel,
  template
});