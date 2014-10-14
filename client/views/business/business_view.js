Template['business_view'].rendered = function () {

};

Template['business_view'].helpers({
    'foo': function () {

    }
});

Template['business_view'].events({
    'click .add-employee': function(e, t){
        if (!SH.Modals.addEmployee) {
            SH.Modals.addEmployee = Blaze.render(
                Template['booModalAddEmployee'],
                $('#modals-container')[0])
        }
    }
});