import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './transfer.less!';
import template from './transfer.stache!';
import Transfer from 'sr-careplanner/models/transfer';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value:
				'This is the user-nurse-student-selectorplus-manage-transfer component'
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
		activateClearTransferList: {
			value: false,
			serialize: false
		},
		pendingTransfer: {
			value: Transfer,
			type: '*'
		}
	},
	executeTransfer: function(event, transferList) {
		const localCallback = () => {
			transferList.each(item => {
				item.attr('transferPending', true);
			});

			this.attr('activateClearTransferList', true);

			this.attr('statusMessage', {
				alreadySeen: false,
				message: `Success: Transfer of ${
					transferList.length
				} students offered to ${this.attr('receivingNurseInfo').attr(
					'first'
				)} ${this.attr('receivingNurseInfo').attr('last')}`,
				className: 'goodResult'
			});

			this.attr('activateClearTransferList', false);
			this.attr('receivingNurseInfo', {});
			this.attr('tmpReceivingNurseUserName', '');
		};

		const loginUser = this.attr('%root').attr('loginUserDataOnly');

const dictionary=loginUser.attr('dictionary');

const infoPhone=qtools.getByProperty(dictionary, 'pattern', 'infoPhone');
const district=qtools.getByProperty(dictionary, 'pattern', 'district');

		const pendingTransfer = {
			status:'pending',
			sendingUserPartial: {
				refId:loginUser.refId,
				first:loginUser.first,
				last:loginUser.last,
				infoPhone:infoPhone.replacement?infoPhone.replacement:'n/a',
				district:district.replacement?district.replacement:'n/a'
			
			},
			receivingUserPartial: {
				refId:this.attr('receivingNurseInfo').attr('refId'),
				first:this.attr('receivingNurseInfo').attr('first'),
				last:this.attr('receivingNurseInfo').attr('last'),
			},
			studentPartialList: transferList.map(item => ({
				first:item.first,
				last:item.last,
				gradeLevel:item.gradeLevel?tem.gradeLevel:'n/a',
				refId:item.refId,
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

	enableTransferButton: function(transferListLength) {
		return this.attr('receivingNurseInfo').attr('refId') && transferListLength;
	},

	displayTransferControlStatus: function() {
	
		const statusMessage = this.attr('statusMessage');
		if (statusMessage.message && statusMessage.alreadySeen == false) {
			this.attr('statusMessage', { alreadySeen: true });
			return `<div class='note ${statusMessage.className}'>${
				statusMessage.message
			}</div>`;
		}
		
		const receivingNurseInfo = this.attr('receivingNurseInfo');
		const eligibleStatus = receivingNurseInfo.attr('refId') ? true : false;
		const transferListLength = this.attr('transferListLength');

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

		if (tmpReceivingNurseUserName || transferListLength != 0) {
			return "<div class='note'>Click on student to remove.</div>";
		}

		if (!tmpReceivingNurseUserName || transferListLength != 0) {
			return "<div class='note'>Enter Receiving Nurse Login Name below.</div>";
		}
		return '%nbsp;';
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
	tag: 'user-nurse-student-selectorplus-manage-transfer',
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
