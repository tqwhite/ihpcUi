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

		const promise = this.attr('%root').attr('loginUser');
		const hackeryDataFromDom = {};
		let omittedFieldList='';


		formContainerDomObj.find('input', 'textarea').each((inx, item) => {
			const itemDomObj = $(item);
			const value = itemDomObj.val();
			const fieldName = itemDomObj.attr('fieldName');
			
			if (['first', 'last', 'username', 'password', 'emailAddress'].indexOf(fieldName) > -1) {
				hackeryDataFromDom[fieldName] = value;
			}
			else{
				//log missing properties that are not part of the dictionary array 
				//(those get taken care of by two-way binding in setup/user/user.stache)
				if (['mandatory', 'pattern', 'replacement', '-id'].indexOf(fieldName) == -1){
					omittedFieldList+=`${fieldName}, `;
				}
			}
		})
			
		if (omittedFieldList){
			console.log(`POSSIBLE ERROR: setup/setup.js did not save: ${omittedFieldList.replace(/, $/, '')}`);
		}

		promise.then((item) => {
			for (var name in hackeryDataFromDom) {
				item.attr(name, hackeryDataFromDom[name]);
				delete hackeryDataFromDom[name];
			}

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
	saveObject: function(saveObj, domObj) {
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
				(item) => {
					const timeoutId = setTimeout(() => {
						this.attr('saveNotification', false);
					}, 2000);
					this.attr('saveNotificationTimeoutId', timeoutId);
					this.attr('%root').attr('loginUserDataOnly', item.attr());
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

		this.attr('loginUser').then((item) => {
			console.dir({
				"item": item.attr()
			});
		});
	}
});

export default Component.extend({
  leakScope: true,
	tag: 'setup',
	viewModel: ViewModel,
	template
});