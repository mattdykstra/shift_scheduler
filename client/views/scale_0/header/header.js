Template.header.rendered = function () {

};

Template.header.helpers({
    'headerDate': function(){
        return moment().format('ddd DD MMM');
    }

});

Template.header.events({
    'click [name=pweek]': function(e, t) {
        SH.Week.setPrevious();
    },
    'click [name=cweek]': function(e, t) {
        SH.Week.setCurrent();
    },
    'click [name=nweek]': function(e, t) {
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

    }

});


