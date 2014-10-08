Package.describe({
    name: 'sh-common',
    summary: 'shifts sheduler base package. defines namespace, collections, and probably later something else',
    owner: 'Angelo Tomarcafe',
    email: 'angelo.tomarcafe@gmail.com',
    version: '0.1.1'
});

var cs = ['client', 'server'];
var c = 'client';
var s = 'server';

Package.on_use(function (api) {
    /* Use or imply other packages.

     * Example:
     *  api.use('ui', 'client');
     *  api.use('iron-router', ['client', 'server']);
     */

    /*
     * Add files that should be used with this
     * package.
     */
    api.add_files('namespace.js', cs);
    api.add_files('collections.js', cs);

    api.export('SH');
});
