// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Fetched JSON Data:", data); 

    // get the metadata field
    const metadata = data.metadata;
    console.log("Metadata:", metadata);


    // Filter the metadata for the object with the desired sample number
    const result = metadata.filter(sampleObj => sampleObj.id == sample)[0];
    console.log("Filtered Metadata Result:", result); 


    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");
    console.log("Metadata Panel Selected:", panel); 


    // Use `.html("") to clear any existing metadata
    panel.html("");
    console.log("Cleared Metadata Panel"); 


    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
      console.log(`Appended Metadata: ${key.toUpperCase()}: ${value}`);
     });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Fetched JSON Data for Charts:", data);

    // Get the samples field
    const samples = data.samples;
    console.log("Samples:", samples);


    // Filter the samples for the object with the desired sample number
    const result = samples.filter(sampleObj => sampleObj.id == sample)[0];
    console.log("Filtered Sample Result:", result); 


    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;
    console.log("OTU IDs:", otu_ids); 
    console.log("OTU Labels:", otu_labels); 
    console.log("Sample Values:", sample_values);

    // Build a Bubble Chart
    const bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Earth"
      }
  }];
  console.log("Bubble Chart Data:", bubbleData);

  
  const bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 30 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
  };
  console.log("Bubble Chart Layout:", bubbleLayout);


    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    console.log("Rendered Bubble Chart");


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
    const top_sample_values = sample_values.slice(0, 10).reverse();
    const top_otu_labels = otu_labels.slice(0, 10).reverse();
    console.log("Bar Chart YTICKS:", yticks);
    console.log("Top Sample Values:", top_sample_values);
    console.log("Top OTU Labels:", top_otu_labels);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barData = [{
      x: top_sample_values,
      y: yticks,
      text: top_otu_labels,
      type: "bar",
      orientation: "h"
  }];
  console.log("Bar Chart Data:", barData); 

  
  const barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: { t: 30, l: 150 },
    xaxis: {
        title: "Number of Bacteria",
        tickmode: "array",
        tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160], 
    },
};
console.log("Bar Chart Layout:", barLayout);



    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
    console.log("Rendered Bar Chart");
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  console.log("Loaded Data:", data);

    // Get the names field
    const sampleNames = data.names;
    console.log("Sample Names:", sampleNames);


    // Use d3 to select the dropdown with id of `#selDataset`
    const selector = d3.select("#selDataset");
    console.log("Dropdown Selector:", selector); 


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
      console.log(`Appended Option: ${sample}`);
  });

    // Get the first sample from the list
    const firstSample = sampleNames[0];
    console.log("First Sample:", firstSample); 


    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
});
}

// Function for event listener
function optionChanged(newSample) {
  console.log("Selected New Sample:", newSample); 

  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
