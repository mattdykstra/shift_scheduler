Package.describe({
    name: 'sh-shifts',
    summary: 'shifts sheduler package that deals with shifts',
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
    api.use(['kl-common', 'sh-week'], cs);
    api.use(['less'], c);
    api.add_files(['namespace.js', 'shifts.js', 'events.js'], cs);
    api.add_files(['server/pub.js', 'server/validators/shifts.js',
        'server/methods.js'], s);
    api.add_files(['client/helpers.js', 'client/sub.js', 'client/shift-cell.less'], c);
});
