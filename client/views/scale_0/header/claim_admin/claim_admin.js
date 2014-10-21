
Template.claim_admin.rendered = function(){
    $('#claim_admin').parsley({trigger: 'change keyup'});
};

Template.claim_admin.events({
    'click button': function(e,t){
        e.preventDefault();
        e.stopPropagation();
        if (!$('#claim_admin').parsley().isValid()) return;
        var val= t.$('#admin_email').val();

        Meteor.call('users/claim', val, 'admin', function(err, ret){

        });
    }
});

