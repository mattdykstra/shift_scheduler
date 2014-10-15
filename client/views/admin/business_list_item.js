Template['business_list_item'].rendered = function () {

};


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
        return this.emails ? this.emails[0].address : '';
    },
    'activity_statut': function(){
        return this.isActive == 'on' ? 'ACTIVE' : 'SUSPENDED'
    }
});

Template['business_list_item'].events({
    'click .edit-business-button': function(e, t) {
        console.log('sdf');
        if (!SH.Modals.editBusiness) {
            SH.Modals.editBusiness = Blaze.renderWithData(
                Template['edit_business'], t.data,
                $('#modals-container')[0])
        }
    }
});