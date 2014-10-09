KL.Validation = {};

var ns = KL.Validation;
var nsPrefix = 'KL.Validation.';

// handy helper. we pass everything our validators return thru this.
KL.Validation._parse = function parse(result) {
    if (_.isString(result)) {
        // this allows writing fancy ' return "pass";    return "fail"    ' :)
        // not sure this is absolutely needed but indeed we can do more here.
        if (result == 'pass') return true;
        if (result == 'fail') return false;
        return result;
    }

    // i think that at certain stage validation result IS an object, not a string or true/false.
    // this is generic, non-optimized state of validation result. which allows for simpler result translation logic
    if (_.isObject(result) && result.meta) {
        //parse meta. do what needed.

        result.meta = null;
        return result;
    }
    //bypass
    return result;
};

KL.Validation.setBucket = function setBucket(hash) {

    if (!_.isObject(hash)) {
        KL.abuse({
            error: "wrong parameter type: expected 'hash' parameter to be an key-value pairs object"
        });
    }
    KL.Validation.bucket = hash;
};


/**
 * Runs
 * @param validator - String. name of validation function to be called
 * @param parameters - Object.
 * @returns validation function result {*}
 */
KL.Validation.pass = function pass(validator, parameters) {
    var self = this;
    var fqn = nsPrefix + 'pass';
    // TODO: factor abuse out, so every function can deal with it.

    // check first parameter is a validator name
    if (!_.isString(validator)) {
        KL.abuse({
            caller: fqn,
            output: function () {
                console.log(" - expected 'validator' parameter to be a string");
            },
            error: "wrong parameter type"
        });
    }

    // check that app has set up validator bucket
    var bucket = KL.Validation.bucket;
    if (!bucket) {
        KL.abuse({
            output: function () {
                console.log(' - please call Validation.setBucket( <validatorsHash> ) before calling Validation.pass');
                console.log("== KL.Validation.pass() output ends. ==");
            },
            error: "validators bucket undefined"});
    }

    // check validator with that name exist
    if (!bucket[validator] || !_.isFunction(bucket[validator])) {
        KL.abuse({
            output: function () {
                console.log(' - validator named "' + validator + '" is undefined or not a function');
            }
        });
    }

    parameters = parameters || {};
    if (!parameters.meta) {

        return KL.Validation._parse(bucket[validator](parameters));
    }

    KL.abuse({
        output: function () {
            console.log(' - validator name: ' + validator);
            console.log(' - parameters passed:');
            console.log(parameters);
            console.log(" - reason: 'calling validator with non-empty meta in parameters: not implemented yet'");
        }
    });
    return undefined;
};

