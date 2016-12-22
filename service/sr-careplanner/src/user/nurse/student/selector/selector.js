import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

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

		this.attr('parentVm').setTool('editor')

		
		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
		this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
		
		//plan/control/selector initializes the this.attr('parentVm').attr('workingPlan') 
		//based on either user input or most recent date
	},

	createNewStudent: function() {
		this.attr('showMenu', false);
		
		this.attr('parentVm').attr('newStudentFlag', true);
		this.attr('parentVm').attr('openStudentRefId', '');
		this.attr('parentVm').attr('openStudentNameString', 'Creating Student');
		
		this.attr('parentVm').attr('showStudentEditor', true); //forces editor (not summary), otherwise controlled by user in editor
		this.attr('parentVm').attr('workingPlan', {});
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