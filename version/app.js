const express = require('express');
const os = require("os")
const pjson = require('./package.json');

app = express();

var HTML_HEAD = `
<!DOCTYPE html>
<html>
<head>
<style>
#env-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#env-table td, #env-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#env-table tr:nth-child(even){background-color: #f2f2f2;}

#env-table tr:hover {background-color: #ddd;}

#env-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

#env-table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #FAFAFD;
    color: white;
}

</style>

<script type="text/javascript">
window.addEventListener("load", (event) => {
    document.querySelector("#cookie-elem").innerHTML = document.cookie.replaceAll(";",";\n");
    console.log(event);
});
</script>

</head>
<body>

<h3>A Samle NODE.JS application (version "${pjson.version}")</h3>
`

var HTML_FOOT = `
</body>
</html>
`

app.get('/', function (req, res) {

    var response = 
        `This name of the build is - <b>"${process.env.OPENSHIFT_BUILD_NAME}"</b>.<br/>\n` +
        `host-name is <code>${os.hostname()}</code>.<br/>\n`;
        
    response += "<hr/>\n"
    response += `<pre id="cookie-elem">cookie should be here after loading the page</pre>\n`

    response += "<hr/>\n"
    response += "<pre>\n"
    response += "pjson = "
    response += JSON.stringify(pjson, null, "  ")
    response += "\n\nos.networkInterfaces() = "
    response += JSON.stringify(os.networkInterfaces(),null,2)
    response += "\n\nos.cpus() = "
    response += JSON.stringify(os.cpus(),null,2)
    response += "\n</pre>\n"

    response += "<hr/>\n"
    response += "<table id='env-table'><thead><tr><th>Env. Variable</th><th>Value</th></tr><thead\n>"
    response += "<tbody>\n"
    Object.keys(process.env).sort().forEach(key => {
        response += `<tr>`
        response += `<td>${key}</td>`
        response += `<td>${process.env[key]}</td>`
        response += `</tr>\n`
    });
    response += "</tbody></table>\n"

    //send the response to the client
    res.send(`${HTML_HEAD} ${response} ${HTML_FOOT}`);
});

app.listen(8080, function () {
    console.log("----------- package.json: -------------")
    console.dir(pjson);
    console.log("----------- os.xxxx(): ----------------")
    try {
        console.dir({
            "os.arch()": os.arch(),
            "os.availableParallelism": os.availableParallelism,
            "os.endianness()": os.endianness(),
            "os.freemem()": os.freemem(),
            "os.getPriority()": os.getPriority(),
            "os.homedir()": os.homedir(),
            "os.hostname()": os.hostname(),
            "os.loadavg()": os.loadavg(),
            "os.platform()": os.platform(),
            "os.release()": os.release(),
            "os.tmpdir()": os.tmpdir(),
            "os.totalmem()": os.totalmem(),
            "os.userInfo()": os.userInfo(),
            "os.uptime()": os.uptime(),
            "os.version()": os.version(),
            "os.machine()": os.machine()
        });
    } catch (ex) {
        console.log(e)
    }
    console.log('Server listening on port 8080... let\'s go!');
});
