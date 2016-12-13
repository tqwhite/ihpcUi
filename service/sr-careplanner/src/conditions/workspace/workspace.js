import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './workspace.less!';
import template from './workspace.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the conditions-workspace component'
		},
		openConditionId: {
			value: '',
			type: 'string',
			set: function(value) {
				return value;
			}
		},
		newConditionFlag: {
			value: false,
			type: 'boolean',
			set: function(value) {
				return value;
			}
		},
	},

	shouldShowEditor: function(element) {
		return !this.attr('newConditionFlag') && (element.attr('refId') == this.attr('openConditionId'))
	},

	showShowSummary: function(element) {
		if (this.attr('newConditionFlag')) {
			return (element.attr('refId') != this.attr('openConditionId'));
		} else {
			return true;
		}

	},

	closeCondition: function(event) {
		event.stopPropagation();
		this.attr('newConditionFlag', false);
		this.attr('openConditionId', '');
	},

	selectCondition: function(id) {
		this.attr('openConditionId', id);
		this.attr('newConditionFlag', false);
	},

	createNewCondition: function() {
		this.attr('newConditionFlag', true);
		this.attr('openConditionId', '');
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function(x) {
		window['conditions-workspace'] = this;
		console.log('added: window[' + "'" + 'conditions-workspace' + "'" + ']');
		console.dir({
			"conditions": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	},

});

export default Component.extend({
	tag: 'conditions-workspace',
	viewModel: ViewModel,
	template
});