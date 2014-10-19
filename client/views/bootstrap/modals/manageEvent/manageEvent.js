Template['manageEvent'].rendered = function () {
    this.$modal = this.$('#manage-event');
    this.$modal.modal('show');
    this.$name = this.$('[name=name]');
};

Template['manageEvent'].helpers({
    'dataHelper': function(){
            var self = this;
            return {
                modalId: 'manage-event',
                form: {
                    title: function () {
                        return 'Enter Event Name'
                    },
                    class: "form-vertical"
                },
                cancelButton: 'Cancel',
                applyButton: 'Enter',
                data: self
            }
    }
});

Template['manageEvent'].events({
    'shown.bs.modal': function (e, t) {
        t.$('input[name=name]').focus()
    },
    'hidden.bs.modal': function (e, t) {
        console.log("--");
        Blaze.remove(SH.Modals.manageEvent);
        SH.Modals.manageEvent = null;
    },
    'click .submit': function (e, t) {
        var data = {name: t.$name.val()};
        if (t.data._id) {
            if (data.name) {
                SH.Shifts.collection.update({_id: t.data._id}, {$set: data});
            } else {
                SH.Shifts.collection.remove({_id: t.data._id});
            }
        }
        else {
            SH.Shifts.collection.insert(
                _.extend( data, {
                        tag: 'event',
                        weekCode: SH.Week.getWeekCode(SH.Week.getString()),
                        dayCode: t.data.dayCode
                    }
                )
            );
        }
        t.$modal.modal('hide');
    }
});