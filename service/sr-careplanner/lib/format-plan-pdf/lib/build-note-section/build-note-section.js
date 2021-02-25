'use strict';
//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	//START COMMON CODE SCOPE BLOCK ====================================
	//I don't want to have "pdfLibrary." prefixed to everything

	const pdfLibrary = args.pdfLibrary;

	const student = pdfLibrary.exportPackage.student;
	const plan = pdfLibrary.exportPackage.plan;
	const dictionary = pdfLibrary.exportPackage.dictionary;

	const standardDate = pdfLibrary.exportPackage.standardDate;
	const defaultNa = pdfLibrary.exportPackage.defaultNa;
	const addNewLine = pdfLibrary.exportPackage.addNewLine;
	const mandatoryNewLine = pdfLibrary.exportPackage.mandatoryNewLine;
	const addSpace = pdfLibrary.exportPackage.addSpace;
	const wrapWith = pdfLibrary.exportPackage.wrapWith;
	const defaultTo = pdfLibrary.exportPackage.defaultTo;

	const addElement = pdfLibrary.exportPackage.addElement;
	const addStyleProperties = pdfLibrary.exportPackage.addStyleProperties;
	const assembleTextCell = pdfLibrary.exportPackage.assembleTextCell;

	//END COMMON CODE SCOPE BLOCK ====================================

	
	const miscNoteBlock = function() {
		const block = [];
		block.push({ text: student('#Notes#', wrapWith('', ': ')), bold: true });
		block.push({ text: student('nurseNote', defaultTo(`n/a`)) });
		return block;
	};
	
	//CONSTRUCTION ====================================

	const finalDocSpec = {
		widths: ['*', '*', '*', '*'],
		body: [
			[
				assembleTextCell('text', miscNoteBlock(), '', '4', '', 'left'),
				assembleTextCell('text', ''),
				assembleTextCell('text', '')
			]
		]
	};

	//METHODS AND PROPERTIES ====================================

	this.docSpec = function() {
		console.dir({
			'finalDocSpec [build-info-section.js.this.docSpec]': finalDocSpec
		});
		
		return finalDocSpec;
	};
	
	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

