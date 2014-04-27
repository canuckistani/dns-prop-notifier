var dns = require('dns')
  , _ = require('underscore')

var new_address = '107.170.8.210';

var push = require( 'pushover-notifications' )
  , PUSHOVER_TOKEN = 'amFjBncD1tbvRc5YRDSZ3J8HJxv5hx'
  , PUSHOVER_USER = 'shlV6I4eGqpQ7PKUmBPuK4wvS3aVq2';


function notify() {
  var p = new push( {
      user: PUSHOVER_USER,
      token: PUSHOVER_TOKEN,
      onerror: function(error) {
        throw error;
        process.exit();
      },
  });

  var msg = {
    message: 'DNS has propogated!',
    title: "Yup, we're done",
    sound: 'magic', // optional
    // device: 'devicename', // optional
    priority: 1 // optional
  };

  p.send(msg, function(e, r) {
    if (e) throw e;
    console.log([].slice.call(arguments));
  });
}

if (!module.parent) {
  var domain = 'canuckistani.ca';

  dns.resolve4(domain, function(err, addresses) {
    if (err) throw err;
    _.each(addresses, function(a) {
      console.log("%s resolves to %s", domain, a);
      if (a === new_address) {
        // dns has propogated

        notify();
      }
    });
  });

  // notify();
}

