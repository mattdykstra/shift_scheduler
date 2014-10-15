Package.describe({
    name: 'kl-common',
    //nothing special here, i just try to use my own libs
    summary: 'provides KL namespace - place where utils live',
    owner: 'Angelo Tomarcafe',
    email: 'angelo.tomarcafe@gmail.com',
    version: '0.1.0'
});

var cs = ['client', 'server'];
var c = 'client';
var s = 'server';

Package.on_use(function (api) {
    api.use('underscore', cs);
    /* Use or imply other packages.

     * Example:
     *  api.use('ui', 'client');
     *  api.use('iron-router', ['client', 'server']);
     */

    /*
     * Add files that should be used with this
     * package.
     */
    api.add_files(['namespace.js', 'countries_list.js'], cs);
    api.add_files('server/validation.js', s);
    api.add_files('client/global_helpers.js', c);
    //api.add_files('client/_dummy.js', s);
    api.export('KL', cs);

});
