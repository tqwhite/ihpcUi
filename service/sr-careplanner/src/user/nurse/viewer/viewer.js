import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './viewer.less!';
import template from './viewer.stache!';
import qtools from "node_modules/qtools-minus/";

import formatPlanPdf from "node_modules/format-plan-pdf/format-plan-pdf";
import pdfLibrary from "node_modules/format-plan-pdf/node_modules/pdf-library/pdf-library";
import buildHeaderSection from "node_modules/format-plan-pdf/node_modules/build-header-section/build-header-section";
import buildStudentSection from "node_modules/format-plan-pdf/node_modules/build-student-section/build-student-section";
import buildInfoSection from "node_modules/format-plan-pdf/node_modules/build-info-section/build-info-section";
import buildPlanSection from "node_modules/format-plan-pdf/node_modules/build-plan-section/build-plan-section";
import this_makes_a_global_called_pdfmake from "node_modules/pdfmake/build/pdfmake"
//HACKERY: I added code to subvert SSR in pdfmake at line 2
//if(!process.browser){return;} //tqii added this to subvert server side rendering.


export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-viewer component'
		},
		downloadReady:{
			value:'',
			serialize:false
		},
		dataUrl:{
			value:'',
			serialize:false
		}
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

		planFormatter.getPdfComponents((dataUrl, downloadFunction, printFunction) => {
			this.attr('dataUrl', dataUrl);
			this.attr('downloadReady', true);
			this.downloadFunction=downloadFunction;
			this.printFunction=printFunction;
		});
	},
	
	runDownloadFunction:function(){
		this.downloadFunction();
	},
	
	runPrintFunction:function(){
		this.printFunction();
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


export default Component.extend({
	tag: 'user-nurse-viewer',
	viewModel: ViewModel,
	template
});