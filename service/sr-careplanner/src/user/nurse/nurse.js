import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';
import Student from "sr-careplanner/models/student";
import Plan from "sr-careplanner/models/plan";
import Boilerplate from "sr-careplanner/models/boilerplate";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse component'
		},
		boilerplates: {
			get: function() {
				const list = Boilerplate.getList({});
				this.boilerplateGetStaticInfo(list); //this operates the promise
				return list;
			}
		},
		students: {
			get: function() {
				const list = Student.getList({});
				return list;
			}
		},
		plans: {
			get: function() {
				const list = Plan.getList({
					studentRefId: this.attr('openStudentRefId')
				});
				this.capturePlanDetails(list);
				return list;
			}
		},

		workingPlan:{
			value:Plan,
			set:function(value){
				value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return value;
			}
		},

		planRefIdStudentMapList:{
			value:{}
		},

		hasPlansStudentMapList:{
			value:{}
		},

		showStudentEditor: {
			value: false
		},
		currentStudent:{
			value:'',
			note:'this is set as a consequences of setting openStudentRefId because of the history of student/selector'
		},
		openStudentRefId: {
			value: '',
			type: 'string',
			set: function(value) {

			let currentStudent;

			this.attr('students').then((students)=>{

			for (var i=0, len=students.length; i<len; i++){
				var item=students[i];
						const refId=item.attr('refId');
						if (refId==value){
							this.attr('currentStudent', item);
						}
			}

			});

				return value;
			}
		},
		newStudentFlag: {
			value: false,
			type: 'boolean',
			set: function(value) {
				return value;
			}
		},
		openStudentNameString: {
			value: '',
			type: 'string',
			set: function(value) {
				return value;
			}
		},
		blankPlan:{
			get:function(){
				const refId = qtools.newGuid();
				const newPlan={
					refId:refId,
					conditions:[]
				};
				return new Plan(newPlan);
			}
		},
		blankCondition:{
			get:function(){
				const refId = qtools.newGuid();
				const refId2 = qtools.newGuid();
				//const newDiagnosis=this.attr('blankDiagnosis');
				const newCondition = {
					refId: refId,
					sourceConditionRefId: null,
					title: '',
					diagnoses: []
				};

				return newCondition;
			}
		},
		blankDiagnosis:{
			get:function(){
				const refId = qtools.newGuid();
				const newDiagnosis={
						refId: refId,
						sourceDiagnosisRefId: null,
						assessment: '',
						nursingDiagnosis: '',
						interventions: '',
						outcomes: '',
						shortName: ''
					};
				return newDiagnosis;
			}
		},
		latestPlanRefid: {
			value: 'hello',
			get: function() {

				const planRefIdStudentMapList = this.attr('planRefIdStudentMapList');
				const openStudentRefId = this.attr('openStudentRefId');

				if (planRefIdStudentMapList) {
					return planRefIdStudentMapList.attr(openStudentRefId);
				}
				return '';
			}
		},
		openStudentHasPlans: {
			value: 'hello',
			get: function() {

				const hasPlansStudentMapList = this.attr('hasPlansStudentMapList');
				const openStudentRefId = this.attr('openStudentRefId');

				if (hasPlansStudentMapList) {
					return hasPlansStudentMapList.attr(openStudentRefId);
				}
				return '';
			}
		},

		boilerplateRefIdLookupObject:{
			value:'',
			type:'*'

		},

		currentTool:{
			value:'editor',
			serialize:false
		}
	},

	boilerplateGetStaticInfo:function(boilerplates){
// 		if(this.attr('boilerplateRefIdLookupObject')!==''){
// 			return;
// 		}

		let boilerplateRefIdLookupObject={};
		boilerplates.then((result)=>{
			result.each((item)=>{
				boilerplateRefIdLookupObject[item.refId]=item;
			});
			this.attr('boilerplateRefIdLookupObject', boilerplateRefIdLookupObject);
		});
	},

	capturePlanDetails: function(plansMap) {
		//note: this creates a persistent object because .then doesn't run when a student is
		//loaded a second time. May need to revise once 'new plan' is created.
		let chosen;
		plansMap.then((result) => {
			result.each((item) => {
				chosen = item.attr('refId');
			});
		if (chosen) {
			const planRefIdStudentMapList = this.attr('planRefIdStudentMapList');
			const openStudentRefId = this.attr('openStudentRefId');
			planRefIdStudentMapList.attr(openStudentRefId, chosen);
			const hasPlansStudentMapList=this.attr('hasPlansStudentMapList');
			hasPlansStudentMapList.attr(openStudentRefId, true);
		}
		});

	},

	showSummary: function() {
		this.attr('showStudentEditor', false);
		this.attr('newStudentFlag', false);
	},

	hideSummary: function() {
		this.attr('showStudentEditor', true);
	},

	setTool:function(newToolName){
		this.attr('currentTool', newToolName);
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function(x) {
		window['user-nurse']=this;
		console.log('added: window['+"'"+'user-nurse'+"'"+']');
		console.dir({
			"user-nurse": this.attr(),
			"students": this.attr('students'),
			"plans": this.attr('plans'),
			'childComponentLists':this.childComponentLists
		});
	},

});

export default Component.extend({
	tag: 'user-nurse',
	viewModel: ViewModel,
	template
});