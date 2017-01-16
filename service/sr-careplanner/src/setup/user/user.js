import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './user.less!';
import template from './user.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the setup-user component'
		}
	},
	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-user'] = this;
		console.log('added: window[' + "'" + 'setup-user' + "'" + ']');
		console.dir({
			"setup-user": this.attr(),
			"loginUser": this.attr('loginUser'),
			'childComponentLists': this.childComponentLists
		});
	}
});

const localDataChangeHandler = function(domObj, event) {
	this.viewModel.attr('setupRootVm').dataChangeHandler({
		stacheObject: this,
		dataDomObj: domObj,
		saveObjectType: User,
		formContainerDomObj: domObj.parent().parent().parent()
	})
};

export default Component.extend({
	tag: 'setup-user',
	viewModel: ViewModel,
	template,
	events: {
		'input change': localDataChangeHandler,
		'textarea change': localDataChangeHandler
	}
});