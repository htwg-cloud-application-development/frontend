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
})(jQuery);