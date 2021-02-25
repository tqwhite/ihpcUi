'use strict';
//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	const qtools = args.qtools;
	const pdfMake = args.pdfMake;
	const studentData = args.student;
	const planData = args.plan;

	const dictionaryData = {};
	args.dictionary.map(function(item) {
		dictionaryData[item.pattern] = item.replacement;
	});

// 	console.dir({
// 		"planData": planData
// 	});
// 	console.dir({
// 		"studentData": studentData
// 	});
// 	console.dir({
// 		"dictionaryData": dictionaryData
// 	});

	//LOCAL FUNCTIONS ====================================

	const genericLookup = function(sourceObj, propName, transformer) {
		var outData;

		var constantSpec = propName.match(/#(.*?)#/);
		if (constantSpec) {
			var sourceData = constantSpec[1];
		} else {
			var sourceData = sourceObj[propName];
		}

		var result = sourceData ? sourceData : '';

		if (typeof (transformer) == 'function') {
			result = transformer(result, sourceObj, propName);
		}

		if (typeof (transformer) == 'object' && transformer.length) {
			transformer.map(function(item) {
				result = item(result, sourceObj, propName);
			});
		}


		return result;
	}

	//LOCAL ASSEMBLY FUNCTIONS (also for export) ====================================

	const addElement = function(object, name, source) {
		if (source) {
		
		if (name=='style' && typeof(source)=='object'){
			Object.keys(source).forEach(keyName=>object[keyName]=source[keyName]);
		}
		else{
			object[name] = source;
		}
		
		
		
			object.test = object.test ? name : object.test + name;
			if (name == 'table') {
				object.layout = {
					hLineWidth: function(i, node) {
						return (i === 0 || i === node.table.body.length) ? 2 : 1;
					},
					vLineWidth: function(i, node) {
						if (node.style == 'section1') {
							switch (i.toString()) {
								case '0':
									return 2;
									break;

								case '1':
									return 0;
									break;

								case '2':
									return 0;
									break;

								case '3':
									return 2;
									break;

							}
						}
						return (i === 0 || i === node.table.widths.length) ? 2 : 1;
					},
					hLineColor: function(i, node) {
						return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
					},
					vLineColor: function(i, node) {
						return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
					},
					paddingLeft: function(i, node) {
						return 4;
					},
					paddingRight: function(i, node) {
						return 4;
					},
					paddingTop: function(i, node) {
						return 4;
					},
					paddingBottom: function(i, node) {
						return 4;
					}
				};
			}
		}
	}
	
	const addStyleProperties = function(workingObject, styleName, colSpan, rowSpan, alignment) {

		addElement(workingObject, 'style', styleName);
		addElement(workingObject, 'colSpan', colSpan);
		addElement(workingObject, 'rowSpan', rowSpan);
		addElement(workingObject, 'alignment', alignment);

		if (workingObject.text && (!workingObject.test || !workingObject.test.match(/[^text]/))) {
			workingObject = workingObject.text; //turns out that the form {text:'string'} without other properties crashes
		}

		delete workingObject.test;

		return workingObject
	}

	const assembleTextCell = function(propertyName, text, styleName, colSpan, rowSpan, alignment, pageBreak=false) {
		//genTableCell(text, styleName, colSpan, rowSpan, alignment)
		var workingObject = {};
		var result;

		if (typeof(text)=='string'){
			text=text?text:' ';
			text=text.replace(/\t/g, '    ');
		}
		
		if (pageBreak){
			workingObject.pageBreak='before';
		
		}


		addElement(workingObject, propertyName, text);

		result = addStyleProperties(workingObject, styleName, colSpan, rowSpan, alignment)

		return result
	}

	//METHODS AND PROPERTIES ====================================
	this.exportPackage = {};

	this.exportPackage.addElement=addElement;
	this.exportPackage.addStyleProperties=addStyleProperties;
	this.exportPackage.assembleTextCell=assembleTextCell;
	
	this.exportPackage.student = function(propName, transformer) {
		return genericLookup(studentData, propName, transformer);

	}

	this.exportPackage.plan = function(propName, transformer) {

		return genericLookup(planData, propName, transformer);

	}
	
	this.exportPackage.planData=planData;

	this.exportPackage.dictionary = function(propName, transformer) {

		return genericLookup(dictionaryData, propName, transformer);

	}
	this.exportPackage.standardDate = function(inData, sourceObj, propName) {
		if (!inData && propName != 'today') {
			return 'no date';
		}

		var dateGoodie;

		if (propName == 'today') {
			dateGoodie = new Date();
		} else {
			dateGoodie = (typeof (inData) == 'string') ? new Date(inData) : inData;
		}

		return qtools.getDateString('dd_MMM_yyyy', dateGoodie);
	}

	this.exportPackage.defaultNa = function(inData, sourceObj) {
		return inData ? inData : 'n/a';
	}

	this.exportPackage.addNewLine = function(inData) {
		return inData ? inData + '\n' : '';
	}

	this.exportPackage.mandatoryNewLine = function(inData) {
		return inData + '\n';
	}

	this.exportPackage.addSpace = function(inData) {
		return inData ? inData + ' ' : '';
	}

	this.exportPackage.wrapWith = function(prefix, suffix, keepIfEmpty) {
		prefix = prefix ? prefix : '';
		suffix = suffix ? suffix : '';
		return function(inData) {
			if (inData) {
				return prefix + inData + suffix;
			} else if (keepIfEmpty) {
				return prefix + suffix;
			}
			return ''

		}
	}

	this.exportPackage.defaultTo = function(defaultString) {
		return function(inData, sourceObj, propName) {
			if (!inData) {
				return defaultString;
			}
			return inData;

		}

	}

	//API ENDPOINTS ====================================


	const styles = {};
	
	this.namedStyleDefinitions=function(){
		return styles;
	}
	
	this.registerStyleDefinition=function(name, definition){
		if (styles[name]){
			console.log('WARNING: registerStyleDefinition() says, styled name \''+name+'\' is already in use. It was overwritten.');
		}
		
		styles[name]=definition;
	}

	//INITIALIZATION ====================================


	return this;
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction;
//module.exports = new moduleFunction();

