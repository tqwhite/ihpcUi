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
	
	const planData=pdfLibrary.exportPackage.planData;
	const conditions=planData.conditions;
	
	if (conditions.length===0){
		conditions.push({title:"NO CONDITIONS HAVE BEEN SPECIFIED", diagnoses:[]});
	}
	
	const replaceGoodies=function(inString){
		if (!inString){
			inString='n/a';
		}
		
		return inString.replace(/the student/ig, student('first')+' '+student('last'));
	}

	//CONSTRUCTION ====================================
	
	pdfLibrary.registerStyleDefinition('conditionTitle', {
			bold: true,
			fontSize: 18
		});
	
	
	pdfLibrary.registerStyleDefinition('ndTitle', {
			bold: true,
			fontSize: 14
		});
	
	const body=[];
	
	const addDiagnoses=function(diagnoses){
	
	for (var i=0, len=diagnoses.length; i<len; i++){


		var diagnosis=diagnoses[i];
			body.push([assembleTextCell('text', diagnosis.shortName, 'ndTitle', '4', '', 'left'),
					assembleTextCell('text', ''),
					assembleTextCell('text', ''),
					assembleTextCell('text', '')]);

				body.push([assembleTextCell('text', 'Assessment Data', '', '', '', 'left'),
					assembleTextCell('text', 'Nursing Diagnosis', '', '', '', 'left'),
					assembleTextCell('text', 'Interventions', '', '', '', 'left'),
					assembleTextCell('text', 'Expected Student Outcomes', '', '', '', 'left')]);

				body.push([assembleTextCell('text', replaceGoodies(diagnosis.assessmentData?diagnosis.assessmentData:' '), '', '', '', 'left'),
					assembleTextCell('text', replaceGoodies(diagnosis.nursingDiagnosis), '', '', '', 'left'),
					assembleTextCell('text', replaceGoodies(diagnosis.interventions), '', '', '', 'left'),
					assembleTextCell('text', replaceGoodies(diagnosis.outcomes), '', '', '', 'left')]);
			
	}

	

	
	}
		
	const assembleCondition=function(condition){
			body.push([assembleTextCell('text', condition.title, 'conditionTitle', '4', '', 'center'),
					assembleTextCell('text', ''),
					assembleTextCell('text', ''),
					assembleTextCell('text', '')])

			addDiagnoses(condition.diagnoses);
	}
	
	
	
	for (var i=0, len=conditions.length; i<len; i++){
		var condition=conditions[i];
		assembleCondition(condition);
	}

	
	const finalDocSpec={
			widths: ['*', '*', '*', '*'],
			body: body
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

