import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import Student from "sr-careplanner/models/student";
import qtools from "node_modules/qtools-minus/";

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
			value: Student,
			type: '*',
			note:'bitballs called for type:Student but that causes error'
		},
	},

	createNewCondition: function() {
	
	//NOT IN USE YET!!
	
		this.attr('newConditionFlag', true);
		this.attr('openConditionId', '');
	},
	
	saveObject: function() {

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}


		var student=this.attr('student');
		var promise;
		var self=this;
		
		if (student.isNew()){
			student.attr('refId', qtools.newGuid());
			promise = student.save().then(function(){
				self.attr("student", new Student());
			});
		}
		else{
			promise=student.save();
		}
		
			promise
			.then(() => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);
				
				this.attr('saveNotificationTimeoutId', timeoutId);
		//		this.attr('parentVm').attr('newStudentFlag', false);
				this.attr('student', student);
				this.attr('annotation', '');
				this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
				this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
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