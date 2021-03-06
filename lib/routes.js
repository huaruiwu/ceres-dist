'use strict';

var admin = require('./controllers/admin'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    stats = require('./controllers/stat'),
    drawing = require('./controllers/drawing');
var db = require('./db/db').db;

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  // Get User map data
  app.route('/api/maps/:id')
    .get(function(req, res){
      var userId = req.params.id;
      db.collection('users').findOne({'id': userId}, function(err, item){
        if(err) throw err;
        res.json(item);
      });
    });

  app.route('/api/stats/:id')
    .get(stats.stats);

  // export drawing
  app.route('/api/drawing/export')
    .post(drawing.export);
  app.route('/api/drawing/download')
    .get(drawing.drawing);
  app.route('/api/drawing/:id/:field/:date')
    .post(drawing.save);
  app.route('/api/drawing/:id/:field/:date')
    .get(drawing.find);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // Admin
  app.route('/admin')
    .get(admin.admin);
  // Admin login
  app.route('/login')
    .post(admin.login);
  // list users
  app.route('/userlist')
    .get(users.userlist);
  // get user
  app.route('/user/:name')
    .get(users.user);
  // Admin CreateUser
  app.route('/user/create')
    .post(users.create);
  // Admin Adduser
  app.route('/user/:name')
    .post(users.update);

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( index.index);
};
