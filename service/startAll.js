#!/usr/local/bin/node
'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const	multiIni = require('multi-ini');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//START OF moduleFunction() ============================================================

var moduleFunction = function() {

	if (!process.env.sruiProjectPath) {
		var message = "there must be an environment variable: sruiProjectPath";

		console.log(message);
		return (message);
	}
	if (!process.env.USER) {
		var message = "there must be an environment variable: USER";

		console.log(message);
		return (message);
	}
	var configPath = process.env.sruiProjectPath + 'configs/instanceSpecific/ini/' + process.env.USER + '.ini';
	if (!qtools.realPath(configPath)) {
		var message = "configuration file " + configPath + " is missing";

		console.log(message);
		return (message);
	}

	let webReport = [];

	let reportStatus = (err, result) => {
		webReport.push({
			err: err,
			result: result
		});
	}
	
	let transactionCount=0;

	//LOCAL FUNCTIONS ====================================

	//METHODS AND PROPERTIES ====================================

	app.use(bodyParser.urlencoded({
		extended: true
	}))
	app.use(bodyParser.json())

	app.use((req, res, next) => {
		if (typeof (transactionCount) == 'undefined') {
			transactionCount = 0;
		}
		transactionCount++;
		//	console.log("transaction# " + transactionCount + " =======================\n");
		next();
	});
	app.use((req, res, next) => {
		const headers = {};
		for (var i in req.headers) {
			var element = req.headers[i];
			if (!(i.match(/^x-/) || i.match(/^host/))) {
				headers[i] = element;
			}
		}
		req.headers=headers;
		next();
	});

	var router = express.Router();
	app.use('/', router);
	
	
	//INITIALIZATION ====================================
	
	
	router.get(/\//, (req, res, next)=>{
		// 		console.log('access from empty path/get');
		// 		dumpToConsole(req);

		res.set({
			'content-type': 'application/json;charset=ISO-8859-1',
			messageid: qtools.newGuid(),
			messagetype: 'RESPONSE',
			responsesource: 'basicPingServer',
			connection: 'Close'
		});

// 		res.json({
// 			status: `hello from ${config.system.name}/${config.user}${req.path}#${transactionCount}`,
// 			headers: req.headers,
// 			body: req.body,
// 			query: req.query,
// 			data: {hello:'goodbye'}
// 		});
		
		let tmpPage=qtools.fs.readFileSync('code/service/ajaxDemo.html');
		tmpPage=tmpPage.toString().replace(/<!systemName!>/, `${config.system.name}/${config.user}${req.path}#${transactionCount}`); 

		
				res.set('Content-Type', 'text/html');
		res.status('200').send(new Buffer(tmpPage));
	});

	let config;
//	let basicPingServer;

	const startSystem = () => {
		config = multiIni.read(configPath);
		config.user=process.env.USER;

// 		basicPingServer = new basicPingServerGen({
// 			config: config
// 		});
		qtools.message("Node system start");
		
// 		setInterval(()=>{
// 			console.log(`Still running...${new Date()}`);
// 		}, 3000);
	};

// 	const cleanup = () => {
// 		basicPingServer = null;
// 		webReport = [{
// 			err: '',
// 			result: `flushed at ${Date.now()}`
// 		}];
// 	}
// 
// 	const restart = () => {
// 		basicPingServer.shutdown('restart', () => {
// 			qtools.message("RESTART");
// 			cleanup();
// 			startSystem();
// 		});
// 
// 	}

	//START SYSTEM =======================================================
	startSystem();

	//START SERVER =======================================================

	app.listen(config.system.port);

	qtools.message('Magic happens on port ' + config.system.port);

	return this;
};

//END OF moduleFunction() ============================================================

//module.exports = moduleFunction;
module.exports = new moduleFunction();

