// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

// Get our API routes
// const api = require('./server/routes/users');

const app = express();
app.use(cors());

global.schemas = {};
var mongoose = require('mongoose');
mongoose.connect('mongodb://Jonathan64:123Greta@ds155730.mlab.com:55730/colibrisapp', function (err) {
    if (err) {
        throw err;
    } else console.log('Connected to db !!!');
});
// chargement des schémas depuis le fichier de configuration JSON dans une variable
var database_schemas = JSON.parse(fs.readFileSync("server/database_schema.json", 'utf8'));
// Initialisation de chaque schéma par association entre le schéma et la collection
for (modelName in database_schemas) {
    global.schemas[modelName] = mongoose.model(modelName, database_schemas[modelName].schema,
        database_schemas[modelName].collection);
    console.log("schema chargé !");
}

//Chargement des controleurs
/* Chargement configuration JSON des actions --> controleurs */
global.actions_json = JSON.parse(fs.readFileSync("./server/routes/config_actions.json", 'utf8'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);
// app.use('/users', api);
require('./dynamicRouter')(app);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));

