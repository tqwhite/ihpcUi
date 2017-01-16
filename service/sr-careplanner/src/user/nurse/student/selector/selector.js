import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selector component'
		},
		showMenu: {
			value: ''
		}
	},
	
	
	
	activateMenu: function(event) {
		event.stopPropagation();
		this.attr('showMenu', true);
		this.attr('%root').activateModal(() => {
			this.attr('showMenu', false);
		});
	},
	chooseStudent: function(student) {
		this.attr('showMenu', false);

		this.attr('parentVm').setTool('editor'); //activate student editor, leaves in current state, summary or edit

		
		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
		this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
		this.attr('parentVm').attr('workingPlan', {});
		//plan/control/selector initializes the this.attr('parentVm').attr('workingPlan') 
		//based on either user input or most recent date
	},

	createNewStudent: function() {
		this.attr('showMenu', false);
		this.attr('parentVm').setTool('editor');
		this.attr('parentVm').attr('showStudentEditor', true); //forces editor (not summary), otherwise controlled by user in editor
		this.attr('parentVm').attr('openStudentRefId', qtools.newGuid());	
		this.attr('parentVm').attr('workingPlan', {});	
		this.attr('parentVm').attr('openStudentNameString', 'Creating Student');

		setTimeout(()=>{
		this.attr('parentVm').attr('newStudentFlag', true); //redisplay after dom is settled
		}, 1);
	},

});

export default Component.extend({
	tag: 'user-nurse-student-selector',
	viewModel: ViewModel,
	events: {
		'li click': function(el, event) {
			this.viewModel.activateMenu(event);
		}

	},
	template
});