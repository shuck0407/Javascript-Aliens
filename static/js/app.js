
function TableBuilder(tabledata) {

  let tbody = d3.select("tbody");

  filteredData = tabledata.forEach(function(newTable) {
    var row = tbody.append("tr");

   Object.entries(newTable).forEach(function([key, value]) {
       var cell = tbody.append("td");
       cell.text(value);
       });
   }); 
  
  };

function filterData(loaded_dict) {

  //set the filteredData object equal to the original table data
  let filteredData = tableData;

  //make sure the user-entered filter fields are correct
  console.log(loaded_dict);
   
  //iterate over the filter fields in loaded_dict and extract rows from
  // the original dataset that match the filters
  Object.entries(loaded_dict).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
    
  });

  //remove the exising table
  let table = d3.select("table"); 
  let td = table.select("tbody").selectAll("td");
  let tdDelete = td.remove();
  let tr = table.select("tbody").selectAll("tr")
  let trDelete = tr.remove();
  trDelete.exit().remove();

  //make sure the data got filtered correctly
  console.log(filteredData);

  // render the filtered table data
  TableBuilder(filteredData);

};

function buttonClick() {

  //This function runs when the user clicks on the "Filter" button
  
  //Initialize the dictionaries that hold the filter fields
  var filter_dict = {};
  var loaded_dict = {};
  
  // Select the filter elements and get the raw HTML node
  let filterDate = d3.select("#date");
  let filterCity = d3.select("#city");
  let filterState = d3.select("#state");
  let filterCountry = d3.select("#country");
  let filterShape = d3.select("#shape");

  // Get the value property of the input element
  let inputDate = filterDate.property("value");
  let inputCity = filterCity.property("value");
  let inputState = filterState.property("value");
  let inputCountry = filterCountry.property("value");
  let inputShape = filterShape.property("value");

  // Put all of the filter criteria into an array
  filter_dict = {datetime : inputDate, 
                      city : inputCity, 
                      state : inputState, 
                      country : inputCountry, 
                      shape : inputShape};

    //now create another dictionary that has only filters with values in it.
    //we don't want to iterate over the data for empty filters because it
    //is a waste of time.

  Object.entries(filter_dict).forEach(([key, value]) => {
    if (value) {
      loaded_dict[key] = value;
    };
  });

  //make sure the user-entered filter fields are correct
  console.log(loaded_dict);
  
  //run the filterData function to render only the filtered data
  filterData(loaded_dict);
  
};

function clearFilters(oForm) {

  //This function runs when the user clicks on the "Clear Filters" button.

  //set all of the form fields to null
  var elements = oForm.elements; 
  oForm.reset();
  for(i=0; i<elements.length; i++) {
    field_type = elements[i].type;
    if (field_type == "text") {
         elements[i].value = ""; 
    };
     
  };
  
  //Initialize the dictionaries that hold the filter values
  var filter_dict = {};
  var loaded_dict = {};
  
  //redraw the table with the original data
  var tableData = data;
  TableBuilder(tableData);
};


//THIS IS THE BEGINNING OF THE PROGRAM EXECUTION (STEP 1)

// Initialize the tabledata variable with the entire table
var tableData = data;

// Initialize a variable to hold the filters
var filter_dict = {};
var loaded_dict = {};

//render the table for the first time
TableBuilder(tableData);
