d3.csv("https://raw.githubusercontent.com/TasniaHussain/MPP/main/movies.csv").then(function (data, event) {
//d3.csv("movies.csv").then(function (data, event) {
var movies = data;
var button = d3.select("#button");
var form = d3.select("#form");
button.on("click", runEnter);
form.on("submit", runEnter);

console.log(movies);

// Adding names to autofill-list
var names_list = d3.select("#names_list");
var names;
var current_name;

// Loop through all the values in 'movies'
for (var movies_index = 0; movies_index < movies.length; movies_index++){

    names = movies[movies_index].actors.split(",");

    // Loop through all the names in 'movies'
    for (var names_index = 0; names_index < names.length; names_index++){

        current_name = names[names_index];

        // Add each name to the list
        names_list.insert("option").attr("value", current_name);
    }
}

// Defining the function
function runEnter() {

// This line of code selects the <tbody> from the html and clears it. If this is not used, then the results would appear on top of the previous result.
d3.select("tbody").html("") 

// This code is needed to prevent the page from reloading.
//d3.event.preventDefault(); 

// This code will get the user's input from what the user will type in the html <input> since we assigned it the "user-input" id. It will get the value and store it in our inputValue variable
var inputValue = d3.select("#user-input").property("value");

// This code will filter the movies looking at the actors column. It will store the values when there is a match from the text sequence the user entered and the text from our actors column from the CSV data.
var filteredMovies = 
movies.filter(movies => movies.actors.toLowerCase().split(',').includes(inputValue.toLowerCase()));
console.log(filteredMovies);

// This was the easiest approach I found to sort the results by a different column in descending order. I had to include a new script in my head to use the _.sortBy 
//This is the script:  
//<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
var output = _.sortBy(filteredMovies, 'avg_vote').reverse();
if (output.length === 0) {
    d3.select("tbody").insert("tr").html( 
        `<td colspan=3> We currently don't have information on this MP. Email us at <a href="mailto:info@emailsforpalestine.ca">info@emailsforpalestine.ca</a> so we can update their record. </td>` );
}

// Once I had all the values in my output variable, all I needed was to loop through them and add them to the table one by one. This was done using d3, where I inserted the value for each one of the columns I wanted using the necessary html to fit each table row.
for (var i = 0; i < filteredMovies.length; i++) { //outer
    if ((output[i]['Type']) === "Red") {//first
        d3.select("tbody").insert("tr").html( 
            "<td>" + [i+1] + "</td>" +
            '<td style="color:white; background-color: darkred; font-size: 14pt; font-weight: bold"> <a href="' + (output[i]['Source']) + '">' + "<u>" + (output[i]['original_title'])+ "</u> </a>");
    }//first end
    else {//second
        d3.select("tbody").insert("tr").html( 
        "<td>" + [i+1] + "</td>"+
        '<td style="color:white; background-color: green; font-size: 14pt; font-weight: bold">' + (output[i]['original_title'])+"</td>" + 
        '<td > <a href="' + (output[i]['Source']) + '">' + 
(output[i]['Source']) +"</a>");  


    //second end}
}
}
}
}
)

function doThis(){
    let find_mp = document.getElementById("find-mp");
    let postalCode = find_mp.value;
    console.log(`https://represent.opennorth.ca/postcodes/${postalCode}/`);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", `https://represent.opennorth.ca/postcodes/${postalCode}/`, false);
    xmlHttp.send();
    let list = (JSON.parse(xmlHttp.responseText)).representatives_centroid;
    for (i = 0; i < list.length; i++){
        if (list[i].elected_office === "MP") {
            let name = list[i].name;
            let email = list[i].email;
            let image = list[i].photo_url;
            let party = list[i].party_name;
            $("#your-mp").html(`<img src="${image}">
            <p> Name: ${name}, E-mail: ${email}, Party: ${party} </p>`);  
            break;
        }
    };
  };