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
  <Route name="app" path="/" handler={Html}>
    <DefaultRoute handler={ Main }/>
    <Route name="page" path="/page/:id" handler={Page} />
  </Route>
);

module.exports = Index ;
