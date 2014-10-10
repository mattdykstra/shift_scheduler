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