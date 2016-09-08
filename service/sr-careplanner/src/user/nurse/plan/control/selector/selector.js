import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
init:function(a, b){

console.dir({"a":a});
console.dir({"b":b});




},
  define: {
    message: {
      value: 'This is the user-nurse-plan-control-selector component'
    },
		showSelector: {
			value: true
		}
  },
	displaySelector: function(control) {
		this.attr('showSelector', control);
		this.attr('parentVm').attr('workingPlan', '');
	},
	choosePlan: function(inx, element) {
		//note: student/selector clears workingPlan when activated
		this.attr('planRootVm').attr('newPlanFlag', false);
		this.attr('planRootVm').attr('openPlanRefId', element.attr('refId'));
		this.attr('planRootVm').attr('openPlanNameString', element.attr('createdAt'));
		
		this.attr('planRootVm').attr('workingPlan', element);
		this.attr('showSelector', false);
	},
	
	pickRecent:function(){
	
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