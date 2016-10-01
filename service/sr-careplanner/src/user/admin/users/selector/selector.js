import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './selector.less!';
import template from './selector.stache!';

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-users-selector component'
    }
  },

	chooseUser:function(user){
		this.attr('usersRootVm').attr('workingUser', user);

	},
	testElement: function() {
		window['user-admin-users-selector']=this;
		console.log('added: window['+"'"+'user-admin-users-selector'+"'"+']');
		console.dir({
			"user-admin-users-selector": this.attr()
		});
	}
});

export default Component.extend({
  tag: 'user-admin-users-selector',
  viewModel: ViewModel,
  template
});