Template.closePreviousDay.rendered = function () {
    this.$form = $('#previous-day').closest('form');
    this.parsley = this.$form.parsley();
    this.$modal = this.$form.closest('.modal');
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
        e.preventDefault();
        e.stopPropagation();

        if (t.parsley.isValid()) {
            var val = t.$('[name=shiftEndReal]').val();
            Meteor.call("shift/fix/clockoff", val, t.data.lastActivity, function(err, res){
                if (!err) {
                    t.$modal.modal('hide');
                }
                else {console.log(err);}
            });
        }
        else t.parsley.validate();
    }
});