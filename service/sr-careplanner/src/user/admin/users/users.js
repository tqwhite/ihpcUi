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
			type: '*',
			set: function(value) {
				//value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return value;
			}
		},
		showEditor:{
			value:false
		}
	},
	
	createNew:function(){
		this.childComponentLists['user-admin-users-editor'][0].attr('workingUser', new User({}));
		
		this.attr('showEditor', true);
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