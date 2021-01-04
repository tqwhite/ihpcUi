import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';
import qtools from 'node_modules/qtools-minus/';
import Plan from "sr-careplanner/models/plan";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-control-selector component'
		},
		selectorMode: {
			value: '',
			serialize: false
		},
		localStatusMessage: {
			value: '',
			serialize: false
		},
		showConfirmDuplicatePlan: {
			value: false,
			serialize: false
		},
	},
	
	notes: [
		'openStudentHasPlans sits in /nurse. It is a virtual property, ie, calculated from other things.'
	],
	
	showPlanDate: function(element) {
		const planDate = element.attr('planDate');
		const creationDate = element.attr('createdAt');
		const displayDate = planDate ? planDate : creationDate;
		const result = qtools.getDateString('dd_MMM_yyyy', new Date(displayDate));

		return result;
	},
	
	updateStaticPlanDetails: function(newRefId) {
		const openStudentRefId = this.attr('planRootVm').attr('openStudentRefId');

		const planRefIdStudentMapList = this.attr('planRootVm')
			.attr('%root')
			.attr('planRefIdStudentMapList');
		planRefIdStudentMapList.attr(openStudentRefId, newRefId);

		const hasPlansStudentMapList = this.attr('planRootVm').attr(
			'hasPlansStudentMapList'
		);
		hasPlansStudentMapList.attr(openStudentRefId, true);
	},
	
	menuIsVisible: function(visibility) {
		setTimeout(() => {
			this.attr('planRootVm').attr('showPlanSelector', visibility);
		}, 100);
	},
	
	activateMenu: function(event) {
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('planRootVm').attr('showPlanSelector', false);
		});
		this.menuIsVisible(true);
		this.updateStaticPlanDetails('');
	},
	
	choosePlan: function(inx, element) {
		this.updateStaticPlanDetails(element.attr('refId'));
		const planDate = element.attr('planDate');
		const creationDate = element.attr('createdAt');
		const displayDate = planDate ? planDate : creationDate;

		this.attr('planRootVm').attr('workingPlan', element);
		this.attr('planRootVm').attr('openPlanNameString', 'XXX'); //flow through to latestPlanRefid when it's accessed

		this.menuIsVisible(false);
	},
	
	createNewPlan: function(conditions, callback) {
		const newPlan = this.attr('planRootVm').attr('blankPlan');
		if (conditions){
			newPlan.attr('conditions', conditions);
		}
		this.updateStaticPlanDetails(newPlan.refId);
		this.attr('planRootVm').attr('workingPlan', newPlan);
		this.attr('planRootVm').attr('openPlanNameString', new Date().toString()); //flow through to latestPlanRefid when it's accessed
		callback && callback();
		//this.menuIsVisible(); //Once new plan is created, it gets chosen automatically, choosePlan() closes menu
	},
	cancelSpecialButtonMode: function(event) {
		this.attr('selectorMode', '');
		this.attr('localStatusMessage', '');
	},
	
	activateDuplicatePlan:function(){
		this.attr('selectorMode', 'duplicatePlan');

	},
	
	confirmDuplicatePlan:function(){
		const originalPlan=this.attr('planRootVm').attr('workingPlan').attr();
		this.createNewPlan(originalPlan.conditions, ()=>{
		this.attr('planRootVm').savePlan();
		
		this.attr('selectorMode', '');
		
		});
	},
	
	testElement: function(x) {
		console.dir({
			'user-nurse-plan-control-selector': this.attr(),
			plans: this.attr('planRootVm').attr()
		});
	}
});

export default Component.extend({
	tag: 'user-nurse-plan-control-selector',
	viewModel: ViewModel,
	template,
	events: {
		'input change': function() {
			this.viewModel.savePlanDate();
		}
	}
});
