Package.describe({
    name: 'sh-app',
    summary: 'umbrella package for shifts sheduler',
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
    api.imply(['kl-common', 'sh-common'], cs);
    api.use(['sh-staff', 'sh-week', 'sh-shifts'], cs);
    api.use(['sh-templates'], c);
    //api.add_files(['namespace.js'], cs);
    //api.add_files(['server/pub.js', 'server/validators/shifts.js'], s);
    //api.add_files(['client/helpers.js', 'client/sub.js'], c);
});
