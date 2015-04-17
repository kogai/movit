var Helper = {};

Helper.isAuthenticated = function (user) {
  var result;
  if(user){
    result = true;
  }else{
    result = false;
  }
  return result;
};

module.exports = Helper;
