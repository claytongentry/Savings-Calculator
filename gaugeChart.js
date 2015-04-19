// Load AJAX api
google.load("visualization", "1", {packages:["gauge"]});
google.setOnLoadCallback(drawChart);
function drawChart() {

    // One dataset (Homes) -> one gauge
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Homes', 80]
    ]);

    var options = {
        max: 200,
        width: 600, height: 200,
        redFrom: 180, redTo: 200,
        yellowFrom:150, yellowTo: 180,
        minorTicks: 5,
        redColor: '#39c',
        yellowColor: '#ff9b0f'
    };

    var chart = new google.visualization.Gauge(document.getElementById('gaugeChartDiv'));

    chart.draw(data, options);

    // Init toggle var
    var toggle = 0;

    // ONLY change currentHomes value to update chart
    var currentHomes = 73;
    var plusUser = currentHomes + 20;

    // Update HTML text
    document.getElementById("currentHomes").innerHTML = currentHomes;
    document.getElementById("plusUser").innerHTML = plusUser;

    // Toggle chart between currentHomes, plusUser values
    setInterval(function() {
        if (toggle == 0) {
            data.setValue(0, 1, currentHomes);
            toggle = 1;
        } else {
            data.setValue(0, 1, plusUser);
            toggle = 0;
        }
        chart.draw(data, options);
    }, 1500);
}
