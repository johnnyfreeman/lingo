gulp        = require 'gulp'
gutil       = require 'gulp-util'
coffee      = require 'gulp-coffee'
concat      = require 'gulp-concat'
clean       = require 'gulp-clean'
uglify      = require 'gulp-uglify'
notify      = require 'gulp-notify'
coffeelint  = require 'gulp-coffeelint'
eventStream = require 'event-stream'
bower       = require 'gulp-bower'
stylus      = require 'gulp-stylus'
handlebars  = require 'gulp-handlebars'
declare     = require 'gulp-declare'

###
**************************
CLEAN
**************************
###

# public
gulp.task 'clean:public', ->
  gulp.src('./public')
    .pipe(clean())

# bower
gulp.task 'clean:bower', ->
  gulp.src(['./bower_component'])
    .pipe(clean())

# npm
gulp.task 'clean:npm', ->
  gulp.src('./node_modules')
    .pipe(clean())

# all
gulp.task 'clean', ['clean:public', 'clean:bower', 'clean:npm']


###
**************************
INSTALL
**************************
###

gulp.task 'bower', ['clean:bower'], ->
  bower()


###
**************************
LINT
**************************
###

# lint source files
gulp.task 'lint', ->
  gulp.src('./src/**/*.coffee')
    .pipe(coffeelint({max_line_length: {value: 170, limitComments: false}}))
    .pipe(coffeelint.reporter()) # Using `coffeelint-stylish` reporter https://npmjs.org/package/coffeelint-stylish


###
**************************
SERVER
**************************
###

# # start http servers
# gulp.task 'start', ['stop'], ->
#   # spawn node process for ./bin/start

# # stop http servers
# gulp.task 'stop', ->
#   server.api.close() if server.api._handle isnt null
#   server.app.close() if server.app._handle isnt null

# # alias for stop and restart
# gulp.task 'restart', ['stop', 'start']

###
**************************
BUILD
**************************
###

# build source files
gulp.task 'build', ['clean:public'], ->

  ###
  IMAGES
  ###

  appImages = gulp.src('./src/client/images/*')
    .pipe(gulp.dest('./public/client/img'))

  ###
  FONTS
  ###

  vendorFonts = gulp.src('./bower_components/font-awesome/fonts/*')
    .pipe(gulp.dest('./public/client/fonts'))

  ###
  CSS
  ###

  appCss = gulp.src('./src/client/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/client/css'))

  vendorCss = gulp.src([
      './bower_components/bootstrap/public/css/bootstrap.css',
      './bower_components/font-awesome/css/font-awesome.css',
      './bower_components/flat-ui/css/flat-ui.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/client/css'))

  ###
  JAVASCRIPT
  ###

  templateJs = gulp.src(['./src/shared/handlebars/**/*.hbs'])
  .pipe(handlebars({outputType: 'node'}))
  .pipe(declare({namespace: 'Ember.TEMPLATES'}))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('./public/shared'));

  # client
  appJs = gulp.src([
    './src/client/coffee/app.coffee',
    './src/client/coffee/popups.coffee',
    './src/client/coffee/toggle.coffee'
  ])
  .pipe(coffee().on('error', gutil.log))
  .pipe(concat('app.js'))
  # .pipe(uglify())
  .pipe(gulp.dest('./public/client/js/'))

  vendorsJs = gulp.src([
    './bower_components/jquery/jquery.min.js',
    './bower_components/underscore/underscore-min.js',
    './bower_components/backbone/backbone-min.js',
    './bower_components/backbone.marionette/lib/backbone.marionette.min.js',
    './bower_components/jquery-zclip/jquery.zclip.js',
    './bower_components/bootstrap/docs/assets/js/bootstrap.js',
    './bower_components/flat-ui/js/jquery.placeholder.js',
    './bower_components/greensock/src/minified/easing/EasePack.min.js',
    './bower_components/greensock/src/minified/plugins/CSSPlugin.min.js',
    './bower_components/greensock/src/minified/TweenLite.min.js'
  ])
  .pipe(concat('vendors.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/client/js/'))


  # server
  serverJs = gulp.src('./src/server/**/*.coffee')
    .pipe(coffee().on('error', gutil.log))
    .pipe(uglify())
    .pipe(gulp.dest('./public/server/'))

  ###
  NOTIFY
  ###

  # return concatenated server and client streams
  eventStream.merge(
    templateJs, 
    appImages, 
    vendorFonts, 
    appCss, 
    vendorCss, 
    vendorsJs, 
    appJs, 
    serverJs
    )
    .pipe(notify({title: 'Gulp', message: 'Build complete, sir.', onLast: true}))



# start watch server
gulp.task 'watch', ->
  # source files
  gulp.watch ['./src/**/*.coffee', './src/client/stylus/**/*.styl'], ->
    gulp.run 'build'
  # bower
  gulp.watch './bower.json', ->
    gulp.run 'bower'
  # # http servers
  # gulp.watch './public/server/**/*', ->
  #   gulp.run 'restart'

# default task
gulp.task 'default', ['lint', 'build', 'watch']