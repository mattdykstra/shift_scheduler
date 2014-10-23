Template.header.rendered = function () {

};

Template.header.helpers({
    'headerDate': function(){
        return moment().format('ddd DD MMM');
    },
    'copyFromWeek': function(){
        return Session.get('shCopyFromWeek');
    }

});

Template.header.events({
    'click .action-pweek': function(e, t) {
        SH.Week.setPrevious();
    },
    'click .action-cweek': function(e, t) {
        SH.Week.setCurrent();
    },
    'click .action-nweek': function(e, t) {
        SH.Week.setNext();
    },
    'click .action-settings': function(e, t) {
        e.preventDefault();
        e.stopPropagation();
        if (!SH.Modals.settings) {
            SH.Modals.settings = Blaze.render(
                Template['bizSettings'],
                $('#modals-container')[0])
        }
    },
    'click .action-copy': function(e, t){
        Session.set('shCopyFromWeek', SH.Week.getWeekCode( SH.Week.getString() ));
    },
    'click .action-paste': function (e, t){
        if (!Session.get('shCopyFromWeek')) return;
        if (!SH.Modals.pasteShifts) {
            SH.Modals.pasteShifts = Blaze.render(Template.pasteShifts, $('#modals-container')[0]);
        }
    },
    'click .action-publish': function (e, t){
        if (SH.isBusinessUser()) {
            Meteor.call('shifts/publish', SH.Week.getWeekCode(SH.Week.getString()));
        }
    }

});


