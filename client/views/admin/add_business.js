Template['add_business'].rendered = function () {

};

Template['add_business'].helpers({
    'foo': function () {

    }
});

Template['add_business'].events({
    'shown.bs.dropdown': function (e, t) {
        t.$('input[name=email]').focus()
    },
    'keyup': function (e, t) {
        if (e.key == 'Esc') {
            t.$('.dropdown.open').removeClass('open');
        }
    }
});