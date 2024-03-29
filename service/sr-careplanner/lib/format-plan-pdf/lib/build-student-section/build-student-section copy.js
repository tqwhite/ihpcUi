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

	//CONSTRUCTION ====================================

	pdfLibrary.registerStyleDefinition('studentIdName', {
			bold: true,
			fontSize: 14
		});

	pdfLibrary.registerStyleDefinition('studentSectionPhone', {
			bold: false,
			fontSize: 12
		});

	const studentIdBlock = function() {
		const block = [];
		
		/*
		
		block.push({text: student('first') + ' ' + student('middle') + ' ' + student('last'), style:'studentIdName'});
		block.push({text: student('gender', [wrapWith(' (', '')])});
		block.push({text: student('idNumber', [wrapWith(', id: ', ')'), mandatoryNewLine])});
		*/
		
		
		
		block.push({text: student('first') + ' ' + student('middle') + ' ' + student('last'), style:'studentIdName'});
		block.push({text: student('gender', [wrapWith(' (', ')'), mandatoryNewLine])});

		block.push({text: student('phone', addNewLine), style:'studentSectionPhone'});
		block.push({text: student('street1', addNewLine)});
		block.push({text: student('street2', addNewLine)});
		block.push({text: student('city') + ' ' + student('state') + ' ' + student('zip', addNewLine)});
		return block;
	}

	const guardianOneBlock = function() {
		const block = [];
		block.push({text: student('gOneRelationship', wrapWith('', ': ')), style:'studentIdName'});
		block.push({text: student('gOneName', addNewLine), style:'studentIdName'});
		block.push({text: student('gOnePhoneMain', addSpace), style:'studentSectionPhone'});
		block.push({text: student('gOnePhoneAlt', [wrapWith('(alt: ', ')'), defaultTo(' '), addNewLine])});
		block.push({text: student('gOneEmailAdr', addNewLine), style:'studentSectionPhone'});

		block.push({text: student('gOneStreet1', addNewLine)});
		block.push({text: student('gOneStreet2', addNewLine)});

		block.push({text: student('gOneCity', addSpace)});
		block.push({text: student('gOneState', addSpace)});
		block.push({text: student('gOneZip')});

		return block;
	}

	const guardianTwoBlock = function() {
		const block = [];
		block.push({text: student('gTwoRelationship', wrapWith('', ': ')), style:'studentIdName'});
		block.push({text: student('gTwoName', addNewLine), style:'studentIdName'});
		block.push({text: student('gTwoPhoneMain', addSpace), style:'studentSectionPhone'});
		block.push({text: student('gTwoPhoneAlt', [wrapWith('(alt: ', ')'), defaultTo(' '), addNewLine])});
		block.push({text: student('gTwoEmailAdr', addNewLine), style:'studentSectionPhone'});

		block.push({text: student('gTwoStreet1', addNewLine)});
		block.push({text: student('gTwoStreet2', addNewLine)});

		block.push({text: student('gTwoCity', addSpace)});
		block.push({text: student('gTwoState', addSpace)});
		block.push({text: student('gTwoZip')});

		return block;
	}

	const miscInfoBlock = function() {
		const block = [];
		block.push({text: student('#Birthday: #'),bold: true});
		block.push({text: student('birthday', [defaultTo('n/a'), addNewLine])});
		block.push({text: student('# Grade Level: #'),bold: true});
		block.push({text: student('gradeLevel', [defaultTo('n/a'), addNewLine])});
		block.push({text: student('# School: #'),bold: true});
		block.push({text: student('school', [defaultTo('n/a'), addNewLine])});

		block.push({text: student('#Teacher/Counselor: #'),bold: true});
		block.push({text: student('teacher', [defaultTo('n/a'), addNewLine])});

		return block;
	}

	const hcOneBlock = function() {
		const block = [];
		block.push({text: student('#Health Care Provider#', addNewLine),bold: true});
		block.push({text: student('hcOneName', [defaultTo('n/a'), addNewLine])});

		block.push({text: student('hcOnePhone', addNewLine)});
		block.push({text: student('hcOneEmailAdr', addNewLine)});

		return block;
	}

	const hcTwoBlock = function() {
		const block = [];
		block.push({text: student('#Health Care Provider#', addNewLine),bold: true});
		block.push({text: student('hcTwoName', [defaultTo('n/a'), addNewLine])});

		block.push({text: student('hcTwoPhone', addNewLine)});
		block.push({text: student('hcTwoEmailAdr', addNewLine)});

		return block;
	}
	
	const idcBlock=function(){
		const block = [];
		block.push({text: student('#ICD-10-CM#', wrapWith('', ' ')), bold: true});
		block.push({text: student('icdCode', defaultTo('n/a'))});
		return block;
	}

	const finalDocSpec = {
		widths: ['*', '*', '*'],
		body: [
			[assembleTextCell('text', studentIdBlock(), '', '', '', 'left'),
				assembleTextCell('text', guardianOneBlock(), '', '', '', 'left'),
				assembleTextCell('text', guardianTwoBlock(), '', '', '', 'left')],

			[assembleTextCell('text', miscInfoBlock(), '', '', '', 'left'),
				assembleTextCell('text', hcOneBlock(), '', '', '', 'left'),
				assembleTextCell('text', hcTwoBlock(), '', '', '', 'left')],

			[assembleTextCell('text', idcBlock(), '', '3', '', 'left'),
				assembleTextCell('text', ''),
				assembleTextCell('text', '')]
		]
	};

	//METHODS AND PROPERTIES ====================================

	this.docSpec = function() {
		return finalDocSpec;
	}

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

