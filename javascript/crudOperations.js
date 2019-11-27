function createItem(table) {
    var params = {
        TableName :table,
        Item:{
            //"year": 2015,
            //"title": "The Big New Movie",
            "info":{
            }
        
        }
        
    };
    var table = document.getElementById('myTable');
    var rowLength = table.rows.length;
        params.Item.year=parseInt(table.rows[1].cells[1].querySelector('input').value);
        params.Item.title=table.rows[0].cells[1].querySelector('input').value;
    for(var i=2;i<rowLength;i++){
        params.Item.info[table.rows[i].cells[0].innerHTML]=table.rows[i].cells[1].querySelector('input').value;
        document.getElementById("testArea").value+=table.rows[i].cells[1].querySelector('input');
    }
    docClient.put(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function readItem(table) {
    var year;
    var a;
    var title;
    if(table=="Movies"){
         a=document.getElementById("moviesReadItem").value;
    }
    else if(table=="Musics"){
        a=document.getElementById("musicsReadItem").value;
    }
        var pos = a.search("-");
        title=a.substr(0,pos);
        year=parseInt(a.substr(pos+1,a.length-1));
    var params = {
        TableName: table,
        Key:{
            "year": year,
            "title": title
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to read item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "GetItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}
function removeItem(textt){
    var select = document.getElementById('moviesReadItem');
    var select2=document.getElementById('moviesUpdateItem');
    var select3=document.getElementById('moviesDeleteItem');
    var select4=document.getElementById("musicsReadItem");
    var select5=document.getElementById("musicsUpdateItem");
    var select6=document.getElementById("musicsDeleteItem");
    for (var i=0; i<select.length; i++) {
        if (select.options[i].value == textt)
            select.remove(i);
    }
    for (var i=0; i<select2.length; i++) {
        if (select2.options[i].value == textt)
            select2.remove(i);
    }
    for (var i=0; i<select3.length; i++) {
        if (select3.options[i].value == textt)
            select3.remove(i);
    }
    for (var i=0; i<select4.length; i++) {
        if (select4.options[i].value == textt)
            select4.remove(i);
    }
    for (var i=0; i<select5.length; i++) {
        if (select5.options[i].value == textt)
            select5.remove(i);
    }
    for (var i=0; i<select6.length; i++) {
        if (select6.options[i].value == textt)
            select6.remove(i);
    }

}
function getAllData() {
    //removeAll();

    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 1,
            ":end_yr": 9999
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        var option, option1, option2;
        if (err) {
             document.getElementById('textarea').innerHTML += "Unable to get all the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            data.Items.forEach(function(movie) {
                option = document.createElement("option");
                option.text = movie.title+"-"+movie.year;
                option1 = document.createElement("option");
                option1.text = movie.title+"-"+movie.year;
                option2 = document.createElement("option");
                option2.text = movie.title+"-"+movie.year;
                document.getElementById("moviesReadItem").add(option);
                document.getElementById("moviesUpdateItem").add(option1);
                document.getElementById("moviesDeleteItem").add(option2);
            });            
        }
    }
    getAllData2();
}
function getAllData2(){

    var params = {
        TableName: "Musics",
        ProjectionExpression: "#yr, title",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 1,
            ":end_yr": 9999
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        var option, option1, option2;
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to get all the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            data.Items.forEach(function(movie) {
                option = document.createElement("option");
                option.text = movie.title+"-"+movie.year;
                option1 = document.createElement("option");
                option1.text = movie.title+"-"+movie.year;
                option2 = document.createElement("option");
                option2.text = movie.title+"-"+movie.year;
                document.getElementById("musicsReadItem").add(option);
                document.getElementById("musicsUpdateItem").add(option1);
                document.getElementById("musicsDeleteItem").add(option2);
            });            
        }
    }
}

function updateItem(table) {
    var year;
    var title;
    var a;
    if(table=="Movies"){
        a=document.getElementById("moviesReadItem").value;
     }
     else if(table=="Musics"){
       a=document.getElementById("musicsReadItem").value;
    }
    var pos = a.search("-");
    title=a.substr(0,pos);
    year=parseInt(a.substr(pos+1,a.length));

    var params = {
        TableName:table,
        Key:{
            "year": year,
            "title": title
        },
        UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
        ExpressionAttributeValues:{
            ":r":5.5,
            ":p":"Everything happens all at once.",
            ":a":["Larry", "Moe", "Curly"]
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to update item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "UpdateItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
        }
    });
}

function deleteItem(table) {
    var year;
    var title;
    var a;
    if(table=="Movies"){
        a=document.getElementById("moviesDeleteItem").value;
   }
   else if(table=="Musics"){
       a=document.getElementById("musicsDeleteItem").value;
   }
       var pos = a.search("-");
       title=a.substr(0,pos);
       
       year=parseInt(a.substr(pos+1,a.length-1));
       var t=year;
       
    var params = {
        TableName:table,
        Key:{
            "year":year,
            "title":title
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML = "Unable to delete item: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            document.getElementById('textarea').innerHTML = "DeleteItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
            removeItem(a);
        }
    });
}