function processFile(evt) {
    var moviesProcessed = 0;
    document.getElementById('textarea').innerHTML = "";
    document.getElementById('textarea').innerHTML += "Importing movies into DynamoDB. Please wait..." + "\n";
    var file = evt.target.files[0];
    if (file) {
        var r = new FileReader();

        r.onload = function(e) {
            var contents = e.target.result;
            var allMovies = JSON.parse(contents);

            allMovies.forEach(function (movie) {

                var params = {
                    TableName: "Movies",
                    Item: {
                        "year": movie.year,
                        "title": movie.title,
                        "info": movie.info
                    }
                };
                docClient.put(params, function (err, data) {
                    ++moviesProcessed;
                    if (err) {
                        console.log("Unable to add movie: " + movie.title + "\n");
                    } else {
                        switch(moviesProcessed) {
                            case 2501:
                                document.getElementById('textarea').innerHTML += "_______________" + "\n";
                                document.getElementById('textarea').innerHTML += "Halfway done..." + "\n";
                                document.getElementById('textarea').innerHTML += "_______________" + "\n";
                                break;
                            case 3751:
                                document.getElementById('textarea').innerHTML += "______________" + "\n";
                                document.getElementById('textarea').innerHTML += "Almost done..." + "\n";
                                document.getElementById('textarea').innerHTML += "______________" + "\n";
                                break;
                            case 5001:
                                document.getElementById('textarea').innerHTML += "______________________" + "\n";
                                document.getElementById('textarea').innerHTML += "Finished processing!" + "\n";
                                document.getElementById('textarea').innerHTML += "______________________" + "\n";
                                break;
                            default: document.getElementById('textarea').innerHTML += "Added: " + movie.title + "\n";
                        }
                        textarea.scrollTop = textarea.scrollHeight;
                    }
                });
            });
    };
        r.readAsText(file);
    } else {
        alert("Could not read movie data file");
    }
}