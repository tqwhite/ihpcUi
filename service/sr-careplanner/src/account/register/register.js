import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './register.less!';
import template from './register.stache!';
import Register from "sr-careplanner/models/register";
import qtools from "lib/qtools-minus/";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'Hello from account-register'
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
		},
		showTerms:{
			value:false
		},
  },
  
  activatePrint:function(element, event){
	event.stopPropagation();
	window.print();
  },
  
  showModalTerms:function(textSelector, event, autoPrint){
	event.stopPropagation();
	this.attr('showTerms', true);
	$('#termsModalText').html($(textSelector).html());
	this.attr('%root').activateModal(()=>{this.attr('showTerms', false)});
	if (autoPrint){
  	setTimeout(()=>{
		window.print();
  	}, 100);
	}
	window.scrollTo(0, 0);
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

		let secondaryEmailMessageTimeoutId;
		const secondaryHandlerOn = function(domObj, event) {
			if (secondaryEmailMessageTimeoutId){
				clearTimeout(secondaryEmailMessageTimeoutId);
			}
			
			$('#secondaryEmailMessage').css({display:'block', height:'auto'});
		};
		const secondaryHandlerOff = function(domObj, event) {
			if ($('#emailAddressSecondary').is(':focus')){
				return;
			}
			secondaryEmailMessageTimeoutId = setTimeout(() => {
			$('#secondaryEmailMessage').animate({height:'0px', padding:'0px'}, 4000, ()=>{
			
			$('#secondaryEmailMessage').css({display:'none', height:'auto'});
			});
			}, 2000);
		};


export default Component.extend({
  tag: 'account-register',
  viewModel: ViewModel,
  template,
	events: {
		'#registerButton click': changeHandler,
		'#emailAddressSecondary mouseover': secondaryHandlerOn,
		'#emailAddressSecondary mouseout': secondaryHandlerOff,
		'#secondaryEmailMessage mouseover': secondaryHandlerOn,
		'#secondaryEmailMessage mouseout': secondaryHandlerOff,
		'#emailAddressSecondary focus': secondaryHandlerOn,
		'#emailAddressSecondary blur': secondaryHandlerOff

	},
});