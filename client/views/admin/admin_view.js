Template['admin_view'].rendered = function () {

};

Template['admin_view'].helpers({
    'businesses': function () {
        return Meteor.users.find({role: 'business'}).fetch();
    }
});

Template['admin_view'].events({
    'click .add-business': function (e, t) {
        //$.
    }
});