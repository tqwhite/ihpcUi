import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './register.less!';
import template from './register.stache!';
import Register from "sr-careplanner/models/register";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Care Planner Registration'
    },
		newUser: {
			value: Register,
			type: '*',
			set: function(value) {
				//value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return new Register();
			}
		},
		saveMessage:{
			value:'Saving...'
		}
  },
	
	clearEntryError:function(){
			const prevErrorList=this.attr('errorList');
			const prevDomObj=prevErrorList?prevErrorList.attr('domObj'):'';
			if (prevDomObj){
				setTimeout(()=>{
				prevDomObj.removeClass('error').removeClass('incomplete');
				}, 10);
			}
			this.attr('errorList', '');
	},
	
	showEntryError:function(domObj, errorList){
				setTimeout(()=>{
				domObj.addClass('error');
					domObj.focus();
				}, 100);
				this.attr('errorList', {user:errorList, domObj:domObj});
	
	},
  	
  	saveObject:function(domObj){

		var saveObj=this.attr('newUser'); //this should probably be renamed workingsaveObj to match the pattern elsewhere
		saveObj.attr('role', 'nurse');
		saveObj.attr('isActive', true);
		
		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		if (saveObj.isNew()){
			saveObj.attr('refId', qtools.newGuid());
		}
		var	promise=saveObj
			.save()
			.then(
				(item) => {
					this.attr('saveNotification', true);
					this.attr('saveMessage', "It worked!<br/>1) We sent an email confirmation message. Please remember to check spam if it does not show up soon.<br/>2) You can use your account now.");
				setTimeout(()=>{
					this.attr('%root').attr('newlyRegisteredUserName', item.username);
					this.attr('%root').setNewPage('', 'login');newlyRegisteredUserName
				}, 4000);
				
				},
				(err) => {
				this.attr('saveNotification', false);
				const errorObj=JSON.parse(err.responseText);

				this.attr('errorList', {user:[errorObj], domObj:domObj});


				//	this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
			);
	},

});


const changeHandler=function(domObj, event) {
				
			this.viewModel.clearEntryError();

			const saveObj=this.viewModel.attr('newUser');
			
			let errorList=saveObj.validate();
			if (errorList.length){
				this.viewModel.showEntryError(domObj, errorList);
				return;
			}
			this.viewModel.saveObject(domObj);
			
		};

export default Component.extend({
  tag: 'account-register',
  viewModel: ViewModel,
  template,
	events: {
		'#registerButton click': changeHandler

	},
});