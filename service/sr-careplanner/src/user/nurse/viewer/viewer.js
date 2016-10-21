import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './viewer.less!';
import template from './viewer.stache!';
import qtools from "node_modules/qtools-minus/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-viewer component'
		},
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[childType] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-nurse-viewer'] = this;
		console.log('added: window[' + "'" + 'user-nurse-viewer' + "'" + ']');
		console.dir({
			"user-nurse-viewer": this.attr(),
			'childComponentLists': this.childComponentLists
		});
	},

});

can.stache.registerHelper('nl2br', function(mapElement, options) {
	//options is documented https://canjs.com/docs/can.stache.helperOptions.html
	//if name is not specified in the call, name gets the options
	//this works as {{testHelper 'tq'}} or {{testHelper attrName}} 
	//or {{{genHtml data}}} if the result should not be escaped
	//note: options.scope.attr() does not work. It must have a property name.
	//however, it refers to the viewModel.
	//eg, options.scope.attr('message')

	let inData = mapElement();

	const student = options.scope.attr('currentStudent');

inData=inData.replace(/\n/g, "<br/>")
			.replace(/the student/ig, '<!first!>')
			.replace(/ /g, '&nbsp;')
			.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');


	if (typeof (inData) == 'string') {
		inData = qtools.templateReplace({
			template: inData,
			replaceObject: student,
			leaveUnmatchedTagsIntact: false
		}
		);

		return inData;
	} else {
		return 'n/a';
	}

});

export default Component.extend({
	tag: 'user-nurse-viewer',
	viewModel: ViewModel,
	template
});