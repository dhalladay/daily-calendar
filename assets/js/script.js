//create date variable
var dateDisplay = moment(new Date());
var savedDate = dateDisplay.format("MM/DD/YYYY");
var hour = Number(dateDisplay.format("H"));
var schedule = {};


//check for schedule array in localStorage and update variable
var loadSchedule = function() {
  schedule = JSON.parse(localStorage.getItem("schedule"));
  console.log(schedule[0].daySched === savedDate);

  if (!schedule) {
    schedule = 0;
    return schedule;
  } else if (schedule[0].daySched != savedDate) {
    schedule = 0;
    return schedule;
  }
};

loadSchedule();

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
  if (schedule === 0) {
    //start at 9 so that I can verify time based on list id
    for(var i = 9; i < 18; i++) {
      //if statement to convert 24 hour time units to 12 hour with AM and PM
      if (i < 13) {
      $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-sm-2 col-lg-1 pr-1">' + i + 'AM</h4><p></p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
      } else {
      $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-sm-2 col-lg-1 pr-1">' + (i - 12) + 'PM</h4><p></p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
      };
    }
  } else {
    //create lists with schedule notesSched as paragraph text
    for(var i = 9; i < 18; i++) {
      //if statement to convert 24 hour time units to 12 hour with AM and PM
      if (i < 13) {
      $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-sm-2 col-lg-1 pr-1">' + i + 'AM</h4><p>' + schedule[(i-9)].notesSched + '</p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
      } else {
      $('.time-block').append('<li id='+ i +' class="row"><h4 class="hour col-sm-2 col-lg-1 pr-1">' + (i - 12) + 'PM</h4><p>' + schedule[(i-9)].notesSched + '</p><button class="saveBtn col-1"><i class="fas fa-save"></i></button></li>')
      };
    }

  }
}

createLists();

//compare number value of id to hour and add classes
var timeCheck = function () {
    //for each list element
    $("li").each(function() {
    //convert id of list element to a number
    var idCheck = Number($(this).attr('id'));
    //if current hour add red background
    if (idCheck === hour) {
      $(this).children('p').addClass('present col-sm-9 col-lg-10');
    }
    //if hour is in the past grey background
    else if (idCheck < hour) {
      $(this).children('p').addClass('past col-sm-9 col-lg-10');
    }
    //if future hour green background
    else {
      $(this).children('p').addClass('future col-sm-9 col-lg-10');
    };
  });
};

timeCheck();

//hour row was clicked
$(".row").on("click", "p", function() {
  var text = $(this)
  .text()
  .trim();

  //replace <p> with <textarea> so events/tasks can be added
  var textInput=$("<textarea>").addClass("schedule-enter col-10").val(text);
  $(this).replaceWith(textInput);

  textInput.trigger("focus");
}); 

//create event listener for leaving textarea
$(".row").on("blur", "textarea", function() {
  var text = $(this).val();
  //create <p> variable
  var eventForm = $("<p>")
    .text(text);
  //replace <textarea> with <p> and then update hour classes and save into localStorage
  $(this).replaceWith(eventForm);
  timeCheck();
  saveEvent();
});

//create event listener on save button
$("li").on("click", "button", (function() {
  saveEvent();
}));

//create save event variable
var saveEvent = function() {
  //clear local storage so that only one schedule array will exist
  localStorage.clear();

  var tempSched = [];

  //create variable to as temporary schedule array
  $("li").each(function() {
    tempSched.push({
      daySched: savedDate,
      hourSched: Number ($(this)
      .closest(".row")
      .attr('id')),
      notesSched: $(this)
      .children('p')
      .text()
      .trim()
    });
  });
  //set temporary array as schedule object saved in localStorage
  localStorage.setItem("schedule", JSON.stringify(tempSched));
};


