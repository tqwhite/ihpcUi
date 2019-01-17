import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './receivetransfer.less!';
import template from './receivetransfer.stache!';
import Transfer from 'sr-careplanner/models/transfer';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-student-receivetransfer component'
		},
		selectedTransfer: {
			value: Transfer,
			serialize: false
		},
		transferResultStatus:{
			value: '',
			serialize: false
		}
	},

	selectOffer: function(event, offer) {
		event.stopPropagation();
		this.attr('selectedTransfer', offer);
		this.attr('transferResultStatus', '');
	},

	acceptSelectedTransfer: function(event, offer) {
		event.stopPropagation();
		this.attr('transferResultStatus', 'UPDATING ACCEPTED STATUS');
		this.attr('selectedTransfer').attr('status', 'accepted');
		this.putSelectedTransfer((err, status)=>{
			this.attr('transferResultStatus', 'rejectSelectedTransfer');
			this.attr('transferResultStatus', `acceptSelectedTransfer: ${status}`);
		});
	},

	rejectSelectedTransfer: function(event, offer) {
		event.stopPropagation();
		this.attr('transferResultStatus', 'UPDATING REJECTED STATUS');
		this.attr('selectedTransfer').attr('status', 'rejected');
		this.putSelectedTransfer((err, status)=>{
			this.attr('transferResultStatus', `rejectSelectedTransfer: ${status} ${this.attr('saveError')}`);
		});
	},
	
	putSelectedTransfer: function(callback){
		const localCallback=(err, result)=>{
console.dir({"result [receivetransfer.js.putSelectedTransfer]":result});
console.dir({"err [receivetransfer.js.putSelectedTransfer]":err});




			callback(err, "putSelectedTransfer");
		}
		
		const selectedTransfer=this.attr('selectedTransfer');
		new Transfer.Transfer(selectedTransfer.attr()).save().then(localCallback, err => {
			this.attr('saveError', JSON.stringify(err));
		});
		
	}
});

export default Component.extend({
	tag: 'user-nurse-student-receivetransfer',
	viewModel: ViewModel,
	template
});
