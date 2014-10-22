
Template.reset_staff.rendered = function(){
    this.$email = this.$('#staff_email_reset');
    Session.set('staffAccountRemovalAllow', false);
};



Template.reset_staff.helpers({
    email: function() {
        return this.emails ? this.emails[0].address : ''
    },
    disableRemoveButton: function() {
        return Session.get('staffAccountRemovalAllow') ? '': 'disabled';
    }
});

function _setSess(t) {

    var email = Template.reset_staff.__helpers[' email'].call(t.data);
    console.log(email);
    console.log(t.$email);
    console.log(t.$email.val());
    Session.set('staffAccountRemovalAllow', email == t.$email.val());
}

Template.reset_staff.events({
    'change #staff_email_reset, keyup #staff_email_reset':  function(e, t) {
        _setSess(t);
    },
    'click button': function(e,t){
        e.preventDefault();
        e.stopPropagation();

        var val= t.$email.val();
        var email = Template.reset_staff.__helpers[' email'].call(t.data);
        if (val == email) {
            Meteor.call("users/remove", SH.staffId());
        }
    }
});

