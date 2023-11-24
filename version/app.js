const express = require('express');
const os = require("os")
const pjson = require('./package.json');

app = express();

app.get('/', function (req, res) {

    var response = 
        `This version of app is "${pjson.version}" - #3 after web-hook.<br/>\n` +
        `host-name is "${os.hostname()}".\n`;

    response += "<hr/>\n"
    response += "<pre>\n"
    response += "pjson = "
    response += JSON.stringify(pjson, null, "  ")
    response += "\n</pre>\n"
    
    //send the response to the client
    res.send(response);

});

JSON.semiStringify = function(obj) {
    var objSemi = {}
    Object.keys(obj).forEach(key => {
        objSemi[key] = JSON.stringify(obj[key]);
    });
    return objSemi;
}

app.listen(8080, function () {
    console.log('Server listening on port 8080... let\'s go!');
    console.dir(pjson);
    console.log("------------------------------")
    console.table(JSON.semiStringify(pjson));
});
