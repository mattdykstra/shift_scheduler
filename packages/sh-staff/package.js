Package.describe({
    name: 'sh-staff',
    summary: 'shifts sheduler package that deals with employees',
    owner: 'Angelo Tomarcafe',
    email: 'angelo.tomarcafe@gmail.com',
    version: '0.1.0'
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
    api.use('underscore', cs);
    api.use(['kl-common', 'sh-common'], cs);
    api.add_files(['namespace.js'], cs);
    //api.add_files(['server/pub.js', 'server/validators/shifts.js'], s);
    //api.add_files(['client/helpers.js', 'client/sub.js'], c);
});
