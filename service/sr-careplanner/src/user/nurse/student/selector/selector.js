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
		showSelector: {
			value: ''
		}
	},
	displaySelector: function(event) {
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('showSelector', false);
		});
		
		this.attr('showSelector', true);
//		this.attr('parentVm').attr('workingPlan', '');
	},
	chooseStudent: function(inx, student) {
		this.attr('parentVm').attr('newStudentFlag', false);
		this.attr('parentVm').attr('openStudentRefId', student.attr('refId'));
		this.attr('parentVm').attr('openStudentNameString', student.attr('last')+', '+student.attr('first'));
		this.attr('showSelector', false);

	},

});

export default Component.extend({
	tag: 'user-nurse-student-selector',
	viewModel: ViewModel,
	events: {
		'li click': function(el,event) {
			this.viewModel.displaySelector(event);
		}

	},
	template
});