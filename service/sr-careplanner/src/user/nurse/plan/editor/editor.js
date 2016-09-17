import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import Plan from "sr-careplanner/models/plan";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-plan-editor component'
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
			saveObj.attr('refId', qtools.newGuid());
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
				this.attr('planRootVm').attr('openPlanRefId', saveObj.attr('refId'));
				this.attr('planRootVm').attr('openPlanNameString', saveObj.attr('createdAt'));
			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},

	newCondition: function() {
		const refId = qtools.newGuid();
		const refId2 = qtools.newGuid();
		const newCondition = {
			refId: refId,
			sourceConditionRefId: null,
			title: '',
			diagnoses: [{
				refId: refId2,
				sourceDiagnosisRefId: null,
				assessment: '',
				nursingDiagnosis: '',
				interventions: '',
				outcomes: '',
				shortName: ''
			}]
		};
		const planList = this.attr('planRootVm').attr('workingPlan');
		planList.attr('conditions').push(newCondition)

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