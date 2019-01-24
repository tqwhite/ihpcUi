import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-control-selector component'
		},
		showPlanSelector: {
			value: true,
			serialize: false
		},
		showChangePlanDate: {
			value: false,
			serialize: false
		},
		newPlanDate: {
			value: '',
			serialize: false
		},
		localStatusMessage: {
			value: '',
			serialize: false
		}
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
			this.attr('showPlanSelector', visibility);
		}, 100);
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
		const planDate = element.attr('planDate');
		const creationDate = element.attr('createdAt');
		const displayDate = planDate ? planDate : creationDate;

		this.attr('planRootVm').attr('workingPlan', element);
		this.attr('planRootVm').attr('openPlanNameString', displayDate); //flow through to latestPlanRefid when it's accessed

		this.menuIsVisible(false);
	},
	
	createNewPlan: function() {
		const newPlan = this.attr('planRootVm').attr('blankPlan');
		this.updateStaticPlanDetails(newPlan.refId);
		this.attr('planRootVm').attr('workingPlan', newPlan);

		this.attr('planRootVm').attr('openPlanNameString', new Date().toString()); //flow through to latestPlanRefid when it's accessed

		//this.menuIsVisible(); //Once new plan is created, it gets chosen automatically, choosePlan() closes menu
	},
	activateChangePlanDate: function(event) {
		this.attr('showChangePlanDate', true);
		setTimeout(() => $('#planDateInput').focus(), 10);
	},
	cancelChangePlanDate: function(event) {
		this.attr('showChangePlanDate', false);
		this.attr('localStatusMessage', '');
	},
	savePlanDate: function(event) {
		const newPlanDate = this.attr('newPlanDate');
		if (new Date(newPlanDate) != 'Invalid Date') {
			this.attr('localStatusMessage', '');
			this.attr('planRootVm')
				.attr('workingPlan')
				.attr('planDate', newPlanDate);

			this.attr('planRootVm').savePlan(err=>{
			this.cancelChangePlanDate();
console.log("this.attr('planRootVm').attr('openPlanNameString')="+this.attr('planRootVm').attr('openPlanNameString')+" [selector.js.savePlanDate]");

			this.attr('planRootVm').attr('openPlanNameString', newPlanDate);
console.log("this.attr('planRootVm').attr('openPlanNameString')="+this.attr('planRootVm').attr('openPlanNameString')+" [selector.js.savePlanDate]");

			
			}); //planRootVm is nurse.js
		}
		else{
			this.attr('localStatusMessage', 'Date entered is incorrect');
		}
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
