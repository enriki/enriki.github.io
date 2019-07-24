// Main menu scroll to section
$(".main-menu a").click(function(e) {
  e.preventDefault();

  let $href = $(this).attr("href");
  $("html, body").animate({ scrollTop: $($href).offset().top - 150 });
});

// Mobile Menu Dropdown
$(".mobile-menu-icon").click(function(e) {
  e.preventDefault();
  $(".main-menu").slideToggle(300);
});

// Date of Birthday selectbox
let date = new Date();
for (var i = 18; i <= 100; i++) {
  var yearOfBirth = date.getFullYear() - i;
  $("#select").append(
    '<option value="' + yearOfBirth + '">' + yearOfBirth + "</option>"
  );
}

// Checkbox
$(".list__item").click(function() {
  $(this).toggleClass("active");
  $(this)
    .find(".list__checkbox")
    .attr("checked", function(index, attr) {
      return !attr;
    });
});

// Range slider
let inputType = "";

if (isIE()) inputType = "change";
else inputType = "input";

$("#range_slider").on(inputType, function() {
  let value = 100 - $(this).val();
  $("#range_progress").css("width", value + "%");

  if ($(window).width() < 768) {
    $(".mobile-mark").fadeOut(500, function() {
      if (value === 100) {
        $(this).text("Не владею");
      } else if (value >= 50 && value < 75) {
        $(this).text("Использую готовые решения и умею переделывать");
      } else if (value >= 75) {
        $(this).text(" Использую готовые решения");
      } else {
        $(this).text("Пишу сложный JS с нуля");
      }
      $(this).fadeIn(500);
    });
  }
});

// Form sending
$(".btn-submit").click(function() {
  console.log($(".container").serializeForm());
});

// isIE check function
function isIE() {
  var userAgent = navigator.userAgent;
  return (
    userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1
  );
}
