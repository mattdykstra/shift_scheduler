Template['admin_view'].rendered = function () {

};

Template['admin_view'].helpers({
    'businesses': function () {
        return Meteor.users.find({role: 'business'}).fetch();
    }

});

Template['admin_view'].events({
    'click .add-business-button': function(e, t) {
        console.log("+++");
        if (!SH.Modals.addBusiness) {
            console.log("+");
            SH.Modals.addBusiness = Blaze.render(
                Template['add_business'],
                $('#modals-container')[0])
        }
    }
});

Template['business_list_item'].helpers({
    'edit_popup_data': function() {
        var ret = {
            "id": this._id,
            "modal_title": "Edit "+ this.emails && this.emails [0] ? this.emails[0].address : "" +" details",
            "submit_title": "Save",
            "cancel_title": "Cancel"
        };
        console.log(ret);
        return ret;
    },
    'email': function(){
        console.log(this.emails);
        return this.emails ? this.emails[0].address : '';
    }
});