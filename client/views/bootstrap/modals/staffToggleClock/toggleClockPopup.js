Template.toggleClockPopup.rendered = function () {
    // reset state, just in case. probably is a problem only when development is going
    _clearVariables();
    this.$modal = this.$('#toggle-clock');
    this.$form = this.$('#toggle-clock-form');
    // init validator
    this.$form._parsley = this.$form.parsley();
    this.$modal.modal({keyboard: true});
    this.$alerts_container = this.$('.alerts-container');
    var self = this;
    this.autorun(function(){
        var p = self.$form._parsley && self.$form._parsley.isValid();
        if (p) _enableConfirmButton();
        else _disableConfirmButton();
    })
};


// todo : make a constructor function for those?
// those are low-level triggers to show/hide (or enable/disable) different parts of template
// they are to be switched from event handlers + shift data
var __hideMainButton = "shToggleClockMainButtonHide";
function _showMainButton(){    Session.set(__hideMainButton, null);}
function _hideMainButton(){    Session.set(__hideMainButton, true);}
function _isVisibleMainButton(){    return Session.get(__hideMainButton) != true; }

var __showConfirmButton = "shToggleClockSecondaryButtonShow";
function _showConfirmButton (){    Session.set(__showConfirmButton, true);}
function _hideConfirmButton  (){    Session.set(__showConfirmButton, null);}
function _isVisibleConfirmButton (){    return Session.get(__showConfirmButton) == true; }

var __enableConfirmButton = "shToggleClockSecondaryButtonEnable";
function _enableConfirmButton (){    Session.set(__enableConfirmButton, true);}
function _disableConfirmButton  (){    Session.set(__enableConfirmButton, null);}
function _isEnabledConfirmButton (){    return Session.get(__enableConfirmButton) == true; }

var __showManagerField = "shToggleClockManagerShow";
function _showManagerField (){    Session.set(__showManagerField, true);}
function _hideManagerField (){    Session.set(__showManagerField, null);}
function _isVisibleManagerField (){    return Session.get(__showManagerField); }

var __showTimepickerField = "shToggleClockTimepickerShow";
function _showTimepickerField (){    Session.set(__showTimepickerField , true);}
function _hideTimepickerField (){    Session.set(__showTimepickerField , null);}
function _isVisibleTimepickerField (){    return Session.get(__showTimepickerField ) == true; }

var __showLateDialog = "shTogglClockShowLate";
function _showLateDialog (){    Session.set(__showLateDialog , true);}
function _hideLateDialog (){    Session.set(__showLateDialog , null);}
function _isVisibleLateDialog (){    return Session.get(__showLateDialog ) == true; }

var __showEarlyDialog = "shTogglClockShowEarly";
function _showEarlyDialog (){    Session.set(__showEarlyDialog , true);}
function _hideEarlyDialog (){    Session.set(__showEarlyDialog , null);}
function _isVisibleEarlyDialog (){    return Session.get(__showEarlyDialog ) == true; }

// reset state (called upon close template (and upon rendering, just in case))
function _clearVariables(){
    Session.set(__hideMainButton, null);
    Session.set(__showManagerField, null);
    Session.set(__showTimepickerField , null);
    Session.set(__showLateDialog , null);
    Session.set(__showEarlyDialog , null);
    Session.set(__showConfirmButton, null);
    Session.set(__enableConfirmButton, null);
}


Template.toggleClockPopup.helpers({
    'title': function () { //modal popup title
        return (this.employee ? this.employee.name  : '')
    },
    'showBye': function(){ // both shifts are logged. staff has nothing to do more today
        var shift= this.shift;
        return shift && shift.splitClockOff ? true : false;
    },
    'showWhy1': function(){ // no shift scheduled for today or dayOff. either nothing to do or forced shift
        var shift = this.shift;
        return !shift || shift.dayOff == 'on';
    },
    'showWhy2': function(){ // 1st shift is logged, and 2nd shift is not scheduled
        var shift = this.shift;
        return shift && shift.shiftClockOff && !shift.splitBegin;
    },
    'hasShift': function(){ // staff has scheduled shift, and not a dayOff
        var shift= this.shift;
        return (shift && shift.dayOff != 'on' && shift.shiftBegin);
    },
    'showShiftOn': function(){ // staff has scheduled shift, and no logging yet
        var shift= this.shift;
        return shift && shift.shiftBegin && !shift.shiftClockOn && shift.dayOff != 'on';
    },
    'showShiftOff': function(){ // staff has scheduled shift, and clockOn already clicked
        var shift= this.shift;
        return shift.shiftClockOn && !shift.shiftClockOff && shift.dayOff != 'on';
    },
    'showSplitOn': function(){ // staff has scheduled 2nd shift, 1st shift is logged, and 2nd is not
        var shift= this.shift;
        return shift.splitBegin && shift.shiftClockOff && !shift.splitClockOn && shift.dayOff != 'on';
    },
    'showSplitOff': function(){ // staff has scheduled 2nd shift, 1st shift is logged, and 2nd is clocked on
        var shift= this.shift;
        return shift.splitClockOn && !shift.splitClockOff && shift.dayOff != 'on';
    },
    'showConfirm': function(){ // should we chow clock button (when in complex cases)
        return _isVisibleConfirmButton();
    },
    'manager': function(){ //
        return _isVisibleManagerField();
    }
});

Template.btnShiftClockOn.helpers({
    'showButton': function() { // show primary button
        return _isVisibleMainButton();
    },
    'late': function(){
        return _isVisibleLateDialog()
    },
    'showConfirm': function(){ // should we chow clock button (when in complex cases)
        return _isVisibleConfirmButton();
    },
    'showTimepicker': function(){
        return _isVisibleTimepickerField();
    }
});

Template.btnShiftClockOff.helpers({
    'showButton': function() { // show primary button
        return _isVisibleMainButton();
    },
    'late': function(){
        return _isVisibleLateDialog()
    },
    'early': function(){
        return _isVisibleEarlyDialog()
    },
    'showConfirm': function(){ // should we chow clock button (when in complex cases)
        return _isVisibleConfirmButton();
    }
});

// generate parameters to send to server
function _getAddon(form){
    var ret = {};
    form.serializeArray().forEach(function (input) {
        ret[input.name] = input.value;
    });
    return ret;
}

function stamp(t) {
    return {
        offset: moment().zone(),
        time: moment().format('h:mm A'),
        shiftId: t.data.shift ? t.data.shift._id : '',
        addon: _getAddon(t.$form)
        }
}

Template.toggleClockPopup.events({
    // when dialog is hidden - remove it from DOM
    'hidden.bs.modal': function (e, t) {
        _clearVariables();
        Blaze.remove(SH.Modals.toggleClock);
        SH.Modals.toggleClock = null;

    },

    'change [name=\"reason-there\"]': function (e, t) { // this handles answer on 'why are you there?'
        t.$alerts_container.empty();
        var $checked = t.$('[name="reason-there"]:checked');
        if (!$checked) return;

        var val = $checked.val();
            _showConfirmButton();

        if (val=='manager') {
            _showManagerField();
        }
        else {

            _hideManagerField();
            Blaze.renderWithData(Template.alert, {
                message: "Please, get manager's approval to start",
                status: 'info'},

                t.$alerts_container[0]);
        }
    },

    'change [name=\"reason-late\"]': function (e, t) { // this handles answer on 'why are you late?'
        t.$alerts_container.empty();
        var $checked = t.$('[name="reason-late"]:checked');
        if (!$checked) return;

        var val = $checked.val();
        _showConfirmButton();
        console.log(val);
        switch(val) {
            case 'manager':
                // show manager.
                // run only after confirm-button
                _showManagerField();
                _hideTimepickerField();
                break;
            case 'timer':
                _showTimepickerField();
                _hideManagerField();
                break;
            case 'late':
                // run 'late' only after confirm-button
                _hideTimepickerField();
                _hideManagerField();
                break;
            case 'ok': default:
                // run 'ok' only after confirm-button
                _hideTimepickerField();
                _hideManagerField();
                break;
        }
    },
    'change [name=\"reason-early\"]': function (e, t) { // this handles answer on 'why are you leaving early?"
        t.$alerts_container.empty();
        var $checked = t.$('[name="reason-early"]:checked');
        if (!$checked) return;

        var val = $checked.val();
        _showConfirmButton();
    },
    'click .day-off': function (e, t) {
        console.log('day-off clicked');
    },
    // this handles click on .clock-off
    'click .clock-on': function (e, t) {
        // currently handles only current day.

        if (!t.$form._parsley.isValid()) return;
        var $link = $(e.currentTarget);
        //check if late

        var shift = t.data.shift;
        var shiftName = $link.data('shift');
        var prop =shiftName+'Begin';

        // difference between scheduled start and time 'clock-on' clicked.
        // negative it clicked before schedule, positive if after
        var diff = SH.Week.Time.spanInMinutes(shift[prop], SH.Week.Time.momentToHmmString());
        console.log(diff);

        if (diff>0) { //if late
            _hideMainButton();
            _showLateDialog();
        } else { //if all ok:
            if (t.$form._parsley && !t.$form._parsley.isValid()) {
                t.$form._parsley.validate();
                return;
            }

            Meteor.call("shift/clock", _.extend(stamp(t), {
                    toggle: 'on',
                    shift: shiftName
                }),
                //callback is debug-only
                function(err, ret){
             console.log(ret);
             });
            t.$modal.modal('hide');
        }
    },

    'click .clock-off': function (e, t) {
        if (!t.$form._parsley.isValid()) return;

        var $link = $(e.currentTarget);
        var shift = t.data.shift;
        var shiftName = $link.data('shift');
        var prop =shiftName+'End';

        var diff = SH.Week.Time.spanInMinutes(shift[prop], SH.Week.Time.momentToHmmString());
        console.log(diff);

        if (diff<0) { //check if early
            _hideMainButton();
            _showEarlyDialog();
        } else if (diff>30) {         //check if late
            _hideMainButton();
            _showLateDialog();
        } else { //if ok
            if (t.$form._parsley && !t.$form._parsley.isValid()) {
                t.$form._parsley.validate();
                return;
            }

            Meteor.call("shift/clock", _.extend(stamp(t), {
                toggle: 'off',
                shift: shiftName
            }));
            t.$modal.modal('hide');
        }
    },

    'click .clock-on-confirm': function(e, t) { // handle click on second-step
        var $link = $(e.currentTarget);
        var shift = t.data.shift;
        var shiftName = $link.data('shift');

        if (t.$form._parsley && !t.$form._parsley.isValid()) {
            t.$form._parsley.validate();
            return;
        }

        Meteor.call("shift/clock/force", _.extend(stamp(t), {
            toggle: 'on',
            shift: shiftName
        }));
        t.$modal.modal('hide');
        console.log('confirm-on');

    },

    'click .clock-off-confirm': function(e, t) { // handle click on second-step
        var $link = $(e.currentTarget);
        var shift = t.data.shift;
        var shiftName = $link.data('shift');

        if (t.$form._parsley && !t.$form._parsley.isValid()) {
            t.$form._parsley.validate();
            return;
        }
        Meteor.call("shift/clock/force", _.extend(stamp(t), {
            toggle: 'on',
            shift: shiftName
        }));
        t.$modal.modal('hide');

        console.log('confirm-off');
    }
});

