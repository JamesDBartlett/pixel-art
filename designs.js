// ------------ VARIABLES & OBJECTS --------------
// declare grid object
var grid = {
  height: "20",
  width: "20",
  color: "#000000",
  data: {}
}
// -----------------------------------------------


// ----------------- FUNCTIONS -------------------
// create table with height of grid.height and width of grid.width
function makeGrid() {
  $('#pixelCanvas').children().remove(); // clear previous grid
  for(var i = 0; i < grid.height; i++){ // loop to create rows
    var row = $("<tr></tr>");
    for(var j = 0; j < grid.width; j++){ // loop to create cells within rows
      // formula for each cell w/ grid coordinates in the "id" attribute
      var cell = $("<td></td>").attr('id', i + "_" + j);
      // create each cell in the row
      row.append(cell);
      grid.data[cell.attr('id')] = "";
    }
    $('#pixelCanvas').append(row);
  }
}


// -----------------------------------------------


// ------- GRID ATTRIBUTES EVENT HANDLERS --------
// when user changes grid height, store value in grid.height
$('#inputHeight').change(function(event){
  grid.height = Math.round($(this).val()); //round off decimals
});
// when user changes grid width, store value in grid.width
$('#inputWidth').change(function(event){
  grid.width = Math.round($(this).val()); //round off decimals
});
// when user changes grid color, store value in grid.color
$('#colorPicker').change(function(event){
  grid.color = $(this).val();
});
// -----------------------------------------------


// -------- CELL CLICK EVENT HANDLER -------------
$(document).on('click', 'td', function(){
  var cellColor = rgb2hex($(this).css('background-color'));
  var cellID = $(this).attr('id');
  if(cellColor != grid.color){
    $(this).css('background-color', grid.color);
    grid.data[cellID] = grid.color;
  }
  else{
    $(this).css('background-color', '#ffffff');
    grid.data[cellID] = "#ffffff";
  }
});
// -----------------------------------------------


// -------- FORM SUBMIT EVENT HANDLER ------------
// when user submits form...
$('#sizePicker').submit(function(event){
  event.preventDefault(); // prevent default form action
  grid.data = {} // clear all fields from grid.data object
  makeGrid(); // call the makeGrid function
});
// -----------------------------------------------


// -------- LOCALSTORAGE EVENT HANDLERS ----------
// when user clicks "Save" button...
function saveGrid(){
  // save current grid configuration to local storage
  localStorage.setItem("gridHeight", grid.height);
  localStorage.setItem("gridWidth", grid.width);
  localStorage.setItem("gridData", JSON.stringify(grid.data));
}
// when user clicks "Restore" button...
function retrieveGrid(){
  // pull grid.data from local storage
  grid.height = localStorage.getItem("gridHeight");
  grid.width = localStorage.getItem("gridWidth");
  grid.data = JSON.parse(localStorage.getItem("gridData"));
  makeGrid();

  // fill grid with values from grid.data

}

// -----------------------------------------------


// ---------- 3rd PARTY CODE SNIPPETS ------------
/*
The following code snippets were copied from various 3rd party sources.
Full credit for their authorship shall be given when/wherever it is due.
*/

// CONVERT RGB TO HEX
// Credit: Mottie
// Source: https://jsfiddle.net/Mottie/xcqpF/
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}


// -----------------------------------------------
