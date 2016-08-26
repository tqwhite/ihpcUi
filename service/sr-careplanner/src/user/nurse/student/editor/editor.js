import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import Student from "sr-careplanner/models/student";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-editor component'
		},
		saveNotification: {
			value: false,
			type: '*'
		},
		saveNotificationTimeoutId: {
			value: false,
			type: '*'
		},
		saveError: {
			value: '',
			type: '*'
		},
		student: {
			value: 'set by caller',
			type: '*'
		},
	},
	saveObject: function() {
		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}


		new Student(this.attr('student'))
			.save()
			.then((result) => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);
				this.attr('saveNotificationTimeoutId', timeoutId);

			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},

	testElement: function(x) {
		console.dir({
			"user-nurse-student-editor": this.attr()
		});
	}
});

export default Component.extend({
	tag: 'user-nurse-student-editor',
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