var dns = require('dns')
  , _ = require('underscore')

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

function resolve(domain, new_address) {
  

  dns.resolve4(domain, function(err, addresses) {
    if (err) console.log(err);
    _.each(addresses, function(a) {
      console.log("%s resolves to %s", domain, a);
      if (a === new_address) {
        // dns has propogated

        notify();
      }
    });
  });
}

if (!module.parent) {

  var attempts = 1;

  var domain = 'beers.paas.canuckistani.ca';
  var new_address = '192.241.227.72';

  console.log("attempts: "+attempts);
  resolve(domain, new_address);

  setInterval(function() {
    attempts++;
    console.log("attempts: "+attempts);
    resolve(domain, new_address);
  }, 30000);
}
