var Helper = {};

Helper.isAuthenticated = function (user) {
  var result;
  if(user){
    result = true;
  }else{
    result = false;
  }
  console.log(user);
  console.log(result);
  return result;
};

module.exports = Helper;
