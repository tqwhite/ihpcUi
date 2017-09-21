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
	
	fillTestData:function(){
		const testStudent={
"first":"Demo",
"last":"Dolly",
"gTwoPhoneMain":"888-888-8888",
"gTwoPhoneAlt":"666-666-6666",
"gTwoZip":"00000",
"gTwoState":"ST",
"gTwoCity":"City",
"gTwoStreet2":"",
"gTwoStreet1":"1111 Street Blvd",
"gTwoName":"Daddy Father",
"gTwoRelationship":"father",
"gOnePhoneMain":"999-999-9999",
"gOnePhoneAlt":"888-888-8888",
"gOneZip":"99999",
"gOneState":"ST",
"gOneCity":"City",
"gOneStreet2":"Apt 000",
"gOneStreet1":"999 Street St",
"gOneName":"Momma Mother",
"gOneRelationship":"mother",
"eap":true,
"504plan":false,
"eep":false,
"iep":true,
"IDC9CM":"410 Acute myocardial infarction",
"hcTwoEmailAdr":"js@example.com",
"hcTwoPhone":"111-111-1111",
"hcTwoName":"Dr Jones",
"hcOneEmailAdr":"ds@example.com",
"hcOnePhone":"000-000-0000",
"hcOneName":"Dr Smith",
"teacher":"Ms Teacher",
"school":"Zaphod Junior High",
"idNumber":"9999999",
"gender":"female",
"birthday":"12/25/89",
"phone":"555-555-5555",
"zip":"00000",
"state":"ST",
"city":"City",
"street2":"",
"street1":"0000 Street Dr",
"middle":"Z",
"refId":qtools.newGuid()
}
this.attr('student', new Student(testStudent));
	},
	
	saveObject: function() {


		var student=this.attr('student'); //this should probably be renamed workingStudent to match the pattern elsewhere
		
		//validation goes here, with a return;
		
		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		if (student.isNew()){
			student.attr('refId', this.attr('parentVm').attr('openStudentRefId'));//openStudentRefId is set by user-nurse-student-selector for new students
			this.attr('annotation', '');
		}
		
		var	promise=student
			.save()
			.then(
				() => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);
				
					this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
					this.attr('parentVm').attr('currentStudent', student);
					this.attr('parentVm').countInactive(this.attr('parentVm').attr('students'));

				},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
			);
	},

	testElement: function() {
		window['user-nurse-student-editor']=this;
		console.log('added: window['+"'"+'user-nurse-student-editor'+"'"+']');
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