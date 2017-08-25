var getData = [get("http://s3.amazonaws.com/logtrust-static/test/test/data1.json"),
            get("http://s3.amazonaws.com/logtrust-static/test/test/data2.json"),
            get("http://s3.amazonaws.com/logtrust-static/test/test/data3.json")];            
var totalData = 0;
var pieData = [];

function main(){
    Promise.all(getData).then(function(response){
        var promisesData = [];
        $.each(response, function(){
            promisesData.push(formatData(this));
        });
        return Promise.all(promisesData);
    }).then(function(mapData){
        var allData = []
        $.each(mapData,function(){
            allData = allData.concat(this);
        });
        dataLineCharts(allData);
    }).catch(function(error) {
        console.log("Error al obtener los datos:", error);
    });

}

// Function to get data from server
function get(uri){
    
    return new Promise(function(resolve, reject){
        $.ajax({
            url: uri,
            type: "GET",
            jsonp: false,
            jsonpCallback: "respond",
            success: function (data) {
                resolve(data);
            },
            error: function (data) {
                reject(data.status);
            }
        }); 
    })

}

// Function to normalize data
function formatData(data){

    var searchCat = /\#\w{3} ?[0-9]*\#/;
    var regExpDate = /\d{4}\-\d{2}\-\d{2}/;

    return new Promise(function(resolve, reject){
        var listData = [];

        $.each(data, function(){
            var item = {date:0,cat:null,value:0};
            if(this.d){
                item.date = this.d;
                item.cat = this.cat.toUpperCase();
                item.value = this.value;
            } else if (this.myDate){
                item.date = moment(this.myDate,"YYYY-MM-DD").valueOf(),
                item.cat = this.categ.toUpperCase(),
                item.value = this.val                    
            } else{
                item.date = moment(this.raw.match(regExpDate)[0],"YYYY-MM-DD").valueOf(),
                item.cat = this.raw.match(searchCat)[0].replace(/#/g,"").toUpperCase(),
                item.value = this.val
            }
            listData.push(item);
        });

        resolve(listData);    
    })
}