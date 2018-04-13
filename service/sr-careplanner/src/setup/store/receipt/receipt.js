import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './receipt.less!';
import template from './receipt.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the setup-store-receipt component'
    }
  },
  	formatDate:function(dateString){
  		const date=new Date(dateString);
  		return date.toLocaleDateString('en-US');
  	},
  	reset:function(){
  	
  		this.storeRootVm.attr('unpaid', true);
  	
  	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store-receipt'] = this;
		console.log('added: window[' + "'" + 'setup-store-receipt' + "'" + ']');
		console.dir({
			"setup-store-receipt": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
  tag: 'setup-store-receipt',
  viewModel: ViewModel,
  template
});