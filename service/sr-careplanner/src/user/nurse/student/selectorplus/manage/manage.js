import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './manage.less!';
import template from './manage.stache!';
import Transfer from 'sr-careplanner/models/transfer';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-selectorplus-manage component'
		},
		showSelector: {
			value: false,
			serialize: false
		},
		tmpReceivingNurseUserName: {
			value: '',
			serialize: false
		},
		receivingNurseInfo: {
			value: {},
			serialize: false
		},
		receivingNurseUserNameValidFlag: {
			value: false,
			serialize: false
		},
		receiverTypingTimeoutId: {
			value: '',
			serialize: false
		},
		transferControlStatus: {
			value: "<div class='note'></div>",
			serialize: false
		},
		statusMessage: {
			value: {},
			serialize: false
		},
		activateCleartransferStudentList: {
			value: false,
			serialize: false
		},
		pendingTransfer: {
			value: Transfer,
			type: '*'
		}
	},
	executeTransfer: function(event, transferStudentList) {
		const localCallback = result => {
			transferStudentList.each(item => {
				item.attr('transferStatus', 'pending');
			});

			this.attr('activateCleartransferStudentList', true);

			this.attr('statusMessage', {
				alreadySeen: false,
				message: `Success: Transfer of ${
					transferStudentList.length
				} students offered to ${this.attr('receivingNurseInfo').attr(
					'first'
				)} ${this.attr('receivingNurseInfo').attr('last')}`,
				className: 'goodResult'
			});

			this.attr('activateCleartransferStudentList', false);
			this.attr('receivingNurseInfo', {});
			this.attr('tmpReceivingNurseUserName', '');

			const transfersSender = this.attr('%root')
				.attr('loginUserWorkingData')
				.attr('transfersSender');
			transfersSender.push(result);
			this.attr('%root')
				.attr('loginUserWorkingData')
				.attr('transfersSender', transfersSender);
		};

		const loginUser = this.attr('%root').attr('loginUserWorkingData');

		const dictionary = loginUser.attr('dictionary');

		const infoPhone = qtools.getByProperty(dictionary, 'pattern', 'infoPhone');
		const district = qtools.getByProperty(dictionary, 'pattern', 'district');

		const pendingTransfer = {
			status: 'pending',
			sendingUserPartial: {
				refId: loginUser.refId,
				first: loginUser.first,
				last: loginUser.last,
				infoPhone: infoPhone.replacement ? infoPhone.replacement : 'n/a',
				district: district.replacement ? district.replacement : 'n/a'
			},
			receivingUserPartial: {
				refId: this.attr('receivingNurseInfo').attr('refId'),
				first: this.attr('receivingNurseInfo').attr('first'),
				last: this.attr('receivingNurseInfo').attr('last')
			},
			studentPartialList: transferStudentList.map(item => ({
				first: item.first,
				last: item.last,
				gradeLevel: item.gradeLevel ? item.gradeLevel : 'n/a',
				refId: item.refId
			}))
		};

		const transfer = new Transfer.Transfer(pendingTransfer);
		this.attr('pendingTransfer', transfer);

		var promise = transfer.save().then(localCallback, err => {
			this.attr('saveError', JSON.stringify(err));
		});
	},

	checkReceiverValid: function(receiver) {
		const localCallback = user => {
			this.attr('receivingNurseInfo', user);
		};

		/*
			this line: this.attr('receivingNurseInfo', {});
			
			is there because of several completely confusing and screwy things about donejs.
			
			1) without it, the user in localCallback() arrives as a merge of the previous
			data and the new data. This is a problem when the new data is empty, ie,
			the target user is not valid.
			2) in the case of an empty result from the server (not-valid), the process happens
			in a screwy way. The displayTransferControlStatus() function triggers
			before localCallback(). Bizarrely, in the case of a full result (is-valid),
			the localCallback() happens first. If I add the attr() assignement to
			receivingNurseInfo, it happens first all for both cases.
			
			All of this is approximate. This has been one of the most confusing debugging
			processes I've ever had. It appears to work now.
			
			tqii, 1/11/19
		
		*/
		this.attr('tmpReceivingNurseUserName', receiver);
		this.attr('receivingNurseInfo', {});

		if (
			receiver.toLowerCase() ==
			this.attr('%root')
				.attr('loginUserWorkingData')
				.attr('username')
				.toLowerCase()
		) {
			return {
				receivingNurseUserName: this.attr('%root')
					.attr('loginUserWorkingData')
					.attr('username')
			}; //display update doesn't work without this
		}

		Transfer.createEligibility()
			.get({
				receivingNurseUserName: this.attr('tmpReceivingNurseUserName')
			})
			.then(localCallback, err => {
				console.dir({
					ERR: err
				});
			});

		//Transfer.Transfer.getList({username:loginUser.attr('username')});
	},

	enableTransferButton: function(transferStudentListLength) {
		return (
			this.attr('receivingNurseInfo') &&
			this.attr('receivingNurseInfo').attr('refId') &&
			transferStudentListLength
		);
	},

	displayTransferControlStatus: function(message) {
		const statusMessage = this.attr('statusMessage');
		if (statusMessage.message && statusMessage.alreadySeen == false) {
			this.attr('statusMessage', { alreadySeen: true });
			return `<div class='note ${statusMessage.className}'>${
				statusMessage.message
			}</div>`;
		}

		const receivingNurseInfo = this.attr('receivingNurseInfo');
		const eligibleStatus = receivingNurseInfo.attr('refId') ? true : false;
		const transferStudentListLength = this.attr('transferStudentListLength');

		const tmpReceivingNurseUserName = this.attr('tmpReceivingNurseUserName');

		if (tmpReceivingNurseUserName) {
			if (!eligibleStatus) {
				return `<div class='note error'>'${tmpReceivingNurseUserName}' is not a valid login name</div>`;
			}

			if (eligibleStatus) {
				return `<div class='note success'>${receivingNurseInfo.attr(
					'first'
				)} ${receivingNurseInfo.attr('last')} was found</div>`;
			}
		}

		if (tmpReceivingNurseUserName || transferStudentListLength != 0) {
			return "<div class='note'>Click on student to remove.</div>";
		}

		if (!tmpReceivingNurseUserName || transferStudentListLength != 0) {
			return "<div class='note'>Enter Receiving Nurse Login Name below.</div>";
		}
		return '%nbsp;';
	},
	
	updateTransferObject: function({ transferObject, cancel }) {
		const status = transferObject.attr('status');

		const localCallback = result => {
			const transfersSender = this.attr('%root')
				.attr('loginUserWorkingData')
				.attr('transfersSender')
				.forEach(item => {
					item.attr(
						'visibility',
						item.refId == result.refId ? 'hidden' : item.visibility
					);
				});
		};
		
		const transfer = new Transfer.Transfer({
			refId: transferObject.refId,
			visibility: 'hidden',
			status: cancel ? 'cancel' : transferObject.status
		});

		var promise = transfer.save().then(localCallback, err => {
			this.attr('saveError cancelOrHide', JSON.stringify(err));
		});
	},
	
	cancelOrHide: function(transferObject) {
		const status = transferObject.attr('status');
		const cancel = status == 'pending' ? true : false;

		if (cancel) {
			const cancelStudentList = transferObject
				.attr('studentPartialList')
				.attr()
				.map(item => item.refId);
			console.dir({ 'cancelStudentList [manage.js.]': cancelStudentList });

			const students = this.attr('parentVm').attr('students');

			students.then(item => {
				const count = item.attr('length');
				for (let i = 0; i < count; i++) {
					var element = item.attr(i);
					if (cancelStudentList.includes(element.attr('refId'))) {
						element.attr('transferStatus', 'canceled').save(); //<----- NOTICE SAVE()
					}
				}
			});
		}

		this.updateTransferObject({ transferObject, cancel });
	}
});

const inputFunction = (el, event, vm) => {
	const timeoutId = vm.receiverTypingTimeoutId;
	const checkReceiver = (receiver, vm) => () => {
		vm.checkReceiverValid(receiver);
	};
	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	const receiverName = $(event.target).val();
	//	vm.attr('receivingNurseUserName', receiverName);
	if ($(document.activeElement).attr('id') == 'receivingNurseUserName') {
		vm.receiverTypingTimeoutId = setTimeout(
			checkReceiver(receiverName, vm),
			2500
		);
	} else {
		checkReceiver(receiverName, vm)();
	}
};

export default Component.extend({
	tag: 'user-nurse-student-selectorplus-manage',
	viewModel: ViewModel,
	template,
	events: {
		keyup: function(el, event) {
			inputFunction(el, event, this.viewModel);
		},
		'input change': function(el, event) {
			inputFunction(el, event, this.viewModel);
		}
	}
});
