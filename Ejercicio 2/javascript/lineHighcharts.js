// Function to draw lineal chart
function irregularTime(data) {
    linealChart = new Highcharts.Chart({
        chart: {
            renderTo: 'irregularTime',
            type: 'spline'
        },
        title: {
            text: 'Categoría por días'
        },
        subtitle: {
            text: 'rafaelangel1987@gmail.com'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%y'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Categoría'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b. %y}: {point.y:.2f}'
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: data
    })
}

// Function to draw pie chart
function pieChart(data){
    pieChart = new Highcharts.Chart({
            chart: {
                renderTo: 'pie'
            },
            title: {
                text: 'Porcentaje por categorías'
            },
            subtitle: {
                text: 'rafaelangel1987@gmail.com'
            },
            plotArea: {
                shadow: null,
                borderWidth: null,
                backgroundColor: null
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Categoría',
                data: data
            }]
        });
}