Template['business_view'].rendered = function () {

};

Template['business_view'].helpers({
    'grand_total': function () {
        var businessId = SH.businessId();
        if (!businessId) return 0;
        var selector = {
            businessId: businessId,
            weekCode: SH.Week.getWeekCode( SH.Week.getString() )
        };
        return SH.Shifts.totalWeeklyPayment(selector);
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