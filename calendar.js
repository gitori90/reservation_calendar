
const dayNames = ['Sunday', 'Monday', 'Tuesday',
'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNames = ['January', 'February', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthNamesShort = ['Jan', 'Feb', 'Mar',
'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const today = new Date();
var selectedMonth = today.getMonth();

const originalCalendarHtml = $(".calendar-wrapper").html();

function assignArrowButtons(){

  $(".top-left-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth--;
    buildMonth(selectedMonth);
  });

  $(".top-right-arrow").on("click", function(){
    $(".calendar-wrapper").html(originalCalendarHtml);
    selectedMonth++;
    buildMonth(selectedMonth);
  });

}



function monthLastDay(monthNumber)
{
  let tempDate = new Date();
  tempDate.setMonth(monthNumber);
  var j = 28;

  tempDate.setDate(j)
  while (tempDate.getMonth() === monthNumber)
  {
    j++;
    tempDate.setDate(j);
  }

  return j - 1;
}


function buildFirstWeek(firstMonthDay, monthNumber)
{
  let tempDate = new Date();
  tempDate.setMonth(monthNumber);
  tempDate.setDate(-firstMonthDay);

  let lastDays = tempDate.getDate() + 1;
  for (let l = 0 ; l < firstMonthDay ; l++)
  {
    $(".week0").append("<td class='day prevMonth'>" + lastDays + "</td>");
    lastDays++;
  }
}

function finishLastWeek(numberDaysLeft, weekNumber)
{
  for (let i = 0 ; i < numberDaysLeft ; i++)
  {
    $(".week" + weekNumber).append("<td class='day nextMonth'>" + (i + 1) + "</td>");
  }
}


function buildMonth(monthNumber)
{
  assignArrowButtons();
  monthNumber = monthNumber % 12;
  var lastMonthDay = monthLastDay(monthNumber);
  var day = 1;
  let tempDate = new Date();
  tempDate.setMonth(monthNumber);
  tempDate.setDate(1);
  var firstMonthDay = tempDate.getDay();


  tempDate.setMonth(selectedMonth);
  $(".month-label").text(monthNames[monthNumber] + " " + tempDate.getFullYear());

  for(let j = 0 ; j < 7 ; j++)
  {
    $(".calendar").append("<tr class='week " + "week" +  j + "'></tr>");
    if(j === 0)
    {
      buildFirstWeek(firstMonthDay, monthNumber);
    }

    for(let i = 0 ; i < 7 ; i++)
    {
      $(".week" +  j).append("<td class='day'><b>" + day + "</b></td>");
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
}

buildMonth(selectedMonth);
