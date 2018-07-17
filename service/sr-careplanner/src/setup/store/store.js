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
			value: 'This is the setup-store component',
			serialize: false
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
					code: 'RENEW',
					name: 'One year',
					price: '99.00',
					role: 'nurse',
					months: 12,
					NOTE: 'this is duplicated in api/payment.js',
					NOTE2: 'this is duplicated in ui/store.js'
				},
// 				{
// 					code: 3,
// 					name: 'Three Months',
// 					price: '55.00',
// 					role: 'nurse',
// 					months: 3
// 				},
// 				{
// 					code: 6,
// 					name: 'Six Months',
// 					price: '100.00',
// 					role: 'nurse',
// 					months: 6
// 				},
// 				{
// 					code: 12,
// 					name: 'One Year',
// 					price: '180.00',
// 					role: 'nurse',
// 					months: 12
// 				}
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
		paymentProcessResult: {
			value: {},
			serialize: false
		},
		hasEntryErrors: {
			value: 0,
			serialize: false
		},
		showBuyButton: {
			value: false,
			serialize: false
		}
	},
	
	submit: function() {
		this.attr('status', {
			class: 'good',
			message: 'processing'
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
			if (!err) {
				this.saveObject(
					this.attr('%root').attr('loginUserDataOnly'),
					ccInfoRedacted,
					this.attr('poInfo'),
					this.attr('selectedProductCode'),
					this.attr('usePurchaseOrder')
				);
			} else {
				this.attr('status', {
					class: 'bad',
					message: err
				});
				console.log(
					'error from authorize nonce generation [setup/store/store.js.submit]'
				);
			}
		};


		const accessNonce = (ccInfo, callback) => {
			const config = this.attr('%root').attr('configuration');
			const processorChoice = config.processorChoice;
			let apiLoginID = config.keys[processorChoice].authorizeApiLoginKey;
			let clientKey = config.keys[processorChoice].authorizePublicClientKey;
			const dispatchCallback = response => {
				console.dir({ 'response [store.js.submit]': response });
		
				if (response.messages.resultCode === 'Error') {
					let i = 0;
					while (i < response.messages.message.length) {
						console.log(
							'Accept.dispatchData says: ' +
								response.messages.message[i].code +
								': ' +
								response.messages.message[i].text +
								' [setup/store/store.js]'
						);
						i = i + 1;
					}
					this.attr('saveNotification', false);
					callback(response.messages.message[0].text);
					return;
				}
		
				ccInfoRedacted.opaqueData = response.opaqueData;
				callback();
			};
			
			const authData = {};
			authData.clientKey = clientKey;
			authData.apiLoginID = apiLoginID;
			const cardData = {};
			cardData.cardNumber = ccInfo.number;
			cardData.month = ccInfo.expMonth;
			cardData.year = ccInfo.expYear;
			cardData.cardCode = ccInfo.cardCode;
		
			const secureData = {};
			secureData.authData = authData;
			secureData.cardData = cardData;
			Accept.dispatchData(secureData, dispatchCallback);
		};
		this.attr('saveNotification', true);

		if (this.attr('usePurchaseOrder')) {
			callSaveObject();
		} else {
			accessNonce(ccInfo, callSaveObject);
		}

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
			productInfo: { code: this.attr('selectedProductCode'),
			price: this.attr('selectedProductPrice')}
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

		// setTimeout(()=>{
		// 				this.attr('saveNotification', false);
		// 				this.attr('unpaid', false);
		// 				}, 4000);

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
				this.attr('saveError', JSON.stringify(err.responseText));
				console.dir({"err [store.js.saveObject]":err});
				this.attr('status', {
					class: 'bad',
					message:
						typeof err.responseJSON == 'object'
							? err.responseJSON.errorText
							: 'unknown error'
				});
				this.attr('saveNotification', false);
			}
		);
	},
	
	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] =
			this.childComponentLists[childType] || [];

		if (window.location.href.match(/local/)) {
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

		if (window.location.href.match(/local/)) {
			this.attr('ccInfo', {
				number: '4007000000027',
				name: 'TQ White II',
				email: 'tq@justkidding.com',
				expMonth: '01',
				expYear: '20',
				cardCode: '333',
				zip: '55126'
			});
		}

		this.childComponentLists[childType].push(childVm);

		this.attr('status', { message: 'All fields are required', class: 'good' });
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

const localDataChangeHandler = function(domObj, event) {
	const ccInfo = this.viewModel.attr('ccInfo');
	const poInfo = this.viewModel.attr('poInfo');
	const fieldName = domObj.attr('fieldName');
	const fieldLabel = domObj.attr('placeholder');
	const value = ccInfo[fieldName];
	var payment = new Payment({
		usePurchaseOrder: this.viewModel.attr('usePurchaseOrder') ? true : false,
		ccInfo: ccInfo,
		poInfo: poInfo,
		userInfo: this.viewModel.attr('loginUser'),
		productInfo: { code: this.viewModel.attr('selectedProductCode') }
	});

	const validator = this.viewModel.attr('usePurchaseOrder')
		? payment.checkPoInfo.bind(payment)
		: payment.checkCcInfo.bind(payment);
	const result = validator(fieldName, fieldLabel);
	

	if (result.length) {
		this.viewModel.attr('status', {
			message: result[0].errorText,
			class: 'bad'
		});
		domObj.addClass('errorx');
	} else {
		this.viewModel.attr('status', {
			message: 'All fields are required',
			class: 'good'
		});
		domObj.removeClass('errorx');
	}

	this.viewModel.attr('hasEntryErrors', validator().length);
	this.viewModel.attr(
		'showBuyButton',
		this.viewModel.attr('selectedProductPrice') &&
		!this.viewModel.attr('hasEntryErrors')
			? true
			: false
	);
};

export default Component.extend({
	tag: 'setup-store',
	viewModel: ViewModel,
	template,
	events: {
		'input blur': localDataChangeHandler,
		'textarea blur': localDataChangeHandler
	}
});
