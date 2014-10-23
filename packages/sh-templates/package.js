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


/**
 *   Scans a directory and output an array with files paths
 *   Usage: getFilesFromFolder(packageName,folder)
 *
 *   Example: getFilesFromFolder("yourPackageName","client");
 *   Output  : [ 'client/views/file-viewer/fileViewer.html',
 *               'client/views/fileManager.html' ]
 *
 *   Stack Overflow : http://stackoverflow.com/questions/20793505/meteor-package-api-add-files-add-entire-folder
 */
function getFilesFromFolder(packageName,folder){
    // local imports
    var _=Npm.require("underscore");
    var fs=Npm.require("fs");
    var path=Npm.require("path");
    // helper function, walks recursively inside nested folders and return absolute filenames
    function walk(folder){
        var filenames=[];
        // get relative filenames from folder
        var folderContent=fs.readdirSync(folder);
        // iterate over the folder content to handle nested folders
        _.each(folderContent,function(filename){
            // build absolute filename
            var absoluteFilename=folder+path.sep+filename;
            // get file stats
            var stat=fs.statSync(absoluteFilename);
            if(stat.isDirectory()){
                // directory case => add filenames fetched from recursive call
                filenames=filenames.concat(walk(absoluteFilename));
            }
            else{
                // file case => simply add it
                filenames.push(absoluteFilename);
            }
        });
        return filenames;
    }
    // save current working directory (something like "/home/user/projects/my-project")
    var cwd=process.cwd();
    // chdir to our package directory
    process.chdir("packages"+path.sep+packageName);
    // launch initial walk
    var result=walk(folder);
    // restore previous cwd
    process.chdir(cwd);
    return result;
}

Package.on_use(function (api) {
    api.use(['ui', 'templating', 'less', 'mizzao:bootstrap-3'], c);
    api.use(['kl-common'], c);
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
    api.add_files(getFilesFromFolder("sh-templates","client"), c);
    //api.add_files(['timepicker.html', 'timepicker.js'], c);
    //api.add_files(['templates.html', 'templates.js', 'templates.less',
    //'countrySelector.html', 'countrySelector.js'], c);

});
