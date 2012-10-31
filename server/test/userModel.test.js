// var assert = require('assert'),
// 	should = require('should'),
// 	conn = require('../db/mongooseTest'),
// 	UserModel = require('../user/userModel');

// describe('User Model', function() {
// 	describe('Save', function() {

// 		it('Saving...', function() {
// 			var db = conn();
// 			var Model = db.model('User');
// 			var userModel = new Model({
// 				name: 'My Name',
// 				email: 'contact@com.br',
// 				pass: 'anything123'
// 			});

// 			userModel.on('save', function(user) {
// 				console.log('Passed by save event handle from user');
// 			});

// 			userModel.save(function(err, user) {
// 				console.log('Passed by save from user');
// 				if(err) console.log(err);
// 				console.log(user);
// 			});
// 		});
// 	})
// })