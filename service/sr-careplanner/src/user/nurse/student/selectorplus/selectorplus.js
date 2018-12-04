import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selectorplus.less!';
import template from './selectorplus.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selectorplus component'
		},
    searchField:{
    	value:'',
    	serialize:false
    },
	},
	
	activateMenu: function(event) {
		event.stopPropagation();
		this.attr('%root').attr('showStudentManager', true);
		this.attr('%root').activateModal(() => {
			this.attr('%root').attr('showStudentManager', false);
		});
	},
	chooseStudent: function(student) {
		this.attr('%root').attr('showStudentManager', false);

		this.attr('parentVm').setTool('editor'); //activate student editor, leaves in current state, summary or edit

		
		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
		this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
		this.attr('parentVm').attr('workingPlan', {});
		//plan/control/selector initializes the this.attr('parentVm').attr('workingPlan') 
		//based on either user input or most recent date
	},
	
	toggleInactive:function(){
		this.attr('parentVm').attr('showInactiveStudents', !this.attr('parentVm').attr('showInactiveStudents'));
	},

	createNewStudent: function() {
			this.attr('%root').attr('showStudentManager', false);
		this.attr('parentVm').setTool('editor');
		this.attr('parentVm').attr('showStudentEditor', true); //forces editor (not summary), otherwise controlled by user in editor
		this.attr('parentVm').attr('openStudentRefId', qtools.newGuid());	
		this.attr('parentVm').attr('workingPlan', {});	
		this.attr('parentVm').attr('openStudentNameString', 'Creating Student');
		
		/*
			When an existing student is chosen, it's values overwrite the all the previous
			student's fields. When New Student is chosen, it's empty and doesn't overwrite
			whatever was there previously. The following prevents previous values from
			remaining if New Student is chosen twice in a row (with no intervening editing
			of a previously existing student).

		setTimeout(()=>{
		this.attr('parentVm').attr('newStudentFlag', false); //remove student editor

			setTimeout(()=>{
			this.attr('parentVm').attr('newStudentFlag', true); //display new student editor
			}, 1);
		}, 1);
		
			LATER...
			
			I hated the little flash that appeared when the code above was executed. I did a 
			whole bunch of things to try to get rid of it. THen I just got rid of it.
			Everything seems to work. THe values from the previous student are not kept.
			I have no idea why I felt like the timeout stuff was necessary. If a problem 
			occurs, perhaps getting rid of it is hte reason. For now, it looks much better.
			tqii, 12/18
		*/
		
		this.attr('parentVm').attr('newStudentFlag', true);
	},

});

export default Component.extend({
	tag: 'user-nurse-student-selectorplus',
	viewModel: ViewModel,
	events: {
		'li click': function(el, event) {
			this.viewModel.activateMenu(event);
		}

	},
	template
});