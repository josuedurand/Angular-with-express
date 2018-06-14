const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {

    // Le deuxieme parametres sont les données au format json
    var type = req.method;
    var path = req.originalUrl;
    
    global.schemas[global.actions_json[type+path].schema].find(function (err, result) {
        if (err) { throw err; }

        // result est un tableau de hash 
        res.send(result);  
    });    
});

module.exports = router;