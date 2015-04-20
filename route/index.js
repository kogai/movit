var Cookie = require('hapi-auth-cookie');

var logger = require('util/logger').getLogger('route');
var reactServer = require('asset/react/Server');

// var User = require('model/User');

module.exports = {
  client: {
    root: {
      method: 'GET',
      path: '/',
      config: {
        auth: {
          strategy: 'session',
          mode: 'try'
        },
        handler: reactServer
      }

    },
    edit: {
      method: 'GET',
      path: '/edit{p*}',
      handler: reactServer
    },
    page: {
      method: 'GET',
      path: '/page{p*}',
      handler: reactServer
    }
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
      method: '*',
      path: '/bell/{p*}',
      config: {
        auth: 'twitter',
        handler: function(request, reply) {
          'use strict';
          console.log('request.auth-twitter', request.auth);

          request.auth.session.clear();
          request.auth.session.set(request.auth.credentials.profile);

          if (!request.auth.isAuthenticated) {
            reply('Authentication failed due to: ' + request.auth.error.message);
          }
          return reply.redirect('/');
          // reply(JSON.stringify(request.auth.credentials, null, 4));
        }
      }
    }
  }
};
