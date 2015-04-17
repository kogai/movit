var React = require('react');

var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var Route = Router.Route;
var Link = Router.Link;

var Html = require('./layout/Html');
var Main = require('./layout/Main');
var Page = require('./layout/Page');

var Index = (
  <Route name="app" path="/" handler={ Html }>
    <Route name="list" path="/page/:id" handler={ Page } />
    <DefaultRoute handler={ Main }/>
  </Route>
);

module.exports = Index ;
