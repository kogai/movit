var React = require('react');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Route = Router.Route;
var Link = Router.Link;

var Html = require('./layout/Html');
var Main = require('./layout/Main');
var Detail = require('./module/Detail');
var Edit = require('./module/Edit');

var Index = (
  <Route name="app" path='/' handler={ Html }>
    <DefaultRoute name='main' handler={ Main }/>
    <Route name="edit" path="edit/:id" handler={ Edit } />
    <Route name="page" path="page/:id" handler={ Detail } />
  </Route>
);

module.exports = Index ;
