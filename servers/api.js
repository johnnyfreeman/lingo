/**
 * Lingo's api server
 * ------------------------------------------------------
 * To start/stop this server, run:
 * 
 * forever start servers/api.js
 * forever stop servers/api.js
 *
 * @author  Johnny Freeman
 */
var restify     = require('restify')
  , api         = restify.createServer({ name: 'Lingo API' })
  , r           = require('rethinkdb')
  , Q           = require('q');


// make web server listen on specific port
api.listen(81, function () {
  console.log('%s listening at %s', api.name, api.url);
});


/**
 * Debugging
 */
// Q.longStackSupport = true;



/**
 * Database Connection
 */
var db = null;
r.connect({ host: 'localhost', port: 28015, db: 'lingo' }, function(err, conn) {
  if(err) throw err;
  db = conn;
});


// body parser
api.use(restify.bodyParser());


/**
 * API ROUTES
 * ----------------------------------------------------
 * Here are all of the api routes.
 */


 // PHRASE


// API get all records from named resource
api.get('/phrases', function(req, res, next) {
  return r.table('phrases').run(db, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      return next();
    });
  });
});

// Insert phrase
api.post('/phrases', function(req, res, next) {
  if (req.params.title === undefined) {
    return next(new restify.InvalidArgumentError('Title must be supplied'))
  }

  r.table('phrases').insert(req.params).run(db, function (e, result) {
    if (e) throw e;
    res.send(result);
    return next();
  });
});

// Get a single phrase
api.get('/phrase/:id', function(req, res, next) {
  r.table('phrases').get(req.params.id).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Update phrase
api.put('/phrase/:id', function(req, res, next) {
  var id = req.params.id;
  delete req.params.id;

  r.table('phrases').get(req.params.id).update(req.params).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Delete phrase
api.del('/phrase/:id', function(req, res, next) {
  r.table('phrases').get(req.params.id).delete().run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});


// TAGS


// API get all records from named resource
api.get('/tags', function(req, res, next) {
  return r.table('tags').run(db, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      return next();
    });
  });
});

// Insert tag
api.post('/tags', function(req, res, next) {
  if (req.params.title === undefined) {
    return next(new restify.InvalidArgumentError('Title must be supplied'))
  }

  r.table('tags').insert(req.params).run(db, function (e, result) {
    if (e) throw e;
    res.send(result);
    return next();
  });
});

// Get a single tag
api.get('/tag/:id', function(req, res, next) {
  r.table('tags').get(req.params.id).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Update tag
api.put('/tag/:id', function(req, res, next) {
  var id = req.params.id;
  delete req.params.id;

  r.table('tags').get(req.params.id).update(req.params).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Delete tag
api.del('/tag/:id', function(req, res, next) {
  r.table('tags').get(req.params.id).delete().run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});


// USERS


// API get all records from named resource
api.get('/users', function(req, res, next) {
  return r.table('users').run(db, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      return next();
    });
  });
});

// Insert user
api.post('/users', function(req, res, next) {
  if (req.params.title === undefined) {
    return next(new restify.InvalidArgumentError('Title must be supplied'))
  }

  r.table('users').insert(req.params).run(db, function (e, result) {
    if (e) throw e;
    res.send(result);
    return next();
  });
});

// Get a single user
api.get('/user/:id', function(req, res, next) {
  r.table('users').get(req.params.id).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Update user
api.put('/user/:id', function(req, res, next) {
  var id = req.params.id;
  delete req.params.id;

  r.table('users').get(req.params.id).update(req.params).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Delete user
api.del('/user/:id', function(req, res, next) {
  r.table('users').get(req.params.id).delete().run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});


// SETTINGS


// API get all records from named resource
api.get('/settings', function(req, res, next) {
  return r.table('settings').run(db, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
      if (err) throw err;
      res.send(result);
      return next();
    });
  });
});

// Insert setting
api.post('/settings', function(req, res, next) {
  if (req.params.title === undefined) {
    return next(new restify.InvalidArgumentError('Title must be supplied'))
  }

  r.table('settings').insert(req.params).run(db, function (e, result) {
    if (e) throw e;
    res.send(result);
    return next();
  });
});

// Get a single setting
api.get('/setting/:id', function(req, res, next) {
  r.table('settings').get(req.params.id).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Update setting
api.put('/setting/:id', function(req, res, next) {
  var id = req.params.id;
  delete req.params.id;

  r.table('settings').get(req.params.id).update(req.params).run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});

// Delete setting
api.del('/setting/:id', function(req, res, next) {
  r.table('settings').get(req.params.id).delete().run(db, function (error, result) {
    if (error) throw error;
    res.send(result);
    return next();
  });
});


/**
 * Helpers
 */

var Model = function (data) {
  _.extend(this, data);
};

Model.prototype.save = function (key) {

};

Model._table = null;
Model._db    = null;
Model._conn  = null;

 // get model instance
Model.get = function (key) {
  var deferred = Q.defer();

  r.db(this._db).table(this._table).get(id).run(this._conn, function (e, doc) {
    if (e)
      deferred.reject(new Error(e));
    else if (doc === null)
      deferred.reject(new Error('404 - Document Not Found.'));
    else
      deferred.resolve(new this(doc));
  });

  return deferred.promise;
};

/**
 * Get User
 * Accepts the autologin id
 */
var getUser = function (id) {
  var deferred = Q.defer();

  r.db('Lingo').table('users').get(id).run(db, function (e, user) {
    if (e)
      deferred.reject(new Error(e));
    else if (user === null)
      deferred.reject(new Error('403 - Access Denied'));
    else
      deferred.resolve(user);
  });

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