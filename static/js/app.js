//Initiliaize collection of belly button IDs into dropdown and create event listeners
function init() {
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset");

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {

        //Append all IDs to the drop down
        var names = data.names;
        names.forEach((id) => {
            dropDown.append("option")
            .text(id);
        });

        //Promise pending
        //const dataPromise = names[0];

        //Build the plot with the selected data

        //Add event listener for drop down
        dropDown.on("change", metaData); //metaData function below
    });
};

init();

function metaData(){
    //Use d3 to create an event handler of the drop down
    var dropDown = d3.select("#selDataset").property("value");

    //console.log(dropDown);

    //Create a custom filtering function for metadata.id
    function dataFilter(metaData) {
        return metaData.id == dropDown
    };

    //Create a custom filtering function for samples.id
    function dataFilteredsamplesID(samples) {
        return samples.id == dropDown
    };

    //Fetch the JSON data
    d3.json("data/samples.json").then((data) => {
        
        var metaData = data.metadata;

        var dataFiltered = metaData.filter(dataFilter);

        // Use indexing to access an array item
        var dataFiltered = dataFiltered[0];

        console.log(dataFiltered);

        //console.log(data.samples)
        var samples = data.samples;

        var samplesID = samples.filter(dataFilteredsamplesID);

        // Use indexing to access an array item
        var samplesID = samplesID[0];

        //console.log(samplesID);

        otu_ids = samplesID.otu_ids;
        sampleValues = samplesID.sample_values;

        //console.log(otu_ids)

        // Slice the first 10 objects for plotting
        slicedData_otu = otu_ids.slice(0, 10);
        slicedData_otu = slicedData_otu.map(otu => "OTU " + otu + " ");
        slicedData_otu = slicedData_otu.reverse();

        console.log(slicedData_otu);

        // Slice the first 10 objects for plotting
        slicedData_values = sampleValues.slice(0, 10);
        slicedData_values = slicedData_values.reverse();

        console.log(slicedData_values);

        var trace1 = {
            x: slicedData_values,
            y: slicedData_otu,
            type: "bar",
            orientation: "h"
          };
        
          var data = [trace1];
        
          var layout = {
            title: "Top 10 OTUs"
          };
        
          Plotly.newPlot("bar", data, layout);

        // //Clears the table of the original data & appends relative selected data
        // Select the html tag where the data is being placed into
        panelBody = d3.select(".panel-body");    

        // Clear the info withinin the selected panel-body HTML tag
        panelBody.html("");
        //Appends data
        
        panelBody.append("h5").text("ID: " + dataFiltered.id);
        panelBody.append("h5").text("Ethnicity: " + dataFiltered.ethnicity);
        panelBody.append("h5").text("Gender: " + dataFiltered.gender);
        panelBody.append("h5").text("Age: " + dataFiltered.age);
        panelBody.append("h5").text("Location: " + dataFiltered.location);
        panelBody.append("h5").text("Blood Type: " + dataFiltered.bbtype);
        panelBody.append("h5").text("Washing Freq: " + dataFiltered.wfreq);
    });

    // // //

    // //Fetch the JSON data
    // d3.json("data/samples.json").then((data) => {
        
    //     var samples = data.samples;
    
    //     var dataFiltered = samples.filter(xxx);
    
    //     // Use indexing to access an array item
    //     var dataFiltered = dataFiltered[0];
    
    //     console.log(dataFiltered);
    
    //     // //Clears the table of the original data & appends relative selected data
    //     // Select the html tag where the data is being placed into
    //     panelBody = d3.select(".panel-body");    
    


    

};
