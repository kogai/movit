var request = require('superagent');
var https = require('https');
var logger = require('util/logger').getLogger('route');
var reactServer = require('asset/react/Server');

module.exports = {
  wc: {
    method: 'GET',
    path: '/{p*}',
    handler: reactServer
    // handler: function (req, rep) {
    //   return rep.redirect('http://google.com');
    // }
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
  api: {
    regist: {
      method: '*',
      path: '/api/regist',
      handler: function (req, reply) {
        'use strict';
        // reply('send');
        reply.redirect('http://google.com');
        // reply.redirect('/page');
        /*
        request
        // .post('http:localhost:3000/api/redirect')
        .post('http:localhost:3000/bell/door')
        .end(function (err, res) {
          if(err){
            logger.info(err);
          }
          console.log(res);
          // console.log('res', res.redirects);
          // console.log(typeof res.redirects[0]);
          // reply('send');
          // return reply.redirect(res.redirects[0]);
        });
        */
      }
    },
    redirect: {
      method: '*',
      path: '/api/redirect',
      handler: function (req, reply){
        'use strict';
        reply.redirect('http://google.com');
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
