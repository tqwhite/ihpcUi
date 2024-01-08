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

		const districtSegment = req.path.match(/\/SSO\/saml\/(.*)$/)[1];

		splitString(req.body.SAMLResponse).forEach((segment, inx) => {
			res.cookie(`ihpcToken_${inx}`, segment, {
				expires: new Date(Date.now() + 10000),
				domain: req.hostname
			});
		});

		res.redirect(`/SSO/${districtSegment}`);
	};

	return { receiveAndRedirect };
};

//END OF moduleFunction() ============================================================

module.exports = moduleFunction(moduleName);

