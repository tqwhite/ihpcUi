import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './plan.less!';
import template from './plan.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-nurse-plan component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},

	testElement: function() {
		window['user-nurse-plan']=this;
		console.log('added: window['+"'"+'user-nurse-plan'+"'"+']');
		console.dir({
			"user-nurse-plan": this.attr()
		});
	}
});

export default Component.extend({
  tag: 'user-nurse-plan',
  viewModel: ViewModel,
  template
});