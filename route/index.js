var Cookie = require('hapi-auth-cookie');

var logger = require('util/logger').getLogger('route');
var reactServer = require('asset/react/Server');

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
      path: '/edit/{p*}',
      handler: reactServer
    },
    page: {
      method: 'GET',
      path: '/page/{p*}',
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
      path: '/bell/door',
      config: {
        auth: 'twitter',
        handler: function(request, reply) {
          'use strict';

          if (!request.auth.isAuthenticated) {
            logger.info(request.auth.error.message);
            return reply.redirect('/');
          }
          request.auth.session.clear();
          request.auth.session.set(request.auth.credentials.profile);
          return reply.redirect('/');
        }
      }
    },
    regist: {
      method: '*',
      path: '/regist',
      handler: function (request, reply) {
        'use strict';
        console.log('/regist', request.auth.credentials);
        reply('/regist');
        /*
        */
      }
    }
  }
};
