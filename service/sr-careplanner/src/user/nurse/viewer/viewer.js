import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './viewer.less!';
import template from './viewer.stache!';
import qtools from "node_modules/qtools-minus/";

import formatPlanPdf from "node_modules/format-plan-pdf/";
import pdfLibrary from "node_modules/format-plan-pdf/node_modules/pdf-library/";
import buildHeaderSection from "node_modules/format-plan-pdf/node_modules/build-header-section/";
import buildStudentSection from "node_modules/format-plan-pdf/node_modules/build-student-section/";
import buildInfoSection from "node_modules/format-plan-pdf/node_modules/build-info-section/";
import buildPlanSection from "node_modules/format-plan-pdf/node_modules/build-plan-section/";

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-viewer component'
		},
	},
	
	getPdfDataUrl: function() {


		var planFormatter = new formatPlanPdf({
			qtools: qtools,pdfLibrary:pdfLibrary,
			buildHeaderSection:buildHeaderSection,
			buildStudentSection:buildStudentSection,
			buildInfoSection:buildInfoSection,
			buildPlanSection:buildPlanSection,
			pdfMake: pdfMake,
			student: this.attr('currentStudent').attr(),
			plan: this.attr('plan').attr(),
			dictionary:this.attr('%root').attr('loginUserDataOnly').dictionary
		});

		planFormatter.getDataUrl((dataUrl, downloadFunction) => {
			this.attr('dataUrl', dataUrl);
			this.attr('downloadReady', true);
			this.downloadFunction=downloadFunction;
		});
	},
	
	runDownloadFunction:function(){
		this.downloadFunction();
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

	let inData = mapElement(); //this is a peculiarity of the stache/donejs helper thing


	const student = options.scope.attr('currentStudent');
	const rawDictionary = options.scope.attr('%root').attr('loginUserDataOnly').dictionary;
	let dictionary = {};

	for (var i in rawDictionary) {
		const element = rawDictionary[i];
		dictionary[element.pattern] = element.replacement;
	}

	inData = inData
		.replace(/on\w*=/ig, 'oneventnotallowed=')
		.replace(/javascript/ig, 'javascriptnotallowed')
		.replace(/<script(.*?)>/ig, '&lt;scriptnotallowed$1&gt;')
		.replace(/<\/script(.*?)>/ig, '&lt;/scriptnotallowed$1&gt;')
		.replace(/the student/ig, '<!first!>')
		.replace(/(\n)(?![^<]*>|[^<>]*<\/)/g, "<br/>")
		.replace(/( )(?![^<]*>|[^<>]*<\/)/g, '&nbsp;')
		.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
		//thanks Jerry for the &nbsp; substitution strategy
		//http://stackoverflow.com/questions/18621568/regex-replace-text-outside-html-tags

	if (typeof (inData) == 'string') {
		inData = qtools.templateReplace({
			template: inData,
			replaceObject: student,
			leaveUnmatchedTagsIntact: true
		}
		);
		inData = qtools.templateReplace({
			template: inData,
			replaceObject: dictionary,
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