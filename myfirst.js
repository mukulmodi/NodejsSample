const express = require('express');
const bodyParser = require('body-parser');
const http = require('http')
const app = express();
const port = 3000;

// Configuring body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/test', (req, response) => {

    var returnData;
    console.log('Request - ' + req.body.name)
    const data = JSON.stringify({
        todo: 'Buy the milk'
    })

    // const options = {
    //     hostname: 'httpbin.org',
    //     port: 443,
    //     path: '/post',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': data.length
    //     }
    // }

    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/testPost',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    // TODO - How to return response from POST?
    
    const request = http.request(options, res => { // this setup defines how the request should react
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', function (data) {
            // returnData += data
            console.log('Data returned: ' + data)
            response.send(data)
        });
        // res.on('data', d => {
        //     process.stdout.write(d)
        // })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data) // this actually makes the request
    request.end()

    // response.send(returnData);
})

var myLogger = function (req, res, next) {
    console.log('LOGGED')
    req.data = 'Data is set'
    next()
}

app.use(myLogger)

app.post('/testPost', function (req, res) {
    res.send('HELLO WORLD: ' + req.data)
})



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
