
Template['claim_staff'].rendered = function(){
    $('#claim_staff').parsley({trigger: 'change keyup'});
};

Template['claim_staff'].events({
    'click button': function(e,t){
        e.preventDefault();
        e.stopPropagation();
        if (!$('#claim_staff').parsley().isValid()) return;
        var val= t.$('#staff_email').val();

        Meteor.call('users/claim', val, 'staff', function(err, ret){

        });
    }
});

