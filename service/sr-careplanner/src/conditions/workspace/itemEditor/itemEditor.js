import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './itemEditor.less!';
import template from './itemEditor.stache!';
import Boilerplate from "sr-careplanner/models/boilerplate";
import qtools from "lib/qtools-minus/";
export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the conditions-workspace-item-editor component'
		},
		boilerplate: {
			value: Boilerplate,
			type: '*',
			note: 'bitballs called for type:Boilerplate but that causes error'
		},
		saveNotification: {
			value: false,
			type: '*'
		},
		saveNotificationTimeoutId: {
			value: false,
			type: '*'
		},
		saveError: {
			value: '',
			type: '*'
		},
		openDiagnosisId: {
			value: '9',
			type: '*'
		}
	},
	
	generateFolderName:function(element){
const shortName=element.attr('shortName')

	if (!shortName){
		return;
	}
		return shortName.replace(/\W/g, '');
	},

	deleteCondition: function(element) {
		if (!window.confirm('Are you sure?')) {
			return;
		}
		this.attr('boilerplate').destroy();
	},

	deleteDiagnosis: function(element) {
		// 		if (! window.confirm('Are you sure?')) {
		// 			return;
		// 		}
		var tmp = this.attr('boilerplate').attr('diagnoses');
		tmp[element].attr('refId', '');
		tmp.removeAttr(element);
		this.saveCondition();
	},
	saveCondition: function() {
		var self=this;
		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}

		var boilerplate = this.attr('boilerplate');
		var promise;

		if (boilerplate.isNew()) {
			boilerplate.attr('refId', qtools.newGuid());
			boilerplate.attr('diagnoses', []);
			promise = boilerplate.save().then(function() {
				self.attr("boilerplate", new Boilerplate());
			});
		} else {
			promise = boilerplate.save();
		}
		promise
			.then((result) => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);
				this.attr('saveNotificationTimeoutId', timeoutId);
				this.attr('boilerplate', boilerplate);
				this.attr('parentVm').attr('openConditionId', boilerplate.attr('refId'));
			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},

	selectDiagnosis: function(element, inx) {
		var id = $(element).attr('id');
		this.attr('openDiagnosisId', id); //sets a property that shows the correct diagnosis editor
	},

	newDiagnosis: function() {
		const refId = qtools.newGuid();
		this.attr('boilerplate').attr('diagnoses').push(
			{
				refId: refId,
				nursingDiagnosis: "",
				goals: "",
				interventions: "",
				outcomes: "",
				shortName: ""
			});
		this.attr('openDiagnosisId', refId);
	},

	testElement: function(x) {
		console.dir({
			"conditions-workspace-item-editor component.attr()": this.attr()
		});
	//this.attr('boilerplate').attr('diagnoses').attr(inx)
	},

});
export default Component.extend({
	tag: 'conditions-workspace-item-editor',
	viewModel: ViewModel,
	events: {
		'input change': function() {
			this.viewModel.saveCondition();
		},
		'textarea change': function() {
			this.viewModel.saveCondition();
		}

	},
	template
});