import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './plan.less!';
import template from './plan.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-plan component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-plan'] = this;
		console.log('added: window[' + "'" + 'setup-plan' + "'" + ']');
		console.dir({
			"setup-plan": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-plan',
  viewModel: ViewModel,
  template
});