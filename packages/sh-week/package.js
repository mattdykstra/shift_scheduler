Package.describe({
    name: 'sh-week',
    summary: 'shifts sheduler package that deals with weeks and weekdays.',
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
    api.use('ui', c);
    api.use(['kl-common', 'sh-common'], cs);
    api.imply('sh-common');
    api.add_files('namespace.js', cs);
    api.add_files('week.js', cs);
    api.add_files('server/week.js', s);
    api.add_files(['client/session.js', 'client/helpers.js', 'client/week.js',
    'client/time/helpers.js'], c);

});
