Template.timepicker_15.rendered = function () {
    this.$timepicker = this.$('.timepicker');
    this.$timepicker.datetimepicker({
        format: 'LT'
        //pickDate: false,
        //pickTime: true,
    //    minuteStepping: 15
    });

    this.$input = this.$('input');
    this.$revertButton = this.$('.action-revert');


};

Template.timepicker_15.helpers({
    parsleyHelper: function (param) {
        if (param) return 'data-parsley-trigger="submit"';
        return ""
    }
});

// make control visible if condition is satisfied
function controlVisibility($visibility_control, condition) {
    var vis = $visibility_control.css('visibility');
    var newvis = condition ? 'visible' : 'hidden';
    if (vis != newvis) $visibility_control.css('visibility', newvis);
}

Template.timepicker_15.events({
    'keyup input': function (e, t) {
        controlVisibility(t.$revertButton, t.$input.val() != t.data.value);

    },
    'dp.change': function (e, t) {
        controlVisibility(t.$revertButton, t.$input.val() != t.data.value);

    },
    'click .action-revert': function (e, t) {
        t.$input.val(t.data.value);
        t.$input.parsley().reset();
        t.$revertButton.css('visibility', 'hidden');
    }
});


//shift editor' related
if (window.ParsleyValidator) window.ParsleyValidator.
    addValidator('laterthan', function (value, fieldname) {
        var valStart = $('input[name=' + fieldname + ']').val();
        if (!valStart || !value) return true;
        var ret = SH.Week.Time.spanInMinutes(valStart, value);
        return (ret && ret > 0);
    }).
    addMessage("en", "laterthan", 'Shift should end after it starts').

    addValidator('beforethan', function (value, fieldname) {
        var valEnd = $('input[name=' + fieldname + ']').val();
        if (!valEnd || !value) return true;
        var ret = SH.Week.Time.spanInMinutes(value, valEnd);
        return (ret && ret > 0);

    }).addMessage("en", "beforethan", 'Shift should start before it ends').

    addValidator('thenfillend', function (value, fieldname) {
        var valEnd = $('input[name=' + fieldname + ']').val();
        if (value) {
            return valEnd ? true : false;
        }
        else {
            return true;
        }
    }).addMessage("en", "thenfillend", 'Fill end field, too').

    addValidator('thenfillstart', function (value, fieldname) {
        var valStart = $('input[name=' + fieldname + ']').val();
        if (value) {
            return valStart ? true : false;
        }
        else {
            return true;
        }
    }).addMessage("en", "thenfillstart", 'Fill start field, too').

    addValidator('splitaftershift', function (value, fieldname) {
        var valEnd = $('input[name=' + fieldname + ']').val();
        if (!valEnd || !value) return true;
        var ret = SH.Week.Time.spanInMinutes(valEnd, value);
        return (ret >= 0 );
    }).
    addMessage("en", "splitaftershift", 'Second shift should not start before first shift ends');