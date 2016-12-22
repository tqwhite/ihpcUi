import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './control.less!';
import template from './control.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-control component'
		}
	},
	createPlanIfNone: function(selectorVm) {
		setTimeout(() => {
			if (!this.attr('planRootVm').attr('workingPlan').refId) {
				selectorVm.createNewPlan()
			}
		}, 100);
	},
});
export default Component.extend({
	tag: 'user-nurse-plan-control',
	viewModel: ViewModel,
	template
});