import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './dictionary.less!';
import template from './dictionary.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-dictionary component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-dictionary'] = this;
		console.log('added: window[' + "'" + 'setup-dictionary' + "'" + ']');
		console.dir({
			"setup-dictionary": this.attr(),
			'childComponentLists':this.childComponentLists
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
  tag: 'setup-dictionary',
  viewModel: ViewModel,
  template,
	events: {
		'input change': localDataChangeHandler,
		'textarea change': localDataChangeHandler
	}
});