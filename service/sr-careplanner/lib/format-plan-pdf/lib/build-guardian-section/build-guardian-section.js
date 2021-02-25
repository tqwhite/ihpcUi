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

	const guardianList=student('guardianList');

	const cellStyleLiteral={
					margin:[0, 5, 0, 5],

	};

	const hcProviderList=student('hcProviderList');

	let widths=['*','*','*','*','*','*',];
	const body = guardianList.map(item => {
		const addressString=`${item.street1} ${item.street2?', '+item.street2:''}; ${item.city},  ${item.zip}`;
		const phoneAltString=item.phoneAlt?`\n(alt: ${item.phoneAlt})`:'';
		const phoneString=`${item.phoneMain}${phoneAltString}`;

		return [
			assembleTextCell('text', item.relationship, cellStyleLiteral),
			assembleTextCell('text', item.name, cellStyleLiteral),
			assembleTextCell('text', phoneString, cellStyleLiteral),
			assembleTextCell('text', item.emailAdr, cellStyleLiteral),
			assembleTextCell('text', addressString, cellStyleLiteral, 2),
		];
	});

	if (!body.length){
		widths=['*']
		body.push([assembleTextCell('text', 'no guardians entered', cellStyleLiteral)])
	}

	//CONSTRUCTION ====================================

	const finalDocSpec = {
		widths,
		margin:[0, 5, 0, 5],
		body
	};

	//METHODS AND PROPERTIES ====================================

	this.docSpec = function() {
	console.log(JSON.stringify(finalDocSpec));
		return finalDocSpec;
	};

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

