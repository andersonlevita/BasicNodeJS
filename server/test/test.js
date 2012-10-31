// var mongoose = require('mongoose');
// var user = require('./../models/user');
// var should = require('should');

// var db = mongoose.connect('mongodb://localhost/dbTeste');

// describe('Users', function(){
//   var currentUser = null;

//   // beforeEach(function(done){
//   //   user.register('test@test.com', 'password', function(doc){
//   //     currentUser = doc;
//   //     done();
//   //   });
//   // });

//   afterEach(function(done){
//     user.model.remove({}, function(){
//       done();
//     });
//   });

//   it('Saving...', function(done){
//     var usr = new user.model({
//       nome: 'Anderson',
//       email: 'anderson@test.com',
//       senha: 'pass',
//       salt: 'sallt'
//     });
//     usr.save(function(err){
//        if(err) console.log(err);
//        console.log('passou no save');
//        done();
//      });
//   });

//   // it('registers a new user', function(done){
//   //   user.register('test2@test.com', 'password', function(doc){
//   //     doc.email.should.eql('test2@test.com');
//   //     done();
//   //   });
//   // });

//   // it('fetches user by email', function(done){
//   //   user.findByEmail('test@test.com', function(doc){
//   //     doc.email.should.eql('test@test.com');
//   //     done();
//   //   });
//   // });

// });