//todo - move to package?
SH.businessId = function businessId(){
    var user = Meteor.user();
    if (user.role == 'business') return user._id;
    if (user.role == 'staff') return user.businessId;
    return null;
};

SH.staffId = function() {
    var user = Meteor.user();
    if (user.role == 'staff') return user._id;
    if (user.role == 'business') {
        var staff = Meteor.users.findOne({role: 'staff', businessId: user._id});
        if (staff) return staff._id;
    }
    return null;
};

var helpers = {
    // who is looged in ?
    isBusinessUser: function () {
        var user = Meteor.user();
        return user ? user.role == 'business' : false;
    },
    isStaffUser: function () {
        var user = Meteor.user();
        return user ? user.role == 'staff' : false;
    },
    isAdminUser: function() {
        var user = Meteor.user();
        return user ? user.role == 'admin' : false;
    },
    isRootUser: function() {
        var user = Meteor.user();
        return user ? user.role == 'root' : false;
    },

    // what is businessId
    businessId: SH.businessId,
    staffId: SH.staffId,
    noAdminUser: function () {
        return Session.get("shNoAdmin");
    }
};

Meteor.startup(function(){
    _.each(helpers, function(helper, key) {
        UI.registerHelper(key, helper);
    });

    // specifically for noAdminUser helper.
    if (!Meteor.userId()) {
        Meteor.call("users/check/admin", function (err, ret) {
            console.log(ret);
            Session.set("shNoAdmin", ret ? false : true);
        })
    }
});