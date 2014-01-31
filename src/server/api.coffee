###
Lingo's api server
------------------------------------------------------
To start/stop this server, run:

forever start servers/api.js
forever stop servers/api.js

@author  Johnny Freeman
###
restify = require("restify")
api = restify.createServer(name: "Lingo API")
r = require("rethinkdb")
Q = require("q")

# make web server listen on specific port
api.listen 81, ->
  console.log "%s listening at %s", api.name, api.url


###
Debugging
###
Q.longStackSupport = true

###
Database Connection
###
db = null
r.connect
  host: "localhost"
  port: 28015
  db: "lingo"
, (err, conn) ->
  throw err  if err
  db = conn


# body parser
api.use restify.bodyParser()

###
API ROUTES
----------------------------------------------------
Here are all of the api routes.
###

# PHRASE

# API get all records from named resource
api.get "/phrases", (req, res, next) ->
  r.table("phrases").run db, (err, cursor) ->
    throw err  if err
    cursor.toArray (err, result) ->
      throw err  if err
      res.send result
      next()




# Insert phrase
api.post "/phrases", (req, res, next) ->
  return next(new restify.InvalidArgumentError("Title must be supplied"))  if req.params.title is 'undefined'
  r.table("phrases").insert(req.params).run db, (e, result) ->
    throw e  if e
    res.send result
    next()



# Get a single phrase
api.get "/phrase/:id", (req, res, next) ->
  r.table("phrases").get(req.params.id).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# Update phrase
api.put "/phrase/:id", (req, res, next) ->
  id = req.params.id
  delete req.params.id

  r.table("phrases").get(req.params.id).update(req.params).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# TAGS

# API get all records from named resource
api.get "/tags", (req, res, next) ->
  r.table("tags").run db, (err, cursor) ->
    throw err  if err
    cursor.toArray (err, result) ->
      throw err  if err
      res.send result
      next()




# Insert tag
api.post "/tags", (req, res, next) ->
  return next(new restify.InvalidArgumentError("Title must be supplied"))  if req.params.title is 'undefined'
  r.table("tags").insert(req.params).run db, (e, result) ->
    throw e  if e
    res.send result
    next()



# Get a single tag
api.get "/tag/:id", (req, res, next) ->
  r.table("tags").get(req.params.id).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# Update tag
api.put "/tag/:id", (req, res, next) ->
  id = req.params.id
  delete req.params.id

  r.table("tags").get(req.params.id).update(req.params).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# USERS

# API get all records from named resource
api.get "/users", (req, res, next) ->
  r.table("users").run db, (err, cursor) ->
    throw err  if err
    cursor.toArray (err, result) ->
      throw err  if err
      res.send result
      next()




# Insert user
api.post "/users", (req, res, next) ->
  return next(new restify.InvalidArgumentError("Title must be supplied"))  if req.params.title is 'undefined'
  r.table("users").insert(req.params).run db, (e, result) ->
    throw e  if e
    res.send result
    next()



# Get a single user
api.get "/user/:id", (req, res, next) ->
  r.table("users").get(req.params.id).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# // Get phrases belonging to a specific user
# api.get('/user/:id/phrases', function(req, res, next) {
#   var subcollection = 'phrases';

#   r
#     .table('users')
#     .getAll(req.params.id)
#     .eqJoin('id', r.table(subcollection), {index: 'createdBy'})
#     .run(db, function (error, result) {
#       if (error) throw error;
#       var data = result[0].left;
#       data[subcollection] = result[0].right;
#       res.send(data);
#       return next();
#     });
# });

# Get phrases belonging to a specific user
api.get "/user/:id/phrases", (req, res, next) ->
  subcollection = "phrases"
  userId = req.params.id
  
  # get user
  r.table("users").get(userId).run db, (error, user) ->
    throw error  if error
    
    # get phrases belonging to that user
    r.table(subcollection).getAll(userId,
      index: "createdBy"
    ).run db, (error, cursor) ->
      throw error  if error
      cursor.toArray (err, phrases) ->
        throw err  if err
        
        # add phrases to user object
        user[subcollection] = phrases
        
        # output the user object
        res.send user
        next()





# Update user
api.put "/user/:id", (req, res, next) ->
  id = req.params.id
  delete req.params.id

  r.table("users").get(req.params.id).update(req.params).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# SETTINGS

# API get all records from named resource
api.get "/settings", (req, res, next) ->
  r.table("settings").run db, (err, cursor) ->
    throw err  if err
    cursor.toArray (err, result) ->
      throw err  if err
      res.send result
      next()




# Insert setting
api.post "/settings", (req, res, next) ->
  return next(new restify.InvalidArgumentError("Title must be supplied"))  if req.params.title is 'undefined'
  r.table("settings").insert(req.params).run db, (e, result) ->
    throw e  if e
    res.send result
    next()



# Get a single setting
api.get "/setting/:id", (req, res, next) ->
  r.table("settings").get(req.params.id).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



# Update setting
api.put "/setting/:id", (req, res, next) ->
  id = req.params.id
  delete req.params.id

  r.table("settings").get(req.params.id).update(req.params).run db, (error, result) ->
    throw error  if error
    res.send result
    next()



###
Helpers
###

# var Model = function (data) {
#   _.extend(this, data);
# };

# Model.prototype.save = function (key) {

# };

# Model._table = null;
# Model._db    = null;
# Model._conn  = null;

#  // get model instance
# Model.get = function (key) {
#   var deferred = Q.defer();

#   r.db(this._db).table(this._table).get(id).run(this._conn, function (e, doc) {
#     if (e)
#       deferred.reject(new Error(e));
#     else if (doc === null)
#       deferred.reject(new Error('404 - Document Not Found.'));
#     else
#       deferred.resolve(new this(doc));
#   });

#   return deferred.promise;
# };

# /**
#  * Get User
#  * Accepts the autologin id
#  */
# var getUser = function (id) {
#   var deferred = Q.defer();

#   r.db('Lingo').table('users').get(id).run(db, function (e, user) {
#     if (e)
#       deferred.reject(new Error(e));
#     else if (user === null)
#       deferred.reject(new Error('403 - Access Denied'));
#     else
#       deferred.resolve(user);
#   });

#   return deferred.promise;
# };

# /**
#  * Get User Data
#  * Make sure you pass the user
#  * promise, NOT the user record
#  */
# var getUserData = function(userPromise) {

#   return userPromise

#     // get phrases and tags
#     .then(function (user) {

#       var deferred = Q.defer();

#       Phrase.find({userId: user._id}).populate('tags').exec(function (e, phrases) {

#         if (e) {

#           deferred.reject(new Error(e));

#         } else {

#           // get all tags and store them
#           var allTags = [];
#           _.each(phrases, function(phrase) {
#             allTags = allTags.concat(phrase.tags);
#           });

#           // throw out all duplicate items
#           var uniqueTags = _.uniq(allTags, function(tag) {
#             return tag._id;
#           });

#           // parse template and send response
#           deferred.resolve({
#             phrases: _.sortBy(phrases, 'title'),
#             tags: _.sortBy(uniqueTags, 'title')
#           });

#         }

#       });

#       return deferred.promise;

#     })

#     // add phraseCount to each tag
#     .then(function (data) {

#       _.each(data.tags, function (tag) {
#         var i = 0;

#         _.each(data.phrases, function(phrase) {
#           if (_.contains(_.pluck(phrase.tags, '_id'), tag._id)) i++;
#         });

#         tag['phraseCount'] = i;
#       });

#       return data;
#     });

# };