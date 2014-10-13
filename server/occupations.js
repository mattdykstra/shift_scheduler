/**
 * Created by angelo on 10/13/14.
 */

SH = SH || {};
SH.Occupations = SH.Occupations || {};

SH.Collections.Occupations.allow({
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

SH.Collections.Occupations.before.insert(
    function(userId, doc) {
        doc.businessId = userId;
    }
);

SH.Collections.Occupations.deny({
    update: function (userId, docs, fields, modifier) {
        return _.contains(fields, 'businessId');
    }
});

Meteor.publish('occupations', function() {
    if (!this.userId) {
        this.ready();
        return;
    }

    var bizSel = KL.Validation.pass("userBusinessSelector", this.userId);
    if (!bizSel) {
        this.ready();
        return;
    }

    return SH.Collections.Occupations.find(bizSel);
});