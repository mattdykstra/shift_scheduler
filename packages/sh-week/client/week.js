_.extend (SH.Week, {
    setCurrent: function() {
        this.set();
    }
});

Meteor.startup(function(){
    SH.Week.setCurrent();
});

SH.Week.setPrevious = function(){
    var startWeek = SH.Week.get().day(-6);
    this.set( startWeek );
};

SH.Week.setNext = function(){
    var startWeek = SH.Week.get().day(8);
    this.set( startWeek );
};

