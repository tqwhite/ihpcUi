import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import User from "sr-careplanner/models/user";
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-users-editor component'
    },
		errorList:{
		},

		undoUser: {
			type:'*',
			set:function(value){
				const outObj={};
				this.undoFieldList.map((item)=>{
					outObj[item]=value[item];
				});
				return outObj;
			}
		},
  },
  	undoFieldList:['first', 'last', 'role', 'username'],
  	
  	applyUndo:function(){
  		const workingUser=this.attr('workingUser');
  		const undoUser=this.attr('undoUser');
		this.undoFieldList.map((item)=>{
			workingUser.attr(item, undoUser[item]);
		});
		this.saveObject();
  	},
  	
  	saveObject:function(){

		var saveObj=this.attr('workingUser'); //this should probably be renamed workingsaveObj to match the pattern elsewhere

		
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
				() => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);
				
				},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
			);
	},

	testElement: function() {
		window['user-admin-users-editor']=this;
		console.log('added: window['+"'"+'user-admin-users-editor'+"'"+']');
		console.dir({
			"user-admin-users-editor": this.attr()
		});
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
	
	showIncompleteStatus:function(domObj, errorList){
				this.attr('errorList', {user:[{msg:'form incomplete, not saved'}], domObj:domObj});
	}
});

const changeHandler=function(domObj, event) {
				
			this.viewModel.clearEntryError();

			const fieldName=domObj.attr('fieldName');
			const saveObj=this.viewModel.attr('workingUser');
			
			let errorList=saveObj.validate(fieldName);
			if (errorList.length){
				this.viewModel.showEntryError(domObj, errorList);
				return;
			}
					
			errorList=saveObj.validate();
			if (errorList.length){
				this.viewModel.showIncompleteStatus(domObj, errorList);
				return;
			}
			
			this.viewModel.saveObject();
			
		};

export default Component.extend({
  tag: 'user-admin-users-editor',
  viewModel: ViewModel,
	events: {
		'input change': changeHandler,
		'textarea change': changeHandler

	},
  template
});