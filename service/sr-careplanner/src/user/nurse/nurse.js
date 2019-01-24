import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nurse.less!';
import template from './nurse.stache!';
import Student from "sr-careplanner/models/student";
import Plan from "sr-careplanner/models/plan";
import Boilerplate from "sr-careplanner/models/boilerplate";
import qtools from "node_modules/qtools-minus/";
import formatPlanPdf from "node_modules/format-plan-pdf/";

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
				this.countInactive(list); //this operates the promise
				return list;
			},
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
		saveNotification: {
			value: false,
			type: '*'
		},
		saveNotificationTimeoutId: {
			value: false,
			type: '*'
		},

		workingPlan:{
			value:Plan,
			type:'*'
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
		openPlanNameString:{
			value:'',
			get:function(value){
				return value?qtools.getDateString('dd_MMM_yyyy', new Date(value)):''
			}
		},
    	
		blankPlan:{
			get:function(){
				const refId = qtools.newGuid();
				const newPlan={
					refId:refId,
					conditions:[],
					createdAt:new Date(),
					planDate:new Date()
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

				const planRefIdStudentMapList = this.attr('%root').attr('planRefIdStudentMapList');
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

		inactiveCount:{
			value:0,
			type:'*'

		},

		activeCount:{
			value:0,
			type:'*'

		},

		allCount:{
			value:0,
			type:'*'

		},

		showSmallStudentSelectorPlus:{
			value:false,
			serialize:false
		},

		currentTool:{
			value:'editor',
			serialize:false
		},
		showInactiveStudents:{
			value:true,
			serialize:false
		}
	},
	
	countInactive:function(students){
		let inactiveCount=0;
		let activeCount=0;
		let allCount=0;
		students.then((student)=>{
			student.each((student)=>{
				if (student.attr('inactive')){
					inactiveCount++;
				}
				else{
				activeCount++;
				}
				allCount++;
			});
			this.attr('inactiveCount', inactiveCount);
			this.attr('activeCount', activeCount);
			this.attr('allCount', allCount);
			
			const showInactiveStudents=this.attr('showInactiveStudents');
			const displayCount=showInactiveStudents?allCount:activeCount;
			this.attr('showSmallStudentSelectorPlus', (displayCount<20)?true:false);
		});
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
			const planRefIdStudentMapList = this.attr('%root').attr('planRefIdStudentMapList');
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
	
	savePlan:function(callback){
	
		var saveObj = this.attr('workingPlan');

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}

		if (saveObj.isNew()) {

			saveObj.attr('studentRefId', this.attr('openStudentRefId'));

			//	saveObj.attr('refId', qtools.newGuid()); //the plan is generated with a refId and wired in at creation, don't need this
	;
		} 
		
		var promise=saveObj
			.save()
			.then(() => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);

				this.attr('saveNotificationTimeoutId', timeoutId);
				//		this.attr('newsaveObjFlag', false);
				this.attr('workingPlan', saveObj);
				this.attr('openPlanNameString', saveObj.attr('createdAt'));
				callback && callback()
			},
			(err) => {
				this.attr('saveError', JSON.stringify(err))
				console.dir({
					"err": err
				});
				callback && callback(err.responseJSON.errorText)
			});
	
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