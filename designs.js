// ------------ VARIABLES & OBJECTS --------------
// grid object
var grid = {
  height: "",
  width: "",
  color: "",
  // data: [[]], to store
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



// -------- FORM SUBMIT EVENT HANDLER ------------
// when user submits form...
$('#sizePicker').submit(function(event){
  event.preventDefault(); // prevent default form action
  $('#pixelCanvas').children().remove();
  makeGrid(); // call the makeGrid function
});
// -----------------------------------------------
