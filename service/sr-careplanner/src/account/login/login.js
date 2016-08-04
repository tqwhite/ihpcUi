import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './login.less!';
import template from './login.stache!';
import Session from "sr-careplanner/models/session";
import User from "sr-careplanner/models/user";

const testModel=Map.extend({

  define: {
		message: {
		  value: 'hello from testModel'
		},
		testModelOnly: {
		  value: 'hello from testModel'
		}
    }
});

export const ViewModel = Map.extend({
  define: {
	testUserName:{
		value:'admin',
	},
	testPassword:{
		value:'admin',
	},
	tmpFormSession: {
		value: function(){
				//placeholder for two-way binding to the form in login.stache
				return new Session({user: new User()});
		}
	},
	  testModel:{
		  value:testModel,
		  serialize:false
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

		var sessionPromise = this.attr("tmpFormSession").save().then((session)=>{

			this.attr("tmpFormSession", new Session({user: new User()})); //comment this to avoid clearing the login inputs
			this.attr("%root").attr("session", session);

		});
		this.attr("sessionPromise", sessionPromise);
		

	}
});

export default Component.extend({
  tag: 'account-login',
  viewModel: ViewModel,
  template
});