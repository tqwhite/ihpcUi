import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './card.less!';
import template from './card.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-payment-card component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-payment-card'] = this;
		console.log('added: window[' + "'" + 'setup-store-payment-card' + "'" + ']');
		console.dir({
			"setup-store-payment-card": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-payment-card',
  viewModel: ViewModel,
  template
});