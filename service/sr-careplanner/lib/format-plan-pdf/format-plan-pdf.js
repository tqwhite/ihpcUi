'use strict';

//START OF moduleFunction() ============================================================
//invoked from /Users/tqwhite/Documents/webdev/ihpCreator/applications/ui/system/code/service/sr-careplanner/src/user/nurse/nurse.js

var moduleFunction = function(args) {

	//LOCAL VARIABLES ====================================
	//NOTE: system/code/service/sr-careplanner/node_modules/pdfmake/build/pdfmake.js

	const pdfLibrary = new args.pdfLibrary(args)

	const buildHeaderSection = new args.buildHeaderSection({
		pdfLibrary: pdfLibrary
	})
	const buildStudentSection = new args.buildStudentSection({
		pdfLibrary: pdfLibrary
	})
	const buildPlanSection = new args.buildPlanSection({
		pdfLibrary: pdfLibrary
	})



	const buildHealthcareProviderSection = new args.buildHealthcareProviderSection({
		pdfLibrary: pdfLibrary
	})
	const buildGuardianSection = new args.buildGuardianSection({
		pdfLibrary: pdfLibrary
	})
	const buildInfoNoteSection = new args.buildInfoNoteSection({
		pdfLibrary: pdfLibrary
	})
	
	
	
	
	const pdfMake = args.pdfMake;
	const assembleTextCell = pdfLibrary.exportPackage.assembleTextCell;

	const student = pdfLibrary.exportPackage.student;

	//CONSTRUCTION ====================================

	pdfLibrary.registerStyleDefinition('container', {
		margin: [0, 0, 0, 0]
	});

	const assembleReportBody = function() {



		const headerSection = buildHeaderSection.docSpec();
		const studentSection = buildStudentSection.docSpec();
		
		
		const healthcareProviderSection = buildHealthcareProviderSection.docSpec();
		const parentSection = buildGuardianSection.docSpec();
		const infoNoteSection = buildInfoNoteSection.docSpec();
		const planSection = buildPlanSection.docSpec();
	
		const body = []

		body.push([assembleTextCell('table', headerSection, '', '', '', 'center')])
		body.push([assembleTextCell('table', studentSection, '', '', '', 'center')])
 		body.push([assembleTextCell('table', parentSection, '', '', '', 'center')])
 		body.push([assembleTextCell('table', infoNoteSection, '', '', '', 'center')])
		body.push([assembleTextCell('table', healthcareProviderSection, '', '', '', 'center')])
		body.push([assembleTextCell('table', planSection, 'marginTop', '', '', 'center', 'pageBreak')])

		return body;

	};

	const assembleContent = function() {
		return [
			{
				style: 'container',
				layout: 'noBorders',
				table: {
					widths: ['*'],
					body: assembleReportBody()
				}
			},
		];
	}



		pdfLibrary.registerStyleDefinition('marginTop', {
				margin:[0, 10, 0, 0]
			});

		pdfLibrary.registerStyleDefinition('rightRepeatHeader', {
				bold: true,
				margin:[0, 10, 30, 10]
			});
		
		pdfLibrary.registerStyleDefinition('leftRepeatHeader', {
				bold: true,
				margin:[30, 10, 0, 10]
			});
		
		pdfLibrary.registerStyleDefinition('centerRepeatHeader', {
				bold: true,
				margin:[0, 10, 0, 10]
			});
			

	const finalDocSpec = {
		background: [],
		pageOrientation: 'landscape',
		pageMargins: [30, 35, 30, 30],
		defaultStyle: {
			fontSize: 10
		},
		 pageSize: 'LETTER',
		content: assembleContent(),
		images: {},
		styles: pdfLibrary.namedStyleDefinitions(),
		header: function(currentPage, pageCount) {
			// you can apply any logic and return any valid pdfmake element

			var header = {
				table: {
					widths: ['*', 'auto', '*'],
					body: [
						[student('first') + ' ' + student('last'), 'INDIVIDUALIZED HEALTHCARE PLAN', 'Page ' + currentPage + ' of ' + pageCount]
					]
				},
				layout:{
					hLineWidth: function(i, node) {return 0;},
					vLineWidth: function(i, node) {return 0;},
					hLineColor: function(i, node) {return 0;},
					vLineColor: function(i, node) {
						return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
					}
				}
			}

			var finalDocSpec = {
				table: {
					widths: ['*', 'auto', '*'],
					body: [
						[
						assembleTextCell('text', student('first') + ' ' + student('last'), 'leftRepeatHeader', '', '', 'left'),
						assembleTextCell('text', 'INDIVIDUALIZED HEALTHCARE PLAN', 'centerRepeatHeader'),
						assembleTextCell('text', "Page " + currentPage + ' of ' + pageCount, 'rightRepeatHeader', '', '', 'right')
						]
					]
				}
			}
			


			if (currentPage != 1) {
				return finalDocSpec;
				return {
					text: currentPage + '/' + pageCount + 'simple text',
					alignment: (currentPage % 2) ? 'left' : 'right'
				};
			}
			return {};
		},

	}

	//METHODS AND PROPERTIES ====================================

	this.getPdfComponents = function(callback) {
		const pdfDocGenerator = pdfMake.createPdf(finalDocSpec);

		const downloadFunction = function() {
			pdfDocGenerator.download(student('first') + student('last') + '_ihp.pdf', callback)
		}

		const printFunction = function() {
			pdfDocGenerator.print()
		}

		// CHANGED: Use getBlob() instead of getDataUrl() to prevent memory exhaustion
		// Blob URLs are more efficient and don't have the ~2MB Chrome limit
		pdfDocGenerator.getBlob((blob) => {
			const blobUrl = URL.createObjectURL(blob);
			callback(blobUrl, downloadFunction, printFunction);
		});

	}

	//API ENDPOINTS ====================================

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

