// global variables

var dayStarts = moment("6:00am","h:mma")
var forms = $(".container").children('form');
var textAreas = $(".container").children('form').children("textarea");
var hourInterval = $(".container").children('form').children("label").children(".custom-hourBlock");

// current (live) date and time using moment(). 
let renderClock = function() {
    var today = moment().format("MMMM Do YYYY, h:mm:ss");
    $("#currentDay").text(today);  
}

// Setting background color for each hour block depends on the moment: (Past, Present or Future)
for (let i = 0; i < hourInterval.length; i++) {
    // populate scheduler with hours in hour blocks 

    var currentHour = dayStarts.clone().add(i, "hour");
      
    $(hourInterval[i]).text(currentHour.format("h:mma"));
    
    if (moment(currentHour, "hh").isBefore(moment(),"hour")) {
        $(textAreas[i]).addClass("past");
    }
    if (moment(currentHour, "hh").isSame(moment(), "hour")) {
        $(textAreas[i]).addClass("present");
    } 
    if (moment(currentHour, "hh").isAfter(moment(), "hour")) {
        $(textAreas[i]).addClass("future");
    }
}

// save input events to local storage when button clicks
function saveToLocalStorage(event) {
    // prevent defaults ( always necessary in click button)
    event.preventDefault();
    var textAreasSavedEl = [];
    
    allTextAreas = $("textarea[name='inputEvent']")
    // Collect any input and save in the text area
    allTextAreas.each(function(){
        textAreasSavedEl.push(this.value)
    })
    // Save to local storage with JSON.stringify method

    localStorage.setItem("events", JSON.stringify(textAreasSavedEl))
}

// populate scheduler when page loads with any previous saved events
function renderLastEvents(){
    // collect saved data from local storage

    var lastEvents = JSON.parse(localStorage.getItem("events"))
    console.log(lastEvents);
     let allTextAreas = $("textarea[name='inputEvent']")

    // put saved events back to scheduler using for loop
    if (lastEvents == null){
        return
    } else{
        for(let i=0; i < lastEvents.length; i++){
        allTextAreas[i].value = lastEvents[i];
        };
    }
};

//  When page first loads function loads and time interval of 1s starts this will dynamically update on the page
renderClock();
setInterval(renderClock,1000);
renderLastEvents();

// Event listening when a user creats a tast on the form
forms.on("submit", saveToLocalStorage);