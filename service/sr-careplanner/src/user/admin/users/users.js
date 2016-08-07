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
		get: function(list) {
			if (list) {
				return list;
			}
			list=User.getList({});
			return list;
		}
	}
  }
});

export default Component.extend({
  tag: 'user-admin-users',
  viewModel: ViewModel,
  template
});