function scanData() {
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Scanning for movies between 2013 and 2014." + "\n";

    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 2000,
            ":end_yr": 2015
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + "\n";
            });

            // Continue scanning if we have more movies (per scan 1MB limitation)
            // document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
            // params.ExclusiveStartKey = data.LastEvaluatedKey;
            // docClient.scan(params, onScan);            
        }
    }
}
function Scan1(){
    var yst=parseInt(document.getElementById("year_stMoviesScan").value);
    var yen=parseInt(document.getElementById("year_enMoviesScan").value);
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Scanning for Movies between "+yst+" and "+ yen+"." + "\n";

    var params = {
        TableName: "Movies",
        ProjectionExpression: "#yr, title",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": yst,
            ":end_yr": yen
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + "\n";
            });            
        }
    }
}
function Scan2(){
    var yst=parseInt(document.getElementById("year_stMusicsScan").value);
    var yen=parseInt(document.getElementById("year_enMusicsScan").value);
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Scanning for Musics between "+yst+" and "+ yen+"." + "\n";

    var params = {
        TableName: "Musics",
        ProjectionExpression: "#yr, title",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": yst,
            ":end_yr": yen
        }
    };

    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            // Print all the movies
            document.getElementById('textarea').innerHTML += "Scan succeeded: " + "\n";
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + "\n";
            });            
        }
    }
}
function runQuery1(){
    var y=parseInt(document.getElementById("yearMoviesQuery").value);
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Querying for Movies from "+y;

    var params = {
        TableName : "Movies",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy":y
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += "\n" + movie.year + ": " + movie.title;
            });
         
        }
    });
}
function runQuery2(){
    var y=parseInt(document.getElementById("yearMusicsQuery").value);
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Querying for Musics from "+y;

    var params = {
        TableName : "Musics",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":yyyy":y
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            document.getElementById('textarea').innerHTML += "Unable to query. Error: " + "\n" + JSON.stringify(err, undefined, 2);
        } else {
            data.Items.forEach(function(movie) {
                document.getElementById('textarea').innerHTML += "\n" + movie.year + ": " + movie.title;
            });
         
        }
    });
}
