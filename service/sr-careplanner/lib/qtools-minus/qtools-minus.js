'use strict';


module.exports = {




	newGuid:function() {
			//thanks 'broofa': http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			}).toLowerCase();
		},
	
	

	getSurePath:function(baseObj, subPathString, defaultReturn, debug) {
		var target = baseObj,
			elements;
		this.getDottedPathLastProgressiveString = '';

		if (baseObj == null) {
			throw "qtools.getSurePath() says, baseObj cannot be null";
		}
		;

		if (subPathString.toString().match(/\.|\[/)) {
			var elements = subPathString.split(/\.|\[(.*?)]/);
		} else {
			var elements = [];
			elements.push(subPathString);
		}

		if (!subPathString) {
			return baseObj;
		}

		if (elements.length < 2) {
			return baseObj[subPathString];
		} else {
			for (var i = 0, len = elements.length; i < len; i++) {
				if (elements[i]) { //mainly eliminates trailing periods but would also eliminates double periods and other regex anomalies
					target = target[elements[i]];

					this.getDottedPathLastProgressiveString += elements[i] + '.';
					if (typeof (target) == 'undefined') {

						if (typeof (defaultReturn) != 'undefined' && typeof (target) == 'undefined') {
							return defaultReturn;
						}

						return;
					}
				}
			}
		}

		return target;
	},

	getByProperty:function(inData, propertyName, propertyValue) {
		if (inData.length) {
			var len = inData.length,
				inx = 0;
			for (inx = 0; inx < len; inx++) {
				if (this.getSurePath(inData[inx], propertyName) == propertyValue) {
					return inData[inx];
				}
			}
		} else if (typeof (inData) == 'object') {

			for (var inx in inData) {

				if (this.getSurePath(inData[inx], propertyName) == propertyValue) {
					return inData[inx];
				}
			}
		}
		return null;
	},
	
	

	templateReplaceArray:function(args) {
		var outString = '';
		for (var i in args.replaceArray) {
			args.replaceObject = args.replaceArray[i];
			if (this.toType(args.replaceObject) != 'object') {
				continue;
			}
			args.indexNumber = i;
			outString += this.templateReplace(args);
		}


		return outString;
	},

	templateReplace:function(args) {

		// {
		// 	template:template,
		// 	replaceObject:replaceObject,
		// 	leaveUnmatchedTagsIntact:true,
		// 	transformations:{showItemNo:function(replaceObject){ return "Item Number: "+replaceObject.indexNumber; }}
		// }

		var template = args.template,
			replaceObject = args.replaceObject,
			leaveUnmatchedTagsIntact = args.leaveUnmatchedTagsIntact,
			transformations = args.transformations,

			outString = '',
			localReplaceObject = {};


		this.extend(this, {
			localReplaceObject: this.clone(replaceObject)
		}, args); //clones replaceObject

		this.localReplaceObject['leaveUnmatchedTagsIntact'] = leaveUnmatchedTagsIntact ? leaveUnmatchedTagsIntact : false;
		this.localReplaceObject['indexNumber'] = args.indexNumber ? args.indexNumber : 0;

		if (this.isNotEmpty(transformations)) {
			for (var fieldName in transformations) {
				this.localReplaceObject[fieldName] = transformations[fieldName](this.localReplaceObject);
			}
		}
		outString = template.replace(/<!([a-zA-Z0-9\/_\.]+)!>/g, this.evaluatorFunction.bind(this));
		outString = outString.replace(/<!([a-zA-Z0-9\/_\.]+)!>/g, this.evaluatorFunction.bind(this));

		return outString;
	},

	evaluatorFunction:function(matchedString, propertyName) {
		/*
		* This works as a callback from replace() in this.templateReplace. Looks up the
		* appropriate property in an object and returns it to replace a tag.
		*
		* Tags are the form <!replaceName!>.
		* */


		var outString = this.getSurePath(this.localReplaceObject, propertyName); //property names are allowed to be paths, eg, <!user.firstName!>


		if (typeof outString != 'undefined') {
			//console.log('propertyName='+propertyName+'==='+outString);
			return outString;
		} else {
			if (this.localReplaceObject['leaveUnmatchedTagsIntact']) {
				return '<!' + propertyName + '!>';
			} else {
				return '';
			}
		}
	},
	
	
	clone:function(inObj, func) {
	var convertFunction=(typeof(func)=='function')?func:function(inData){return inData;}

		
		if (['string', 'number', 'boolean', 'undefined'].indexOf(typeof(inObj))>-1 || inObj===null){
			return convertFunction(inObj);
		}

		if (!newObj) {
			if (this.toType(inObj) == 'array') {
				var newObj = [];
			} else {
				var newObj = {};
			}
		}

		if (this.toType(inObj) != 'array') {

			for (var i in inObj) {
				if (inObj[i] !== null && typeof (inObj[i]) == "object") {
					switch (inObj[i].constructor) {
						case Date:
							newObj[i] = convertFunction(new Date(inObj[i].toString()));
							break;
						default:
							newObj[i] = this.clone(inObj[i], func);
							break;
					}
				} else {
					newObj[i] = convertFunction(inObj[i]);
					//console.log("OO inObj[i]="+inObj[i]);

				}
			}
		} else {
			for (var i = 0, len = inObj.length; i < len; i++) {
				if (this.toType (inObj[i]) == "object") {
					newObj[i] = this.clone(inObj[i], func);
				} else {
					newObj[i] = convertFunction(inObj[i]);
					//console.log("AA inObj[i]="+inObj[i]);
				}
			}

		}

		return newObj;
	},
	
	
	toType:function(obj) {
		if (obj === null) {
			return 'null';
		} else if (typeof (obj) == 'undefined') {
			return 'undefined';
		} else {
			return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
		}
		//thanks: http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
	}, 



	extend:function() {
	//jQUERY here. From https://github.com/jquery/jquery/blob/master/src/core.js#L390
	//call: self.extend(baseObject, extensionObject);
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === "boolean") {
			deep = target;

			// skip the boolean and the target
			target = arguments[i] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if (typeof target !== "object" && !typeof (target) == 'function') {
			target = {};
		}

		// extend jQuery itself if only one argument is passed
		if (i === length) {
			target = self;
			i--;
		}

		for (; i < length; i++) {
			// Only deal with non-null/undefined values
			if ((options = arguments[i]) != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target === copy) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (typeof (copy) == 'object' || (copyIsArray = (typeof (copy.length) != 'undefined')))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && (typeof (src.length) != 'undefined') ? src : [];

						} else {
							clone = src && (typeof (src) == 'object') ? src : {};
						}

						// Never move original objects, clone them
						target[name] = this.extend(deep, clone, copy);

						// Don't bring in undefined values
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	},


	isEmpty:function(arg) {
		var objectEmptyFlag;

		if (typeof (arg) == 'function') {
			return false;
		}

		if (typeof (arg) == 'undefined') {
			return true;
		}

		if (typeof (arg) == 'object') {
			objectEmptyFlag = true; //assume it's empty until further notice
			for (var item in arg) {
				objectEmptyFlag = false; //found one
			}
		} else {
			objectEmptyFlag = false; //can't be full if it's not an object
		}

		return (objectEmptyFlag || arg == '' || arg.length == 0)
	},
	
	isNotEmpty:function(arg) {
		return !this.isEmpty(arg);
	},



	getDateString:function(format, dateObj) {
		dateObj = dateObj || new Date();
		
		const dateValues = {
			month: dateObj.getMonth(),
			day: dateObj.getDate(),
			hours: dateObj.getHours(),
			year: dateObj.getFullYear(),
			minutes: dateObj.getMinutes(),
			seconds: dateObj.getSeconds(),
			milliseconds: dateObj.getMilliseconds()
		}

		const dateReference = {
			month: 2,
			day: 2,
			hours: 2,
			year: 4,
			minutes: 2,
			seconds: 2,
			milliseconds: 3
		}

		const pad = function(value, paddedLength, padChar){
			var shortfall = paddedLength - value.toString().length;
			for (var i = 0; i < shortfall; i++) {
				value = padChar + value;
			}
			return value;
		}

		const padObject = function(object, reference, padChar){

			for (var i in object) {
				var element = object[i];
				var ref = reference[i];
				object[i] = pad(element, ref, padChar);
			}
		}

		padObject(dateValues, dateReference, '0')


		const dateString = dateValues.year + '.' +
			dateValues.month + '.' +
			dateValues.day + '.' +
			dateValues.hours + '.' +
			dateValues.minutes + '.' +
			dateValues.seconds + '.' +
			dateValues.milliseconds;
		
		switch (format) {
			case 'dd_MMM_yyyy':
				//nodeJs apparently doesn't use the options parameter of toLocaleDateString()
				var outString = dateObj.toLocaleDateString('en-US').toString();
				outString = outString.replace(/^.*?, (\w+) (\d+), (\d+)$/, "$2_$1_$3");
				return outString;

				break;
			case 'allFieldsPaddedDots':
				return	dateValues.year + '.' +
						dateValues.month + '.' +
						dateValues.day + '.' +
						dateValues.hours + '.' +
						dateValues.minutes + '.' +
						dateValues.seconds + '.' +
						dateValues.milliseconds;
				break;
			default:
				return dateObj.toLocaleDateString('en-US');
				break;
		}

	},
	
	
// 	listAttributes:function (item, args={}){
// 		const showValues=args.showValues?args.showValues:false;
// 		const label=args.label?args.label:'listAttributes';
// 		console.log(`start ${label} ================${showValues}`);
// 		if (typeof(item)=='undefined'){
// 			console.log('input data is undefined');
// 		}
// 		else if (item._cid){
// 			console.log(`found donejs map`);
// 			item.each((item, key)=>{
// 			let valueString='';
// 			if (showValues){
// 				valueString=`=${item}`;
// 			}
// 			console.log(`${key}${valueString}`);
// 			
// 			})
// 		}
// 		else if (typeof(item)=='object'){
// 			console.log(`found ${typeof(item)}`);
// 			if (showValues){
// 			console.dir(item);
// 			}
// 			else{
// 			console.dir(Object.keys(item));
// 			}
// 		}
// 		else{
// 			console.log(`found ${typeof(item)}`);
// 			console.dir(item)
// 		}
// 		console.log(`end ${label} ================`);
// },


};