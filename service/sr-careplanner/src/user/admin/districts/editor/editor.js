import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './editor.less!';
import template from './editor.stache!';
import District from "sr-careplanner/models/district";
import qtools from "lib/qtools-minus/";

export const ViewModel = Map.extend({
  define: {
    message: {
      value: 'This is the user-admin-districts-editor component'
    },
		errorList:{
		},

		undoDistrict: {
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
  	undoFieldList:['first', 'last', 'role', 'districtname'],
  	
  	applyUndo:function(){
  		const workingDistrict=this.attr('workingDistrict');
  		const undoDistrict=this.attr('undoDistrict');
		this.undoFieldList.map((item)=>{
			workingDistrict.attr(item, undoDistrict[item]);
		});
		changeHandler.bind({viewModel:this})();
  	},
  	
  	saveObject:function(domObj){

		var saveObj=this.attr('workingDistrict'); //this should probably be renamed workingsaveObj to match the pattern elsewhere

		
		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}
		
		if (!saveObj.attr('refId')){
			const newGuid=qtools.newGuid();
			saveObj.attr('refId', newGuid);
			this.attr('workingDistrict').attr('refId',newGuid);
		}
		
		var	promise=saveObj
			.save()
			.then(
				(item) => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);
				
				},
				(err) => {
				this.attr('saveNotification', false);
				const errorObj=JSON.parse(err.responseText);

				this.attr('errorList', {district:[errorObj], domObj:domObj});


				//	this.attr('saveError', JSON.stringify(err))
					console.dir({
						"err": err
					});
				}
			);
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
				this.attr('errorList', {district:errorList, domObj:domObj});
	
	},
	
	showIncompleteStatus:function(domObj, errorList){
				this.attr('errorList', {district:[{errorText:'Not saved. All Fields are Required'}], domObj:domObj});
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-admin-districts-editor'] = this;
		console.log('added: window[' + "'" + 'user-admin-districts-editor' + "'" + ']');
		console.dir({
			"user-admin-districts-editor": this.attr(),
			'childComponentLists':this.childComponentLists
		});
	}
});

const changeHandler=function(domObj, event) {
				
			this.viewModel.clearEntryError();

			const fieldName=domObj.attr('fieldName');
			const saveObj=this.viewModel.attr('workingDistrict');
			
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


			
			this.viewModel.saveObject(domObj);
			
		};

export default Component.extend({
  tag: 'user-admin-districts-editor',
  viewModel: ViewModel,
	events: {
		'input change': changeHandler,
		'textarea change': changeHandler

	},
  template
});