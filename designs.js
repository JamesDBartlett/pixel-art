// ------------ VARIABLES & OBJECTS --------------
// grid object
var grid = {
  height: "",
  width: "",
  color: "#000000",
  data: [[]], // for future use
}
// -----------------------------------------------


// ----------------- FUNCTIONS -------------------
// create table with height of grid.height and width of grid.width
function makeGrid() {
  for(var i = 0; i < grid.height; i++){
    var row = $("<tr></tr>");
    for(var j = 0; j < grid.width; j++){
      var cell = $("<td></td>").attr('id', i + "_" + j);
      row.append(cell);
    }
    $('#pixelCanvas').append(row);
  }
}
// convert rgb to hex (snippet from https://jsfiddle.net/Mottie/xcqpF/1/light/)
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

// -----------------------------------------------


// ------- GRID ATTRIBUTES EVENT HANDLERS --------
// when user changes grid height, store value in grid.height
$('#inputHeight').change(function(event){
  grid.height = Math.round($(this).val()); //rounds off decimals
});
// when user changes grid width, store value in grid.width
$('#inputWidth').change(function(event){
  grid.width = Math.round($(this).val()); //rounds off decimals
});
// when user changes grid color, store value in grid.color
$('#colorPicker').change(function(event){
  grid.color = $(this).val();
});
// -----------------------------------------------


// -------- CELL CLICK EVENT HANDLER -------------
$(document).on('click', 'td', function(){
  var color = rgb2hex($(this).css('background-color'));
  console.log("Pixel Color: " + color);
  console.log("Grid Color: " + grid.color);
  if(color != grid.color){
    $(this).css('background-color', grid.color);
  }
  else{
    $(this).css('background-color', '#ffffff');
  }
});
// -----------------------------------------------


// -------- FORM SUBMIT EVENT HANDLER ------------
// when user submits form...
$('#sizePicker').submit(function(event){
  event.preventDefault(); // prevent default form action
  $('#pixelCanvas').children().remove(); // clear previous grid
  makeGrid(); // call the makeGrid function
});
// -----------------------------------------------
