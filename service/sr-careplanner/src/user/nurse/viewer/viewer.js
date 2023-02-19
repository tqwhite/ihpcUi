import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './viewer.less!';
import template from './viewer.stache!';
import qtools from 'lib/qtools-minus/';

import formatPlanPdf from 'lib/format-plan-pdf/format-plan-pdf';
import pdfLibrary
	from 'lib/format-plan-pdf/lib/pdf-library/pdf-library';
import buildHeaderSection
	from 'lib/format-plan-pdf/lib/build-header-section/build-header-section';
import buildStudentSection
	from 'lib/format-plan-pdf/lib/build-student-section/build-student-section';
	
	
import buildHealthcareProviderSection
	from 'lib/format-plan-pdf/lib/build-healthcare-provider-section/build-healthcare-provider-section';
import buildGuardianSection
	from 'lib/format-plan-pdf/lib/build-guardian-section/build-guardian-section';
import buildInfoNoteSection
	from 'lib/format-plan-pdf/lib/build-info-note-section/build-info-note-section';
import buildPlanSection
	from 'lib/format-plan-pdf/lib/build-plan-section/build-plan-section';

//pdfmake is not 'import' friendly. It is loaded with <script> in index.stache
//it's fonts are loaded by <script> in nurse.stache
//if they are loaded consecutively in the same .stache, I get an error that the font is not in the virtual file system
//the <script> call creates a global variable called pdfmake (?)

//NOTE: system/code/service/sr-careplanner/node_modules/pdfmake/build/pdfmake.min.js

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the user-nurse-viewer component'
		},
		downloadReady: {
			value: '',
			serialize: false
		},
		dataUrl: {
			value: '',
			serialize: false
		},
		isDotNet: {
			serialize: false,
			get: function() {
				const appVersion = window.navigator && window.navigator.appVersion;

				if (appVersion && appVersion.match(/NET/)) {
					return true;
				} else {
					return false;
				}
			}
		}
	},

	getPdfDataUrl: function() {
		var planFormatter = new formatPlanPdf({
			qtools: qtools,
			pdfLibrary:pdfLibrary,
			buildHeaderSection:buildHeaderSection,
			buildStudentSection:buildStudentSection,
			
			buildHealthcareProviderSection,
			buildGuardianSection,
			buildInfoNoteSection,
			buildPlanSection:buildPlanSection,
			
			pdfMake: pdfMake,
			student: this.attr('currentStudent').attr(),
			plan: this.attr('plan').attr(),
			dictionary:this.attr('%root').attr('loginUserWorkingData').dictionary
		});

		planFormatter.getPdfComponents((dataUrl, downloadFunction, printFunction) => {
			this.attr('dataUrl', dataUrl);
			this.attr('downloadReady', true);
			this.downloadFunction=downloadFunction;


			this.printFunction=printFunction;
		});
	},

	runDownloadFunction: function() {
		this.downloadFunction();
	},

	runPrintFunction: function() {
		this.printFunction();
	},

	collectChildComponents: function(childType, childVm) {
		this.childComponentLists = this.childComponentLists || {};
		this.childComponentLists[childType] = this.childComponentLists[
			childType
		] || [];
		this.childComponentLists[childType].push(childVm);
	},
	testElement: function() {
		window['user-nurse-viewer'] = this;
		console.log('added: window[' + "'" + 'user-nurse-viewer' + "'" + ']');
		console.dir({
			'user-nurse-viewer': this.attr(),
			childComponentLists: this.childComponentLists
		});
	}
});

export default Component.extend({
	tag: 'user-nurse-viewer',
	viewModel: ViewModel,
	template
});
