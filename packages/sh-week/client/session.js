//Session-storeables: strings
_.extend( SH.Week, {
    setString: function (value) {
        if (_.isString(value))
            return Session.set("shWeekStartDateString", value);
    },

    getString: function () {
        return Session.get("shWeekStartDateString");
    },

    //Session-storeables: dates
    get: function () {
        return this.dateFromString(this.getString());
    },

    set: function (momentObject) {
        this.setString(this.weekStartDateString(momentObject));
    }
});

