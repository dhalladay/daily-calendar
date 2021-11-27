//create date variable
var dateDisplay = moment(new Date());
var hour = Number(dateDisplay.format("H"));
var tasks = {};

//insert date function
var insertDate = function() {
  //create day of week and formatted dates
  var day = dateDisplay.format("dddd");
  var dateMDY = dateDisplay.format("MMMM Do");
  //insert date
  $("#currentDay").text(day + ", " + dateMDY);
};

insertDate();

//create lists
var createLists = function() {
  //start at 9 so that I can verify time based on list id
  for(var i = 9; i < 18; i++) {
    //if statement to convert 24 hour time units to 12 hour with AM and PM
    if (i < 13) {
    $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-1">' + i + 'AM</h4><p></p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
    } else {
    $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-1">' + (i - 12) + 'PM</h4><p></p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
    };
  }
};

createLists();

//compare number value of id to hour and add classes
var timeCheck = function () {
    //for each list element
    $("li").each(function() {
    //convert id of list element to a number
    var idCheck = Number($(this).attr('id'));
    //if current hour add red background
    if (idCheck === hour) {
      $(this).children('p').addClass('present col-10');
    }
    //if hour is in the past grey background
    else if (idCheck < hour) {
      $(this).children('p').addClass('past col-10');
    }
    //if future hour green background
    else {
      $(this).children('p').addClass('future col-10');
    };
  });
};

timeCheck();

//hour was clicked
$(".row").on("click", "p", function() {
  var text = $(this)
  .text()
  .trim();

  var textInput=$("<textarea>").addClass("schedule-enter col-10").val(text);
  $(this).replaceWith(textInput);

  textInput.trigger("focus");
}); 

$(".row").on("blur", "textarea", function() {
var text = $(this).val();

var eventForm = $("<p>")
  .text(text);

$(this).replaceWith(eventForm);
timeCheck();
});
