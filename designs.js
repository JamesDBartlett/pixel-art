// ------------ VARIABLES & OBJECTS --------------
// declare grid object
var grid = {
  height: "100", // set default height to 20 cells
  width: "100", // set default width to 20 cells
  color: "#000000", // set default color to black
  data: {} // create an empty data object for storing individual cell color values
}
// declare eraser boolean
var erase = false;
// -----------------------------------------------


// ----------------- FUNCTIONS -------------------
// create a table with height of grid.height and width of grid.width
function makeGrid(restore){ // 'restore' argument: 0 = no, and all other values = yes
  $('#pixelCanvas').children().remove(); // clear previous grid
  if(restore == 0){ // if 'restore' is off, get grid dims from input boxes
    grid.height = Math.round($('#inputHeight').val()); // round off any decimals
    grid.width = Math.round($('#inputWidth').val()); // ditto
  }
  for(var i = 0; i < grid.height; i++){ // loop to create rows
    var row = $("<tr></tr>");
    for(var j = 0; j < grid.width; j++){ // loop to create cells within rows
      // formula for each cell w/ grid coordinates in the "id" attribute
      var cell = $("<td></td>").attr('id', i + "_" + j);
      // create each cell in the row
      row.append(cell); // create row of cells
      if(restore == 0){ // if 'restore' is off, leave cells blank and
        grid.data[cell.attr('id')] = ""; // store empty value to grid.data
      }
      else{ // if 'restore' is on, cell color = retrieved value from grid.data
        $(cell).css('background-color', grid.data[cell.attr('id')])
      }
    }
    $('#pixelCanvas').append(row);
  }
}

$(makeGrid);

// -----------------------------------------------


// ------- GRID ATTRIBUTES EVENT HANDLERS --------
// when user changes grid color, store value in grid.color
$('#colorPicker').change(function(event){
  grid.color = $(this).val();
});
// -----------------------------------------------


// -------- CELL CLICK EVENT HANDLER -------------
$('#pixelCanvas').on('click mousedown mouseover', 'td', function(e){ // when user clicks on a cell
  if(e.buttons === 1){
    var cellColor = rgb2hex($(this).css('background-color')); // cellColor = current cell color
    var cellID = $(this).attr('id'); // cellID = id attribute of current cell
    if(cellColor != grid.color){ // if cellColor isn't the same as grid.color
      $(this).css('background-color', grid.color); // "Make it so." -Picard
      grid.data[cellID] = grid.color; // and set current cell's grid.data value to grid.color
    }
    else{ // otherwise
      $(this).css('background-color', ""); // change the cell color to blank
      grid.data[cellID] = ""; // and set the cell's grid.data value to blank as well
    }
  }
});
// -----------------------------------------------


// ----------- BUTTON EVENT HANDLERS -------------
$('#sizePicker').submit(function(event){ // when user submits form
  event.preventDefault(); // prevent default form action
  grid.data = {} // clear all fields from grid.data object
  // call the makeGrid function with 'restore' argument set to 0 for 'no'
  makeGrid(0);
});
$('#save').click(function(event){ // when user clicks 'save' button
  storeGrid(); // call storeGrid function
});
$('#restore').click(function(event){
  restoreGrid(); // call restoreGrid function
});
// ------------------------------------------------


// -------- LOCALSTORAGE EVENT HANDLERS -----------

// when user clicks "Save" button...
function storeGrid(){
  // save current grid configuration to local storage
  localStorage.setItem("gridHeight", grid.height);
  localStorage.setItem("gridWidth", grid.width);
  localStorage.setItem("gridData", JSON.stringify(grid.data));
  alert('Saved! To retrieve your saved pixel art, click \"Restore.\" ');
}

// when user clicks "Restore" button...
function restoreGrid(){
  // pull grid height & width values from local storage
  grid.height = localStorage.getItem("gridHeight");
  grid.width = localStorage.getItem("gridWidth");
  grid.data = JSON.parse(localStorage.getItem("gridData"));
  // call makeGrid function with 'restore' argument set to 1 for 'yes'
  makeGrid(1);
}

// -------------------------------------------------


// ------------ 3rd PARTY CODE SNIPPETS ------------
/*
Notice: The following contains code snippets from various 3rd party sources.
I've made extensive modifications in order to meet the needs of this project, but I will still cite the source of each snippet to give credit to its author(s).
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

// Random NASA background image
// Credit: izaprzy
// Source: https://github.com/izaprzy/NASA-API-Images/blob/master/js/app.js
// Code can be found in the "nasa.js" file.

// -------------------------------------------------
