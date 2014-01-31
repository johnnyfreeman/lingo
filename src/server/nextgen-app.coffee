###
Lingo's Nextgen-facing app server
------------------------------------------------------
To start/stop this server, run:

forever start servers/nextgen-app.js
forever stop servers/nextgen-app.js

@author  Johnny Freeman
###
express = require("express")
app = express()
server = require("http").createServer(app)

# , io          = require('socket.io').listen(server)
# , _           = require('underscore')
Q = require("q")
request = require("request")
Templates = require("../shared/templates.js")

# make web server listen on specific port
server.listen 80, ->
  console.log "Lingo for NextGen listening at port 80"


###
Debugging
###

# Q.longStackSupport = true;

###
STATIC FILES
----------------------------------------------------
Make sure our images, css, and js files can be
accessed.
###

# app.use('/assets', express.static(__dirname + '/../public/assets'));
app.use express.static(__dirname + "/../../public/client")

###
FRONTEND ROUTES
----------------------------------------------------
Here are all of the public facing routes.
###

# get phrases with these tags
app.get "/", (req, res) ->
  request "http://localhost:81/user/" + req.query.userId + "/phrases", (error, response, data) ->
    res.send Templates.layout(JSON.parse(data))  if not error and response.statusCode is 200

