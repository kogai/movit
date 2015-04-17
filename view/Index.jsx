var React = require('react');
var Store = require('./flux/Store');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Layout = require('./component/layout/Layout');

var List = require('./component/list/List');
var Page = require('./component/page/Page');
var Main = require('./component/layout/Main');

var Index = (
  <Route name="app" path="/" handler={ Layout }>
    <Route name="list" path="/list" handler={ List } />
    <Route name="page" path="/page/:pageId" handler={ Page } />
    <DefaultRoute handler={ Main }/>
  </Route>
);

module.exports = Index ;
