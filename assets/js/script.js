//create date variable
var dateDisplay = moment(new Date());
var hour = Number(dateDisplay.format("H"));

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
    $('.time-block').append('<li id='+ i +' class="row"><p class="hour col-1">' + i + 'AM</p><form></form><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
    } else {
    $('.time-block').append('<li id='+ i +' class="row"><p class="hour col-1">' + (i - 12) + 'PM</p><form></form><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
    };
  }
};

createLists();

//compare number value of id to hour and add classes
//for each list element
$("li").each(function() {
  //convert id of list element to a number
  var idCheck = Number($(this).attr('id'));
  //if current hour add red background
  if (idCheck === hour) {
    $(this).children('form').addClass('present col-10');
  }
  //if hour is in the past grey background
  else if (idCheck < hour) {
    $(this).children('form').addClass('past col-10');
  }
  //if future hour green background
  else {
    $(this).children('form').addClass('future col-10');
  };
});
