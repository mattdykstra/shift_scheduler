var helpers = {
    eq: function(value1, value2) {
        return value1 === value2;
    },
    neq: function(value1, value2) {
        return value1 != value2;
    },
    gt: function(value1, value2) {
        return value1 > value2;
    },
    lt: function(value1, value2) {
        return value1 < value2;
    },
    lte: function(value1, value2) {
        return value1 <= value2;
    },
    gte: function(value1, value2) {
        return value1 >= value2;
    },
    and: function(value1, value2) {
        return value1 && value2;
    },
    or: function(value1, value2) {
        return value1 || value2;
    },
    contains: function(list, value) {
        return _.contains(list, value);
    },
    slice: function(list, start, end) {
        list = list || [];

        return list.slice(start, end);
    },
    keyValue: function(context) {
        return _.map(context, function(value, key) {
            return {
                key: key,
                value: value
            };
        });
    },
    sum: function(value1, value2) {
        return value1 + value2;
    },
    session: function(key) {
        return Session.get(key);
    },
    concat: function(value1, value2) {
        return value1.toString() + value2.toString();
    },
    'indexedArray': function(context, options) {
        if (context) {
            return context.map(function(item, index) {
                item._index = index + 1;
                return item;
            })
        }
    },
    //this is for <select><option>..
    selectedIfMatches: function(value1, value2){
        return value1==value2 ? 'selected' : "";
    },
    visibleIf: function(condition) {
        return condition ? 'visible' : 'hidden';
    }
};

Meteor.startup(function(){
    _.each(helpers, function(helper, key) {
        UI.registerHelper(key, helper);
    });
});
