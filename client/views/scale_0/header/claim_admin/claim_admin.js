
Template['claim_admin'].rendered = function(){
    $('#claim_admin').parsley({trigger: 'change keyup'});
};

Template['claim_admin'].events({
    'click button': function(e,t){
        if (!$('#claim_admin').parsley()) return;
        var val= t.$('#admin_email').val();
        console.log(val);
        Meteor.call('users/claim', val, 'admin', function(err, ret){
            console.log(ret);
        });
    }
});

