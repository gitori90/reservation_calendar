
const dayNames = ['Sunday', 'Monday', 'Tuesday',
'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const monthNames = ['January', 'February', 'March', 'April',
'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthNamesShort = ['Jan', 'Feb', 'Mar',
'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


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


function buildFirstWeek(firstMonthDay)
{
  for (let l = 0 ; l < firstMonthDay ; l++)
  {
    $(".week0").append("<td class='week prev'></td>");
  }
}


function buildMonth(monthNumber)
{
  var lastMonthDay = monthLastDay(monthNumber);
  var day = 1;
  let tempDate = new Date();
  tempDate.setMonth(monthNumber);
  tempDate.setDate(1);
  var firstMonthDay = tempDate.getDay();

  for(let j = 0 ; j < 6 ; j++)
  {
    $(".calendar").append("<tr class='week " + "week" +  j + "'></tr>");
    if(j === 0)
    {
      buildFirstWeek(firstMonthDay);
    }

    for(let i = 0 ; i < 7 ; i++)
    {
      $(".week" +  j).append("<td class='week'>" + day + "</td>");
      day++;

      if ($(".week" + j)[0].cells.length >= 7)
      {
        break;
      }

      if (day > lastMonthDay)
      {
        j = 7; /* to break the outer loop */
        break;
      }
    }
  }

}

buildMonth(5);




function buildCalendar()
{
  const today = new Date();
  let dayNow = dayNamesShort[today.getDay()];
  let monthNow = monthNames[today.getMonth()];
  let yearNow = today.getFullYear();


}
