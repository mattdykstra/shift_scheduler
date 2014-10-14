var helpers = {
    occupationsList: function(){
        return SH.Collections.Occupations.find().fetch();
    },
    employeesList: function(){
        return SH.Collections.Staff.find().fetch();
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
        UI.registerHelper(key, helper);
    });
});