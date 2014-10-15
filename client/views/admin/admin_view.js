Template['admin_view'].rendered = function () {

};

Template['admin_view'].helpers({
    'businesses': function () {
        return Meteor.users.find({role: 'business'}).fetch();
    }

});

Template['admin_view'].events({
    'click .add-business-button': function(e, t) {
        if (!SH.Modals.addBusiness) {
            SH.Modals.addBusiness = Blaze.render(
                Template['add_business'],
                $('#modals-container')[0])
        }
    }

});