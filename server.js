var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var conditionalHelpers = require(__dirname + '/src/server/helpers/conditionals.js');
var clientSrc = require(__dirname + '/src/server/helpers/clientsrc.js')
var serveStatic = require('serve-static');

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        equal: conditionalHelpers.equalHelper, 
        compare: conditionalHelpers.compareHelper,
        clientSrc: clientSrc.srcHelper
    },
    partialsDir: __dirname + '/src/server/views/partials',
    layoutsDir: __dirname + '/src/server/views/layouts',
    defaultLayout: 'main',
    extname: '.hbs'
});

var routes = require(__dirname+'/src/server/routes/index');

var app = express();

// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/src/server/views');

var rootPath = __dirname.replace('/src/server/views', '');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);
app.use(serveStatic(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message + " " + req.path,
      error: err
    });
  });
}


//app.listen(process.env.PORT, process.env.IP);

//local port
//console.log("app started on port - " + process.env.PORT);
app.listen(3000);
console.log("app started on port 3000");
module.exports = app;
