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
  updateRefIdPlanList:function(newRefId){
		const openStudentRefId=this.attr('planRootVm').attr('openStudentRefId')
		const  refIdPlanList=this.attr('planRootVm').attr('refIdPlanList');
		refIdPlanList.attr(openStudentRefId, newRefId); //the magic of two way binding
  },
	displaySelector: function(control) {
		this.attr('showSelector', control);
		this.updateRefIdPlanList('');
		this.attr('planRootVm').attr('workingPlan', '');
	},
	choosePlan: function(inx, element) {
		//note: student/selector clears workingPlan when activated
		this.attr('planRootVm').attr('newPlanFlag', false);
		this.attr('planRootVm').attr('openPlanRefId', element.attr('refId'));
		this.attr('planRootVm').attr('openPlanNameString', element.attr('createdAt'));
		
		this.updateRefIdPlanList(element.attr('refId')); //should flow through to latestRefId when it's accessed
		this.attr('planRootVm').attr('workingPlan', element);
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