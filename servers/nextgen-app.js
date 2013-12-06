/**
 * Lingo's Nextgen-facing app server
 * ------------------------------------------------------
 * To start/stop this server, run:
 * 
 * forever start servers/nextgen-app.js
 * forever stop servers/nextgen-app.js
 *
 * @author  Johnny Freeman
 */
var express     = require('express')
  , app         = express()
  , server      = require('http').createServer(app)
  // , io          = require('socket.io').listen(server)
  , r           = require('rethinkdb')
  , _           = require('underscore')
  , Q           = require('q')
  , Templates   = require('../app/templates.js');


// make web server listen on specific port
server.listen(8000);


/**
 * Debugging
 */
// Q.longStackSupport = true;


/**
 * STATIC FILES
 * ----------------------------------------------------
 * Make sure our images, css, and js files can be
 * accessed.
 */
// app.use('/assets', express.static(__dirname + '/../public/assets'));
app.use(express.static(__dirname + '/../public'));



/**
 * Database Connection
 */
var conn = null;
r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
  if(err) throw err;
  conn = conn;
});


/**
 * FRONTEND ROUTES
 * ----------------------------------------------------
 * Here are all of the public facing routes.
 */


/**
 * Get User
 * Accepts the autologin id
 */
var getUser = function (alid) {
  var deferred = Q.defer();

  User.findOne({'profile.autologinId': alid}, function (e, user) {
    if (e)
      deferred.reject(new Error(e));
    else if (user === null)
      deferred.reject(new Error('403 - Access Denied'));
    else
      deferred.resolve(user);
  });

  r.db('Lingo').table('user');

  return deferred.promise;
};

/**
 * Get User Data
 * Make sure you pass the user 
 * promise, NOT the user record
 */
var getUserData = function(userPromise) {

  return userPromise

    // get phrases and tags
    .then(function (user) {
      
      var deferred = Q.defer();

      Phrase.find({userId: user._id}).populate('tags').exec(function (e, phrases) {

        if (e) {

          deferred.reject(new Error(e));

        } else {

          // get all tags and store them
          var allTags = [];
          _.each(phrases, function(phrase) {
            allTags = allTags.concat(phrase.tags);
          });

          // throw out all duplicate items
          var uniqueTags = _.uniq(allTags, function(tag) {
            return tag._id;
          });

          // parse template and send response 
          deferred.resolve({
            phrases: _.sortBy(phrases, 'title'), 
            tags: _.sortBy(uniqueTags, 'title')
          });

        }

      });

      return deferred.promise;

    })

    // add phraseCount to each tag
    .then(function (data) {

      _.each(data.tags, function (tag) {
        var i = 0;

        _.each(data.phrases, function(phrase) {
          if (_.contains(_.pluck(phrase.tags, '_id'), tag._id)) i++;
        });

        tag['phraseCount'] = i;
      });

      return data;
    });

};

// get phrases with these tags
app.get('/', function (req, res) {

  var user = getUser(req.query.autologin);

  // if user isn't found deny access
  user = user.fail(function(e) {
    return res.send(e.message);
  });

  // make request for user's data
  var userData = getUserData(user);

  // if activeTags are defined
  if (typeof req.query.activeTags !== 'undefined') {

    var activeTags = req.query.activeTags.split(',');

    userData = userData.then(function(data) {

      // reduce phrases to those who contain all of the ac tags
      data.phrases = _.filter(data.phrases, function (phrase) {
        // get array of tag titles
        var phraseTags = _.pluck(phrase.tags, 'title');

        // returns true if ALL activeTags exist in this phrase's tags
        return _.every(activeTags, function(filteredTag) {
          return _.contains(phraseTags, filteredTag);
        });
      });

      // create empty array
      data['activeTags'] = _.filter(data.tags, function(tag) {
        return _.contains(activeTags, tag.title);
      });

      return data;
    });

  }

  // render template
  userData.then(function(data) {
    return res.send(Templates.layout(data));
  })

  // Handle Error
  .fail(function (e) {
    res.send('Error: '+e);
  });

});