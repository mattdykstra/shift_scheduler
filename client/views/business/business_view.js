Template.business_view.rendered = function () {

};

Template.business_view.helpers({
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

Template.business_view.events({
    'click .add-employee': function(e, t){
        if (!SH.Modals.addEmployee) {
            SH.Modals.addEmployee = Blaze.render(
                Template.booModalAddEmployee,
                $('#modals-container')[0])
        }
    },
    'click .manage_daily_event': function(e, t) {
        var $link = t.$(e.currentTarget);
        var dayCode = $link.data('dayCode');
        var event = SH.Shifts.Events.fromWD( SH.Week.getString(), dayCode ) || {};
        if (!event.dayCode) event.dayCode = dayCode;
        if (!SH.Modals.manageEvent) {
            SH.Modals.manageEvent = Blaze.renderWithData(
                Template.manageEvent, event,
                $('#modals-container')[0]);
        }
    }
});