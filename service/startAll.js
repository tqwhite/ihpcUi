#!/usr/local/bin/node
'use strict';

console.log('---------------------------------------INITIATING SYSTEM STARTUP');

const qtoolsGen = require('qtools');
const qtools = new qtoolsGen(module);
const multiIni = require('multi-ini');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var compression = require('./sr-careplanner/node_modules/compression');
var ssrMiddleware = require('./sr-careplanner/node_modules/done-ssr-middleware');

//START OF moduleFunction() ============================================================

var moduleFunction = function() {
	if (!process.env.sruiProjectPath) {
		var message = 'there must be an environment variable: sruiProjectPath';
		console.log(message);
		return message;
	}
	if (!process.env.USER) {
		var message = 'there must be an environment variable: USER';
		console.log(message);
		return message;
	}
	var configPath =
		process.env.sruiProjectPath +
		'configs/instanceSpecific/ini/' +
		process.env.USER +
		'.ini';
	if (!qtools.realPath(configPath)) {
		var message = 'configuration file ' + configPath + ' is missing';
		console.log(message);
		return message;
	}

	//LOCAL DECLARATIONS ====================================
	
	let webReport = [];
	let reportStatus = (err, result) => {
		webReport.push({
			err: err,
			result: result
		});
	};

	//METHODS AND PROPERTIES ====================================

	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);
	
	app.use(bodyParser.json());
	app.use(compression());
	app.use(
		express.static(process.env.sruiProjectPath + 'code/service/sr-careplanner')
	);

	//DONEJS ====================================

	const startDonejs = function(program) {
		var exec = require('child_process').exec;
		var options = {
			path: program.path
		};
		var system = {
			config: path.join(program.path, 'package.json') + '!npm',
			liveReload: false
		};
		let transactionCount = 0;
		app.use((req, res, next) => {
			// transactionCount++;
			// console.log(
			// 	'transaction# ' + transactionCount + ' =======================\n'
			// );
			next();
		});

		// SSO Paths ========================================================

		console.log(
			`\n=-=============   saml  ========================= [startAll.js.startDonejs]\n`
		);
		
		app.post(/\/SSO\/saml(.*)$/, require('./staticLib/msal/lib/saml-ui-processes')().receiveAndRedirect);

		app.get(/\/msal\/(.*)$/, (req, res, next) => {
			//this gets all the components for index.html
			const pagePath = path.join(
				__dirname,
				`staticLib/msal/public/${req.params[0]}`
			);
			res.sendFile(path.join(pagePath));
		});

		app.get(/\/msal\/(.*)$/, (req, res, next) => {
			//this gets all the components for index.html
			const pagePath = path.join(
				__dirname,
				`staticLib/msal/public/${req.params[0]}`
			);
			res.sendFile(path.join(pagePath));
		});

		app.get(/\/d\/signout/, (req, res, next) => {
			const pagePath = path.join(
				__dirname,
				`staticLib/msal/public/signout.html`
			);
			res.sendFile(path.join(pagePath));
		});

		app.get(/\/o\//, (req, res, next) => {
			const pagePath = path.join(
				__dirname,
				`staticLib/msal/public/openid.html`
			);
			res.sendFile(path.join(pagePath));
		});

		app.get(/\/s\//, (req, res, next) => {
			const pagePath = path.join(__dirname, `staticLib/msal/public/saml.html`);
			res.sendFile(path.join(pagePath));
		});

		// ssrMiddleware ========================================================

		app.use(ssrMiddleware(system, options));

		// START SERVER ========================================================

		var port = program.port || process.env.PORT || 3030;
		var server = app.listen(port);

		server.on('error', function(e) {
			if (e.code === 'EADDRINUSE') {
				console.error(
					'ERROR: Can not start done-serve on port ' +
						port +
						'.\nAnother application is already using it.'
				);
			} else {
				console.error(e);
				console.error(e.stack);
			}
		});

		server.on('listening', function() {
			var address = server.address();
			var url =
				'http://' +
				(address.address === '::' ? 'localhost' : address.address) +
				':' +
				address.port;

			qtools.message(
				`${
					config.system.name
				} starting on ${url} \nat ${new Date().toLocaleDateString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit'
				})} `
			);

			qtools.message(
				`Serving serveBuildBundle=${config.system.serveBuildBundle}`
			);
		});
	};

	let config;
	//	let basicPingServer;

	const startSystem = () => {
		config = multiIni.read(configPath);
		config.user = process.env.USER;
		if (config.system.serveBuildBundle.toLowerCase() == 'false') {
			process.env.NODE_ENV = 'develoment'; //global sent to done-ssr
		} else if (config.system.serveBuildBundle.toLowerCase() == 'true') {
			process.env.NODE_ENV = 'production'; //global sent to done-ssr
		} else {
			var message =
				'config must contain an entry for serveBuildBundle. It must be either true or false.';
			console.log(message);
			return message;
		}
		var program = {
			path: process.env.sruiProjectPath + 'code/service/sr-careplanner',
			port: config.system.port
		};

		startDonejs(program);
	};

	//START SYSTEM =======================================================
	
	startSystem();

	return this;
};

//END OF moduleFunction() ============================================================

//module.exports = moduleFunction;
module.exports = new moduleFunction();

