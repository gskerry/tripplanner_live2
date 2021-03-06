var days = [];
var currentDay;
var currentDayId;

var $addDay = $('#add-day')
var $dayTitle = $('#day-title span:first')

var switchCurrentDay = function(day, $dayBtn) {
  clearMap()
  currentDay = day

  $dayTitle.text('Day ' + day.dayNum)
  $('.day-btn').removeClass('current-day')
  $dayBtn.addClass('current-day')

  // wipe current itenerary and replace with a clone of a new template
  $("#itinerary").html(templates.get('itinerary'))

  // loop through the model, and call `addItemToList` once for each activity
  addItemToList('hotel', currentDay.hotel)

  currentDay.restaurants.forEach(function(r) {
    addItemToList('restaurants', r)
  })

  currentDay.thingsToDo.forEach(function(t) {
    addItemToList('thingsToDo', t)
  })
}

$addDay.on('click', function() {
  //"model-y"
  var newDay = {
    number: days.length + 1,
    hotel: null,
    restaurants: [],
    thingsToDo: [],
  }

  days.push(newDay);

  // var num = newDay.number

  //Add a new day to the DaySchema using Mongoose

  $.ajax({
    type: 'POST',
    url: '/days',
    data: {
      number: newDay.number
      // hotel: ,
      // restaurants: ,
      // thingsToDo:
    },
    success: function (responseData) {
        console.log(responseData);
    }
  });

  var dayId;

  $.ajax({
      type: 'GET',
      url: '/days/'+newDay.number,
      /*data: {
        number: newDay.number
        // hotel: ,
        // restaurants: ,
        // thingsToDo:
      },*/
      success: function (responseData) {
          dayId = responseData;
          console.log("OMG THE ID IS " + dayId);

          var newDayBtn = templates.get('day-btn')
          .text(newDay.number)
          .attr("data-id", dayId)
          .insertBefore($addDay)
          .on('click', function() {
            switchCurrentDay(newDay, $(this))
            currentDayId = $(this).attr('data-id')
            console.log("THE CURRENT DAY IS: ",currentDayId);
          })

        switchCurrentDay(newDay, newDayBtn)

      }
    });

/*  var newDayBtn = templates.get('day-btn')
    .text(newDay.number)
    .attr("data-id", dayId)
    .insertBefore($addDay)
    .on('click', function() {
      switchCurrentDay(newDay, $(this))
    })

  switchCurrentDay(newDay, newDayBtn)*/
})



