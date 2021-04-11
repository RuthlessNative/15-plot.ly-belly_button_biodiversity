var bellyData;

//Initiliaize collection of belly button data
function init(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset");

    //Fetch the json data
    d3.json("data/samples.json").then((data) => {
        bellyData = data;

        var names = data.names;
        names.forEach((id) => {
            dropDown.append("option")
            .text(id)
            .property("value", id);
        })
        //Promise pending
        const dataPromise = names[0];

        //Build the plot with the selected data

        //Create another event handler for when the metaData is chosen in the drop down
        dropDown.on("change",metaData); //metaData function below

    })
}

init();

function metaData(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset").property("value");

    //console.log(dropDown);

    // // Create a custom filtering function
    // function selectYounger(person) {
    //     return person.age < 30;
    // }
  
    // // filter() uses the custom function as its argument
    // var youngSimpsons = simpsons.filter(selectYounger);
  
    // // Test
    // console.log(youngSimpsons);

    //Create a custom filtering function
    function dataFilter(metaData) {
        return metaData.id == dropDown
    };

    d3.json("data/samples.json").then((data) => {
        
    var metaData = data.metadata;

    var dataFiltered = metaData.filter(dataFilter);

    var dataFiltered = dataFiltered[0];

    console.log(dataFiltered);

    // //Clears the table of the original data
    // Select the html tag where the data is being placed into
    panelBody = d3.select(".panel-body");    

    // Clear the info withinin the selected panel-body HTML tag
    panelBody.html("");

    panelBody.append("h5").text(dataFiltered.ethnicity);
    panelBody.append("h5").text(dataFiltered.ethnicity);
    panelBody.append("h5").text(dataFiltered.ethnicity);

    });
    



    // //Fetch the json data
    // d3.json("data/samples.json").then((metaData) => {
    //     var meta = metaData.metadata;

    //     meta.forEach((md)) => {
    //         md == dropDown
    //     }
    // }
    
}