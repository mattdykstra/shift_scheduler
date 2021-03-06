Template.pinInputWithPinpad.rendered = function () {
    this.$pin = this.$(".pin-input > input");
};

Template.pinInputWithPinpad.helpers({
});

Template.pinInputWithPinpad.events({
    'click .pinpad button': function (e, t) {
        var $button = t.$(e.currentTarget);
        $button.blur();
        var val = t.$pin.val();

        var buttonValue = $button.data('value') || $button.html();
        if (buttonValue) {
            if (buttonValue == 'backspace') {
                if (val.length>0) {
                    t.$pin.val(val.slice(0, -1));
                    return t.$pin.trigger('keyup');
                }
                return;
            }
            t.$pin.val(val + buttonValue);
            t.$pin.trigger('keyup');
        }
    }
});