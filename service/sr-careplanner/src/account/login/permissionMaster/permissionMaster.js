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
		$.ajaxPrefilter(( options, originalOptions, jqXHR ) => {
			const token = this.attr('%root').attr('session').get('token');
console.dir({"options":options});


			options.data = $.param($.extend(originalOptions.data, { token:token }));
			
			const payload={
				data:originalOptions.data,
				token:token
			};
			
			options.data = $.param(payload);
			
			
		});
		$.ajaxSetup({
			dataFilter: (data, type, c)=>{
			
console.dir({"data":data});


				const token = this.attr('%root').attr('session').get('token')
				return data;
			}
		});
return '';

	}
});

export default Component.extend({
  tag: 'account-login-permission-master',
  viewModel: ViewModel,
  template
});