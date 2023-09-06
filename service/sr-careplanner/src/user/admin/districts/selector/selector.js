import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-districts-selector component'
    }
  },

	chooseDistrict:function(district){
		this.attr('districtsRootVm').attr('workingDistrict', district);
		this.attr('districtsRootVm').attr('showEditor', true);

	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-admin-districts-selector'] = this;
		console.log('added: window[' + "'" + 'user-admin-districts-selector' + "'" + ']');
		console.dir({
			"user-admin-districts-selector": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'user-admin-districts-selector',
  viewModel: ViewModel,
  template
});