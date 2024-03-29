import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import Plan from "sr-careplanner/models/plan";
import qtools from "lib/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-editor component'
		},
		showConditionSelector: {
			value: false,
			type: '*'
		},
		closeSpotState:{
			value:false,
			set:function(value){
				if (!value){
					return value;
				}
				else{
					return this.allConditionsAreSummary();
				}
			}
		}
	},

	showConditionTool: function(event) {
		event.stopPropagation();
		this.attr('%root').activateModal(() => {
			this.attr('showConditionSelector', false);
		});
		this.attr('showConditionSelector', true);
	},

	addNewCondition: function(boilerplateCondition) {
		let newCondition = this.attr('planRootVm').attr('blankCondition');
		if (boilerplateCondition) {
			newCondition = this.addBoilerPlateCondition(newCondition, boilerplateCondition);
			newCondition = this.addDefaultDiagnoses(newCondition, boilerplateCondition);
		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').push(newCondition)
		this.attr('showConditionSelector', false);
		if (boilerplateCondition) {
			this.attr('planRootVm').savePlan(); //planRootVm is nurse.js;
		}
	},
	addDefaultDiagnoses:function(newCondition, boilerplateCondition){
		const boilerplateDiagnoses=boilerplateCondition.attr('diagnoses');
		let newDiagnosis;

		for (var i=0, len=boilerplateDiagnoses.length; i<len; i++){
			var element=boilerplateDiagnoses[i];
			if (element.attr('includeByDefault')){
				newDiagnosis = this.attr('planRootVm').attr('blankDiagnosis')
				newDiagnosis = this.addBoilerPlateDiagnosis(newDiagnosis, element);
				newCondition.diagnoses.push(newDiagnosis);
			}
		}

		return newCondition;
		
	},

	addDiagnosis: function(condition, boilerplateDiagnosis) {
		let newDiagnosis = this.attr('planRootVm').attr('blankDiagnosis')
		if (boilerplateDiagnosis) {
			newDiagnosis = this.addBoilerPlateDiagnosis(newDiagnosis, boilerplateDiagnosis);
		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		
		
		condition.attr('diagnoses').push(newDiagnosis);
		if (boilerplateDiagnosis) {
			this.attr('planRootVm').savePlan(); //planRootVm is nurse.js;
		}
	},

	getBoilerplateItem: function(condition, boilerplatePropertyName) {
		const sourceConditionRefId = condition.sourceConditionRefId || condition.attr('sourceConditionRefId');
		if (!sourceConditionRefId){
			return;
		}
		const boilerplateRefIdLookupObject=this.attr('planRootVm').attr('boilerplateRefIdLookupObject');
		const boilerplaceCondition=boilerplateRefIdLookupObject[sourceConditionRefId];
		if (boilerplaceCondition[boilerplatePropertyName]){
			return boilerplaceCondition[boilerplatePropertyName];
		}
		return;
	},

	addBoilerPlateCondition: function(newCondition, boilerplateItem) {
		['shortName', 'title'].map((item) => {
			newCondition[item] = boilerplateItem[item];
		});
		newCondition.sourceConditionRefId = boilerplateItem.refId;

		return newCondition;
	},

	addBoilerPlateDiagnosis: function(newDiagnosis, boilerplateItem) {
		['nursingDiagnosis', 'interventions', 'outcomes', 'shortName', 'assessmentData'].map((item) => {
			newDiagnosis[item] = boilerplateItem[item];
		});
		newDiagnosis.sourceDiagnosisRefId = boilerplateItem.refId;

		return newDiagnosis;
	},

	deleteCondition: function(index) {
		// 		if (!window.confirm('Are you sure?')) {
		// 			return;
		// 		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').removeAttr(index)
		this.attr('planRootVm').savePlan(); //planRootVm is nurse.js;
	},

	deleteDiagnosis: function(index, condition) {
		// 		if (! window.confirm('Are you sure?')) {
		// 			return;
		// 		}
		const planList = this.attr('planRootVm').attr('workingPlan');
		condition.attr('diagnoses').removeAttr(index)
		this.attr('planRootVm').savePlan(); //planRootVm is nurse.js
	},
	
	allConditionsAreSummary:function(){
		let allSummary=false;
		const childList=this.childComponentLists['user-nurse-plan-editor-condition'];
		for (var i=0, len=childList.length; i<len; i++){
			allSummary=allSummary || childList[i].attr('showEditView');
		}
		return allSummary;
	},
	
	changeConditionsView:function(){
		//sets all to summary if any are not summary, all to open otherwise
		const childList=this.childComponentLists['user-nurse-plan-editor-condition'];
		let allSummary=this.allConditionsAreSummary();
		this.attr('closeSpotState', allSummary);
		for (var i=0, len=childList.length; i<len; i++){
				childList[i].attr('showEditView', !allSummary)
		}
	},
	
	collectChildComponents:function(childType, childVm){
		this.childComponentLists=this.childComponentLists || {};
		this.childComponentLists[childType]=this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-nurse-plan-editor']=this;
		console.log('added: window['+"'"+'user-nurse-plan-editor'+"'"+']');
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
			this.viewModel.attr('planRootVm').savePlan();
		},
		'textarea change': function() {
			this.viewModel.attr('planRootVm').savePlan();
		}

	},
	template
});