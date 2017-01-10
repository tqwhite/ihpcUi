import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './permissionMaster.less!';
import template from './permissionMaster.stache!';
import $ from 'jquery';
export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the account-login-permission-master component'
    }
  },
	initAjaxSessionWrapper:function(){
		$.ajaxPrefilter((options, originalOptions, jqXHR) => {
			//retrieve and add token to outbound
			let token = this.attr('%root').attr('token');  //pass through from inbound routine below
			options.data = $.param($.extend(originalOptions.data, {
				token: token
			}));

			const payload = {
				data: originalOptions.data,
				token: token
			};
			options.data = $.param(payload);
		});
		
		$.ajaxSetup({
			dataFilter: (data, type, c) => {
				//strip token from inbound and save
				const incoming = JSON.parse(data);
				if (!incoming.token.public){
					this.attr('%root').attr('token', incoming.token); //pass through to outbound routine above
					this.attr('%root').attr('expiration', incoming.token.claims.expiration);
				}

				//note: each receiving model reshapes this into a donejs compatible list
				return JSON.stringify(data);
			}
		});
		return '';
	}
});
export default Component.extend({
  leakScope: true,
  tag: 'account-login-permission-master',
  viewModel: ViewModel,
  template
});