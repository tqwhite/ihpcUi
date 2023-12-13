import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-admin-users-selector component'
		},
		userFilterString: {
			value: ''
		}
	},

	chooseUser: function(user) {
		this.attr('usersRootVm').attr('workingUser', user);
		this.attr('usersRootVm').attr('showEditor', true);
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] =
			this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	
	
	
	userMatchFilterString: function(user){
const filterString=this.attr('userFilterString').toLowerCase();
if (!filterString){
	return true;
}
user.a=` ${user.attr('first')} ${user.attr('last')}`
user.b=` ${user.attr('last')} ${user.attr('first')}`
user.c=` ${user.attr('last')}, ${user.attr('first')}`

const searchString=JSON.stringify(user).toLowerCase()

const result=searchString.match(filterString)?true:false;

return result
	},
	
	testElement: function() {
		window['user-admin-users-selector'] = this;
		console.log(
			'added: window[' + "'" + 'user-admin-users-selector' + "'" + ']'
		);
		console.dir({
			'user-admin-users-selector': this.attr(),
			childComponentLists: this.childComponentLists
		});
	}
});

const changeHandler = function(domObj, event) {

	const fieldName = domObj.attr('fieldName');

	const value = event.target.value;

	this.viewModel.attr('userFilterString', value);

};

export default Component.extend({
	tag: 'user-admin-users-selector',
	viewModel: ViewModel,
	template,
	events: {
		'input keyup': changeHandler
	}
});
