#!/usr/local/bin/node
'use strict';
const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const multiIni = require('multi-ini');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');
var path = require("path");

var compression = require('./sr-careplanner/node_modules/compression');

var middleware = require("./sr-careplanner/node_modules/done-ssr-middleware");

// var doneServe=require('./sr-careplanner/node_modules/done-serve');
// doneServe({ path: '/Volumes/qubuntuFileServer/cmerdc/sunrise/sunriseUi/system/code/service/sr-careplanner',
//  });

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

	let transactionCount = 0;

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

	app.use(compression());

	app.use(express.static(process.env.sruiProjectPath + 'code/service/sr-careplanner'));

	//DONEJS ====================================

	const startDonejs = function(program) {

		var exec = require("child_process").exec;

		var options = {
			path: program.path
		};
		var system = {
			config: path.join(program.path, 'package.json') + '!npm',
			liveReload: true
		};
		app.use(middleware(system, options));

		var port = program.port || process.env.PORT || 3030;
		var server = app.listen(port);

		server.on('error', function(e) {
			if (e.code === 'EADDRINUSE') {
				console.error('ERROR: Can not start done-serve on port ' + port +
					'.\nAnother application is already using it.');
			} else {
				console.error(e);
				console.error(e.stack);
			}
		});

		server.on('listening', function() {
			var address = server.address();
			var url = 'http://' + (address.address === '::' ?
				'localhost' : address.address) + ':' + address.port;

			console.log('done-serve starting on ' + url);
		});

		return server;

	}

	let config;
	//	let basicPingServer;

	const startSystem = () => {
		config = multiIni.read(configPath);
		config.user = process.env.USER;
		
		if (config.system.serveBuildBundle.toLowerCase()=='false'){
			process.env.NODE_ENV='development'; //global sent to done-ssr
		}
		else if (config.system.serveBuildBundle.toLowerCase()=='true'){
			process.env.NODE_ENV='production'; //global sent to done-ssr
		}
		else{
		
		var message = "config must contain an entry for serveBuildBundle. It must be either true or false.";

		console.log(message);
		return (message);
		}

		var program = {

			path: process.env.sruiProjectPath + 'code/service/sr-careplanner',
			port: config.system.port
		}



		startDonejs(program)
		qtools.message("Node system start");

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

	// 	app.listen(config.system.port);
	// 
	// 	qtools.message('Magic happens on port ' + config.system.port);

	return this;
};

//END OF moduleFunction() ============================================================

//module.exports = moduleFunction;
module.exports = new moduleFunction();

