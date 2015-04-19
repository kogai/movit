var logger = require('util/logger').getLogger('route');
var reactServer = require('asset/react/Server');

module.exports = {
  wc: {
    method: 'GET',
    path: '/{p*}',
    handler: reactServer
  },
  public: {
    wc: {
      method: 'GET',
      path: '/public/{p*}',
      handler: {
        directory: {
          path: './public'
        }
      }
    }
  },
  bell: {
    door: {
      method: 'POST',
      path: '/bell/door',
      config: {
        auth: 'twitter',
        handler: function(request, reply) {
          'use strict';
          console.log('request.auth-twitter', request.auth);
          if (!request.auth.isAuthenticated) {
            reply('Authentication failed due to: ' + request.auth.error.message);
          }
          reply(JSON.stringify(request.auth.credentials, null, 4));
        }
      }
    }
  }
};
