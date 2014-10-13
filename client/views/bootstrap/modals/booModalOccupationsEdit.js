Template['booModalOccupationsEdit'].rendered = function () {
    this.alertsRoot = this.$(".alerts-container")[0];
};

Template['booModalOccupationsEdit'].helpers({
    'foo': function () {

    }
});

Template['booModalOccupationsEdit'].events({
    'click .role-add': function (e, t) {

        var $row = t.$(e.currentTarget).closest(".form-group");
        var data = {
            name: t.$(".oc-name", $row).val(),
            code: t.$(".oc-code", $row).val().toUpperCase()
        };
        if (!data.name || !data.code) {
            Blaze.renderWithData(Template['alert'], {
                message: "<strong>both</strong> occupation and code required",
                status: 'warning'
            }, t.alertsRoot)
        }
        else {
            SH.Collections.Occupations.insert(data);
        }

    }
});


function occupationId( mess ){
    return mess.split("edit-role-")[1];
}

Template['edit_occupation'].events({
    'click .role-revert': function(e, t) {
        var _id = t.data._id;
        var occupation = SH.Collections.Occupations.findOne({_id: _id });
        t.$(".oc-name").val(occupation.name);
        t.$(".oc-code").val(occupation.code);
    },
    'click .role-update': function(e, t) {

        var _id = t.data._id;
        var data = {
            name: t.$(".oc-name").val(),
            code: t.$(".oc-code").val().toUpperCase()
        };
        if (!data.name || !data.code) {
            Blaze.renderWithData(Template['alert'], {
                message: "<strong>both</strong> occupation and code required",
                status: 'warning'
            }, t.alertsRoot)
        }
        else {
            SH.Collections.Occupations.update({_id: _id}, {$set: data});
        }
    },
    'click .role-remove': function(e, t) {
        var _id = t.data._id;
        SH.Collections.Occupations.remove({_id: _id});
    }
});