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

// 					assembleTextCell('text', [{text: 'IEP Date: ',bold: true}, {text: student('iep')}], '', '', '', ''),
// 					assembleTextCell('text', [{text: '504 Date: ',bold: true}, {text: student('504plan')}], '', '', '', ''),
// 					assembleTextCell('text', [{text: 'EEP Date: ',bold: true}, {text: student('eep')}], '', '', '', ''),
// 					assembleTextCell('text', [{text: 'EAP Date: ',bold: true}, {text: student('eap')}], '', '', '', ''),
// 					assembleTextCell('text', [{text: 'IHP Author: : ',bold: true}, {text: dictionary('writtenby')}]),
// 					assembleTextCell('text', 'IHP Date: '+plan('createdAt', standardDate)),

	const miscNoteBlock = function() {
		const block = [];
		block.push({ text: student('#Notes#', wrapWith('', ': \n')), bold: true });
		block.push({ text: student('nurseNote', defaultTo(`\nn/a`)) });
		return block;
	};

	const idcBlock=function(){
		const block = [];
		block.push({text: student('#ICD-10-CM#', wrapWith('', ' ')), bold: true});
		block.push({text: student('icdCode', defaultTo('n/a'))});
		return block;
	}

	const cellStyleLiteral={
					border: [false, false, false, false],
					margin:[0, 5, 0, 5],

	};
	const icdCellStyleLiteral={
					...cellStyleLiteral,
					border: [false, true, false, false]

	};
	
const finalDocSpec = {
	widths: ['*', '*'],
	body: [
		[
			{
				layout: 'lightHorizontalLines',
				table: {
					body: [
						[
							assembleTextCell('text', [{text: 'IHP Author: : ',bold: true}, {text: dictionary('writtenby')}], cellStyleLiteral),
							assembleTextCell('text', 'IHP Date: '+plan('createdAt', standardDate), cellStyleLiteral),
						]
						,
						[
							assembleTextCell('text', [{text: 'IEP Date: ',bold: true}, {text: student('iep')}], cellStyleLiteral, '', '', ''),
							assembleTextCell('text', [{text: '504 Date: ',bold: true}, {text: student('504plan')}], cellStyleLiteral, '', '', ''),
						],
						[
							assembleTextCell('text', [{text: 'EEP Date: ',bold: true}, {text: student('eep')}], cellStyleLiteral, '', '', ''),
							assembleTextCell('text', [{text: 'EAP Date: ',bold: true}, {text: student('eap')}], cellStyleLiteral),
						]
						,
						[
							assembleTextCell('text', idcBlock(), icdCellStyleLiteral, '2', '', 'left')
						]
					]
				},
			},
			{
				text: [
					assembleTextCell('text', miscNoteBlock(), '', '', '', 'left'),
				],
				alignment:'left'
			}
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

