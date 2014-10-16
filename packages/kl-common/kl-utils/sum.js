KL.Utils.sum = function sum(collection, fnTransform){
    return _.reduce(collection, function(memo, num){
        return memo + (fnTransform ? fnTransform(num) : num);
    }, 0);
};