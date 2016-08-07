import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from "sr-careplanner/models/session";
import User from "sr-careplanner/models/user";


export const ViewModel = Map.extend({
  define: {
	testUserName:{
		value:'admin',
	},
	testPassword:{
		value:'test', //all are the same for now
	},
	tmpFormSession: {
		value: function(){
				//placeholder for two-way binding to the form in login.stache
				return new Session({user: new User()});
		}
	},
		message: {
		  value: 'Welcome Back!!'
		},
		emotion: {
		  value: '<span class="fa fa-smile-o fa-2x"/>'
		}
	  },

	createSession: function(ev, options){
		if(ev) {
			ev.preventDefault();
		}

		var self = this;

		const tmpFormSession=this.attr("tmpFormSession");

		const successFunc=(session)=>{

			this.attr("tmpFormSession", new Session({user: new User()})); //comment this to avoid clearing the login inputs
			this.attr("%root").attr("session", session);

		};
		const errorFunc=(err)=>{
			//return; //not used here but left as an example, tqii
			this.attr('message', err.responseText);
			this.attr('emotion', '<span class="fa fa-frown-o fa-2x errorText"/>');
			
		}

		var sessionPromise = this.attr("tmpFormSession").save()
			.then(successFunc /*, errorFunc here prevents stache from getting {{#if sessionPromise.isRejected}}*/)
			.fail(errorFunc);
		this.attr("sessionPromise", sessionPromise);

	}
});

export default Component.extend({
  tag: 'account-login',
  viewModel: ViewModel,
  template
});