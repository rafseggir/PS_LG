// Function to management data
function dataLineCharts(dataList){
    var promiseList = [];
    //1. Sort by date
    var listSortByDate = dataList.sort(function(a,b){return a.date-b.date});
    totalData = _.reduce(listSortByDate, function(memo, num){
        return (memo.value)?(memo.value + num.value):memo + num.value;});
    //2. Group by catergory
    var groupByCat = _.groupBy(listSortByDate,'cat');
    var listGroupCat = _.map(groupByCat,function(data){
            return data
    });
    $.each(listGroupCat,function(){
        promiseList.push(sumValueByDate(this));
    });
    Promise.all(promiseList).then(function(response){
        irregularTime(response);
        pieChart(pieData);
    }).catch(function(error) {
        console.log("Error al obtener los datos:", error);
    });
}

function sumValueByDate(arrayData){

    return new Promise(function(resolve, reject){
        var dataFinalCat = {
            name: arrayData[0].cat,
            data: []
        };
        var pieDataCat = [arrayData[0].cat]
        var totalDataCat = 0;
        //1 Agrupo por fecha y obtengo un objeto con las fechas.
        var partialByDate = _.groupBy(arrayData, 'date');
        //2 Obtener valores y sumarlos
        var dataByDate = _.map(partialByDate,function(listGroupDate){
                                return listGroupDate;
                        });
        //3 Recorremos la lista para registrar los datos y sumar los que estén repetidos más de una vez
        $.each(dataByDate,function(){
                var pData = [];
                if(this.length == 1){
                    pData.push(this[0].date);
                    pData.push(this[0].value);
                    dataFinalCat.data.push(pData);
                } else {
                    pData.push(this[0].date);
                    pData.push(_.reduce(this, function(memo, num){ 
                        return (memo.value)?(memo.value + num.value):memo + num.value;}));
                    dataFinalCat.data.push(pData);
                };
                totalDataCat += pData[1];
        });

        // Data to pie chart
        totalDataCat = totalDataCat * 100 / totalData;
        pieDataCat.push(totalDataCat);
        pieData.push(pieDataCat);

        resolve(dataFinalCat);
    });
}