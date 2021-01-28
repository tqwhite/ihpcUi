import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './metadata.less!';
import template from './metadata.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-metadata component'
		}
	}
});

export default Component.extend({
	tag: 'user-nurse-plan-control-metadata',
	viewModel: ViewModel,
	events: {
		'input change': function(el, event) {
			this.viewModel.attr('planRootVm').savePlan();
		}
	},
	template
});
