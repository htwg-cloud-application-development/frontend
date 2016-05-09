(function ($) {

  var $element = $('.js-course-filter').focus();
  filter($element.val());

  $element.keyup(function() {
    var term = $(this).val();
    filter(term);
  });

  function filter(term) {
    $.each($('.panel-group .panel-title a'), function () {

      var $element = $(this);
      var $panel = $element.closest('.panel');
      var text = $.trim($element.text()).toLocaleLowerCase();

      if (text.indexOf(term.toLocaleLowerCase()) >= 0) {
        $panel.show();
      } else {
        $panel.hide();
        $panel.find('.panel-collapse.in').collapse('hide');
      }
    });
  }

  $("table").tablesorter({
    // this will apply the bootstrap theme if "uitheme" widget is included
    // the widgetOptions.uitheme is no longer required to be set
    theme : "bootstrap",

    widthFixed: true,

    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!

    // widget code contained in the jquery.tablesorter.widgets.js file
    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
    widgets : [ "uitheme", "filter", "zebra" ],

    widgetOptions : {
      // using the default zebra striping class name, so it actually isn't included in the theme variable above
      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
      zebra : ["even", "odd"],

      // reset filters button
      filter_reset : ".reset",

      // extra css class name (string or array) added to the filter element (input or select)
      filter_cssFilter: "form-control"

    }
  });
})(jQuery);