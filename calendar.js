
const dayNames = ['Sunday', 'Monday', 'Tuesday',
'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNames = ['January', 'February', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthNamesShort = ['Jan', 'Feb', 'Mar',
'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const today = new Date();
var selectedMonth = today.getMonth();
var selectedYear = today.getFullYear();
var reservedDays = [];

const originalCalendarHtml = $(".calendar-wrapper").html();

function formatDateDayMonth(num)
{
  if (num < 10)
  {
    num = "0" + num.toString();
  }

  return num.toString();
}

function removeElementFromArray(element, array)
{
  let matchIndex = array.indexOf(element);
  if (matchIndex === -1){}
  else
  {
    array.splice(matchIndex, 1);
  }

  return array
}

function toggleReservedDay(dateID)
{
  if (reservedDays.includes(dateID))
  {
    reservedDays = removeElementFromArray(dateID, reservedDays);
  }
  else
  {
    reservedDays.push(dateID);
  }
}



function assignArrowButtons()
{
  $(".top-left-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth--;
    if (selectedMonth < today.getMonth() - 1)
    {
      selectedMonth = today.getMonth() - 1;
    }
    buildMonth(selectedMonth);
  });

  $(".top-right-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth++;
    buildMonth(selectedMonth);
  });
}



function monthLastDay(selectedMonth)
{
  let tempDate = new Date();
  tempDate.setMonth(selectedMonth);
  var j = 28;
  var monthNumber = selectedMonth % 12;

  tempDate.setDate(j)
  while (tempDate.getMonth() === monthNumber)
  {
    j++;
    tempDate.setDate(j);
  }

  return j - 1;
}


function buildFirstWeek(selectedMonth)
{
  let tempDate = new Date();
  tempDate.setMonth(selectedMonth);
  tempDate.setDate(1);
  var firstMonthDay = tempDate.getDay();

  tempDate.setDate(-firstMonthDay);

  let monthNumber = tempDate.getMonth();
  let yearNumber = tempDate.getFullYear();
  let lastDays = tempDate.getDate() + 1;

  for (let l = 0 ; l < firstMonthDay ; l++)
  {
    let day = formatDateDayMonth(lastDays)
    let month = formatDateDayMonth(monthNumber + 1);

    $(".week0").append("<td class='day prevMonth' id="
    + day + month + yearNumber.toString() + ">" + lastDays + "</td>");
    lastDays++;
  }
}

function finishLastWeek(numberDaysLeft, weekNumber)
{
  let tempDate = new Date();
  tempDate.setMonth(selectedMonth + 1);
  let monthNumber = tempDate.getMonth();
  let yearNumber = tempDate.getFullYear();

  for (let i = 0 ; i < numberDaysLeft ; i++)
  {
    let day = formatDateDayMonth(i + 1);
    let month = formatDateDayMonth(monthNumber + 1);

    $(".week" + weekNumber).append("<td class='day nextMonth' id="
    + day + month + yearNumber.toString() + ">" + (i + 1) + "</td>");
  }
}

function buildMonth(monthNumber)
{
  assignArrowButtons();
  monthNumber = monthNumber % 12;
  var lastMonthDay = monthLastDay(selectedMonth);
  var day = 1;
  let tempDate = new Date();
  tempDate.setMonth(monthNumber);
  tempDate.setDate(1);
  var firstMonthDay = tempDate.getDay();

  tempDate.setMonth(selectedMonth);
  selectedYear = tempDate.getFullYear();
  $(".month-label").text(monthNames[monthNumber] + " " + selectedYear);


  for(let j = 0 ; j < 7 ; j++)
  {
    $(".calendar").append("<tr class='week " + "week" +  j + "'></tr>");
    if(j === 0)
    {
      buildFirstWeek(selectedMonth);
    }

    for(let i = 0 ; i < 7 ; i++)
    {
      $(".week" +  j).append("<td class='day day-available' "
      + "id=" + formatDateDayMonth(day) + formatDateDayMonth(monthNumber + 1) + selectedYear.toString() + "><b>" + day + "</b></td>");
      day++;

      if ($(".week" + j)[0].cells.length >= 7)
      {
        break;
      }

      if (day > lastMonthDay)
      {
        var numberDaysLeft = 6 - i;
        finishLastWeek(numberDaysLeft, j);
        j = 9; /* to break the outer loop */
        break;
      }
    }
  }

  for(let i = 0 ; i < reservedDays.length ; i++)
  {
    $("#" + reservedDays[i]).addClass("day-chosen");
  }

  $(".day-available").on("click",
  function(){
    $(this).toggleClass("day-chosen");
    toggleReservedDay(this.id)
    console.log(reservedDays);
  });
}

buildMonth(selectedMonth);
