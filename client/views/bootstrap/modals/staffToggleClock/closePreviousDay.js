Template.closePreviousDay.rendered = function () {

};

function isSplit(that){
    return that.lastActivity.code == 'split'; // else it is 'shift'
}
Template.closePreviousDay.helpers({
    '_shiftName': function () {
        return isSplit(this) ? '2nd shift': '1st shift';
    },
    '_shiftBegin': function() {
        if (!this.shift) return null;
        return isSplit(this) ? this.shift.splitBegin : this.shift.shiftBegin;
    },
    '_shiftBeginReal':function() {
        if (!this.shift) return null;
        return isSplit(this) ? this.shift.splitBeginReal : this.shift.shiftBeginReal;
    }
});

Template.closePreviousDay.events({
    'click .submit': function (e, t) {
        
    }
});