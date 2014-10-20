var roles = ['admin', 'business', 'staff'];
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Meteor.methods({
    // users creting accounts is disabled, so accounts are added thru this method
    'users/claim': function (email, role, parameters) {
        if (_.indexOf(roles, role) < 0) return false;
        var id, user, count;
        parameters = parameters || {};
        // creating an admin. if no admins here, then first site visitor does.
        if (role == 'admin') {
            count = Meteor.users.find({role: 'admin'}).count();
            if (count > 0)
                throw new Meteor.Error(403, 'admin already exists', 'method users/claim forbids adding another admin');
            check(email, String);
            id = Accounts.createUser({email: email});

            if  (id) {
                Meteor.users.update({_id: id}, {$set: {role: 'admin'}});
                Accounts.sendEnrollmentEmail(id);
            }
        }

        // creating a business account. only admin can.
        if (role == 'business') {
            user = KL.Validation.pass('isUser', this.userId);
            if (!user) {
                throw new Meteor.Error(403, 'not logged in', 'method users/claim forbids adding staff for non-users');
            }
            if (user.role != 'admin') {
                throw new Meteor.Error(403, 'not an admin', 'method users/claim forbids adding staff non-business');
            }

            id = Accounts.createUser({email: email});
            _.extend(parameters, {role: 'business'});
            if  (id) {
                Meteor.users.update({_id: id}, {$set: parameters});
                Accounts.sendEnrollmentEmail(id);
                return "success";
            }
        }

        // creating a staff account. only business can.
        // currently only one staff account per business allowed.
        if (role == 'staff') {

            user = KL.Validation.pass('isUser', this.userId);
            if (!user) {
                throw new Meteor.Error(403, 'not logged in', 'method users/claim forbids adding staff for non-users');
            }
            if (user.role != 'business') {
                throw new Meteor.Error(403, 'adding staff account only allowed for business account', 'method users/claim raised error');
            }
            var bizSel = {businessId: this.userId};

            var staff = KL.Validation.pass('isStaffExists', bizSel);
            if (staff) {
                throw new Meteor.Error(403, 'staff already exists, currently only one staff account per business supported', 'method users/claim raised error');
            }

            id = Accounts.createUser({email: email});
            _.extend(parameters, {role: 'staff'}, bizSel);
            if  (id) {

                Meteor.users.update({_id: id}, {$set: parameters});
                Accounts.sendEnrollmentEmail(id);
            }
        }
    },
    "users/check/admin": function(){
        return (Meteor.users.find({role: 'admin'}).count() > 0);
    },
    "users/remove": function(id){
        var target = Meteor.users.findOne({_id: id});
        if (!target) return;
        var user = KL.Validation.pass("isUser", this.userId);
        if (!user) return;
        if (user.role == "business") {
            if (target.role == 'staff' && target.businessId == this.userId)
            Meteor.users.remove({_id: id});
        }
    }
});

Meteor.startup(function () {
    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: true,
        loginExpirationInDays: 30
    });

    // on startup, create root account
    if (Meteor.users.find({role: 'root'}).count() == 0 ) {
        var id = Accounts.createUser({email: SH.rootEmail});
        if  (id) {
            Meteor.users.update({_id: id}, {$set: {role:'root'}});
            Accounts.sendEnrollmentEmail(id);
        }
    }
});

Meteor.publish('userData', function () {
    if (this.userId) {
        var user = Meteor.users.findOne({_id: this.userId});
        if (!user) {
            this.ready();
            return;
        }
        if (user.role == "root") {
            return Meteor.users.find({},
                { fields: {'role': 1, 'businessName': 1, 'address': 1, phone: 1,
                    'contactName': 1, 'notes': 1}
                });
        }

        if (user.role == "admin") {
            return Meteor.users.find({ $or: [
                    {_id: this.userId},
                    {role: "business"}
                ]},
                { fields: {'role': 1, 'businessName': 1, 'address': 1, phone: 1, emails: 1, isActive: 1,
                    postcode:1,
                    state:1,
                    country:1,
                    'contactName': 1, 'notes': 1, 'businessId': 1}
                });
        }

        if (user.role == "business") {
            return Meteor.users.find({ $or: [
                    {_id: this.userId},
                    {role: "staff", businessId: this.userId}
                ]},
                { fields: {'role': 1, 'businessName': 1, 'address': 1, phone: 1, emails: 1, isActive: 1,
                    'contactName': 1, 'notes': 1, 'businessId': 1}
                });
        }

        if (user.role == "staff") {
            return Meteor.users.find({ $or: [
                    {_id: this.userId},
                    {role: "business", _id: user.businessId}
                ]},
                { fields: {'role': 1, 'businessName': 1, 'address': 1, phone: 1, isActive: 1,
                    'contactName': 1, 'notes': 1, 'businessId': 1}
                });
        }

    } else {
        this.ready();
    }
});

Meteor.users.allow({
    update: function (userId, docs, fields, modifier) {

        // only admin can update users. TODO - add root privilegies here
        var user = KL.Validation.pass('isAdmin', userId);
        if (!user) return false;

        // can't change role
        return !_.contains(fields, 'role');
    }
});