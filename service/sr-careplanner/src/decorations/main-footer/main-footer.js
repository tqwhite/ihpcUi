import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './main-footer.less!';
import template from './main-footer.stache!';
import stache from 'can/view/stache/stache'

export const ViewModel = Map.extend({
  define: {
    message: {
      value: "The School Nurse's Health Planning Resource"
    }
	
  },
	findErrors: function(saveObj, domObj) {
		let errorList = saveObj.validate();
		if (errorList.length) {
			setTimeout(() => {
				domObj.addClass('error');
				domObj.focus();
			}, 100);
			this.attr('errorList', {
				user: errorList,
				domObj: domObj
			});
			return true;
		}
		return false;
	},
	sendFeedbackSupport: function(domObj) {

		var saveObj = new ChangePassword({
			newPassword: this.attr('newPassword'),
			newConfirmPassword: this.attr('newConfirmPassword'),
			changePasswordKey:this.attr('%root').attr('changePasswordKey')
		});

		if (this.findErrors(saveObj, domObj)) {
			return;
		}

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		var promise = saveObj
			.save()
			.then(
				(item) => {


					this.attr('saveNotification', true);
					this.attr('saveMessage', "It worked! The password for login username <span style='color:#999;font-weight:bold;'>'"+item.username+"'</span> has been changed. You can use it for login immediately.");
					setTimeout(() => {
						this.attr('%root').attr('newlyRegisteredUserName', item.username);
						this.attr('%root').setNewPage('', 'login');debugger;
					}, 6000);

				},
				(err) => {
					this.attr('saveNotification', false);
					const errorObj = JSON.parse(err.responseText);

					this.attr('errorList', {
						user: [errorObj],
						domObj: domObj
					});

					//	this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
		);
		return false;
	},
	  
	testTemplate:stache("<h3>{{../systemProdName}}</h3>"), //this works as {{>testTemplate}} and presents Hello World!! from app.js
	testScopeHelper:function(args){
		//works with call {{testScopeHelper(mess=message)}}, shows values from scope map above
		return can.stache.safeString('('+args.mess+')');
	},
});

/*
DEMO CODE remind how to access various template things

<div>{{>testTemplate}}</div>
<div>{{testScopeHelper(mess=message)}}</div>
<div>{{testHelper '©'}} <span id='tqtest'{{testFunctionHelper 'Sunrise River Press'}} /></div>

  <div style='color:gray;font-size:80%;'>*page: {{../page}}* *role: {{../session.get('role')}}* *expiration: {{../expiration}}*</div>
<!-- decorations/main-footer end -->

*/


can.stache.registerHelper('testHelper', function(name, options){
	//options is documented https://canjs.com/docs/can.stache.helperOptions.html
	//if name is not specified in the call, name gets the options
	//this works as {{testHelper 'tq'}} or {{testHelper attrName}} 
	//or {{{genHtml data}}} if the result should not be escaped
	//note: options.scope.attr() does NOT WORK. It MUST have a property name.
	//however, it refers to the viewModel.
	//eg, options.scope.attr('message')
	return `${name} ${new Date().getUTCFullYear()}`;
});


can.stache.registerHelper('testFunctionHelper', function(name, options){
return function(el){
//return values are not used from this
//this works called like <div id='tqtest'{{testFunctionHelper 'white'}} />
 $(el).html(name.toUpperCase()).css('color', 'rgb(176, 18, 0)');
}
});


export default Component.extend({
  tag: 'main-footer',
  viewModel: ViewModel,
  template
});