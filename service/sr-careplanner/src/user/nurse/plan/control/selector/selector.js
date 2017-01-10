import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-control-selector component'
		},
		showPlanSelector: {
			value: true
		}
	},
	
	notes:[
		"openStudentHasPlans sits in /nurse. It is a virtual property, ie, calculated from other things."
	],
	
	formatDate:function(inData){

	const result=qtools.getDateString('dd_MMM_yyyy', new Date(inData));

		return result
	},
	
	updateStaticPlanDetails: function(newRefId) {
		const openStudentRefId = this.attr('planRootVm').attr('openStudentRefId')
		
		const planRefIdStudentMapList = this.attr('planRootVm').attr('%root').attr('planRefIdStudentMapList');
		planRefIdStudentMapList.attr(openStudentRefId, newRefId);
		
		const hasPlansStudentMapList = this.attr('planRootVm').attr('hasPlansStudentMapList');
		hasPlansStudentMapList.attr(openStudentRefId, true);
	},
	
	menuIsVisible:function(visibility){
		setTimeout(()=>{this.attr('showPlanSelector', visibility);}, 100);
	},
	
	activateMenu: function(event) {
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('showPlanSelector', false);
		});
		this.menuIsVisible(true);
 		this.updateStaticPlanDetails('');
	},
	
	choosePlan: function(inx, element) {
		this.updateStaticPlanDetails(element.attr('refId'));
		
		this.attr('planRootVm').attr('workingPlan', element);
		this.attr('planRootVm').attr('openPlanNameString', element.attr('createdAt')); //flow through to latestPlanRefid when it's accessed

		this.menuIsVisible(false);
	},
	
	createNewPlan:function(){
		const newPlan=this.attr('planRootVm').attr('blankPlan');
		this.updateStaticPlanDetails(newPlan.refId);
		this.attr('planRootVm').attr('workingPlan', newPlan);
		
		this.attr('planRootVm').attr('openPlanNameString', new Date().toString()); //flow through to latestPlanRefid when it's accessed
		
		//this.menuIsVisible(); //Once new plan is created, it gets chosen automatically, choosePlan() closes menu
	},
	
	testElement: function(x) {
		console.dir({
			"user-nurse-plan-control-selector": this.attr(),
			"plans": this.attr('planRootVm').attr(),
		});
	},
});

export default Component.extend({
  leakScope: true,
	tag: 'user-nurse-plan-control-selector',
	viewModel: ViewModel,
	template
});