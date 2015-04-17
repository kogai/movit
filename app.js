var Hapi = require('hapi');
var server = new Hapi.Server();
var path = require('path');
var Bcrypt = require('bcrypt');
var Basic = require('hapi-auth-basic');

var logger = require('util/logger').getLogger('app');
var reactServer = require('asset/react/Server');

var users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};

var validate = function (username, password, callback) {
  var user = users[username];
  if (!user) {
    return callback(null, false);
  }

  Bcrypt.compare(password, user.password, function (err, isValid) {
    callback(err, isValid, { id: user.id, name: user.name });
  });
};

server.connection({
  host: 'localhost',
  port: 3000
});

server.register(Basic, function (err) {
  server.auth.strategy('simple', 'basic', { validateFunc: validate });

  server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
      auth: 'simple',
      handler: reactServer
    }
  });

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  });

  server.start(function () {
      console.log('server running at: ' + server.info.uri);
  });
});
