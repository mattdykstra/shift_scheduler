var roles = ['admin', 'business', 'staff'];
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Meteor.methods({
    'users/claim': function (email, role) {
        if (roles.indexOf(role) < 0) return false;
        if (role == 'admin') {
            var count = Meteor.users.find({role: 'admin'}).count();
            if (count > 0)
                throw new Meteor.Error(403, 'admin already exists', 'admin already exists');
            check(email, String);
            var id = Accounts.createUser({email: email});

            if  (id) {
                Meteor.users.update({_id: id}, {$set: {role: 'admin'}});
                Accounts.sendEnrollmentEmail(id);
            }
        }
        if (role == 'business') {
            var user = KL.Validation.pass('isUserLoggedIn');
        }
    },
    "users/check/admin": function(){
        return (Meteor.users.find({role: 'admin'}).count() > 0);
    }
});

var rootEmail = 'angelo.tomarcafe@gmail.com';

Meteor.startup(function () {
    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: true,
        loginExpirationInDays: 30
    });

    if (Meteor.users.find({role: 'root'}).count() == 0 ) {
        var id = Accounts.createUser({email: rootEmail});
        if  (id) {
            Meteor.users.update({_id: id}, {$set: {role:'root'}});
            Accounts.sendEnrollmentEmail(id);
        }
    }



    //KL.Validation.setBucket("");

});