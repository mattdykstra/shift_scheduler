Template['alert'].rendered = function () {

};

Template['alert'].helpers({
    'class': function () {
        var ret = "alert";
        if (this.status) ret += " alert-"+this.status;
        if (this.dismissible !== false) ret += " alert-dismissible";
        return ret;
    }
});

Template['alert'].events({
    'click .bar': function (e, t) {

    }
});