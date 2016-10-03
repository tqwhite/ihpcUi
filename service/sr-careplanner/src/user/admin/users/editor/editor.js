import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-users-editor component'
    },

		workingUser: {
			value: User,
			set: function(value) {
				//value.attr('studentRefId', this.attr('openStudentRefId')); //used by api to create access record
				return value;
			}
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
  	
	saveObject: function() {

		
		var saveObj = this.attr('usersRootVm').attr('workingUser');
		var self = this;

		if (saveObj.isNew()) {
			//	saveObj.attr('refId', qtools.newGuid());
		}
		
		const errorList=saveObj.errorList()
		if (errorList){
			return errorList;
		}

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		var promise = saveObj.save();
			
		promise
			.then(() => {
				const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);

				this.attr('saveNotificationTimeoutId', timeoutId);
				//		this.attr('planRootVm').attr('newsaveObjFlag', false);
				this.attr('usersRootVm').attr('workingUser', saveObj);
				//	this.attr('planRootVm').attr('openPlanNameString', saveObj.attr('createdAt'));

			},
				(err) => {
					this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				});
	},

	testElement: function() {
		window['user-admin-users-editor']=this;
		console.log('added: window['+"'"+'user-admin-users-editor'+"'"+']');
		console.dir({
			"user-admin-users-editor": this.attr()
		});
	}
});

const changeHandler=function(domObj, event) {
			const errorList=this.viewModel.saveObject();
			if (errorList){
				$(event).addClass('error');
				this.viewModel.attr('currentError', {errorList:errorList, domObj:domObj});
			}
			else{
				$(event).removeClass('error');
				this.viewModel.attr('currentError', '');
			}
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