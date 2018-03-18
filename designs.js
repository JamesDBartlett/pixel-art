// -------- DECLARE VARIABLES & OBJECTS ----------
// declare grid object
var g = {
  dim: [], // grid dimensions
  dat: [], // grid data
  c: [], // grid color
}

// -----------------------------------------------


// -------------- DECLARE FUNCTIONS --------------
// create table with height of g.dim[0] and width of g.dim[1]
function makeGrid() {

}

// -----------------------------------------------


// ------- GRID DIMENSIONS EVENT HANDLERS --------
// when user changes grid height, store value in g.dim[0]
$('#inputHeight').change(function(event){
  g.dim[0] = $(this).val();
});
// when user changes grid width, store value in g.dim[1]
$('#inputWidth').change(function(event){
  g.dim[1] = $(this).val();
});
// -----------------------------------------------


// -------- FORM SUBMIT EVENT HANDLER ------------
// when user submits form...
$('#sizePicker').submit(function(event){
  event.preventDefault(); // prevent default form action and
  makeGrid(); // call the makeGrid function
});
// -----------------------------------------------
