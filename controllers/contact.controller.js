'use strict';
 
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require("xoauth2");
// var transporter = nodemailer.createTransport(smtpTransport({
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
    	user: 'boguerst@gmail.com',
    	pass: 'Lyne0happy'
    }
});
 
/**
 * Send an email when the contact from is submitted
 */
exports.sendMail = function(req, res) {
    var data = req.body;
    console.log(data);
	var mailOpts = {
	    from: 'boguerst@gmail.com',
	    to: data.contactEmail,
	    subject: data.contactSubject,
	    text: data.contactMsg
	};
 
    transporter.sendMail(mailOpts, function (error, response) {
		//Email not sent
		if (error) {
			console.log("koooooo");
		  return res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
		}
		//Yay!! Email sent
		else {
			console.log("okkkkkk");
		  return res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
		}
	});
 
    return res.json(data);
};