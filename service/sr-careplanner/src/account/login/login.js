import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from "sr-careplanner/models/session";
import User from "sr-careplanner/models/user";


export const ViewModel = Map.extend({
  define: {
	testPassword:{
		value:'', //all are the same for now
	},
	readyIndicator:{
		value:'true', //all are the same for now
	},
	tmpFormSession: {
		value: function(){
				//placeholder for two-way binding to the form in login.stache
				return new Session({user: new User()});
		}
	},
		message: {
		  value: ''
		},
		emotion: {
		  value: '<span class="fa fa-smile-o fa-2x"/>'
		}
	  },

	createSession: function(ev, options){
		if(ev) {
			ev.preventDefault();
		}

		const tmpFormSession=this.attr("tmpFormSession");

		const successFunc=(result)=>{

			this.attr("tmpFormSession", new Session({user: new User()})); //comment this to avoid clearing the login inputs
			this.attr("%root").attr("session", result);
			this.attr("%root").attr("confirmEmailMessage", '');
		};
		const errorFunc=(err)=>{
			this.attr('message', err.responseJSON.errorText);
			this.attr('emotion', '<span class="fa fa-frown-o fa-2x errorText"/>');
			
		}

		var sessionPromise = this.attr("tmpFormSession").save()
			.then(successFunc /*, errorFunc here prevents stache from getting {{#if sessionPromise.isRejected}}*/)
			.fail(errorFunc);
			
		//this.attr("sessionPromise", sessionPromise); //can't figure out why this was in the example

	}
});

export default Component.extend({
  tag: 'account-login',
  viewModel: ViewModel,
  template
});