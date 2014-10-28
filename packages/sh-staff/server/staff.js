SH.Collections.Staff.allow({
    insert: function(userId, doc) {
        var user = KL.Validation.pass("isBusiness", userId);
        return user ? true : false;
    },
    update: function(userId, doc, fields, modifier) {
        return (doc.businessId === userId);
    },
    remove: function(userId, doc) {
        return (doc.businessId === userId);
    }
});

SH.Collections.Staff.before.insert(
    function(userId, doc) {
        doc.businessId = userId;
    }
);

SH.Collections.Staff.deny({
    update: function (userId, docs, fields, modifier) {
        // can't change businessId
        return _.contains(fields, 'businessId');
    }
});

Meteor.publish('staff', function() {
    if (!this.userId) {
        this.ready();
        return;
    }

    var bizSel = KL.Validation.pass("userBusinessSelector", this.userId);
    if (!bizSel) {
        this.ready();
        return;
    }
    var cursor = SH.Collections.Staff.find(bizSel, {sort: {name: 1}});
    var forgotShifts = _.map(cursor.fetch(), function(staff){
       if (staff && staff.lastActivity && staff.lastActivity.shiftId) {
           return staff.lastActivity.shiftId;
       }
    });
    var shiftsCursor = SH.Collections.Shifts.find({_id: {$in: forgotShifts}});
    return [cursor, shiftsCursor ];
});