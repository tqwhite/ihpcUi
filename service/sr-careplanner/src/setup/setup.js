import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './setup.less!';
import template from './setup.stache!';
import User from "sr-careplanner/models/user";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the setup component'
		},
		subsection: {
			value: 'dictionary'
		},
		loginUser: {
			get: function() {
				const session = this.attr('%root').attr('session');
				const loginUser = User.get({
					_id: session.attr('0')._id
				})
				
				
		loginUser.then((item)=>{

		const dictionary=item.attr('dictionary');
	if (dictionary.length===0){
		dictionary.push({pattern:'writtenby',replacement:'Written By'});
		dictionary.push({pattern:'district',replacement:'District'}); 
	}

});

	
				
				
				return loginUser;
			},
		},
	},

	setSubsection: function(subsection) {
		this.attr('subsection', subsection);
	},

	clearEntryError: function() {
		const prevErrorList = this.attr('errorList');
		const prevDomObj = prevErrorList ? prevErrorList.attr('domObj') : '';
		if (prevDomObj) {
			setTimeout(() => {
				prevDomObj.removeClass('error').removeClass('incomplete');
			}, 10);
		}
		this.attr('errorList', '');
	},

	showEntryError: function(domObj, errorList) {
		setTimeout(() => {
			domObj.addClass('error');
			domObj.focus();
		}, 100);
		this.attr('errorList', {
			user: errorList,
			domObj: domObj
		});

	},

	showIncompleteStatus: function(domObj, errorList) {
		this.attr('errorList', {
			user: [{
				errorText: 'Not saved. All Fields are Required'
			}],
			domObj: domObj
		});
	},

	dataChangeHandler: function(args) {
		const {stacheObject, dataDomObj, saveObjectType, formContainerDomObj} = args;

		const utilityBase = this;
		const saveObject = stacheObject.viewModel.saveObject;
		const localVm = stacheObject.viewModel;


		const promise=this.attr('loginUser');

		promise.then( (item)=>{
			var outObj = item.attr();
			var saveObj = new saveObjectType(outObj);

			utilityBase.clearEntryError();
			const fieldName = dataDomObj.attr('fieldName');
			let errorList = saveObj.validate(fieldName);
			if (errorList.length) {
				utilityBase.showEntryError(dataDomObj, errorList);
				return;
			}
			errorList = saveObj.validate();
			if (errorList.length) {
				utilityBase.showIncompleteStatus(dataDomObj, errorList);
				return;
			}
			utilityBase.saveObject(saveObj, dataDomObj);
		});

	},
	saveObject: function(saveObj, domObj, event) {
		//var saveObj = new User(loginUser);

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '')
		}

		var promise = saveObj
			.save()
			.then(
				() => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);

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
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup'] = this;
		console.log('added: window[' + "'" + 'setup' + "'" + ']');
		console.dir({
			"setup": this.attr(),
			'childComponentLists': this.childComponentLists
		});
		
		this.attr('loginUser').then((item)=>{
			console.dir({"item":item.attr()});
		});
	}
});

export default Component.extend({
	tag: 'setup',
	viewModel: ViewModel,
	template
});