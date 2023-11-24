const express = require('express');
const os = require("os")
const pjson = require('./package.json');

app = express();

app.get('/', function (req, res) {

    var response = 
        'This is version 2 of the app.' + '\n' +
        'host-name is "' + os.hostname() + '"\n';

    response += "<hr/>\n"
    response += "<pre>\n"
    response += "pjson = "
    response += JSON.stringify(pjson, null, "  ")
    response += "\n</pre>\n"
    
    //send the response to the client
    res.send(response);

});

app.listen(8080, function () {
    console.log('Server listening on port 8080... let\'s go!');
    console.dir(pjson);
    console.log("------------------------------")
    console.table(pjson);
});
