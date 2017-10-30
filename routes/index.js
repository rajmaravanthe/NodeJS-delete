var express = require('express');
var router = express.Router();
var fs = require('fs');

var jsonData;
/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile('././data/data.json', 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      jsonData = JSON.parse(data);
      console.log(jsonData.persons);
    }
  })
  res.render('index', { title: 'Express', persons: jsonData.persons });
});

router.get('/deleteperson/:name', function (req, res) {
  console.log("name: " + req.params.name);
  console.log(jsonData.persons.length);
  for (var i = 0; i < jsonData.persons.length; i++) {
    console.log(jsonData.persons[i].name);
    if (jsonData.persons[i].name === req.params.name) {
      console.log('inside if');
      jsonData.persons.splice(i, 1);
      fs.writeFile('././data/data.json', JSON.stringify(jsonData), 'utf8', function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('delete updated');
        }
      })
      console.log(jsonData);
    }
  }

});


module.exports = router;
