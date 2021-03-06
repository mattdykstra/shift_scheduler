SH.businessId = function businessId(){
    var user = Meteor.user();
    if (user) {
        if (user.role == 'business') return user._id;
        if (user.role == 'staff') return user.businessId;
    }
    return null;
};

SH.staffUser = function(){
    var user = Meteor.user();
    if (user.role == 'staff') return user;
    if (user.role == 'business') {
        var staff = Meteor.users.findOne({role: 'staff', businessId: user._id});
        if (staff) return staff;
    }
    return null;
};

SH.staffId = function() {
    var staff = SH.staffUser();
    if (staff) return staff._id;
    return null;
};

SH.isBusinessUser = function () {
    var user = Meteor.user();
    return user ? user.role == 'business' : false;
};

var helpers = {
    // who is looged in ?
    isBusinessUser: SH.isBusinessUser,
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
    staffUser: SH.staffUser,
    noAdminUser: function () {
        return Session.get("shNoAdmin");
    },
    occupationsList: function(){
        return SH.Collections.Occupations.find().fetch();
    },
    employeesList: function(){
        return SH.Collections.Staff.find().fetch();
    },
    BusinessName: function() {
        var user = Meteor.users.findOne({_id: SH.businessId() });
        return user ? user.businessName : "";
    },
    'EmployeeName': function (employeeId) {
        var employee = SH.Staff.collection.findOne({_id: employeeId});
        if (employee) return employee.name;
        return '###';
    }
};

Meteor.startup(function() {
    _.each(helpers, function (helper, key) {
        UI.registerHelper(key, helper);
    });
});

Meteor.startup(function(){
    // specifically for noAdminUser helper.
    if (!Meteor.userId()) {
        Meteor.call("users/check/admin", function (err, ret) {
            Session.set("shNoAdmin", ret ? false : true);
        })
    }
});
