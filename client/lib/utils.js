
KL = KL || {};
KL.Utils = KL.Utils || {};
KL.Utils.Meteor = KL.Utils.Meteor || {};
KL.Utils.Meteor._sessionSetTrueIfNonEmpty =
    function sessionSetTrueIfNonEmpty(t, jqkey, sessionkey) {
    var get = Session.get(sessionkey);
    if (t[jqkey].val() ) {
        if (!get) {Session.set(sessionkey, true);}
    }
    else {
        if (get) {Session.set(sessionkey, null);}
    }
};