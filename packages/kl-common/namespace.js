KL = {};
KL.Utils = {};

function functionName(fun) {
    return (fun.nsPrefix ? fun.nsPrefix + "." : "") + fun.toString().split(' ')[1].split('(')[0];
} //not so useful..

/**
 * custom error reporter. able both throwing or not, consoling or not.
 * @param params: .output - function; .caller - name of that function; .error - what to throw, if any
 */
KL.abuse = function abuse(params) {
    var caller = params.caller,
        output = params.output,
        error = params.error;

    if (_.isFunction(output)) {
        if (caller) {
            console.log("== "+ caller + "() throws to console! ==");
        }
        output();
        if (caller) {
            console.log("== " + caller + "() output ends. ==");
        }
    }

    if (_.isString(error)) throw new Error(error);
};