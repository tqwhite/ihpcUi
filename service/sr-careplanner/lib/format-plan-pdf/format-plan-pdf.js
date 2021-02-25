'use strict';

//START OF moduleFunction() ============================================================

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
	const buildInfoSection = new args.buildInfoSection({
		pdfLibrary: pdfLibrary
	})
	const buildNoteSection = new args.buildNoteSection({
		pdfLibrary: pdfLibrary
	})
	const buildInfoNoteSection = new args.buildInfoNoteSection({
		pdfLibrary: pdfLibrary
	})
	const buildPlanSection = new args.buildPlanSection({
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



		const section1 = buildHeaderSection.docSpec();
		const section2 = buildStudentSection.docSpec();
		const section3 = buildInfoSection.docSpec();
		const section4 = buildNoteSection.docSpec();
		const section3a = buildInfoNoteSection.docSpec();
		const section5 = buildPlanSection.docSpec();
	
console.log(`\n=-=X:============   assembleReportBody  ========================= [format-plan-pdf.js.assembleReportBody]\n`);


	const tmp=console.log(JSON.stringify(section3a))
console.log(`\n=-=X:============   assembleReportBody  ========================= [format-plan-pdf.js.assembleReportBody]\n`);

		const body = []

		body.push([assembleTextCell('table', section1, '', '', '', 'center')])
		body.push([assembleTextCell('table', section2, '', '', '', 'center')])
		body.push([assembleTextCell('table', section3a, '', '', '', 'center')])
		body.push([assembleTextCell('table', section3, '', '', '', 'center')])
		body.push([assembleTextCell('table', section4, '', '', '', 'center')])
		body.push([assembleTextCell('table', section5, 'marginTop', '', '', 'center', 'pageBreak')])

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

		const localCallback = function(dataUrl) {
			callback(dataUrl, downloadFunction, printFunction);
		}
		pdfDocGenerator.getDataUrl(localCallback);

	}

	//API ENDPOINTS ====================================

	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

