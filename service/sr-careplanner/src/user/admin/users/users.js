import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './users.less!';
import template from './users.stache!';
import User from "sr-careplanner/models/user";
import District from "sr-careplanner/models/district";

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
			},
			get: function(value) {
				if (value.attr('lastDayInSubscription')){
					value.attr('lastDayInSubscription', value.attr('lastDayInSubscription').replace(/^(.*?)T.*$/, '$1'));
					}
					return value;
				}
		},
		showEditor:{
			value:false
		},
		districts: {
			get: function() {
				const list = District.getList();
				return list;
			}
		},
	},
	
	createNew:function(){
		this.childComponentLists['user-admin-users-editor'][0].attr('workingUser', new User({role:'nurse', isActive:true}));
		this.childComponentLists['user-admin-users-editor'][0].attr('errorList', '');
		
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