Router.configure({
    layoutTemplate: 'mainLayout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});
if (Meteor.isClient) {
    Router.onBeforeAction('loading');
}

Router.map(function () {
    this.route('home', {
        path: '/',
        controller: 'HomeController'
    });
});