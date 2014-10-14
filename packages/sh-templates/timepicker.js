Template['timepicker_15'].rendered = function(){

    this.$timepicker = this.$('.timepicker');
    this.$timepicker .datetimepicker({
        pickDate: false,
        pickTime: true,
        minuteStepping: 15});

    this.$input = self.$('input');
    this.$visibility_control = this.$('.input-helper-button-out');
};

Template['timepicker_15'].helpers({

});

function controlVisibility($visibility_control, condition) {
    var vis = $visibility_control.css('visibility');
    var newvis = condition ? 'visible' : 'hidden';
    if (vis != newvis) $visibility_control.css('visibility', newvis);
}

Template['timepicker_15'].events({
    'keyup input': function (e, t) {
        controlVisibility(t.$visibility_control, t.$input.val()!= t.data.value );
    },
    'dp.change': function (e, t) {
        controlVisibility(t.$visibility_control, t.$input.val()!= t.data.value);
    },
    'click .glyphicon-remove': function (e, t) {
        t.$input.val(t.data.value);
        t.$visibility_control.css('visibility', 'hidden');
    }
});


