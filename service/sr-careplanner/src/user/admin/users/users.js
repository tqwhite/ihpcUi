import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './users.less!';
import template from './users.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-users component'
    },
	users: {
		get: function() {
			const list=User.getList({});
			return list;
		}
	}
  },
	
	collectChildComponents:function(childType, childVm){
console.log("\n=-=============   collectChildComponents  =========================\n");


		this.childComponentLists=this.childComponentLists || {};
		this.childComponentLists[childType]=this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-admin-users']=this;
		console.log('added: window['+"'"+'user-admin-users'+"'"+']');
		console.dir({
			"user-admin-users": this.attr()
		});
	}
});

export default Component.extend({
  tag: 'user-admin-users',
  viewModel: ViewModel,
  template
});