import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './store.less!';
import Payment from 'sr-careplanner/models/payment';
import template from './store.stache!';
import qtools from 'node_modules/qtools-minus/';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the setup-store component'
		},
		testTmp: {
			value: 'hello',
			serialize: false
		},
		unpaid: {
			value: true,
			serialize: false
		},
		productList: {
			value: [
				{
					code: 1,
					name: 'One month',
					price: '20.00',
					role: 'nurse',
					months: 1
				},
				{
					code: 3,
					name: 'Three Months',
					price: '55.00',
					role: 'nurse',
					months: 3
				},
				{
					code: 6,
					name: 'Six Months',
					price: '100.00',
					role: 'nurse',
					months: 6
				},
				{
					code: 12,
					name: 'One Year',
					price: '180.00',
					role: 'nurse',
					months: 12
				}
			],
			serialize: false
		},
		selectedProductCode: {
			value: '',
			serialize: false
		},
		selectedProductMonths: {
			value: 0,
			serialize: false
		},
		selectedProductPrice: {
			value: 0,
			serialize: false
		},
		selectedProductName: {
			value: '',
			serialize: false
		},
		purchaseDate: {
			value: '',
			serialize: false
		},
		usePurchaseOrder: {
			value: false,
			serialize: false
		},
		poInfo: {
			value: {
				personName: '',
				number: ''
			},
			serialize: false
		},
		ccInfo: {
			value: {
				personName: '',
				ccv: ''
			},
			serialize: false
		},
		payment: {
			value: Payment,
			type: '*',
			serialize: false
		},
		saveNotification: {
			value: false,
			serialize: false
		},
		receiptExpiration: {
			value: '',
			serialize: false
		},
		receiptMonths: {
			value: '',
			serialize: false
		},
		paymentProcessResult:{
			value: {},
			serialize: false
		}
	},
	
	submit: function() {
		this.attr('status', {
			class: 'good',
			message: 'processing'
		});

		console.dir({
			"this.attr('ccInfo') [store.js.submit]": this.attr('ccInfo')
		});

		const ccInfo = this.attr('ccInfo');

		const ccInfoRedacted = {
			name: ccInfo.name,
			street: ccInfo.street,
			city: ccInfo.city,
			state: ccInfo.state,
			zip: ccInfo.zip
		};

		const callSaveObject = (err, result) => {
			this.saveObject(
				this.attr('%root').attr('loginUserDataOnly'),
				ccInfoRedacted,
				this.attr('poInfo'),
				this.attr('selectedProductCode'),
				this.attr('usePurchaseOrder')
			);
		};

		const accessNonce = (ccInfo, callback) => {
			const dispatchCallback = response => {
				if (response.messages.resultCode === 'Error') {
					let i = 0;
					while (i < response.messages.message.length) {
						console.log(
							response.messages.message[i].code +
								': ' +
								response.messages.message[i].text
						);
						i = i + 1;
					}
					return;
				}

				ccInfoRedacted.opaqueData = response.opaqueData;
				callback();
			};
			
			const authData = {};
			authData.clientKey = '8v2RAmLU474peM9UML42qvXcR4gR5K3YBbbEHBx7rJF983K5F8qp5h932LxL6jyX';
			authData.apiLoginID = '76XgBFp7tQ';
			const cardData = {};
			cardData.cardNumber =ccInfo.number;
			cardData.month = ccInfo.expMonth;
			cardData.year = ccInfo.expYear;
			cardData.cardCode = ccInfo.cardCode;

			const secureData = {};
			secureData.authData = authData;
			secureData.cardData = cardData;
			Accept.dispatchData(secureData, dispatchCallback);
		};

		if (this.attr('usePurchaseOrder')) {
			callSaveObject();
		} else {
			accessNonce(ccInfo, callSaveObject);
		}

		this.attr('saveNotification', true);
	},
	
	saveObject: function(
		loginUser,
		ccInfo,
		poInfo,
		selectedProductCode,
		usePurchaseOrder
	) {
		var payment = new Payment({
			usePurchaseOrder: usePurchaseOrder ? true : false,
			ccInfo: ccInfo,
			poInfo: this.attr('poInfo'),
			userInfo: { refId: loginUser.refId, _id: loginUser._id },
			productInfo: { code: this.attr('selectedProductCode') }
		});

		//validation goes here, with a return;

		this.attr('saveNotification', true);
		const prevTimeoutId = this.attr('saveNotificationTimeoutId');
		if (prevTimeoutId) {
			clearTimeout(prevTimeoutId);
			this.attr('saveNotificationTimeoutId', '');
		}

		if (payment.isNew()) {
		}
		
setTimeout(()=>{
				this.attr('saveNotification', false);
				this.attr('unpaid', false); }, 4000);
				
		var promise = payment.save().then(
			item => {

this.attr('paymentProcessResult', item);



				this.attr('%root').attr(
					'lastDayInSubscription',
					item.incrementResult.newDate
				);

				this.attr('receiptExpiration', item.incrementResult.newDate);
				this.attr('receiptMonths', item.incrementResult.months);

				this.attr('saveNotification', false);
				this.attr('unpaid', false); 
				 const timeoutId = setTimeout(() => {
					this.attr('saveNotification', false);
				}, 2000);
				this.attr('saveNotificationTimeoutId', timeoutId);
			},
			err => {
				this.attr('saveError', JSON.stringify(err));
				console.dir({
					err: err
				});
			}
		);
	},
	
	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] =
			this.childComponentLists[childType] || [];

		if (window.location.href.match(/local/)) {
			this.attr('ccInfo', {
				number: '4007000000027',
				expMonth: '12',
				expYear: '52',
				cardCode: '111',
				name: 'TQ White II',
				street: '5004 Three Points Blvd',
				city: 'Mound',
				state: 'MN',
				zip: '55364'
			});
			this.attr('poInfo', {
				number: 'PO1234567',
				authName: 'TQ White II',
				authEmail: 'tq@justkidding.com',
				authPhone: '7087630100',
				orgName: 'cmERDC',
				street: '3550 Lexington, Suite 101',
				city: 'Shoreview',
				state: 'MN',
				zip: '55126'
			});
		}

		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['setup-store'] = this;
		console.log('added: window[' + "'" + 'setup-store' + "'" + ']');
		console.dir({
			'setup-store': this.attr(),
			childComponentLists: this.childComponentLists
		});
	}
});

export default Component.extend({
	tag: 'setup-store',
	viewModel: ViewModel,
	template
});
