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
    api.add_files(getFilesFromFolder("sh-app","client"), 'client');
    //api.add_files(['namespace.js'], cs);
    //api.add_files(['server/pub.js', 'server/validators/shifts.js'], s);
    //api.add_files(['client/helpers.js', 'client/sub.js'], c);
});
