Template['header'].rendered = function () {

};

Template['header'].helpers({

});

Template['header'].events({
    'click [name=pweek]': function(e, t) {
        SH.Week.setPrevious();
    },
    'click [name=cweek]': function(e, t) {
        SH.Week.setCurrent();
    },
    'click [name=nweek]': function(e, t) {
        SH.Week.setNext();
    }
});


