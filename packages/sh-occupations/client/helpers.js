var globalHelpers = {
    'RoleCode': function RoleCode(occupationId){

        var ret = SH.Occupations.collection.findOne({_id: occupationId});

        return ret ? ret.code : "";
    },
    'RoleName': function RoleName(occupationId){

        var ret = SH.Occupations.collection.findOne({_id: occupationId});

        return ret ? ret.name : "";
    }
};

Meteor.startup(function() {
    _.each(globalHelpers, function (helper, key) {
        Template.registerHelper(key, helper);
    });
});
