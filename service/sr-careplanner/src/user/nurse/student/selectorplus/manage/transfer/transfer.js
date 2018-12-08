import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './transfer.less!';
import template from './transfer.stache!';

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
		receivingNurseUserName: {
			value: '',
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
		statusMessage:{
			value:{},
			serialize:false
		
		},
		activateClearTransferList:{
			value:false,
			serialize:false
		
		}
	},
	executeTransfer:function(event, transferList){
		transferList.each(item=>{
			item.attr('transferPending', true);
		});
		
		this.attr('activateClearTransferList', true);
		
		this.attr('receivingNurseUserName', '');
		this.attr('tmpReceivingNurseUserName', '');
		this.attr('receivingNurseUserNameValidFlag', false);


		this.attr('statusMessage', {alreadySeen:false, message:`Transfer of ${transferList.length} students offered to FIRST LAST`, className:'goodResult'})
		
		this.attr('activateClearTransferList', false);
	
	},
	
	checkReceiverValid: function(receiver) {
		if (receiver.match(/q/)) {
			this.attr('receivingNurseUserNameValidFlag', true);
		} else {
			this.attr('receivingNurseUserNameValidFlag', false);
		}
		console.log(
			`Should be checking API for receiving nurse validity [transfer.js.checkReceiverValid]\n`
		);
		this.displayTransferControlStatus();
	},
	
	enableTransferButton: function(transferListLength) {
		return this.attr('receivingNurseUserNameValidFlag') && transferListLength;
	},
	
	displayTransferControlStatus: function() {

		const userName = this.attr('receivingNurseUserName');
		
		const statusMessage=this.attr('statusMessage');

		if (statusMessage.message && statusMessage.alreadySeen==false) {
			this.attr('statusMessage', {alreadySeen:true});
			return `<div class='note ${statusMessage.className}'>${statusMessage.message}</div>`;
		}

		if (userName && !this.attr('receivingNurseUserNameValidFlag')) {
			return `<div class='note error'>'${userName}' is not a valid login name</div>`;
		}

		if (userName && this.attr('receivingNurseUserNameValidFlag')) {
			return `<div class='note success'>FIRST LAST was found</div>`;
		}

		if (userName!='' || this.attr('transferListLength')!=0){
		return "<div class='note'>Click on student to remove.</div>";
		}
		
		if (userName=='' || this.attr('transferListLength')!=0){
		return "<div class='note'>Enter Receiving Nurse Login Name below.</div>";
		}
		return '%nbsp;';
	}
});

const inputFunction=(el, event, vm)=>{
			const timeoutId = vm.receiverTypingTimeoutId;
			const checkReceiver = (receiver, vm) => () => {
				vm.checkReceiverValid(receiver);
				vm.attr('receivingNurseUserName', receiver);
			};
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			const receiverName = $(event.target).val();
		//	vm.attr('receivingNurseUserName', receiverName);
			if ($(document.activeElement).attr("id")=='receivingNurseUserName'){
			vm.receiverTypingTimeoutId = setTimeout(
				checkReceiver(receiverName, vm),
				2500
			);
			}
			else{
				checkReceiver(receiverName, vm)();
			}
		}

export default Component.extend({
	tag: 'user-nurse-student-selectorplus-manage-transfer',
	viewModel: ViewModel,
	template,
	events: {
		keyup: function(el, event) {inputFunction(el, event, this.viewModel);},
		'input change': function(el, event) {inputFunction(el, event, this.viewModel);},
	}
});
