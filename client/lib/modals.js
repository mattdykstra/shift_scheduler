SH.Modals = {};

Meteor.startup(function () {
});
window.ParsleyValidator
    .addValidator('laterthan', function (value, fieldname) {
        var valStart = $('input[name=' + fieldname + ']').val();
        if (!valStart || !value) return true;
        var ret = SH.Week.Time.spanInMinutes(valStart, value);
        return (ret && ret > 0);
    })
    .addValidator('beforethan', function (value, fieldname) {
        var valEnd = $('input[name=' + fieldname + ']').val();
        if (!valEnd || !value) return true;
        var ret = SH.Week.Time.spanInMinutes(value, valEnd);
        return (ret && ret > 0);

    }).
    addValidator('thenfillend', function (value, fieldname) {
        var valEnd = $('input[name=' + fieldname + ']').val();
        if (value) return valEnd ? true : false;
        else return true;
    }).
    addValidator('thenfillstart', function (value, fieldname) {
        var valStart = $('input[name=' + fieldname + ']').val();
        if (value) return valStart ? true : false;
        else return true;
    }).
    addMessage(
    "en",
    "laterthan",
    'Shift should end after it starts')
    .addMessage(
    "en",
    "beforethan",
    'Shift should start before it ends')
    .addMessage(
    "en",
    "thenfillend",
    'Fill end field, too')
    .addMessage(
    "en",
    "thenfillstart",
    'Fill start field, too');


