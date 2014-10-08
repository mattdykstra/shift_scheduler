Package.describe({
    name: 'sh-templates',
    summary: 'place where new templates are crafted and tested',
    owner: 'Angelo Tomarcafe',
    email: 'angelo.tomarcafe@gmail.com',
    version: '0.0.9'
});

var cs = ['client', 'server'];
var c = 'client';
var s = 'server';

Package.on_use(function (api) {
    api.use(['ui', 'templating', 'less'], c);
    api.imply('sh-common');
    /* Use or imply other packages.

     * Example:
     *  api.use('ui', 'client');
     *  api.use('iron-router', ['client', 'server']);
     */

    /*
     * Add files that should be used with this
     * package.
     */
    api.add_files(['timepicker.html', 'timepicker.js'], c);
    api.add_files(['templates.html', 'templates.js', 'templates.less'], c);
    api.add_files(['staff view.html'], c);


    api.export('SH');
});
