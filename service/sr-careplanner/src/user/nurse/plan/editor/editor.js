import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import Plan from "sr-careplanner/models/plan";
import qtools from "node_modules/qtools-minus/";
import Boilerplate from "sr-careplanner/models/boilerplate";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-editor component'
		},
    boilerplates: {
		get: function() {
			const list=Boilerplate.getList({});
			return list;
		},
	showConditionSelector:{
		value:false,
		type:'*'
	}
  }
	},
	saveObject: function() {

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}


		var saveObj = this.attr('planRootVm').attr('workingPlan');
		var promise;
		var self = this;


		if (saveObj.isNew()) {
		//	saveObj.attr('refId', qtools.newGuid()); //the plan is generated with a refId and wired in at creation, don't need this
			promise = saveObj.save().then(function() {
				self.attr("saveObj", new Plan());
			});
		} else {
			promise = saveObj.save();
		}

		promise
			.then(() => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);

				this.attr('saveNotificationTimeoutId', timeoutId);
				//		this.attr('planRootVm').attr('newsaveObjFlag', false);
				this.attr('planRootVm').attr('workingPlan', saveObj);
				this.attr('planRootVm').attr('openPlanNameString', saveObj.attr('createdAt'));

			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},
	
	showConditionTool:function(event){
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('showConditionSelector', false);
		});
		this.attr('showConditionSelector', true);
	},

	newCondition: function(boilerplateItem) {


		let newCondition = this.attr('planRootVm').attr('blankCondition');
		if (boilerplateItem){
			newCondition=this.addBoilerPlate(newCondition, boilerplateItem);
		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').unshift(newCondition)
		this.attr('showConditionSelector', false);
		if (boilerplateItem){
			this.saveObject();
		}
	},
	
	addBoilerPlate:function(newCondition, boilerplateItem){
		['shortName', 'title'].map((item)=>{
			newCondition[item]=boilerplateItem[item];
		});
			newCondition.sourceConditionRefId=boilerplateItem.refId;
		
		return newCondition;
	},

	deleteCondition: function(index) {
		// 		if (!window.confirm('Are you sure?')) {
		// 			return;
		// 		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').removeAttr(index)
		this.saveObject();
	},

	createDiagnosis: function(index) {
		const newDiagnosis=this.attr('planRootVm').attr('blankDiagnosis')
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').attr(0).attr('diagnoses').push(newDiagnosis);
	},

	deleteDiagnosis: function(index) {
		// 		if (! window.confirm('Are you sure?')) {
		// 			return;
		// 		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').attr(0).attr('diagnoses').removeAttr(index)
		this.saveObject()
	},

	testElement: function(x) {
		console.dir({
			"user-nurse-plan-editor": this.attr()
		});
	},
});

export default Component.extend({
	tag: 'user-nurse-plan-editor',
	viewModel: ViewModel,
	events: {
		'input change': function() {
			this.viewModel.saveObject();
		},
		'textarea change': function() {
			this.viewModel.saveObject();
		}

	},
	template
});