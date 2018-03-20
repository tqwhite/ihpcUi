import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './invoice.less!';
import template from './invoice.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-payment-invoice component'
    }
  },

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-payment-invoice'] = this;
		console.log('added: window[' + "'" + 'setup-store-payment-invoice' + "'" + ']');
		console.dir({
			"setup-store-payment-invoice": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-payment-invoice',
  viewModel: ViewModel,
  template
});