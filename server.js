const express = require('express');
const bodyParser = require('body-parser');
const fs  = require('file-system');
const envfile = require('envfile')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * get the environment value by providing 
 * the process name
 */
app.get('/getEnvironment/:process', (req, res) => {
    try {
        const process = req.params.process.replace(/:/g,'') || {};
        const sourcePath = `/Users/administrator/Desktop/${process}/.env`;
        const pasedValue = envfile.parseFileSync(sourcePath);
        res.status(200).json(pasedValue);
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * set the environment with key and value
 */
app.get('/setEnvironment/:process/:key/:value', (req, res) => {
    try {
        const process = req.params.process.replace(/:/g,'');
        const key = req.params.key.replace(/:/g,'');
        const value = req.params.value.replace(/:/g,'');
        const sourcePath = `/Users/administrator/Desktop/${process}/.env`
        let parsedFile = envfile.parseFileSync(sourcePath);
        parsedFile[key] = value;
        fs.writeFileSync(sourcePath, envfile.stringifySync(parsedFile)) 
        const pasedValue = envfile.parseFileSync(sourcePath);
        res.status(200).json(pasedValue);
    } catch(err) {
        res.status(400).json(err)
    }
});


const port = process.env.port || 3000;
app.listen(port, (err) => {
    if(err) {
        console.log('server error', err);
    }
    console.log(`server running on port ${port}`);
})