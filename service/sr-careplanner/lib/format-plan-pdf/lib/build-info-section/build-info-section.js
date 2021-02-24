'use strict';
//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {

	//START COMMON CODE SCOPE BLOCK ====================================
	//I don't want to have "pdfLibrary." prefixed to everything

	const pdfLibrary=args.pdfLibrary;

	const student=pdfLibrary.exportPackage.student;
	const plan=pdfLibrary.exportPackage.plan;
	const dictionary=pdfLibrary.exportPackage.dictionary;

	const standardDate=pdfLibrary.exportPackage.standardDate;
	const defaultNa=pdfLibrary.exportPackage.defaultNa;
	const addNewLine=pdfLibrary.exportPackage.addNewLine;
	const mandatoryNewLine=pdfLibrary.exportPackage.mandatoryNewLine;
	const addSpace=pdfLibrary.exportPackage.addSpace;
	const wrapWith=pdfLibrary.exportPackage.wrapWith;
	const defaultTo=pdfLibrary.exportPackage.defaultTo;

	const addElement=pdfLibrary.exportPackage.addElement;
	const addStyleProperties=pdfLibrary.exportPackage.addStyleProperties;
	const assembleTextCell=pdfLibrary.exportPackage.assembleTextCell;

	//END COMMON CODE SCOPE BLOCK ====================================

	//CONSTRUCTION ====================================

		const finalDocSpec = {
			widths: ['*', '*', '*', '*'],
			body: [
				[
					assembleTextCell('text', [{text: 'IEP Date: ',bold: true}, {text: student('iep')}], '', '', '', ''),
					assembleTextCell('text', [{text: '504 Date: ',bold: true}, {text: student('504plan')}], '', '', '', ''),
					assembleTextCell('text', [{text: 'EEP Date: ',bold: true}, {text: student('eep')}], '', '', '', ''),
					assembleTextCell('text', [{text: 'EAP Date: ',bold: true}, {text: student('eap')}], '', '', '', ''),
				],

				[
					assembleTextCell('text', [{text: 'IHP Author: : ',bold: true}, {text: dictionary('writtenby')}]),
					assembleTextCell('text', 'IHP Date: '+plan('createdAt', standardDate)),
// 					assembleTextCell('text', [{text: 'IEP: ',bold: true}, {text: '1/1/00'}], '', '', '', ''),
// 					assembleTextCell('text', [{text: 'Review: ',bold: true}, {text: '1/1/00'}], '', '', '', ''),
					
					assembleTextCell('text', [{text: ' ',bold: true}, {text: ' '}], '', '', '', ''),
					assembleTextCell('text', [{text: ' ',bold: true}, {text: ' '}], '', '', '', ''),
				]
			]
		};

	//METHODS AND PROPERTIES ====================================

		this.docSpec=function(){
console.dir({"finalDocSpec [build-info-section.js.this.docSpec]":finalDocSpec});


			return finalDocSpec;
		}


	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

