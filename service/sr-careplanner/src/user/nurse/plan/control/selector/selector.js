import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-control-selector component'
		},
		showSelector: {
			value: true
		}
	},
	updatePlanRefIdStudentMapList: function(newRefId) {
		const openStudentRefId = this.attr('planRootVm').attr('openStudentRefId')
		const planRefIdStudentMapList = this.attr('planRootVm').attr('planRefIdStudentMapList');
		planRefIdStudentMapList.attr(openStudentRefId, newRefId); //the magic of two way binding
	},
	displaySelector: function(control) {
		this.attr('showSelector', control);
		this.updatePlanRefIdStudentMapList('');
		this.attr('planRootVm').attr('workingPlan', '');
	},
	choosePlan: function(inx, element) {
		
		//these two lines are not used so far. may remove. Presently workingPlan is doing their work.
		this.attr('planRootVm').attr('newPlanFlag', false);
		this.attr('planRootVm').attr('openPlanRefId', element.attr('refId'));
		
		//note: student/selector clears workingPlan when activated
		this.attr('planRootVm').attr('workingPlan', element);

		this.updatePlanRefIdStudentMapList(element.attr('refId')); //should
		this.attr('planRootVm').attr('openPlanNameString', element.attr('createdAt')); //flow through to latestPlanRefid when it's accessed
		this.attr('showSelector', false);
	},

	testElement: function(x) {
		console.dir({
			"user-nurse-plan-control-selector": this.attr(),
			"plans": this.attr('planRootVm').attr(),
		});
	},
});

export default Component.extend({
	tag: 'user-nurse-plan-control-selector',
	viewModel: ViewModel,
	template
});