var mongoose = require('mongoose');
var mongodb = require('util/getCredential')('mongodb');
var db = mongoose.createConnection(mongodb);

var UserSchema = new mongoose.Schema({
  twitter: Object,
  sequencialPostId: Number,
  post: [{
    postId: Number,
    postTitle: String,
    postBody: String
  }]
});

UserSchema.pre('save', function (next) {
  'use strict';
  // var company = this;
  // var query, options, update;
  // if(!company.isNew){
  //   return next();
  // }
  // query = {
  // };
  // update = {
  //   $inc: {
  //     seq: 1
  //   }
  // };
  // options = {
  //   upsert: true
  // };
  // return SequenceModel.findOneAndUpdate(query, update, options, (function(_this) {
  //   return function(err, data) {
  //     if (!err && data) {
  //       _this.pageId = data.seq;
  //       return next();
  //     } else {
  //       return next(err || data);
  //     }
  //   };
  // })(company));
});

var UserModel = db.model('Users', UserSchema );

module.exports = UserModel;
