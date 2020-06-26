




for(let j = 0 ; j < 6 ; j++)
{
  $(".calendar").append("<tr class='week " + "week" +  j + "'>test</tr>");

  for(let i = 0 ; i < 7 ; i++)
  {
    $(".week" +  j).append("<td class='week'>test</td>");
  }
}
