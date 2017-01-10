import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './admin.less!';
import template from './admin.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-admin component'
		},
		subsection: {
			value: 'users'
		}
	},
	setSubsection: function(subsection) {
		this.attr('subsection', subsection);
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function(x) {
		window['user-admin'] = this;
		console.log('added: window[' + "'" + 'user-admin' + "'" + ']');
		console.dir({
			"user-admin": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	},
});

export default Component.extend({
  leakScope: true,
  tag: 'user-admin',
  viewModel: ViewModel,
  template
});