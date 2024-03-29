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

		pdfLibrary.registerStyleDefinition('pageTitle', {
				bold: true,
				fontSize: 22
			});

		const finalDocSpec = {
			widths: ['*', 'auto', '*'],
			body: [
				[
				assembleTextCell('text', [dictionary('district', addNewLine), dictionary('infoPhone')], '', '', '', 'left'),
				assembleTextCell('text', 'INDIVIDUALIZED HEALTHCARE PLAN', 'pageTitle'),
				assembleTextCell('text', plan('today', standardDate), '', '', '', 'right')
				]
			]
		};

	//METHODS AND PROPERTIES ====================================

		this.docSpec=function(){
			return finalDocSpec;
		}

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

