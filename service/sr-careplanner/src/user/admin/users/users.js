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
				const list = User.getList({});
				return list;
			},
		},

		workingUser: {
			value: User,
			set: function(value) {
				//value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return value;
			}
		},
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-admin-users'] = this;
		console.log('added: window[' + "'" + 'user-admin-users' + "'" + ']');
		console.dir({
			"user-admin-users": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

export default Component.extend({
	tag: 'user-admin-users',
	viewModel: ViewModel,
	template
});