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
		
		const addressString=`${student('street1')} ${student('street2')?', '+student('street2'):''}; ${student('city')},  ${student('zip')}`;

		block.push({text: student('first') + ' ' + student('middle') + ' ' + student('last'), style:'studentIdName'});
		block.push({text: student('gender', [wrapWith(' (', ')'), mandatoryNewLine])});

		block.push({text: student('phone', addNewLine), style:'studentSectionPhone'});
		block.push({text: addressString});
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



const finalDocSpec = {
	widths: ['*', '*'],
	body: [
		[
			
			
			{
				text: [
					assembleTextCell('text', studentIdBlock(), '', '', '', 'left'),
				],
				alignment:'left'
			},
			
			{
				text: [
					assembleTextCell('text', miscInfoBlock(), '', '', '', 'left'),
				],
				alignment:'left'
			}
		]
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

