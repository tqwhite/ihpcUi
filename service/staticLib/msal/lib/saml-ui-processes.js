#!/usr/bin/env node
'use strict';

const moduleName = __filename.replace(__dirname + '/', '').replace(/.js$/, ''); //this just seems to come in handy a lot

//START OF moduleFunction() ============================================================

const moduleFunction = ({ moduleName }) => () => {
	
	const splitString = str => {
		var segments = [];
		for (var i = 0; i < str.length; i += 2000) {
			segments.push(str.substring(i, i + 2000));
		}
		return segments;
	};

	const receiveAndRedirect = (req, res, next) => {
		//this gets all the components for index.html
		//https://ihpc.qbook.work/SSO/dmschools.org

		console.log(`req.body.SAMLResponse=${req.body.SAMLResponse}`);

		console.log(`req.body.SAMLResponse.length=${req.body.SAMLResponse.length}`);

		splitString(req.body.SAMLResponse).forEach((segment, inx) => {
			console.log(`inx=${inx}`);

			res.cookie(`ihpcToken_${inx}`, segment, {
				expires: new Date(Date.now() + 10000),
				domain: 'ihpc.qbook.work'
			});
		});

console.log(`\n=-=============   dmschoolsSAML  ========================= [saml-ui-processes.js.]\n`);


		res.redirect(`/SSO/dmschoolsSAML.org?cookieName=ihpcToken`);
	};

	return { receiveAndRedirect };
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction(moduleName);

