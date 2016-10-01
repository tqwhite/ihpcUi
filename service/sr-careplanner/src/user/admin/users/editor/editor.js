import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-users-editor component'
    }
  },
	saveObject: function() {

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		var saveObj = this.attr('usersRootVm').attr('workingUser');
		var promise;
		var self = this;

		if (saveObj.isNew()) {
			//	saveObj.attr('refId', qtools.newGuid()); //the plan is generated with a refId and wired in at creation, don't need this
			promise = saveObj.save().then(function() {
				self.attr("saveObj", new Plan());
			});
		} else {
			promise = saveObj.save();
		}

		promise
			.then(() => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);

				this.attr('saveNotificationTimeoutId', timeoutId);
				//		this.attr('planRootVm').attr('newsaveObjFlag', false);
				this.attr('usersRootVm').attr('workingUser', saveObj);
				//	this.attr('planRootVm').attr('openPlanNameString', saveObj.attr('createdAt'));

			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},

	testElement: function() {
		window['user-admin-users-editor']=this;
		console.log('added: window['+"'"+'user-admin-users-editor'+"'"+']');
		console.dir({
			"user-admin-users-editor": this.attr()
		});
	}
});

export default Component.extend({
  tag: 'user-admin-users-editor',
  viewModel: ViewModel,
	events: {
		'input change': function() {
			this.viewModel.saveObject();
		},
		'textarea change': function() {
			this.viewModel.saveObject();
		}

	},
  template
});